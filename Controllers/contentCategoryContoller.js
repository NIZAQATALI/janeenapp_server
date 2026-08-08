// import ContentCategory from "../models/stagecontent.js";


// // CREATE CATEGORY
// export const createCategory = async (req, res) => {
//   try {
//     const category = await ContentCategory.create(req.body);

//     res.status(201).json({
//       success: true,
//       data: category,
//     });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };


// // GET ALL CATEGORIES
// export const getAllCategories = async (req, res) => {
//   try {
//     const data = await ContentCategory.find();

//     res.json({
//       success: true,
//       count: data.length,
//       data,
//     });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };


// // GET CATEGORY BY ID
// export const getCategoryById = async (req, res) => {
//   try {
//     const data = await ContentCategory.findById(req.params.id);

//     if (!data) {
//       return res.status(404).json({
//         success: false,
//         message: "Category not found",
//       });
//     }

//     res.json({
//       success: true,
//       data,
//     });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };


// // UPDATE CATEGORY
// export const updateCategory = async (req, res) => {
//   try {
//     const data = await ContentCategory.findByIdAndUpdate(
//       req.params.id,
//       req.body,
//       { new: true }
//     );

//     res.json({
//       success: true,
//       data,
//     });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };


// // DELETE CATEGORY
// export const deleteCategory = async (req, res) => {
//   try {
//     await ContentCategory.findByIdAndDelete(req.params.id);

//     res.json({
//       success: true,
//       message: "Category deleted",
//     });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };



// /* ------------------- STAGE CRUD ------------------- */


// // ADD STAGE
// export const addStage = async (req, res) => {
//   try {
//     const { categoryId } = req.params;

//     const category = await ContentCategory.findById(categoryId);

//     if (!category) {
//       return res.status(404).json({
//         success: false,
//         message: "Category not found",
//       });
//     }

//     category.stages.push(req.body);

//     await category.save();

//     res.json({
//       success: true,
//       data: category,
//     });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };


// // UPDATE STAGE
// export const updateStage = async (req, res) => {
//   try {
//     const { categoryId, stageId } = req.params;

//     const category = await ContentCategory.findById(categoryId);

//     const stage = category.stages.id(stageId);

//     if (!stage) {
//       return res.status(404).json({
//         success: false,
//         message: "Stage not found",
//       });
//     }

//     Object.assign(stage, req.body);

//     await category.save();

//     res.json({
//       success: true,
//       data: category,
//     });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };


// // DELETE STAGE
// export const deleteStage = async (req, res) => {
//   try {
//     const { categoryId, stageId } = req.params;

//     const category = await ContentCategory.findById(categoryId);

//     category.stages.id(stageId).remove();

//     await category.save();

//     res.json({
//       success: true,
//       message: "Stage deleted",
//     });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };



// /* ------------------- USER CONTENT FETCH ------------------- */


// export const getUserStageContent = async (req, res) => {
//   try {

//     const { category } = req.params;
//     const { month } = req.query;
// console
//     const data = await ContentCategory.findOne({
//       category,
//       isActive: true
//     });

//     if (!data) {
//       return res.status(404).json({
//         success: false,
//         message: "Content not found",
//       });
//     }

//     const stage = data.stages.find(
//       (s) =>
//         month >= s.startMonth &&
//         month <= s.endMonth
//     );

//     res.json({
//       success: true,
//       data: stage,
//     });

//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

// import Company from "../models/content.model.js";

// // ═══════════════════════════════════════════════════════════
// // COMPANY (TENANT) CONTROLLERS
// // ═══════════════════════════════════════════════════════════

// export const createCompany = async (req, res) => {
//   try {
//     const company = await Company.create(req.body);
//     res.status(201).json({ success: true, data: company });
//   } catch (err) {
//     res.status(500).json({ success: false, message: err.message });
//   }
// };

// export const getAllCompanies = async (req, res) => {
//   try {
//     const companies = await Company.find().select("-categories");
//     res.json({ success: true, count: companies.length, data: companies });
//   } catch (err) {
//     res.status(500).json({ success: false, message: err.message });
//   }
// };

// export const getCompanyById = async (req, res) => {
//   try {
//     const company = await Company.findById(req.params.companyId);
//     if (!company) return res.status(404).json({ success: false, message: "Company not found" });
//     res.json({ success: true, data: company });
//   } catch (err) {
//     res.status(500).json({ success: false, message: err.message });
//   }
// };

// export const updateCompany = async (req, res) => {
//   try {
//     const company = await Company.findByIdAndUpdate(req.params.companyId, req.body, { new: true });
//     res.json({ success: true, data: company });
//   } catch (err) {
//     res.status(500).json({ success: false, message: err.message });
//   }
// };

