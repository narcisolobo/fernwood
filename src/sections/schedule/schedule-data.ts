interface ScheduleClass {
  id: string;
  time: string;
  name: string;
  teacher: string;
  duration: string;
  status: "open" | "full";
  spotsOpen: number;
  waitlistCount: number;
}

export { type ScheduleClass };
