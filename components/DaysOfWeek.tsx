import React, { memo, useEffect, useRef, useState } from "react";
import { FlatList } from "react-native";
import DayCard from "./DayCard";
import { arabic_dates, arabic_days } from "@/utils/helpers";
import { useAppStore } from "@/store";

export const DaysOfWeek = memo(function ({ days }: { days: WeekType }) {
  const date = new Date();
  const flatlistRef = useRef<any>();

  const [active, setActive] = useState(0);
  const { locale } = useAppStore();
  useEffect(() => {
    const idx = date.getDate() - 1;
    setActive(idx);
  }, []);

  return (
    <FlatList
      ref={flatlistRef}
      horizontal
      pagingEnabled
      onScrollToIndexFailed={({ index }) => {
        flatlistRef.current?.scrollToOffset({
          offset: index * 1000,
          animated: true,
        });
        const wait = new Promise((resolve) => setTimeout(resolve, 500));
        wait.then(() => {
          flatlistRef.current?.scrollToIndex({
            index: date.getDate() - 1,
            animated: true,
          });
        });
      }}
      onLayout={() => {
        flatlistRef?.current?.scrollToIndex({
          animated: true,
          index: date.getDate() - 1,
        });
      }}
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
});
