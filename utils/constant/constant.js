
export const ENUMS = {
  GENDER: ["Male", "Female", "Other"],
  MARITAL_STATUS: ["Married", "Unmarried"],
  PREGNANCY_STAGE: ["pre-pregnancy", "pregnancy", "post-pregnancy"],
  TRIMESTER: ["trimester-1", "trimester-2", "trimester-3"],
  FATHER_STATUS: ["father", "planning-to-be-father"],
  ROLE: ["user", "admin"],
  PROVIDER: ["local", "google"],
  CHILD_ROLE: ["child"],
  CHILD_GENDER: ["Male", "Female", "Child"],
  CHILD_CATEGORY: [
    "newborn-infant",
    "toddler",
    "preschool",
    "school-age",
    "teen",
    "young-adult"
  ],
  CHILD_AGE_RANGE: [
    "0–3 months",
    "4–6 months",
    "7–12 months",
    "1–3 years",
    "3–5 years",
    "6–12 years",
    "13–17 years",
    "18–21 years"
  ]
};

 export const getExpiryDate = (type) => {
  const now = Date.now();

  switch (type) {
    case "daily":
      return new Date(now - 24 * 60 * 60 * 1000);

    case "weekly":
      return new Date(now - 7 * 24 * 60 * 60 * 1000);

    case "monthly":
      return new Date(now - 30 * 24 * 60 * 60 * 1000);

    default:
      return new Date(now - 24 * 60 * 60 * 1000);
  }
};

