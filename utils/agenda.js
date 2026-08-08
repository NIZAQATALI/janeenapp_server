  
import Agenda from "agenda";
import NotificationTemplate from "../models/Notificationtemplate.js";
import NotificationPreference from "../models/Notificationprefrence.js";
import Notification from "../models/Notification.js";
import { generateLeaderboardSnapshot } from "../utils/gamification/leaderboardservice.js";
import { getExpiryDate } from "./constant/constant.js";

let agenda;

export const startAgenda = async (io) => {
  agenda = new Agenda({
    db: {
      address: process.env.MONGODB_URL,
      collection: "agendaJobs",
    },
  });

  // ================= GENERIC NOTIFICATION FUNCTION =================
  const sendNotifications = async (type, io) => {
    try {
      console.log(`🔥 ${type.toUpperCase()} job started at`, new Date());

     
const users = await NotificationPreference.find({ frequency: type });
const templates = await NotificationTemplate.find({ type });

    if (users.length === 0) {
      console.log(`⚠️ No users for ${type}`);
      return;
    }
    if (templates.length === 0) {
  console.log(`⚠️ No templates for ${type}`);
  return;
}

// 1. Remove old notifications of same type for these users
await Notification.deleteMany({
  userId: { $in: users.map(u => u.userId) },
  type,
});

// 2. Remove expired notifications (24h / 7d / 30d logic)
const expiryDate = getExpiryDate(type);

await Notification.deleteMany({
  type,
  createdAt: { $lt: expiryDate },
});

const notifications = [];

for (const user of users) {
  const template = templates.find(
    (t) =>
      t.category === user.category &&
      t.stageType === user.stageType &&
      t.stageValue === user.stageValue
  );

  if (!template) {
    console.log(`❌ No ${type} template for user:`, user.userId);
    continue;
  }

  notifications.push({
    userId: user.userId,
    title: template.title,
    message: template.message,
    type,
    isRead: false,
    createdAt: new Date(),
  });
}

if (notifications.length === 0) {
  console.log(`⚠️ No ${type} notifications to send`);
  return;
}

      const createdNotifications = await Notification.insertMany(notifications);

      // Emit to users
      createdNotifications.forEach((n) => {
        io.to(n.userId.toString()).emit("notification", n);
      });

      console.log(`✅ Sent ${createdNotifications.length} ${type} notifications`);
    } catch (err) {
      console.error(`❌ ${type} job failed:`, err);
    }
  };

  // ================= JOB DEFINITIONS =================
  agenda.define("send-daily-notifications", async () => {
    await sendNotifications("daily", io);
  });

  agenda.define("send-weekly-notifications", async () => {
    await sendNotifications("weekly", io);
  });

  agenda.define("send-monthly-notifications", async () => {
    await sendNotifications("monthly", io);
  });

  // ================= LEADERBOARD =================
  agenda.define("daily-leaderboard", async () => {
    await generateLeaderboardSnapshot("daily");
  });

  agenda.define("weekly-leaderboard", async () => {
    await generateLeaderboardSnapshot("weekly");
  });

  agenda.define("monthly-leaderboard", async () => {
    await generateLeaderboardSnapshot("monthly");
  });
  //.....
//   await agenda.every("5 0 * * *", "daily-leaderboard", {}, {
//   unique: { name: "daily-leaderboard" }
// });

// await agenda.every("10 0 * * 0", "weekly-leaderboard", {}, {
//   unique: { name: "weekly-leaderboard" }
// });

// await agenda.every("15 0 1 * *", "monthly-leaderboard", {}, {
//   unique: { name: "monthly-leaderboard" }
// });

  // ================= START AGENDA =================
  await agenda.start();

  // ================= SCHEDULE JOBS =================

  // Notifications
  // await agenda.every("0 9 * * *", "send-daily-notifications");
  await agenda.every("*/1 * * * *", "send-daily-notifications",  {},
  // await agenda.every("0 9 * * *", "send-daily-notifications",  {},

  { unique: { name: "send-daily-notifications" } }
);

  await agenda.every("0 9 * * 1", "send-weekly-notifications", {},
  { unique: { name: "send-weekly-notifications" }});
  await agenda.every("0 9 1 * *", "send-monthly-notifications",{},
  { unique: { name: "send-monthly-notifications" }});

  // Leaderboards
  await agenda.every("5 0 * * *", "daily-leaderboard");
  await agenda.every("10 0 * * 0", "weekly-leaderboard");
  await agenda.every("15 0 1 * *", "monthly-leaderboard");

  console.log("⏳ Agenda Jobs Scheduled (Notifications + Leaderboards)");
};

export default agenda; 