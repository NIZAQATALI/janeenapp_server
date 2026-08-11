
import express from "express";
import { verifyJWT, verifyAdmin } from "../utils/verifyToken.js";
import {
  createCategory, getAllCategories, getCategoryById, updateCategory, deleteCategory,
  createStage, getAllStages, getStageById, updateStage, deleteStage, publishStage,
  saveBlocks, addBlock, updateBlock, deleteBlock,
  getCategoryTOC, getUserStageContent,
} from "../Controllers/contentCategoryContoller.js";

const router = express.Router();

// ─── CATEGORY ROUTES ──────────────────────────────────────────────────────────
router.post("/categories", verifyJWT, verifyAdmin, createCategory);
router.get("/categories", verifyJWT, getAllCategories);
router.get("/categories/:categoryId", verifyJWT, getCategoryById);
router.put("/categories/:categoryId", verifyJWT, verifyAdmin, updateCategory);
router.delete("/categories/:categoryId", verifyJWT, verifyAdmin, deleteCategory);

// ─── STAGE ROUTES ─────────────────────────────────────────────────────────────
router.post("/categories/:categoryId/stages", verifyJWT, verifyAdmin, createStage);
router.get("/categories/:categoryId/stages", verifyJWT, verifyAdmin, getAllStages);
router.get("/categories/:categoryId/stages/:stageId", verifyJWT, verifyAdmin, getStageById);
router.put("/categories/:categoryId/stages/:stageId", verifyJWT, verifyAdmin, updateStage);
router.delete("/categories/:categoryId/stages/:stageId", verifyJWT, verifyAdmin, deleteStage);
router.patch("/categories/:categoryId/stages/:stageId/publish", verifyJWT, verifyAdmin, publishStage);

// ─── BLOCK ROUTES ─────────────────────────────────────────────────────────────
const blockBase = "/categories/:categoryId/stages/:stageId/blocks";
router.put(blockBase, verifyJWT, verifyAdmin, saveBlocks);               // full save from editor
router.post(blockBase, verifyJWT, verifyAdmin, addBlock);
router.put(`${blockBase}/:blockId`, verifyJWT, verifyAdmin, updateBlock);
router.delete(`${blockBase}/:blockId`, verifyJWT, verifyAdmin, deleteBlock);

// ─── USER-FACING ROUTES ───────────────────────────────────────────────────────
router.get("/read/:categorySlug", verifyJWT, getCategoryTOC);                        // table of contents
router.get("/read/:categorySlug/stage", verifyJWT, getUserStageContent);             // ?month=3 or ?week=12

export default router;