// BMI + calorie/macro calculations
export type Gender = "male" | "female" | "other";
export type Activity = "sedentary" | "light" | "moderate" | "active" | "very_active";
export type Goal = "lose" | "maintain" | "gain" | "recomp";

export function calcBMI(heightCm: number, weightKg: number): number {
  const m = heightCm / 100;
  return +(weightKg / (m * m)).toFixed(1);
}

export function bmiCategory(bmi: number): string {
  if (bmi < 18.5) return "Underweight";
  if (bmi < 25) return "Healthy";
  if (bmi < 30) return "Overweight";
  return "Obese";
}

// Mifflin-St Jeor
export function calcBMR(weightKg: number, heightCm: number, age: number, gender: Gender): number {
  const base = 10 * weightKg + 6.25 * heightCm - 5 * age;
  return Math.round(gender === "male" ? base + 5 : base - 161);
}

const ACTIVITY_FACTOR: Record<Activity, number> = {
  sedentary: 1.2,
  light: 1.375,
  moderate: 1.55,
  active: 1.725,
  very_active: 1.9,
};

export function calcMaintenance(bmr: number, activity: Activity): number {
  return Math.round(bmr * ACTIVITY_FACTOR[activity]);
}

export function calcTargetCalories(maintenance: number, goal: Goal): number {
  switch (goal) {
    case "lose": return Math.round(maintenance - 500);
    case "gain": return Math.round(maintenance + 400);
    case "recomp": return Math.round(maintenance - 150);
    default: return maintenance;
  }
}

export function calcMacros(
  targetCalories: number,
  weightKg: number,
  goal: Goal,
): { protein_g: number; carbs_g: number; fat_g: number } {
  const proteinPerKg = goal === "gain" ? 1.8 : goal === "lose" ? 2.2 : 2.0;
  const protein_g = Math.round(weightKg * proteinPerKg);
  const fat_g = Math.round((targetCalories * 0.25) / 9);
  const carbs_g = Math.max(0, Math.round((targetCalories - protein_g * 4 - fat_g * 9) / 4));
  return { protein_g, carbs_g, fat_g };
}
