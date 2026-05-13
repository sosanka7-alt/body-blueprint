// Diet chart generator based on target calories, macros, and veg/non-veg preference.
export type DietPreference = "veg" | "non_veg";

export type Meal = {
  name: string;
  time: string;
  kcalPct: number; // % of daily calories
  veg: string[];
  nonVeg: string[];
};

const TEMPLATE: Meal[] = [
  {
    name: "Breakfast",
    time: "7:30 – 8:30 AM",
    kcalPct: 0.25,
    veg: [
      "Oats porridge with milk, banana & almonds",
      "2 multigrain toast with peanut butter",
      "Greek yogurt bowl with berries & chia",
    ],
    nonVeg: [
      "3 egg omelette with veggies + 2 toast",
      "Scrambled eggs, avocado toast & milk",
      "Chicken & cheese sandwich with fruit",
    ],
  },
  {
    name: "Mid-morning snack",
    time: "11:00 AM",
    kcalPct: 0.1,
    veg: [
      "Apple + handful of almonds",
      "Protein shake (whey/plant) with water",
      "Roasted chana & green tea",
    ],
    nonVeg: [
      "Boiled eggs (2) + orange",
      "Whey protein shake with milk",
      "Tuna on rice cakes",
    ],
  },
  {
    name: "Lunch",
    time: "1:00 – 2:00 PM",
    kcalPct: 0.3,
    veg: [
      "Brown rice + dal + paneer bhurji + salad",
      "2 roti + rajma/chole + curd + cucumber",
      "Quinoa bowl with tofu, beans & veggies",
    ],
    nonVeg: [
      "Brown rice + grilled chicken breast + dal + salad",
      "2 roti + chicken curry + curd + salad",
      "Rice + fish curry + sautéed greens",
    ],
  },
  {
    name: "Pre/Post workout",
    time: "5:00 PM",
    kcalPct: 0.1,
    veg: [
      "Banana + black coffee (pre) · Whey + dates (post)",
      "Peanut butter toast + milk",
      "Sprouts chaat",
    ],
    nonVeg: [
      "Banana + black coffee (pre) · Whey + 2 boiled eggs (post)",
      "Egg white omelette + toast",
      "Greek yogurt + honey + nuts",
    ],
  },
  {
    name: "Dinner",
    time: "8:00 – 9:00 PM",
    kcalPct: 0.25,
    veg: [
      "Tofu/paneer stir-fry + 2 roti + salad",
      "Vegetable khichdi + curd + papad",
      "Soup + grilled veggies + quinoa",
    ],
    nonVeg: [
      "Grilled chicken/fish + sweet potato + greens",
      "Egg curry + 2 roti + salad",
      "Chicken stir-fry with brown rice & veggies",
    ],
  },
];

export type DietChartItem = {
  name: string;
  time: string;
  calories: number;
  options: string[];
};

export function buildDietChart(
  targetCalories: number,
  preference: DietPreference,
): DietChartItem[] {
  return TEMPLATE.map((m) => ({
    name: m.name,
    time: m.time,
    calories: Math.round(targetCalories * m.kcalPct),
    options: preference === "veg" ? m.veg : m.nonVeg,
  }));
}

export function hydrationTarget(weightKg: number): number {
  // ~35 ml per kg, rounded to nearest 0.1L
  return Math.round((weightKg * 35) / 100) / 10;
}
