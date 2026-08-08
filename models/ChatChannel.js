import mongoose from "mongoose";

const memberSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    role: { type: String, enum: ["owner", "admin", "member"], default: "member" },
    joinedAt: { type: Date, default: Date.now },
    lastReadAt: { type: Date, default: Date.now },
  },
  { _id: false }
);

const chatChannelSchema = new mongoose.Schema(
  {
    name: { type: String, trim: true },
    description: { type: String, trim: true, default: "" },

    // "channel" = group channel (created by admin), "direct" = 1:1 DM between two users
    type: { type: String, enum: ["channel", "direct"], default: "channel" },

    isPrivate: { type: Boolean, default: false },

    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },

    members: [memberSchema],

    lastMessage: {
      text: { type: String, default: "" },
      sender: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
      createdAt: { type: Date },
    },

    lastMessageAt: { type: Date, default: Date.now },

    archived: { type: Boolean, default: false },
  },
  { timestamps: true }
);

chatChannelSchema.index({ type: 1, "members.user": 1 });

export default mongoose.model("ChatChannel", chatChannelSchema);