// export const deleteCompany = async (req, res) => {
//   try {
//     await Company.findByIdAndDelete(req.params.companyId);
//     res.json({ success: true, message: "Company deleted" });
//   } catch (err) {
//     res.status(500).json({ success: false, message: err.message });
//   }
// };


// // ═══════════════════════════════════════════════════════════
// // CATEGORY CONTROLLERS
// // ═══════════════════════════════════════════════════════════

// export const createCategory = async (req, res) => {
//   try {
//     const company = await Company.findById(req.params.companyId);
//     if (!company) return res.status(404).json({ success: false, message: "Company not found" });

//     company.categories.push(req.body);
//     await company.save();

//     const cat = company.categories[company.categories.length - 1];
//     res.status(201).json({ success: true, data: cat });
//   } catch (err) {
//     res.status(500).json({ success: false, message: err.message });
//   }
// };

// export const getAllCategories = async (req, res) => {
//   try {
//     const company = await Company.findById(req.params.companyId).select("categories");
//     if (!company) return res.status(404).json({ success: false, message: "Company not found" });

//     const cats = company.categories
//       .map((c) => ({ ...c.toObject(), stageCount: c.stages.length }))
//       .sort((a, b) => a.order - b.order);

//     res.json({ success: true, count: cats.length, data: cats });
//   } catch (err) {
//     res.status(500).json({ success: false, message: err.message });
//   }
// };

// export const getCategoryById = async (req, res) => {
//   try {
//     const company = await Company.findById(req.params.companyId);
//     if (!company) return res.status(404).json({ success: false, message: "Company not found" });

//     const cat = company.categories.id(req.params.categoryId);
//     if (!cat) return res.status(404).json({ success: false, message: "Category not found" });

//     res.json({ success: true, data: cat });
//   } catch (err) {
//     res.status(500).json({ success: false, message: err.message });
//   }
// };

// export const updateCategory = async (req, res) => {
//   try {
//     const company = await Company.findById(req.params.companyId);
//     const cat = company.categories.id(req.params.categoryId);
//     if (!cat) return res.status(404).json({ success: false, message: "Category not found" });

//     const { stages, ...rest } = req.body; // don't overwrite stages via this endpoint
//     Object.assign(cat, rest);
//     await company.save();

//     res.json({ success: true, data: cat });
//   } catch (err) {
//     res.status(500).json({ success: false, message: err.message });
//   }
// };

// export const deleteCategory = async (req, res) => {
//   try {
//     const company = await Company.findById(req.params.companyId);
//     company.categories.id(req.params.categoryId).deleteOne();
//     await company.save();
//     res.json({ success: true, message: "Category deleted" });
//   } catch (err) {
//     res.status(500).json({ success: false, message: err.message });
//   }
// };


// // ═══════════════════════════════════════════════════════════
// // STAGE CONTROLLERS
// // ═══════════════════════════════════════════════════════════

// export const createStage = async (req, res) => {
//   try {
//     const company = await Company.findById(req.params.companyId);
//     const cat = company.categories.id(req.params.categoryId);
//     if (!cat) return res.status(404).json({ success: false, message: "Category not found" });

//     cat.stages.push(req.body);
//     await company.save();

//     const stage = cat.stages[cat.stages.length - 1];
//     res.status(201).json({ success: true, data: stage });
//   } catch (err) {
//     res.status(500).json({ success: false, message: err.message });
//   }
// };

// export const getAllStages = async (req, res) => {
//   try {
//     const company = await Company.findById(req.params.companyId);
//     const cat = company.categories.id(req.params.categoryId);
//     if (!cat) return res.status(404).json({ success: false, message: "Category not found" });

//     const stages = cat.stages.sort((a, b) => a.order - b.order);
//     res.json({ success: true, count: stages.length, data: stages });
//   } catch (err) {
//     res.status(500).json({ success: false, message: err.message });
//   }
// };

// export const getStageById = async (req, res) => {
//   try {
//     const company = await Company.findById(req.params.companyId);
//     const cat = company.categories.id(req.params.categoryId);
//     const stage = cat?.stages.id(req.params.stageId);
//     if (!stage) return res.status(404).json({ success: false, message: "Stage not found" });

//     res.json({ success: true, data: stage });
//   } catch (err) {
//     res.status(500).json({ success: false, message: err.message });
//   }
// };

