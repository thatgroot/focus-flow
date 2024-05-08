import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  SafeAreaView,
  Modal,
  Image,
  Pressable,
  ScrollView,
} from "react-native";

import { Calendar } from "react-native-calendars";
import moment from "moment";

import { Schedules } from "@/components/Schedules";
import { useRouter } from "expo-router";
import ModalWrapper from "@/components/ModalWrapper";
import { arrangeByStartTime, getDueDates } from "@/utils/crud";
import { useAppStore } from "../../store";
import { Chip } from "@/components/TaskCategories";
import Button from "@/elements/Button";
import DaysOfWeek from "@/components/DaysOfWeek";
import { date, t } from "@/utils/helpers";

const tasks = [
  {
    title: "Study",
    icon: "📗 ",
    backgroundColor: "#EAECEE",
  },
  {
    title: "Gym",
    icon: "🏋️",
    backgroundColor: "rgba(19, 206, 102, 0.29)",
  },
  {
    title: "Sleep",
    icon: "💤",
    backgroundColor: "rgba(255, 202, 101, 0.47)",
  },

  {
    title: "Chill",
    icon: "🥳",
    backgroundColor: "rgba(254, 181, 166, 0.34)",
  },
  {
    title: "Study",
    icon: "📗",
    backgroundColor: "rgba(141, 153, 222, 1)",
  },
  {
    title: "Gym",
    icon: "🏋️",
    backgroundColor: "rgba(19, 206, 102, 0.29)",
  },
  {
    title: "Exercise",
    icon: "🏋️",
    backgroundColor: "rgba(227, 72, 80, 0.21)",
  },
  // Duplicate categories as requested
  {
    title: "Sleep",
    icon: "💤",
    backgroundColor: "rgba(255, 202, 101, 0.47)",
  },
  {
    title: "Exercise",
    icon: "🏋️",
    backgroundColor: "rgba(227, 72, 80, 0.21)",
  },
];

