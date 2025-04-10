import React, { useState, useEffect } from "react";
import { View, StyleSheet, Text } from "react-native";

import { Schedules } from "@/components/Schedules";
import { arrangeByStartTime, getAllSchedules, getDueDates } from "@/utils/crud";
import { useAppStore } from "@/store";
import {
  date,
  getFlexDirection,
  getTextAlignment,
  t,
  translateDate,
  translatetime,
} from "@/utils/helpers";
import PromiseWaiter from "../promises/PromiseWaiter";
const bg = ["#FFCA65", "#9AA5B5", "#FEB5A6", "#8D99DE"];
export default function ScheduleTimeline() {
  const { locale } = useAppStore();
  const [data, setData] = useState<
    {
      time: string;
      items: Schedule[];
    }[]
  >([]);

  useEffect(() => {
    getAllSchedules().then(({ classes, tasks }) => {
      const arranged = arrangeByStartTime({ classes, tasks });
      setData(arranged);
    });

    return () => {};
  }, []);

  return (
    <View
      style={{
        gap: 32,
      }}
    >
      <View style={[styles.due_date, getFlexDirection(locale)]}>
        <Text style={[styles.due, getTextAlignment(locale)]}>
          {t("due_date")} {" : "}
          {locale === "en"
            ? date.scheduleExpire(data)
            : translateDate(
                date.scheduleExpire(data) ?? new Date().toDateString()
              )}
        </Text>
      </View>
      {data.length === 0 ? (
        <PromiseWaiter />
      ) : (
        <View
          style={{
            gap: 0,
            paddingBottom: 200,
          }}
        >
          {data.map(({ time, items }, index) => (
            <View
              key={index} // Adding a unique key to each rendered item
              style={[
                {
                  width: "100%",
                  gap: 12,
                },
                getFlexDirection(locale),
              ]}
            >
              <Text
                style={[
                  {
                    fontSize: 15,
                    width: 48,
                    fontFamily: "Inter-Bold",
                  },
                ]}
              >
                {locale === "en" ? time : translatetime(time)}
              </Text>
              <View
                style={{
                  alignItems: "center",
                }}
              >
                <View
                  style={{
                    borderColor: "#8D99DE",
                    borderWidth: 4,
                    backgroundColor: "#FFFFFF",
                    width: 18,
                    height: 18,
                    borderRadius: 100,
                    marginTop: -4,
                  }}
                />
                <View
                  style={{
                    backgroundColor: "#8D99DE",
                    width: 5,
                    flex: 1,
                    borderEndEndRadius: 24,
                    borderEndStartRadius: 24,
                  }}
                />
              </View>
              <View
                style={{
                  flex: 1,
                  gap: 2,
                  flexDirection: "column",
                  paddingBottom: 18,
                }}
              >
                {items.map((item, key) => {

                  return (
                    <Schedules
                      key={`${item.endDate.getMilliseconds()}_${index}_${key}`}
                      data={item}
                      bgColor={index+key % bg.length} // Corrected here
                      icon={require("@/assets/icons/share.png")}
                    />
                  );
                })}
              </View>
            </View>
          ))}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  due_date: {
    flexDirection: "row",
    marginTop: 20,
  },
  due: {
    color: "#9AA5B5",
    lineHeight: 15.73,
    fontWeight: "500",
    fontSize: 13,
  },
});
