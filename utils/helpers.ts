import { I18n } from "i18n-js";
import { translations } from "./localization";
import { I18nManager, TextStyle, ViewStyle } from "react-native";

export function addDays(date: Date, days: number): Date {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}

export function timestampToDate({
  seconds,
  nanoseconds,
}: {
  seconds: number;
  nanoseconds: number;
}): Date {
  const milliseconds = seconds * 1000 + nanoseconds / 1000000;
  return new Date(milliseconds);
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

export const getFlexDirection = (locale: "ar" | "en"): ViewStyle => ({
  flexDirection: locale === "ar" ? "row-reverse" : "row",
});
export const getColumnAlignment = (locale: "ar" | "en"): ViewStyle => ({
  alignItems: locale === "ar" ? "flex-end" : "flex-start",
});

export const getTextAlignment = (locale: "ar" | "en"): TextStyle => ({
  textAlign: locale === "ar" ? "left" : "right",
});
export function tranlsateToArabicNumber(time: any) {
  return `${time}`
    .split("")
    .map((part) => arabic_dates[part])
    .join("");
}
export function dateToTimeFormat(date: Date): string {
  let hours = date.getHours();
  const minutes = date.getMinutes().toString().padStart(2, "0");
  const ampm = hours >= 12 ? t("pm") : t("am");
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
    return lastItem?.endDate?.toDateString();
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

let _translationHandler: I18n;
export function setTranslationHandler(v: I18n) {
  _translationHandler = v;
}
type TranslationKey = keyof typeof translations.en;
export function t(key: TranslationKey) {
  if (_translationHandler) {
    return _translationHandler.t(key);
  } else {
    const i18n = new I18n(translations);
    i18n.locale = "en";
    setTranslationHandler(i18n);
    return i18n.t(key);
  }
}

type EmptyValue = string | number | null | undefined;

export function hasEmptyValues<T>(obj: T): Array<string> {
  const emptyValues: Array<string> = [];
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      const value = obj[key];
      if (
        value === null ||
        value === undefined ||
        (typeof value === "string" && value.trim() === "")
      ) {
        emptyValues.push(key);
      }
    }
  }
  return emptyValues;
}
interface DayTranslations {
  [key: string]: string;
}

interface MonthTranslations {
  [key: string]: string;
}
interface DateTranslations {
  [key: string]: string;
}
export const arabic_days: DayTranslations = {
  Mon: "پیر",
  Tue: "منگل",
  Wed: "بدھ",
  Thu: "جمعرات",
  Fri: "جمعه",
  Sat: "ہفتہ",
  Sun: "اتوار",
};

const arabic_months: MonthTranslations = {
  Feb: "فروری",
  Mar: "مارچ",
  Apr: "اپریل",
  May: "مئی",
  Jun: "جون",
  Jul: "جولائی",
  Aug: "اگست",
  Sep: "ستمبر",
  Oct: "اکتوبر",
  Nov: "نومبر",
  Dec: "دسمبر",
};
export const arabic_dates: DateTranslations = {
  "0": "۰",
  "1": "۱",
  "2": "۲",
  "3": "۳",
  "4": "۴",
  "5": "۵",
  "6": "۶",
  "7": "۷",
  "8": "۸",
  "9": "۹",
};

export function translateValue(value: string) {
  return value
    .split("")
    .map((part) => arabic_dates[part])
    .join("");
}
export function translateDate(value: string): string {
  const [day, month, date, year] = value.split(" ");
  let _date = date
    .split("")
    .map((part) => arabic_dates[part])
    .join("");
  let _year = year
    .split("")
    .map((part) => arabic_dates[part])
    .join("");
  return `${arabic_days[day]} ${arabic_months[month]} ${_date} ${_year}`;
}

export function translatetime(value: string): string {
  const [hour, minute] = value.split(":");
  console.log("hour,minute", hour, minute);
  let _hour = hour
    .split("")
    .map((part) => arabic_dates[part])
    .join("");
  let _minute = minute
    .split("")
    .map((part) => arabic_dates[part])
    .join("");
  return `${_hour}:${_minute}`;
}
