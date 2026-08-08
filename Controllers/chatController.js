
import mongoose from "mongoose";
import ChatChannel from "../models/ChatChannel.js";
import ChatMessage from "../models/ChatMessage.js";
import User from "../models/User.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";

const USER_SELECT = "username email photo role gender";

const idOf = (val) => {
  if (!val) return undefined;
  if (typeof val === "object" && val._id) return val._id.toString();
  return val.toString();
};

const isMemberOf = (channel, userId) =>
  channel.members.some((m) => idOf(m.user) === idOf(userId));

const getMemberSub = (channel, userId) =>
  channel.members.find((m) => idOf(m.user) === idOf(userId));

// Adds the given userIds to every socket that belongs to that user's room
// so they instantly start receiving events for the new channel.
const joinSocketsToChannel = (io, channelId, memberIds = []) => {
  if (!io) return;
  memberIds.forEach((id) => {
    io.in(id.toString()).socketsJoin(`channel:${channelId}`);
  });
};

const leaveSocketsFromChannel = (io, channelId, memberId) => {
  if (!io) return;
  io.in(memberId.toString()).socketsLeave(`channel:${channelId}`);
};

const formatChannelForUser = async (channel, userId) => {
  const memberSub = getMemberSub(channel, userId);
  const lastReadAt = memberSub?.lastReadAt || channel.createdAt;

  const unreadCount = await ChatMessage.countDocuments({
    channel: channel._id,
    deletedAt: null,
    createdAt: { $gt: lastReadAt },
    sender: { $ne: userId },
  });

  let displayName = channel.name;
  let displayPhoto = null;

  if (channel.type === "direct") {
    const other = channel.members.find((m) => idOf(m.user) !== idOf(userId));
    displayName = other?.user?.username || "Direct Message";
    displayPhoto = other?.user?.photo || null;
  }

  return {
    _id: channel._id,
    type: channel.type,
    name: displayName,
    description: channel.description,
    isPrivate: channel.isPrivate,
    members: channel.members.map((m) => ({
      user: m.user,
      role: m.role,
    })),
    memberCount: channel.members.length,
    lastMessage: channel.lastMessage,
    lastMessageAt: channel.lastMessageAt,
    unreadCount,
    displayPhoto,
    createdAt: channel.createdAt,
  };
};

/* ---------------------------------------------------------------- */
/* users list (for member picker / starting a DM)                    */
/* ---------------------------------------------------------------- */

export const listChatUsers = async (req, res) => {
  try {
    const { q = "" } = req.query;
    const filter = {
      _id: { $ne: req.user._id },
      ...(q
        ? {
            $or: [
              { username: { $regex: q, $options: "i" } },
              { email: { $regex: q, $options: "i" } },
            ],
          }
        : {}),
    };

    const users = await User.find(filter).select(USER_SELECT).limit(50);
    return res.status(200).json({ success: true, data: users });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Failed to fetch users", error: error.message });
  }
};

/* ---------------------------------------------------------------- */
/* channels                                                           */
/* ---------------------------------------------------------------- */

// Admin only
export const createChannel = async (req, res) => {
  try {
    const { name, description = "", isPrivate = false, memberIds = [] } = req.body;

    if (!name || !name.trim()) {
      return res.status(400).json({ success: false, message: "Channel name is required" });
    }

    const uniqueMemberIds = Array.from(
      new Set([req.user._id.toString(), ...memberIds.map((id) => id.toString())])
    );

    const members = uniqueMemberIds.map((id) => ({
      user: id,
      role: id === req.user._id.toString() ? "owner" : "member",
    }));

    const channel = await ChatChannel.create({
      name: name.trim(),
      description,
      type: "channel",
      isPrivate: !!isPrivate,
      createdBy: req.user._id,
      members,
      lastMessageAt: new Date(),
    });

    joinSocketsToChannel(req.io, channel._id, uniqueMemberIds);
    uniqueMemberIds.forEach((id) => {
      req.io?.to(id).emit("chat:channel-created", { channelId: channel._id });
    });

    return res.status(201).json({ success: true, message: "Channel created", data: channel });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Failed to create channel", error: error.message });
  }
};