// export const updateStage = async (req, res) => {
//   try {
//     const company = await Company.findById(req.params.companyId);
//     const cat = company.categories.id(req.params.categoryId);
//     const stage = cat?.stages.id(req.params.stageId);
//     if (!stage) return res.status(404).json({ success: false, message: "Stage not found" });

//     const { blocks, ...rest } = req.body; // blocks updated separately
//     Object.assign(stage, rest);
//     await company.save();

//     res.json({ success: true, data: stage });
//   } catch (err) {
//     res.status(500).json({ success: false, message: err.message });
//   }
// };

// export const deleteStage = async (req, res) => {
//   try {
//     const company = await Company.findById(req.params.companyId);
//     const cat = company.categories.id(req.params.categoryId);
//     cat?.stages.id(req.params.stageId)?.deleteOne();
//     await company.save();
//     res.json({ success: true, message: "Stage deleted" });
//   } catch (err) {
//     res.status(500).json({ success: false, message: err.message });
//   }
// };

// export const publishStage = async (req, res) => {
//   try {
//     const company = await Company.findById(req.params.companyId);
//     const cat = company.categories.id(req.params.categoryId);
//     const stage = cat?.stages.id(req.params.stageId);
//     if (!stage) return res.status(404).json({ success: false, message: "Stage not found" });

//     stage.isPublished = !stage.isPublished;
//     stage.publishedAt = stage.isPublished ? new Date() : null;
//     await company.save();

//     res.json({ success: true, data: stage });
//   } catch (err) {
//     res.status(500).json({ success: false, message: err.message });
//   }
// };


// // ═══════════════════════════════════════════════════════════
// // CONTENT BLOCK CONTROLLERS
// // ═══════════════════════════════════════════════════════════

// // Replace ALL blocks for a stage (full save from editor)
// export const saveBlocks = async (req, res) => {
//   try {
//     const company = await Company.findById(req.params.companyId);
//     const cat = company.categories.id(req.params.categoryId);
//     const stage = cat?.stages.id(req.params.stageId);
//     if (!stage) return res.status(404).json({ success: false, message: "Stage not found" });

//     stage.blocks = req.body.blocks || [];
//     await company.save();

//     res.json({ success: true, data: stage });
//   } catch (err) {
//     res.status(500).json({ success: false, message: err.message });
//   }
// };

// // Add a single block
// export const addBlock = async (req, res) => {
//   try {
//     const company = await Company.findById(req.params.companyId);
//     const cat = company.categories.id(req.params.categoryId);
//     const stage = cat?.stages.id(req.params.stageId);
//     if (!stage) return res.status(404).json({ success: false, message: "Stage not found" });

//     stage.blocks.push(req.body);
//     await company.save();

//     const block = stage.blocks[stage.blocks.length - 1];
//     res.status(201).json({ success: true, data: block });
//   } catch (err) {
//     res.status(500).json({ success: false, message: err.message });
//   }
// };

// // Update a single block
// export const updateBlock = async (req, res) => {
//   try {
//     const company = await Company.findById(req.params.companyId);
//     const cat = company.categories.id(req.params.categoryId);
//     const stage = cat?.stages.id(req.params.stageId);
//     const block = stage?.blocks.id(req.params.blockId);
//     if (!block) return res.status(404).json({ success: false, message: "Block not found" });

//     Object.assign(block, req.body);
//     await company.save();

//     res.json({ success: true, data: block });
//   } catch (err) {
//     res.status(500).json({ success: false, message: err.message });
//   }
// };

// // Delete a single block
// export const deleteBlock = async (req, res) => {
//   try {
//     const company = await Company.findById(req.params.companyId);
//     const cat = company.categories.id(req.params.categoryId);
//     const stage = cat?.stages.id(req.params.stageId);
//     stage?.blocks.id(req.params.blockId)?.deleteOne();
//     await company.save();
//     res.json({ success: true, message: "Block deleted" });
//   } catch (err) {
//     res.status(500).json({ success: false, message: err.message });
//   }
// };


// // ═══════════════════════════════════════════════════════════
// // USER-FACING CONTROLLERS
// // ═══════════════════════════════════════════════════════════

// // Get published stage by month/week for a user
// export const getUserStageContent = async (req, res) => {
//   try {
//     const { companySlug, categorySlug } = req.params;
//     const { month, week } = req.query;

//     const company = await Company.findOne({ slug: companySlug, isActive: true });
//     if (!company) return res.status(404).json({ success: false, message: "Company not found" });

//     const cat = company.categories.find((c) => c.slug === categorySlug && c.isActive);
//     if (!cat) return res.status(404).json({ success: false, message: "Category not found" });

