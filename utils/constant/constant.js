
export const ENUMS = {
  GENDER: ["Male", "Female", "Other"],
  MARITAL_STATUS: ["Married", "Unmarried"],
  PREGNANCY_STAGE: ["Pre-Pregnancy", "Pregnancy", "Post-Pregnancy"],
  TRIMESTER: ["trimester-1", "trimester-2", "trimester-3"],
  FATHER_STATUS: ["Father", "PlanningToBeFather"],
  ROLE: ["user", "admin"],
  PROVIDER: ["local", "google"],
  CHILD_ROLE: ["child"],
  CHILD_GENDER: ["Male", "Female", "Child"],
  CHILD_CATEGORY: [
    "Newborn (0–12 months)",
    "Toddler (1–3 years)",
    "Preschooler (3–5 years)",
    "SchoolAge (6–12 years)",
    "Teen (13–17 years)",
    "YoungAdult (18–21 years)"
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