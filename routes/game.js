import express from "express";
import { saveScore, getMyScores, getAllScores } from "../Controllers/gameController.js";
import { verifyJWT, verifyAdmin } from "../utils/verifyToken.js";

const router = express.Router();

router.post("/save-score", verifyJWT, saveScore);
router.get("/my-scores", verifyJWT, getMyScores);
router.get("/admin/all-scores", verifyJWT, verifyAdmin, getAllScores);

export default router;