const schedule: React.FC = () => {
  const days = date.daysOfTheWeek();

  const { setType, tags, setTags } = useAppStore();

  const [selectedDay, setSelectedDay] = useState<Date>(new Date());
  const [showCalendar, setShowCalendar] = useState<boolean>(false);
  const [currentMonthIndex, setCurrentMonthIndex] = useState<number>(0);

  const [pressedIndex, setPressedIndex] = useState<number | null>(null);
  const [Isvisible, setVisible] = useState(false);
  const [showBadges, setShowBadges] = useState(false);
  const [markedDates, setMarkedDates] = useState<Date[]>([]);

  const [data, setData] = useState<
    {
      time: string;
      items: Schedule[];
    }[]
  >([]);

  const router = useRouter();

  const handleDayPress = (dateString: string) => {
    const date = new Date(dateString);
    setSelectedDay(date);
    setCurrentMonthIndex(currentMonthIndex + 1);
    if (markedDates.includes(date)) {
      setMarkedDates(markedDates.filter((markedDate) => markedDate !== date));
    } else {
      setMarkedDates([...markedDates, date]);
    }
  };

  const renderMonthDays = (index: number) => {
    const today = new Date();
    const selectedDay = new Date(
      today.getFullYear(),
      today.getMonth() + index,
      1
    ); // Update selectedDay based on the index
    const year = selectedDay.getFullYear();
    const month = selectedDay.getMonth();

    // Get the last day of the current month
    const endOfMonth = new Date(year, month + 3, 0).getDate();

    // Get the last day of the next two months

    const days = [];

    // Calculate the end day of rendering

    for (let i = 1; i <= endOfMonth; i++) {
      const date = new Date(year, month + 2, i);
      const dayOfWeek = moment(date).format("ddd");

      days.push(
        <View style={styles.maindayWeeks} key={i}>
          <TouchableOpacity
            onPress={() => setPressedIndex(i)}
            style={[
              styles.BtnDayWeeks,
              { backgroundColor: pressedIndex === i ? "#8D99DE" : "white" },
              { borderColor: pressedIndex === i ? "white" : "white" },
            ]}
          >
            <Text
              style={[
                styles.dayOfWeek,
                { color: pressedIndex === i ? "white" : "#9AA5B5" },
              ]}
            >
              {dayOfWeek}
            </Text>
            <Text
              style={[
                styles.day,
                { color: pressedIndex === i ? "white" : "black" },
              ]}
            >
              {i}
            </Text>
          </TouchableOpacity>
        </View>
      );
    }

    return days;
  };

  useEffect(() => {
    getDueDates().then(({ classes, tasks }) => {
      const arranged = arrangeByStartTime({ classes, tasks });
      setData(arranged);
    });

    return () => {};
  }, []);

  const ScheduleActions = () => {
    return (
      <View style={{ height: 460 }}>
        <TouchableOpacity onPress={() => setVisible(!Isvisible)}>
          <Image
            source={require("../../assets/icons/close.png")}
            style={styles.closeBtn}
          />
        </TouchableOpacity>
        <View
          style={{
            alignItems: "center",
            gap: 24,
            flex: 1,
            justifyContent: "center",
          }}
        >
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              setVisible(false);
              setType("class");
              router.push("/(screens)/addToPlanner");
            }}
          >
            <Text style={styles.text}>Class</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setType("task");
              setShowBadges(true);
            }}
            style={[styles.button, { backgroundColor: "#FEB5A6" }]}
          >
            <Text style={[styles.text]}>Task</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  function BadgeContainer() {
    return (
      <View style={styles.taskBadgeContainer}>
        <View
          style={{
            alignSelf: "stretch",
            gap: 24,
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Image
            source={require("../../assets/icons/back.png")}
            style={{
              width: 18,
              height: 18,
            }}
          />
          <View
            style={{
              flex: 1,
              alignSelf: "stretch",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Text
              style={{
                color: "#8D99DE",
                fontSize: 20,
                fontFamily: "Inter-Bold",
              }}
            >
              Schedule a Task
            </Text>
          </View>
        </View>

        <View style={styles.taskContent}>
          <View style={styles.goalSection}>
            <Text style={styles.goalTitle}>Task goal</Text>
            <Text style={styles.goalDescription}>
              Track how you spend your time
            </Text>
          </View>
          <View style={styles.tasks}>
            {tasks.map(({ title, icon, backgroundColor }, index) => (
              <Chip
                active={tags.includes(title)}
                onSelect={(text) => {
                  if (!tags.includes(text)) {
                    setTags([...tags, title]);
                  } else {
                    const newTags = tags.filter((v) => v !== text);
                    setTags([...newTags]);
                  }
                }}
                backgroundColor={backgroundColor}
                icon={icon ?? ""}
                title={title}
                key={`${title}_${index}`}
              />
            ))}
          </View>
        </View>

        <Button
          disabled={false}
          text="Schedule"
          onPress={() => {
            setVisible(false);
            router.push("/addToPlanner");
          }}
        />
      </View>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView style={styles.container}>
        <View style={styles.mainProfile}>
          <View>
            <Text style={[styles.headingSub]}>{t("schedule")}</Text>
          </View>
          <Pressable>
            <Image
              source={require("../../assets/icons/share.png")}
              style={{ width: 23, height: 24, tintColor: "#000" }}
            />
          </Pressable>
        </View>

        <View style={styles.mainCalendar}>
          <View>
            <Text style={[styles.heading, styles.headingSub]}>{t("current_date_label")}</Text>
            <Text style={styles.heading}>16 March 2024</Text>
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

        <View>
          <Modal
            visible={showCalendar}
            animationType="slide"
            transparent={true}
            onRequestClose={() => setShowCalendar(false)}
          >
            <View
              style={{
                flex: 1,
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: "rgba(0,0,0,0.5)",
              }}
            >
              <View
                style={{
                  backgroundColor: "#ffffff",
                  width: 300,
                  justifyContent: "space-between",
                  paddingVertical: 16,
                  paddingHorizontal: 16,
                  borderRadius: 30,
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    paddingHorizontal: 16,
                    paddingVertical: 8,
                    marginBottom: 8,
                  }}
                >
                  <Text style={{ fontWeight: "bold" }}>Select Date</Text>
                  <TouchableOpacity onPress={() => setShowCalendar(false)}>
                    {/* <Image source={require('../../assets/cross.png')} style={{ width: 15, height: 15 }} /> */}
                  </TouchableOpacity>
                </View>
                <Calendar
                  onDayPress={(day) => {
                    handleDayPress(day.dateString);
                    // setShowCalendar(false);
                  }}
                  markedDates={{
                    [moment(selectedDay).format("YYYY-MM-DD")]: {
                      selected: true,
                      selectedColor: "#4cb050",
                    },
                  }}
                  theme={{
                    backgroundColor: "#ffffff",
                    calendarBackground: "#ffffff",
                    arrowColor: "#4cb050",
                    todayTextColor: "#4cb050",
                  }}
                />
                <TouchableOpacity
                  onPress={() => setShowCalendar(false)}
                  style={{
                    height: 40,
                    alignSelf: "center",
                    marginBottom: 8,
                    marginTop: 8,
                    borderRadius: 8,
                    justifyContent: "center",
                    alignItems: "center",
                    width: 150,
                    backgroundColor: "#4cb050",
                  }}
                >
                  <Text style={{ color: "#ffffff" }}>Confirm Date</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
          <View
            style={{
              flexDirection: "row",
              paddingHorizontal: 10,
              height: 120,
              alignItems: "center",
            }}
          >
            <DaysOfWeek
              days={days}
              onSelect={(day: DayType) => {
                // todo
              }}
            />
          </View>
        </View>
        <View
          style={{
            gap: 32,
          }}
        >
          <View style={styles.DueDate}>
            <Text style={styles.due}>Due:</Text>
            <Text style={styles.yearDay}>
              {date.scheduleExpire(data)}
            </Text>
          </View>
          <View
            style={{
              gap: 0,
              paddingBottom: 200,
            }}
          >
            {data.map((item, index) => (
              <View
                key={index} // Adding a unique key to each rendered item
                style={{
                  flexDirection: "row",
                  width: "100%",
                  gap: 12,
                }}
              >
                <Text
                  style={{
                    fontSize: 15,
                    width: 48,
                    fontFamily: "Inter-Bold",
                  }}
                >
                  {item.time}
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
                  {item.items.map((item, index) => (
                    <Schedules
                      item={{
                        title: item.subject,
                        due: item.endDate.toDateString(),
                        bgColor: "rgba(254, 181, 166, 1)",
                        icon: require("../../assets/icons/share.png"),
                        time: item.endTime.toDateString(),
                      }}
                      key={`${
                        item.subject
                      }_${item.endDate.toDateString()}_${index}`}
                    />
                  ))}
                </View>
              </View>
            ))}
          </View>
        </View>

        <ModalWrapper
          isVisible={Isvisible}
          onClose={() => {
            setVisible(!Isvisible);
          }}
        >
          {showBadges ? <BadgeContainer /> : <ScheduleActions />}
        </ModalWrapper>
      </ScrollView>
      <View style={styles.bottomBtn}>
        <Pressable
          style={styles.planBtn}
          onPress={() => setVisible(!Isvisible)}
        >
          <Text style={styles.planTxt}>{t("plan_label")}</Text>
        </Pressable>

        <TouchableOpacity
          style={styles.completedBtn}
          onPress={() => router.push("/CompletedTaskScreen")}
        >
          <Text style={styles.compeleteTxt}>{t("completed_label")}</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FAFAFA",
    width: "100%",
    flex: 1,
    paddingHorizontal: 22,
    paddingTop: 24,
    paddingBottom: 200,
  },

  mainProfile: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 10,
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
  content: {
    justifyContent: "space-between",
    alignItems: "stretch",
    display: "flex",
    marginTop: 28,
    flexDirection: "column",
  },
  heading: {
    color: "#353535",
    fontFamily: "Inter-Medium",
    lineHeight: 20,
    fontSize: 15,
    letterSpacing: 1,
  },

  headingSub: {
    color: "#8D99DE",
    fontSize: 16,
    lineHeight: 20,
    letterSpacing: 1,
    fontWeight: "700",
  },
  mainCalendar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 30,
  },
  CalendarIcon: {
    height: 38,
    width: 38,
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
  maindayWeeks: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 20,
  },

  dayOfWeek: {
    color: "#353535",
    fontFamily: "Inter-Medium",
    lineHeight: 20,
    fontSize: 12,
    letterSpacing: 1,
  },
  day: {
    color: "#353535",
    fontWeight: "400",
    lineHeight: 20,
    fontSize: 19,
    fontFamily: "Inter-Regular",
    letterSpacing: 1,
    marginTop: 10,
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
  DueDate: {
    flexDirection: "row",
    marginTop: 20,
  },
  due: {
    color: "#9AA5B5",
    lineHeight: 15.73,
    fontWeight: "500",
    fontSize: 13,
  },
  yearDay: {
    fontWeight: "400",
    fontSize: 13,
    lineHeight: 15.73,
    color: "#353535",
    marginLeft: 4,
  },
  stepperStyle: {
    marginTop: 20,
  },
  bottomBtn: {
    flexDirection: "row",
    position: "absolute",
    bottom: 0.1,
    width: "100%",
    // left:20,
    justifyContent: "center",
    backgroundColor: "#FFFFFF",
    height: 80,
    alignItems: "center",
  },
  planBtn: {
    width: 139,
    height: 40,
    borderRadius: 100,
    borderWidth: 2,
    justifyContent: "center",
    alignItems: "center",
    borderColor: "rgba(141, 153, 222, 1)",
  },
  completedBtn: {
    width: 193,
    height: 40,
    borderRadius: 100,
    backgroundColor: "rgba(138, 151, 221, 1)",
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 5,
  },
  planTxt: {
    fontSize: 16,
    fontWeight: "600",
    lineHeight: 19.36,
    color: "rgba(141, 153, 222, 1)",
  },
  compeleteTxt: {
    fontSize: 16,
    fontWeight: "600",
    lineHeight: 19.36,
    color: "rgba(255, 255, 255, 1)",
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    width: 350,
    height: 400,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    width: 215,
    height: 50,
    borderRadius: 25,
    marginBottom: 10,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#8a97dd",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 6,
  },
  text: {
    fontSize: 16,
    fontFamily: "Inter-Bold",
    color: "#fff",
  },
  closeBtn: {
    width: 18,
    height: 18,
    alignSelf: "flex-end",
  },
  gotItTxt: {
    fontWeight: "700",
    fontSize: 12,
    lineHeight: 14.52,
    letterSpacing: 1,
    color: "#3366FF",
    marginTop: 20,
  },
  footerTxt: {
    flex: 1,
    width: "50%",
    justifyContent: "flex-end",
    alignItems: "flex-end",
    marginLeft: 20,
  },

  taskBadgeContainer: {
    justifyContent: "center",
    borderRadius: 12,
    display: "flex",
    width: "100%",
    flexDirection: "column",
  },
  taskHeader: {
    display: "flex",
    alignItems: "stretch",
    justifyContent: "space-between",
  },
  headerImage: {
    borderColor: "rgba(53, 53, 53, 1)",
    borderStyle: "solid",
    borderWidth: 2,
    width: 18,
    aspectRatio: 1,
  },
  headerTitle: {
    fontSize: 20,
    fontFamily: "Inter-Bold",
    flex: 1,
    color: "#8D99DE",
  },
  taskContent: {
    alignItems: "stretch",
    display: "flex",
    marginTop: 44,
    gap: 36,
    flexDirection: "column",
  },
  goalSection: {
    alignItems: "stretch",
    display: "flex",
    flexDirection: "column",
  },
  goalTitle: {
    color: "#000",
    fontSize: 22,
    fontWeight: "600",
    fontFamily: "Inter-Bold",
  },
  goalDescription: {
    color: "#6F6F6F",
    marginTop: 7,
    fontSize: 16,
    fontWeight: "500",
    fontFamily: "Inter-Medium",
  },
  tasks: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
  },
});

export default schedule;