//     let stage = null;
//     if (month) {
//       stage = cat.stages.find(
//         (s) => s.isPublished && Number(month) >= s.startMonth && Number(month) <= s.endMonth
//       );
//     } else if (week) {
//       stage = cat.stages.find(
//         (s) => s.isPublished && Number(week) >= s.startWeek && Number(week) <= s.endWeek
//       );
//     }

//     if (!stage) return res.status(404).json({ success: false, message: "No content found for this period" });

//     // Sort blocks by order
//     stage.blocks.sort((a, b) => a.order - b.order);

//     res.json({ success: true, data: stage });
//   } catch (err) {
//     res.status(500).json({ success: false, message: err.message });
//   }
// };

// // Get all published stages for a category (table of contents)
// export const getCategoryTOC = async (req, res) => {
//   try {
//     const { companySlug, categorySlug } = req.params;

//     const company = await Company.findOne({ slug: companySlug, isActive: true });
//     const cat = company?.categories.find((c) => c.slug === categorySlug && c.isActive);
//     if (!cat) return res.status(404).json({ success: false, message: "Category not found" });

//     const toc = cat.stages
//       .filter((s) => s.isPublished)
//       .sort((a, b) => a.order - b.order)
//       .map(({ _id, title, slug, description, startMonth, endMonth, startWeek, endWeek, babySize, order }) => ({
//         _id, title, slug, description, startMonth, endMonth, startWeek, endWeek, babySize, order
//       }));

//     res.json({ success: true, category: { label: cat.label, icon: cat.icon }, data: toc });
//   } catch (err) {
//     res.status(500).json({ success: false, message: err.message });
//   }
// };

import Category from "../models/stagecontent.js";
import mongoose from "mongoose";

// ═══════════════════════════════════════════════════════════
// CATEGORY CONTROLLERS
// ═══════════════════════════════════════════════════════════

