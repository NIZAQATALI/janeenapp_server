// import mongoose from "mongoose";

// const pointSchema = new mongoose.Schema({
//   text: {
//     type: String,
//     required: true
//   }
// });

// const sectionSchema = new mongoose.Schema({
//   heading: {
//     type: String,
//     required: true
//   },

//   description: {
//     type: String
//   },

//   points: [pointSchema]
// });

// const stageSchema = new mongoose.Schema({
//   title: {
//     type: String,
//     required: true
//   },

//   startMonth: Number,
//   endMonth: Number,

//   startWeek: Number,
//   endWeek: Number,

//   babySize: String,
//   development: String,

//   sections: [sectionSchema],

//   tips: String
// });

// const contentCategorySchema = new mongoose.Schema(
// {
//   category: {
//     type: String,
//     enum: [
//       "pre-planning",
//       "pre-pregnancy",
//       "pregnancy",
//       "infant",
//       "toddler"
//     ],
//     required: true
//   },

//   stages: [stageSchema],

//   isActive: {
//     type: Boolean,
//     default: true
//   }

// },
// { timestamps: true }
// );

// export default mongoose.model("ContentCategory", contentCategorySchema);


import mongoose from "mongoose";

// ─── Content Block Schema ─────────────────────────────────────────────────────
const contentBlockSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ["heading", "subheading", "paragraph", "bullets", "image", "video", "richtext", "divider", "tip", "callout"],
    required: true,
  },
  order: { type: Number, default: 0 },

  // heading / subheading / paragraph / richtext / tip / callout
  content: { type: String },

  // bullets
  items: [{ text: String, bold: Boolean }],

  // image / video
  url: { type: String },
  caption: { type: String },
  alt: { type: String },

  // tip / callout
  icon: { type: String },
  variant: { type: String, enum: ["info", "warning", "success", "tip"], default: "info" },

  // styling
  style: {
    align: { type: String, enum: ["left", "center", "right"], default: "left" },
    size: { type: String, enum: ["sm", "md", "lg", "xl"], default: "md" },
  },
}, { _id: true });


// ─── Stage Schema ─────────────────────────────────────────────────────────────
const stageSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },

  // Time mapping
  startMonth: Number,
  endMonth: Number,
  startWeek: Number,
  endWeek: Number,
  trimester: { type: Number, enum: [1, 2, 3] },

  // Quick metadata
  babySize: String,
  babyWeight: String,
  keywords: [String],

  // Dynamic content blocks
  blocks: [contentBlockSchema],

  isPublished: { type: Boolean, default: false },
  publishedAt: Date,
  order: { type: Number, default: 0 },
}, { timestamps: true });


// ─── Category Schema ──────────────────────────────────────────────────────────
const categorySchema = new mongoose.Schema({
  slug: {
    type: String,
    enum: ["pre-planning", "pre-pregnancy", "pregnancy", "infant", "toddler", "postpartum"],
    required: true,
    unique: true,
  },
  label: { type: String, required: true },
  description: { type: String },
  icon: { type: String, default: "📖" },
  coverImage: { type: String },

  stages: [stageSchema],

  isActive: { type: Boolean, default: true },
  order: { type: Number, default: 0 },
}, { timestamps: true });

export default mongoose.model("Category", categorySchema);