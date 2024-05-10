import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Image,
  Text,
  TouchableOpacity,
  SafeAreaView,
  Modal,
  ScrollView,
} from "react-native";

import { Calendar } from "react-native-calendars";
import moment from "moment";
import { TimerSection } from "@/components/TimerSection";
import TimeEntry from "@/components/TimeEntry";
import ScheduleReminder from "@/components/ScheduleReminder";
import { getDueDates } from "@/utils/crud";
import { date, dateToTimeFormat, t, translateDate } from "@/utils/helpers";
import { useAppStore } from "@/store";
import { router } from "expo-router";
import DaysOfWeek from "@/components/DaysOfWeek";
import { auth } from "@/utils/firebase";
import { Avatar } from "@/components/Avatar";
const HomeScreen: React.FC = () => {
  const { groups, setGroup, joinedGroups, locale } = useAppStore();
  const days = date.daysOfTheWeek();
  const [selectedDay, setSelectedDay] = useState<Date>(new Date());
  const [showCalendar, setShowCalendar] = useState<boolean>(false);
  const [currentMonthIndex, setCurrentMonthIndex] = useState<number>(0);

  const [markedDates, setMarkedDates] = useState<Date[]>([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [sessions, setSessions] = useState<StudySession[]>([]);
  const [selectedDueDate, setSelectedDueDate] = useState<Schedule>();
  const [dueDates, setDueDates] = useState<{
    classes: Schedule[];
    tasks: Schedule[];
  }>({
    classes: [],
    tasks: [],
  });
  const openModal = () => {
    setIsModalVisible(true);
  };

  const closeModal = () => {
    setIsModalVisible(false);
  };

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

  useEffect(() => {
    getDueDates()
      .then(({ classes, tasks, sessions }) => {
        setSessions(sessions);
        setDueDates({
          classes,
          tasks,
        });
      })
      .finally(() => {
        joinedGroups();
      });
    return () => {};
  }, []);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView style={styles.container}>
        <View style={styles.mainProfile}>
          <Avatar />
          <View>
            <Text style={styles.heading}>
              {t("hi")}, {auth.currentUser?.displayName}
            </Text>
            <Text style={[styles.heading, styles.headingSub]}>
              {t("good_morning")}
            </Text>
          </View>
        </View>

        <View style={styles.mainCalendar}>
          <View>
            <Text style={[styles.heading, styles.headingSub]}>
              {t("today")}
            </Text>
            <Text style={styles.heading}>
              {locale === "en"
                ? new Date().toDateString()
                : translateDate(new Date().toDateString())}
            </Text>
          </View>
          <View>
            <TouchableOpacity onPress={() => setShowCalendar(true)}>
              <Image
                style={styles.CalendarIcon}
                source={require("../../assets/images/icon8.png")}
              />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.mainImage}>
          <Image
            resizeMode="cover"
            style={styles.bgImage}
            source={require("../../assets/images/bg.png")}
          />
        </View>

        <View>
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
                      source={require("../../assets/images/cross.png")}
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
          <DaysOfWeek
            days={days}
            onSelect={() => {
              // todo
            }}
          />
        </View>
        <View
          style={{
            paddingVertical: 40,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <TimerSection
            onPress={() => {
              setGroup({
                ...groups[0],
              });
              router.push("/GroupBoard");
            }}
            clock={require("@/assets/images/clock.png")}
            users={[
              require("@/assets/images/user1.png"),
              require("@/assets/images/user2.png"),
              require("@/assets/images/user3.png"),
              require("@/assets/images/user4.png"),
            ]}
            image={require("@/assets/images/study_illustration.png")} // Adjust the path based on your project structure
          />
        </View>
        <View
          style={{
            gap: 24,
          }}
        >
          <View
            style={{
              gap: 18,
            }}
          >
            <Text style={styles.upcomingText}>{t("upcoming_due_dates")}</Text>
            <View
              style={{
                gap: 8,
              }}
            >
              {dueDates.tasks.map((task, index) => (
                <TimeEntry
                  key={`${task.subject}_${index}`}
                  label={
                    locale === "en"
                      ? task.endDate.toDateString()
                      : translateDate(task.endDate.toDateString())
                  }
                  title={
                    t("study_label") +
                      " " +
                      dateToTimeFormat(task?.startTime!) ?? ""
                  }
                  type="upcomming"
                  onPress={() => {
                    setSelectedDueDate(task);
                    openModal();
                  }}
                />
              ))}
            </View>
            {selectedDueDate && (
              <ScheduleReminder
                info={[
                  {
                    label: "Date",
                    value: selectedDueDate?.endDate.toDateString() ?? "",
                  },
                  {
                    label: "Time",
                    value: dateToTimeFormat(selectedDueDate?.endTime!) ?? "",
                  },
                ]}
                name={selectedDueDate?.subject ?? ""}
                type={selectedDueDate?.subject ? "class" : "task"}
                isVisible={isModalVisible}
                onClose={closeModal}
              />
            )}
          </View>
          <View
            style={{
              gap: 12,
            }}
          >
            <Text style={styles.upcomingText}>
              {t("recent_group_sessions")}
            </Text>
            <View
              style={{
                gap: 8,
              }}
            >
              {sessions.map(({ status, timeSpent }, index) => (
                <TimeEntry
                  key={`${timeSpent}_${index}`}
                  label={t(status)}
                  title={timeSpent ?? ""}
                  type="recent"
                  onPress={() => {
                    setGroup({
                      ...groups[0],
                    });
                    router.push("/GroupBoard");
                  }}
                />
              ))}
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FAFAFA",
    width: "100%",
    height: "100%",
    paddingHorizontal: 22,
    paddingVertical: 22,
  },

  mainProfile: {
    flexDirection: "row",
    gap: 10,
  },
  dayCard: {},
  dayText: {
    fontSize: 12,
    paddingLeft: 2,
  },
  profileImage: {
    width: 53,
    height: 53,
    borderRadius: 100,
  },
  header: {
    justifyContent: "center",
    alignItems: "flex-start",
    display: "flex",
    flexDirection: "column",
  },
  image: {
    width: 18,
    height: 18,
  },
  upcomingstyles: {
    backgroundColor: "#13CE6640",
    width: "100%",
    height: 75,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 12,
    justifyContent: "space-between",
    flexDirection: "row",
  },
  upcomingText: {
    color: "#353535",
    lineHeight: 20,
    fontSize: 16,
    fontFamily: "Inter-Medium",
    letterSpacing: 1,
  },
  upcomingday: {
    color: "#5B5B5B",
    lineHeight: 20,
    fontSize: 13,
    fontFamily: "Inter-Medium",
    letterSpacing: 1,
  },
  upcomingWeeks: {
    flexDirection: "row",
    gap: 10,
  },
  dot: {
    backgroundColor: "#13CE66",
    width: 3.87,

    height: 3.87,
  },
  content: {
    justifyContent: "space-between",
    alignItems: "stretch",
    display: "flex",
    marginTop: 28,
    flexDirection: "column",
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
  mainCalendar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 20,
  },
  CalendarIcon: {
    height: 38,
    width: 38,
  },
  mainImage: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 20,
  },
  bgImage: {
    width: 215,
    height: 169,
  },
  courseCard: {
    alignItems: "stretch",
    borderRadius: 12,
    backgroundColor: "#FFF",
    display: "flex",
    marginTop: 16,
    padding: 25,
    flexDirection: "row",
    justifyContent: "flex-start",
  },
  confirmStyles: {
    height: 40,
    alignSelf: "center",
    marginBottom: 8,
    marginTop: 8,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    width: 150,
    backgroundColor: "#4cb050",
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
  CrossIcon: {
    width: 15,
    height: 15,
    alignSelf: "flex-end",
  },
  maindayWeeks: {
    flexDirection: "row",
    alignItems: "center",
  },
  BtnDayWeeks: {
    borderColor: "##8D99DE",
    borderWidth: 1,
    marginLeft: 10,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 7,
    width: 50,
    height: 80,
  },
  courseIcon: {
    borderRadius: 100,
    borderColor: "rgba(154, 165, 181, 1)",
    borderWidth: 2,
    height: 24,
    width: 24,
    marginRight: 12,
  },

  addButtonText: {
    fontWeight: "600",
    fontSize: 20,
    marginRight: 8,
    fontFamily: "Inter-Bold",
  },
});

export default HomeScreen;