export const createCategory = async (req, res) => {
  try {
    const exists = await Category.findOne({ slug: req.body.slug });
    if (exists) return res.status(400).json({ success: false, message: "Category with this slug already exists" });
    const category = await Category.create(req.body);
    res.status(201).json({ success: true, data: category });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const getAllCategories = async (req, res) => {
  try {
    const categories = await Category.find().sort({ order: 1 }).select("-stages.blocks");
    res.json({ success: true, count: categories.length, data: categories });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const getCategoryById = async (req, res) => {
  try {
    const category = await Category.findById(req.params.categoryId);
    if (!category) return res.status(404).json({ success: false, message: "Category not found" });
    res.json({ success: true, data: category });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const updateCategory = async (req, res) => {
  try {
    const category = await Category.findById(req.params.categoryId);
    if (!category) return res.status(404).json({ success: false, message: "Category not found" });

    const { stages, ...rest } = req.body; // never overwrite stages from this endpoint
    Object.assign(category, rest);
    await category.save();

    res.json({ success: true, data: category });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const deleteCategory = async (req, res) => {
  try {
    await Category.findByIdAndDelete(req.params.categoryId);
    res.json({ success: true, message: "Category deleted" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};


// ═══════════════════════════════════════════════════════════
// STAGE CONTROLLERS
// ═══════════════════════════════════════════════════════════

export const createStage = async (req, res) => {
  try {
    const category = await Category.findById(req.params.categoryId);
    if (!category) return res.status(404).json({ success: false, message: "Category not found" });

    category.stages.push(req.body);
    await category.save();

    const stage = category.stages[category.stages.length - 1];
    res.status(201).json({ success: true, data: stage });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const getAllStages = async (req, res) => {
  try {
    const category = await Category.findById(req.params.categoryId);
    if (!category) return res.status(404).json({ success: false, message: "Category not found" });
    const stages = [...category.stages]
      .sort((a, b) => a.order - b.order)
      .map(({ _id, title, description, startMonth, endMonth, startWeek, endWeek,
               trimester, babySize, babyWeight, isPublished, publishedAt, order, createdAt }) => ({
        _id, title, description, startMonth, endMonth, startWeek, endWeek,
        trimester, babySize, babyWeight, isPublished, publishedAt, order, createdAt,
        blockCount: 0, // blocks excluded from list view for performance
      }));

    res.json({ success: true, count: stages.length, data: stages });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const getStageById = async (req, res) => {
  try {
    const category = await Category.findById(req.params.categoryId);
    const stage = category?.stages.id(req.params.stageId);
    if (!stage) return res.status(404).json({ success: false, message: "Stage not found" });

    res.json({ success: true, data: stage });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const updateStage = async (req, res) => {
  try {
    const category = await Category.findById(req.params.categoryId);
    const stage = category?.stages.id(req.params.stageId);
    if (!stage) return res.status(404).json({ success: false, message: "Stage not found" });

    const { blocks, ...rest } = req.body; // blocks updated via saveBlocks endpoint
    Object.assign(stage, rest);
    await category.save();

    res.json({ success: true, data: stage });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const deleteStage = async (req, res) => {
  try {
    const category = await Category.findById(req.params.categoryId);
    category?.stages.id(req.params.stageId)?.deleteOne();
    await category.save();
    res.json({ success: true, message: "Stage deleted" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const publishStage = async (req, res) => {
  try {
    const category = await Category.findById(req.params.categoryId);
    const stage = category?.stages.id(req.params.stageId);
    if (!stage) return res.status(404).json({ success: false, message: "Stage not found" });

    stage.isPublished = !stage.isPublished;
    stage.publishedAt = stage.isPublished ? new Date() : null;
    await category.save();

    res.json({ success: true, data: stage });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};


// ═══════════════════════════════════════════════════════════
// CONTENT BLOCK CONTROLLERS
// ═══════════════════════════════════════════════════════════

// Full replace — called on editor save

export const saveBlocks = async (req, res) => {
  try {
    const category = await Category.findById(req.params.categoryId);
    const stage = category?.stages.id(req.params.stageId);

    if (!stage) {
      return res.status(404).json({ success: false, message: "Stage not found" });
    }

    stage.blocks = (req.body.blocks || []).map((b, i) => {
      let cleanBlock = { ...b };

      // ✅ Remove invalid _id (like tmp_123)
      if (!mongoose.Types.ObjectId.isValid(b._id)) {
        delete cleanBlock._id;
      }

      // ✅ Ensure correct order
      cleanBlock.order = i;

      return cleanBlock;
    });

    await category.save();

    res.json({ success: true, data: stage });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const addBlock = async (req, res) => {
  try {
    const category = await Category.findById(req.params.categoryId);
    const stage = category?.stages.id(req.params.stageId);
    if (!stage) return res.status(404).json({ success: false, message: "Stage not found" });

    stage.blocks.push({ ...req.body, order: stage.blocks.length });
    await category.save();

    const block = stage.blocks[stage.blocks.length - 1];
    res.status(201).json({ success: true, data: block });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const updateBlock = async (req, res) => {
  try {
    const category = await Category.findById(req.params.categoryId);
    const stage = category?.stages.id(req.params.stageId);
    const block = stage?.blocks.id(req.params.blockId);
    if (!block) return res.status(404).json({ success: false, message: "Block not found" });

    Object.assign(block, req.body);
    await category.save();

    res.json({ success: true, data: block });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const deleteBlock = async (req, res) => {
  try {
    const category = await Category.findById(req.params.categoryId);
    const stage = category?.stages.id(req.params.stageId);
    stage?.blocks.id(req.params.blockId)?.deleteOne();
    await category.save();
    res.json({ success: true, message: "Block deleted" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};


// ═══════════════════════════════════════════════════════════
// USER-FACING CONTROLLERS
// ═══════════════════════════════════════════════════════════

// Table of contents — all published stages for a category
export const getCategoryTOC = async (req, res) => {
  try {
    const category = await Category.findOne({ slug: req.params.categorySlug, isActive: true });
    if (!category) return res.status(404).json({ success: false, message: "Category not found" });

    const toc = category.stages
      .filter((s) => s.isPublished)
      .sort((a, b) => a.order - b.order)
      .map(({ _id, title, description, startMonth, endMonth, startWeek, endWeek, babySize, order }) => ({
        _id, title, description, startMonth, endMonth, startWeek, endWeek, babySize, order,
      }));

    res.json({
      success: true,
      category: { label: category.label, icon: category.icon, description: category.description },
      data: toc,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// Get single published stage by month or week
export const getUserStageContent = async (req, res) => {
  try {
    const { categorySlug } = req.params;
    const { month, week } = req.query;

    const category = await Category.findOne({ slug: categorySlug, isActive: true });
    if (!category) return res.status(404).json({ success: false, message: "Category not found" });

    let stage = null;
    if (month) {
      stage = category.stages.find(
        (s) => s.isPublished && Number(month) >= s.startMonth && Number(month) <= s.endMonth
      );
    } else if (week) {
      stage = category.stages.find(
        (s) => s.isPublished && Number(week) >= s.startWeek && Number(week) <= s.endWeek
      );
    }

    if (!stage) return res.status(404).json({ success: false, message: "No content found for this period" });

    stage.blocks.sort((a, b) => a.order - b.order);
    res.json({ success: true, data: stage });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};