import { I18n } from "i18n-js";
import { translations } from "./localization";

export function addDays(date: Date, days: number): Date {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}

export const toSchedules = (classes: any[]): Schedule[] | [] => {
  return classes.map((classData: any) => {
    return {
      ...classData,
      startDate: new Date(
        classData.startDate.seconds * 1000 +
          classData.startDate.nanoseconds / 1000000
      ),
      endDate: new Date(
        classData.endDate.seconds * 1000 +
          classData.endDate.nanoseconds / 1000000
      ),
      startTime: new Date(
        classData.startTime.seconds * 1000 +
          classData.startTime.nanoseconds / 1000000
      ),
      endTime: new Date(
        classData.endTime.seconds * 1000 +
          classData.endTime.nanoseconds / 1000000
      ),
    };
  });
};

export const toSessions = (sessions: any[]): StudySession[] => {
  return sessions.length == 0
    ? []
    : sessions.map((session: StudySession) => {
        return {
          ...session,
        };
      });
};

export function getStartTimeInMinutes(date: Date): number {
  const hour = date.getHours();
  const minutes = date.getMinutes();
  return hour * 60 + minutes;
}

export function formatTime(minutes: number): string {
  const hour = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;
  const formattedHour = hour < 10 ? `0${hour}` : `${hour}`;
  const formattedMinutes =
    remainingMinutes < 10 ? `0${remainingMinutes}` : `${remainingMinutes}`;
  return `${formattedHour}:${formattedMinutes}`;
}

export function ucFirst(text: string) {
  return text.replace(/(^[a-z]|\s[a-z])/g, (m) => m.toUpperCase());
}

export function dateToTimeFormat(date: Date): string {
  let hours = date.getHours();
  const minutes = date.getMinutes().toString().padStart(2, "0");
  const ampm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12;
  hours = hours ? hours : 12;
  return `${hours}:${minutes} ${ampm}`;
}

export const date = {
  daysOfTheWeek: (): { date: number; day: string }[] => {
    const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const currentDate = new Date();
    const result = [];

    for (let i = 0; i < 7; i++) {
      const date = currentDate.getDate() + i;
      const dayIndex = (currentDate.getDay() + i) % 7;
      const dayInitial = daysOfWeek[dayIndex];

      result.push({ date, day: dayInitial });
    }

    return result;
  },
  scheduleExpire: (
    data: {
      time: string;
      items: Schedule[];
    }[]
  ) => {
    const lastItem =
      data[data.length - 1]?.items?.[data[data.length - 1]?.items.length - 1];
    return lastItem?.endDate?.toDateString() ?? "No end date available";
  },
};

export const formatMsToTimeString = (ms: number) => {
  const hours = Math.floor(ms / (60 * 60 * 1000));
  const minutes = Math.floor((ms % (60 * 60 * 1000)) / (60 * 1000));
  const seconds = Math.floor((ms % (60 * 1000)) / 1000);

  return `${hours.toString().padStart(2, "0")}:${minutes
    .toString()
    .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
};
export const calculateTotalTime = (ms1: number, ms2: string) => {
  const [hours2, minutes2, seconds2] = ms2.split(":");
  const totalMs =
    ms1 +
    Number(hours2) * 60 * 60 * 1000 +
    Number(minutes2) * 60 * 1000 +
    Number(seconds2) * 1000;
  return totalMs;
};



const i18n = new I18n(translations)
i18n.locale = "en"
type TranslationKey = keyof typeof translations.en;
export function t(key: TranslationKey) {
  return i18n.t(key);
}
