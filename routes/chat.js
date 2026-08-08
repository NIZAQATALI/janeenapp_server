import express from "express";
import { verifyJWT, verifyAdmin } from "../utils/verifyToken.js";
import { upload } from "../MiddleWares/multer.middleware.js";
import {
  listChatUsers,
  createChannel,
  getMyChannels,
  getAllChannelsAdmin,
  getChannelById,
  updateChannel,
  deleteChannel,
  addMembers,
  removeMember,
  leaveChannel,
  getOrCreateDirectMessage,
  getMessages,
  sendMessage,
  deleteMessage,
  markChannelRead,
} from "../Controllers/chatController.js";

const router = express.Router();

router.use(verifyJWT);

// Child accounts should not be able to access team/community chat
const blockChildren = (req, res, next) => {
  if (req.user?.role === "child") {
    return res.status(403).json({
      success: false,
      message: "Chat is not available for child accounts",
    });
  }
  next();
};
router.use(blockChildren);

/* Users (member picker / DM search) */
router.get("/users", listChatUsers);

/* My channels + DMs */
router.get("/channels/mine", getMyChannels);
router.post("/channels/direct", getOrCreateDirectMessage);

/* Admin channel management */
router.get("/channels/admin", verifyAdmin, getAllChannelsAdmin);
router.post("/channels", verifyAdmin, createChannel);
router.put("/channels/:channelId", verifyAdmin, updateChannel);
router.delete("/channels/:channelId", verifyAdmin, deleteChannel);
router.post("/channels/:channelId/members", verifyAdmin, addMembers);
router.delete("/channels/:channelId/members/:memberId", verifyAdmin, removeMember);

/* Shared channel actions */
router.get("/channels/:channelId", getChannelById);
router.post("/channels/:channelId/leave", leaveChannel);
router.post("/channels/:channelId/read", markChannelRead);

/* Messages */
router.get("/channels/:channelId/messages", getMessages);
router.post("/channels/:channelId/messages", upload.single("attachment"), sendMessage);
router.delete("/messages/:messageId", deleteMessage);

export default router;
