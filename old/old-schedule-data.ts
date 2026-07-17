interface ScheduleClass {
  id?: number;
  time: string;
  name: string;
  teacher: string;
  duration: string;
  status: "open" | "full";
  spotsOpen: number;
  waitlistCount: number;
}

const classes: ScheduleClass[] = [
  {
    id: 1,
    time: "6:00 am PDT",
    name: "Power Reformer",
    teacher: "Simone Vega",
    duration: "1 hour",
    status: "full",
    spotsOpen: 0,
    waitlistCount: 1,
  },
  {
    id: 2,
    time: "7:00 am PDT",
    name: "Mat Pilates & Mobility",
    teacher: "Devon Cruz",
    duration: "1 hour",
    status: "open",
    spotsOpen: 5,
    waitlistCount: 0,
  },
  {
    id: 3,
    time: "8:00 am PDT",
    name: "Reformer Flow & Sculpt",
    teacher: "Mara Ellison",
    duration: "1 hour",
    status: "open",
    spotsOpen: 3,
    waitlistCount: 0,
  },
  {
    id: 4,
    time: "9:00 am PDT",
    name: "Mat Pilates (Apprentice)",
    teacher: "Ji-woo Kim",
    duration: "1 hour",
    status: "open",
    spotsOpen: 6,
    waitlistCount: 0,
  },
  {
    id: 5,
    time: "10:00 am PDT",
    name: "Mat Pilates (Apprentice)",
    teacher: "Ji-woo Kim",
    duration: "1 hour",
    status: "open",
    spotsOpen: 4,
    waitlistCount: 0,
  },
  {
    id: 6,
    time: "11:00 am PDT",
    name: "Reformer Fundamentals (Apprentice)",
    teacher: "Lusine Sarkisian",
    duration: "1 hour",
    status: "full",
    spotsOpen: 0,
    waitlistCount: 0,
  },
  {
    id: 7,
    time: "4:30 pm PDT",
    name: "Power Reformer",
    teacher: "Simone Vega",
    duration: "1 hour",
    status: "full",
    spotsOpen: 0,
    waitlistCount: 1,
  },
  {
    id: 8,
    time: "5:30 pm PDT",
    name: "Reformer Flow & Sculpt",
    teacher: "Mara Ellison",
    duration: "1 hour",
    status: "open",
    spotsOpen: 2,
    waitlistCount: 0,
  },
  {
    id: 9,
    time: "6:30 pm PDT",
    name: "Reformer Fundamentals (Apprentice)",
    teacher: "Lusine Sarkisian",
    duration: "1 hour",
    status: "full",
    spotsOpen: 0,
    waitlistCount: 3,
  },
];

export { type ScheduleClass };
export default classes;