// Any logged in (non-child) user - list of channels/DMs they belong to
export const getMyChannels = async (req, res) => {
  try {
    const channels = await ChatChannel.find({ "members.user": req.user._id, archived: false })
      .populate("members.user", USER_SELECT)
      .sort({ lastMessageAt: -1 });

    const formatted = await Promise.all(
      channels.map((c) => formatChannelForUser(c, req.user._id))
    );

    return res.status(200).json({ success: true, data: formatted });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Failed to fetch channels", error: error.message });
  }
};

// Admin only - manage all group channels (DMs excluded)
export const getAllChannelsAdmin = async (req, res) => {
  try {
    const channels = await ChatChannel.find({ type: "channel" })
      .populate("members.user", USER_SELECT)
      .populate("createdBy", USER_SELECT)
      .sort({ createdAt: -1 });

    return res.status(200).json({ success: true, data: channels });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Failed to fetch channels", error: error.message });
  }
};

export const getChannelById = async (req, res) => {
  try {
    const channel = await ChatChannel.findById(req.params.channelId).populate(
      "members.user",
      USER_SELECT
    );

    if (!channel) {
      return res.status(404).json({ success: false, message: "Channel not found" });
    }

    if (!isMemberOf(channel, req.user._id) && req.user.role !== "admin") {
      return res.status(403).json({ success: false, message: "You are not a member of this channel" });
    }

    return res.status(200).json({ success: true, data: channel });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Failed to fetch channel", error: error.message });
  }
};

// Admin only
export const updateChannel = async (req, res) => {
  try {
    const { name, description, isPrivate } = req.body;
    const channel = await ChatChannel.findById(req.params.channelId);

    if (!channel) {
      return res.status(404).json({ success: false, message: "Channel not found" });
    }
    if (channel.type === "direct") {
      return res.status(400).json({ success: false, message: "Direct messages cannot be edited" });
    }

    if (name !== undefined) channel.name = name.trim();
    if (description !== undefined) channel.description = description;
    if (isPrivate !== undefined) channel.isPrivate = !!isPrivate;

    await channel.save();

    channel.members.forEach((m) => {
      req.io?.to(m.user.toString()).emit("chat:channel-updated", { channelId: channel._id });
    });

    return res.status(200).json({ success: true, message: "Channel updated", data: channel });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Failed to update channel", error: error.message });
  }
};

// Admin only
export const deleteChannel = async (req, res) => {
  try {
    const channel = await ChatChannel.findById(req.params.channelId);
    if (!channel) {
      return res.status(404).json({ success: false, message: "Channel not found" });
    }
    if (channel.type === "direct") {
      return res.status(400).json({ success: false, message: "Direct messages cannot be deleted this way" });
    }

    await ChatMessage.deleteMany({ channel: channel._id });

    const memberIds = channel.members.map((m) => m.user.toString());
    await channel.deleteOne();

    memberIds.forEach((id) => {
      req.io?.to(id).emit("chat:channel-deleted", { channelId: req.params.channelId });
      leaveSocketsFromChannel(req.io, req.params.channelId, id);
    });

    return res.status(200).json({ success: true, message: "Channel deleted" });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Failed to delete channel", error: error.message });
  }
};

// Admin only
export const addMembers = async (req, res) => {
  try {
    const { memberIds = [] } = req.body;
    const channel = await ChatChannel.findById(req.params.channelId);

    if (!channel) {
      return res.status(404).json({ success: false, message: "Channel not found" });
    }
    if (channel.type === "direct") {
      return res.status(400).json({ success: false, message: "Cannot add members to a direct message" });
    }

    const existingIds = new Set(channel.members.map((m) => m.user.toString()));
    const toAdd = memberIds
      .map((id) => id.toString())
      .filter((id) => !existingIds.has(id));

    if (toAdd.length === 0) {
      return res.status(200).json({ success: true, message: "No new members to add", data: channel });
    }

    toAdd.forEach((id) => channel.members.push({ user: id, role: "member" }));
    await channel.save();

    joinSocketsToChannel(req.io, channel._id, toAdd);
    toAdd.forEach((id) => {
      req.io?.to(id).emit("chat:channel-created", { channelId: channel._id });
    });

    return res.status(200).json({ success: true, message: "Members added", data: channel });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Failed to add members", error: error.message });
  }
};

