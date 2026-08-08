import mongoose from "mongoose";

const attachmentSchema = new mongoose.Schema(
  {
    url: String,
    publicId: String,
    type: { type: String, enum: ["image", "video", "raw", "auto"], default: "auto" },
    name: String,
  },
  { _id: false }
);

const chatMessageSchema = new mongoose.Schema(
  {
    channel: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ChatChannel",
      required: true,
      index: true,
    },
    sender: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },

    text: { type: String, trim: true, default: "" },

    attachments: [attachmentSchema],

    readBy: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],

    editedAt: { type: Date, default: null },
    deletedAt: { type: Date, default: null },
  },
  { timestamps: true }
);

chatMessageSchema.index({ channel: 1, createdAt: -1 });

export default mongoose.model("ChatMessage", chatMessageSchema);
