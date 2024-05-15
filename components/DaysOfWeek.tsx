import React, { useEffect, useState } from "react";
import { FlatList } from "react-native";
import DayCard from "./DayCard";
import { arabic_dates, arabic_days } from "@/utils/helpers";
import { useAppStore } from "@/store";

export default function DaysOfWeek({
  days,
  onSelect,
}: {
  days: WeekType;
  onSelect: (day: DayType) => void;
}) {
  const date = new Date();

  const [active, setActive] = useState(0);
  const { locale } = useAppStore();
  useEffect(() => {
    setActive(date.getDate()- 1);
  }, []);
  return (
    <FlatList
      horizontal
      pagingEnabled
      inverted={locale === "ar"}
      data={days} // Provide a single item array to FlatList
      keyExtractor={({ day, date }, index) => `${day}_${date}_${index}`} // Unique key for month
      showsHorizontalScrollIndicator={false}
      renderItem={({ item, index }) => (
        <DayCard
          filled={active === index}
          active={active === index}
          dayOfWeek={locale == "en" ? item.day : arabic_days[item.day]}
          date={
            locale === "en"
              ? item.date
              : `${item.date}`
                  .split("")
                  .map((part) => arabic_dates[part])
                  .join("")
          }
          onSelect={() => {
            setActive(index);
          }}
        />
      )}
    />
  );
}