// Admin only
export const removeMember = async (req, res) => {
  try {
    const { channelId, memberId } = req.params;
    const channel = await ChatChannel.findById(channelId);

    if (!channel) {
      return res.status(404).json({ success: false, message: "Channel not found" });
    }
    if (channel.type === "direct") {
      return res.status(400).json({ success: false, message: "Cannot remove members from a direct message" });
    }

    channel.members = channel.members.filter((m) => m.user.toString() !== memberId);
    await channel.save();

    req.io?.to(memberId).emit("chat:channel-deleted", { channelId });
    leaveSocketsFromChannel(req.io, channelId, memberId);

    return res.status(200).json({ success: true, message: "Member removed", data: channel });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Failed to remove member", error: error.message });
  }
};

// Self-service - a member leaves a group channel
export const leaveChannel = async (req, res) => {
  try {
    const channel = await ChatChannel.findById(req.params.channelId);
    if (!channel) {
      return res.status(404).json({ success: false, message: "Channel not found" });
    }
    if (channel.type === "direct") {
      return res.status(400).json({ success: false, message: "You cannot leave a direct message" });
    }
    if (!isMemberOf(channel, req.user._id)) {
      return res.status(400).json({ success: false, message: "You are not a member of this channel" });
    }

    channel.members = channel.members.filter(
      (m) => m.user.toString() !== req.user._id.toString()
    );
    await channel.save();

    leaveSocketsFromChannel(req.io, channel._id, req.user._id);

    return res.status(200).json({ success: true, message: "Left channel" });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Failed to leave channel", error: error.message });
  }
};

/* ---------------------------------------------------------------- */
/* direct messages                                                    */
/* ---------------------------------------------------------------- */

export const getOrCreateDirectMessage = async (req, res) => {
  try {
    const { userId } = req.body;
    if (!userId) {
      return res.status(400).json({ success: false, message: "userId is required" });
    }
    if (userId.toString() === req.user._id.toString()) {
      return res.status(400).json({ success: false, message: "You cannot message yourself" });
    }

    const otherUser = await User.findById(userId).select(USER_SELECT);
    if (!otherUser) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    let channel = await ChatChannel.findOne({
      type: "direct",
      "members.user": { $all: [req.user._id, userId] },
      $expr: { $eq: [{ $size: "$members" }, 2] },
    }).populate("members.user", USER_SELECT);

    let isNew = false;

    if (!channel) {
      channel = await ChatChannel.create({
        type: "direct",
        members: [{ user: req.user._id }, { user: userId }],
        lastMessageAt: new Date(),
      });
      channel = await channel.populate("members.user", USER_SELECT);
      isNew = true;

      const ids = [req.user._id.toString(), userId.toString()];
      joinSocketsToChannel(req.io, channel._id, ids);
      req.io?.to(userId.toString()).emit("chat:channel-created", { channelId: channel._id });
    }

    const formatted = await formatChannelForUser(channel, req.user._id);

    return res.status(isNew ? 201 : 200).json({ success: true, data: formatted });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Failed to open direct message", error: error.message });
  }
};

/* ---------------------------------------------------------------- */
/* messages                                                           */
/* ---------------------------------------------------------------- */

