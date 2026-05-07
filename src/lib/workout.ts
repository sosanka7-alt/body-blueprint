import type { Goal } from "./health";

export type WorkoutDay = {
  day: string;
  focus: string;
  exercises: { name: string; sets: number; reps: string; notes?: string }[];
};

const GYM_TEMPLATES: Record<string, WorkoutDay[]> = {
  push_pull_legs: [
    { day: "Mon", focus: "Push", exercises: [
      { name: "Barbell Bench Press", sets: 4, reps: "6-8" },
      { name: "Overhead Press", sets: 3, reps: "8-10" },
      { name: "Incline DB Press", sets: 3, reps: "10" },
      { name: "Cable Fly", sets: 3, reps: "12" },
      { name: "Tricep Pushdown", sets: 3, reps: "12" },
    ]},
    { day: "Tue", focus: "Pull", exercises: [
      { name: "Deadlift", sets: 3, reps: "5" },
      { name: "Pull-ups", sets: 4, reps: "AMRAP" },
      { name: "Barbell Row", sets: 3, reps: "8-10" },
      { name: "Face Pulls", sets: 3, reps: "15" },
      { name: "Bicep Curl", sets: 3, reps: "12" },
    ]},
    { day: "Wed", focus: "Legs", exercises: [
      { name: "Back Squat", sets: 4, reps: "6-8" },
      { name: "Romanian Deadlift", sets: 3, reps: "8" },
      { name: "Leg Press", sets: 3, reps: "10-12" },
      { name: "Leg Curl", sets: 3, reps: "12" },
      { name: "Standing Calf Raise", sets: 4, reps: "12-15" },
    ]},
    { day: "Thu", focus: "Rest / Mobility", exercises: [
      { name: "Walk", sets: 1, reps: "30 min" },
      { name: "Hip & Shoulder Mobility", sets: 1, reps: "15 min" },
    ]},
    { day: "Fri", focus: "Upper Body", exercises: [
      { name: "Incline Bench Press", sets: 4, reps: "8" },
      { name: "Lat Pulldown", sets: 4, reps: "10" },
      { name: "DB Shoulder Press", sets: 3, reps: "10" },
      { name: "Cable Row", sets: 3, reps: "12" },
      { name: "Lateral Raise", sets: 3, reps: "15" },
    ]},
    { day: "Sat", focus: "Lower Body", exercises: [
      { name: "Front Squat", sets: 4, reps: "6" },
      { name: "Bulgarian Split Squat", sets: 3, reps: "10/leg" },
      { name: "Hip Thrust", sets: 3, reps: "10" },
      { name: "Plank", sets: 3, reps: "45s" },
    ]},
    { day: "Sun", focus: "Rest", exercises: [{ name: "Active recovery", sets: 1, reps: "—" }] },
  ],
};

const HOME_TEMPLATE: WorkoutDay[] = [
  { day: "Mon", focus: "Upper Push", exercises: [
    { name: "Push-ups", sets: 4, reps: "AMRAP" },
    { name: "Pike Push-ups", sets: 3, reps: "8-10" },
    { name: "Backpack Overhead Press", sets: 3, reps: "10" },
    { name: "Tricep Dips (chair)", sets: 3, reps: "12" },
  ]},
  { day: "Tue", focus: "Lower", exercises: [
    { name: "Bodyweight Squats", sets: 4, reps: "15-20" },
    { name: "Reverse Lunges", sets: 3, reps: "10/leg" },
    { name: "Glute Bridge", sets: 3, reps: "15" },
    { name: "Calf Raises", sets: 4, reps: "20" },
  ]},
  { day: "Wed", focus: "Cardio + Core", exercises: [
    { name: "Jumping Jacks", sets: 4, reps: "60s" },
    { name: "Mountain Climbers", sets: 4, reps: "45s" },
    { name: "Plank", sets: 3, reps: "45s" },
    { name: "Bicycle Crunches", sets: 3, reps: "20" },
  ]},
  { day: "Thu", focus: "Upper Pull", exercises: [
    { name: "Inverted Rows (under table)", sets: 4, reps: "10" },
    { name: "Doorway Rows (towel)", sets: 3, reps: "12" },
    { name: "Superman Holds", sets: 3, reps: "30s" },
    { name: "Backpack Curls", sets: 3, reps: "12" },
  ]},
  { day: "Fri", focus: "Full Body", exercises: [
    { name: "Burpees", sets: 4, reps: "10" },
    { name: "Squat to Press", sets: 3, reps: "12" },
    { name: "Push-up to T", sets: 3, reps: "10" },
    { name: "Plank Shoulder Taps", sets: 3, reps: "20" },
  ]},
  { day: "Sat", focus: "Mobility / Walk", exercises: [
    { name: "Brisk Walk", sets: 1, reps: "30-45 min" },
    { name: "Full body stretch", sets: 1, reps: "15 min" },
  ]},
  { day: "Sun", focus: "Rest", exercises: [{ name: "Recovery", sets: 1, reps: "—" }] },
];

export function buildWorkoutPlan(location: "gym" | "home", _goal: Goal, barriers?: string): WorkoutDay[] {
  const plan = location === "gym" ? GYM_TEMPLATES.push_pull_legs : HOME_TEMPLATE;
  if (barriers && barriers.trim().length > 0) {
    return plan.map((d) => ({
      ...d,
      exercises: [
        ...d.exercises,
        { name: "⚠️ Modify for: " + barriers.slice(0, 80), sets: 0, reps: "consult a professional" },
      ],
    }));
  }
  return plan;
}
