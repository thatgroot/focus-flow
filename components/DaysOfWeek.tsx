import React, { useState } from "react";
import { FlatList } from "react-native";
import DayCard from "./DayCard";

export default function DaysOfWeek({days,onSelect}:{days:WeekType,onSelect:(day:DayType)=>void}) {
  const [active, setActive] = useState(0);
  return (
    <FlatList
      horizontal
      pagingEnabled
      data={days} // Provide a single item array to FlatList
      keyExtractor={({ day, date }, index) => `${day}_${date}_${index}`} // Unique key for month
      showsHorizontalScrollIndicator={false}
      renderItem={({ item, index }) => (
        <DayCard
          filled={active === index}
          active={active === index}
          dayOfWeek={item.day}
          date={item.date}
          onSelect={() => {
            setActive(index);
          }}
        />
      )}
    />
  );
}
