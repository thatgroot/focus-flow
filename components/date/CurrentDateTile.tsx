import { useAppStore } from "@/store";
import {
  date,
  getFlexDirection,
  t,
  translateDate,
} from "@/utils/helpers";
import { Image } from "expo-image";
import moment from "moment";
import React, { useState } from "react";
import { Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Calendar } from "react-native-calendars";
import {DaysOfWeek} from "../DaysOfWeek";

export default function CurrentDateTile({
  illustration,
}: {
  illustration: boolean;
}) {
  const { locale } = useAppStore();
  const [selectedDay, setSelectedDay] = useState<Date>(new Date());
  const [showCalendar, setShowCalendar] = useState<boolean>(false);
  const [currentMonthIndex, setCurrentMonthIndex] = useState<number>(0);
  const [markedDates, setMarkedDates] = useState<Date[]>([]);
  const days = date.daysOfTheMonth();

  const handleDayPress = (dateString: string) => {
    const _date = new Date(dateString);
    setSelectedDay(_date);
    // setSelectedDay(selectedDay);
    // setShowCalendar(false);
    // Handle scrolling by changing the current month index
    setCurrentMonthIndex(currentMonthIndex + 1);
    if (markedDates.includes(_date)) {
      setMarkedDates(markedDates.filter((markedDate) => markedDate !== _date));
    } else {
      setMarkedDates([...markedDates, _date]);
    }
  };

  return (
    <View style={styles.container}>
      <View
        style={[styles.mainCalendar,  getFlexDirection(locale)]}
      >
        <View>
          <Text
            style={[
              styles.heading,
              styles.headingSub,
              { textAlign: locale === "ar" ? "right" : "left" },
            ]}
          >
            {t("today")}
          </Text>
          <Text style={styles.heading}>
            {locale === "en"
              ? new Date().toDateString()
              : translateDate(new Date().toDateString())}
          </Text>
        </View>
        <TouchableOpacity onPress={() => setShowCalendar(true)}>
          <Image
            style={styles.CalendarIcon}
            source={require("@/assets/images/icon8.png")}
          />
        </TouchableOpacity>
      </View>
      {illustration && (
        <Image
          contentFit="cover"
          style={styles.bgImage}
          source={require("@/assets/images/bg.png")}
        />
      )}
      <DaysOfWeek
        days={days}
      />
      <Modal
        visible={showCalendar}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setShowCalendar(false)}
      >
        <View style={styles.mainModal}>
          <View style={styles.mainModalView}>
            <View
              style={{
                marginBottom: 24,
              }}
            >
              <TouchableOpacity onPress={() => setShowCalendar(false)}>
                <Image
                  source={require("@/assets/images/cross.png")}
                  style={styles.CrossIcon}
                />
              </TouchableOpacity>
            </View>
            <Calendar
              onDayPress={(day) => {
                handleDayPress(day.dateString);
              }}
              markedDates={{
                [moment(selectedDay).format("YYYY-MM-DD")]: {
                  selected: true,
                  selectedColor: "#8D99DE",
                },
              }}
              theme={{
                backgroundColor: "#ffffff",
                calendarBackground: "#ffffff",
                arrowColor: "#8D99DE",
                todayTextColor: "#8D99DE",
              }}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 20,
    gap: 12,
  },
  mainModal: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  mainModalView: {
    backgroundColor: "#ffffff",
    width: 300,
    justifyContent: "space-between",
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderRadius: 30,
  },
  mainCalendar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    alignSelf: "stretch",
    marginTop: 20,
  },

  bgImage: {
    width: 215,
    height: 169,
  },
  CrossIcon: {
    width: 15,
    height: 15,
    alignSelf: "flex-end",
  },
  mainProfile: {
    flexDirection: "row",
    gap: 10,
  },
  heading: {
    color: "#353535",
    lineHeight: 20,
    fontSize: 15,
    fontFamily: "Inter-Medium",
    letterSpacing: 1,
  },
  headingSub: {
    color: "#9AA5B5",
    fontSize: 14,
    lineHeight: 20,
    letterSpacing: 1,
  },
  CalendarIcon: {
    height: 38,
    width: 38,
  },
});