export const getMessages = async (req, res) => {
  try {
    const { channelId } = req.params;
    const { before, limit = 30 } = req.query;

    const channel = await ChatChannel.findById(channelId);
    if (!channel) {
      return res.status(404).json({ success: false, message: "Channel not found" });
    }
    if (!isMemberOf(channel, req.user._id) && req.user.role !== "admin") {
      return res.status(403).json({ success: false, message: "You are not a member of this channel" });
    }

    const filter = { channel: channelId, deletedAt: null };
    if (before) {
      filter.createdAt = { $lt: new Date(before) };
    }

    const messages = await ChatMessage.find(filter)
      .sort({ createdAt: -1 })
      .limit(Math.min(parseInt(limit, 10) || 30, 100))
      .populate("sender", USER_SELECT);

    return res.status(200).json({ success: true, data: messages.reverse() });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Failed to fetch messages", error: error.message });
  }
};

export const sendMessage = async (req, res) => {
  try {
    const { channelId } = req.params;
    const { text = "" } = req.body;

    const channel = await ChatChannel.findById(channelId);
    if (!channel) {
      return res.status(404).json({ success: false, message: "Channel not found" });
    }
    if (!isMemberOf(channel, req.user._id)) {
      return res.status(403).json({ success: false, message: "You are not a member of this channel" });
    }

    if (!text.trim() && !req.file) {
      return res.status(400).json({ success: false, message: "Message cannot be empty" });
    }

    let attachments = [];
    if (req.file) {
      const uploaded = await uploadOnCloudinary(req.file.buffer, `chat/${channelId}`);
      if (uploaded) {
        attachments = [
          {
            url: uploaded.secure_url,
            publicId: uploaded.public_id,
            type: req.file.mimetype?.startsWith("image") ? "image" : "raw",
            name: req.file.originalname,
          },
        ];
      }
    }

    let message = await ChatMessage.create({
      channel: channelId,
      sender: req.user._id,
      text: text.trim(),
      attachments,
      readBy: [req.user._id],
    });

    message = await message.populate("sender", USER_SELECT);

    channel.lastMessage = {
      text: text.trim() || (attachments.length ? "📎 Attachment" : ""),
      sender: req.user._id,
      createdAt: message.createdAt,
    };
    channel.lastMessageAt = message.createdAt;

    const memberSub = getMemberSub(channel, req.user._id);
    if (memberSub) memberSub.lastReadAt = message.createdAt;

    await channel.save();

    req.io?.to(`channel:${channelId}`).emit("chat:message", message);

    channel.members.forEach((m) => {
      req.io?.to(m.user.toString()).emit("chat:channel-update", {
        channelId,
        lastMessage: channel.lastMessage,
        lastMessageAt: channel.lastMessageAt,
      });
    });

    return res.status(201).json({ success: true, data: message });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Failed to send message", error: error.message });
  }
};

export const deleteMessage = async (req, res) => {
  try {
    const { messageId } = req.params;
    const message = await ChatMessage.findById(messageId);

    if (!message) {
      return res.status(404).json({ success: false, message: "Message not found" });
    }

    const isOwner = message.sender.toString() === req.user._id.toString();
    if (!isOwner && req.user.role !== "admin") {
      return res.status(403).json({ success: false, message: "You can only delete your own messages" });
    }

    message.deletedAt = new Date();
    message.text = "";
    message.attachments = [];
    await message.save();

    req.io?.to(`channel:${message.channel.toString()}`).emit("chat:message-deleted", {
      channelId: message.channel,
      messageId: message._id,
    });

    return res.status(200).json({ success: true, message: "Message deleted" });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Failed to delete message", error: error.message });
  }
};

export const markChannelRead = async (req, res) => {
  try {
    const { channelId } = req.params;
    const channel = await ChatChannel.findById(channelId);

    if (!channel) {
      return res.status(404).json({ success: false, message: "Channel not found" });
    }

    const memberSub = getMemberSub(channel, req.user._id);
    if (!memberSub) {
      return res.status(403).json({ success: false, message: "You are not a member of this channel" });
    }

    memberSub.lastReadAt = new Date();
    await channel.save();

    return res.status(200).json({ success: true, message: "Marked as read" });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Failed to mark channel as read", error: error.message });
  }
};