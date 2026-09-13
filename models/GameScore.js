import mongoose from "mongoose";

const gameScoreSchema = new mongoose.Schema({
  childId: { type: mongoose.Schema.Types.ObjectId, ref: "Child", required: true, index: true },
  gameType: { type: String, enum: ["memory-cards"], default: "memory-cards" },
  score: { type: Number, required: true },       // stars: 1-3
  moves: { type: Number, required: true },
  timeTaken: { type: Number, required: true },   // seconds
  totalPairs: { type: Number, required: true },
  category: { type: String },                    // child's age category
}, { timestamps: true });

export default mongoose.model("GameScore", gameScoreSchema);
