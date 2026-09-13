import GameScore from "../models/GameScore.js";
import Child from "../models/Child.js";

export const saveScore = async (req, res) => {
  try {
    const childId = req.user.id;
    const { score, moves, timeTaken, totalPairs } = req.body;

    const child = await Child.findById(childId);
    if (!child) return res.status(404).json({ success: false, message: "Child not found" });

    const gameScore = await GameScore.create({
      childId,
      gameType: "memory-cards",
      score,
      moves,
      timeTaken,
      totalPairs,
      category: child.category,
    });

    res.status(201).json({ success: true, data: gameScore });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const getMyScores = async (req, res) => {
  try {
    const childId = req.user.id;
    const scores = await GameScore.find({ childId }).sort({ createdAt: -1 }).limit(20);
    res.json({ success: true, data: scores });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// Admin — all children scores
export const getAllScores = async (req, res) => {
  try {
    const scores = await GameScore.find()
      .populate("childId", "name email category")
      .sort({ createdAt: -1 });

    // Group by child for summary
    const summary = {};
    scores.forEach((s) => {
      const id = s.childId?._id?.toString();
      if (!id) return;
      if (!summary[id]) {
        summary[id] = {
          child: s.childId,
          totalGames: 0,
          bestScore: 0,
          avgMoves: 0,
          avgTime: 0,
          totalMoves: 0,
          totalTime: 0,
        };
      }
      summary[id].totalGames++;
      summary[id].bestScore = Math.max(summary[id].bestScore, s.score);
      summary[id].totalMoves += s.moves;
      summary[id].totalTime += s.timeTaken;
    });

    Object.values(summary).forEach((s) => {
      s.avgMoves = Math.round(s.totalMoves / s.totalGames);
      s.avgTime = Math.round(s.totalTime / s.totalGames);
      delete s.totalMoves;
      delete s.totalTime;
    });

    res.json({ success: true, data: Object.values(summary), raw: scores });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
