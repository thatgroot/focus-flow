import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  SafeAreaView,
  ScrollView,
} from "react-native";
import { useAppStore } from "@/store";
import { router } from "expo-router";
import { getDueDates } from "@/utils/crud";
import { dateToTimeFormat, t, translateDate } from "@/utils/helpers";
import ProfileInfoTile from "@/components/user/ProfileInfoTile";
import CurrentDateTile from "@/components/date/CurrentDateTile";
import { TimerSection } from "@/components/TimerSection";
import TimeEntry from "@/components/TimeEntry";
import ScheduleReminder from "@/components/ScheduleReminder";
import PromiseWaiter from "@/components/promises/PromiseWaiter";
const HomeScreen: React.FC = () => {
  const { groups, setGroup, joinedGroups, locale,  } = useAppStore();

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [sessions, setSessions] = useState<StudySession[]>([]);
  const [selectedDueDate, setSelectedDueDate] = useState<Schedule>();
  const [dueDates, setDueDates] = useState<{
    classes: Schedule[];
    tasks: Schedule[];
  }>({ classes: [], tasks: [] });

  useEffect(() => {
    getDueDates()
      .then(({ classes, tasks, sessions }) => {
        setSessions(sessions);
        setDueDates({ classes, tasks });
      })
      .catch((error) => console.error("Error fetching due dates:", error))
      .finally(() => joinedGroups());
  }, []);

  const openModal = () => setIsModalVisible(true);
  const closeModal = () => setIsModalVisible(false);

  const renderDueDates = () =>
    dueDates.tasks.map((task, index) => (
      <TimeEntry
        key={`${task.subject}_${index}`}
        label={
          locale === "en"
            ? task.endDate.toDateString()
            : translateDate(task.endDate.toDateString())
        }
        title={
          t("study_label") + " " + dateToTimeFormat(task?.startTime!) ?? ""
        }
        type="upcomming"
        onPress={() => {
          setSelectedDueDate(task);
          openModal();
        }}
      />
    ));

  const renderSessions = () =>
    sessions.map(({ status, timeSpent }, index) => (
      <TimeEntry
        key={`${timeSpent}_${index}`}
        label={t(status)}
        title={timeSpent ?? ""}
        type="recent"
        onPress={() => {
          setGroup({ ...groups[0] });
          router.push("/pages/group_board");
        }}
      />
    ));

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <ProfileInfoTile />
        <CurrentDateTile illustration={true} />
        <View style={styles.timerSectionContainer}>
          {groups.length === 0 ? (
            <PromiseWaiter />
          ) : (
            <TimerSection
              onPress={() => {
                setGroup({ ...groups[0] });
                router.push("/pages/group_board");
              }}
              clock={require("@/assets/images/clock.png")}
              users={[
                require("@/assets/images/user1.png"),
                require("@/assets/images/user2.png"),
                require("@/assets/images/user3.png"),
                require("@/assets/images/user4.png"),
              ]}
              image={require("@/assets/images/study_illustration.png")}
            />
          )}
        </View>

        <View style={styles.dueDatesContainer}>
          <Text style={styles.upcomingText}>{t("upcoming_due_dates")}</Text>
          {dueDates.tasks.length === 0 ? (
            <PromiseWaiter />
          ) : (
            <View style={styles.timeEntryContainer}>{renderDueDates()}</View>
          )}
          {selectedDueDate && (
            <ScheduleReminder
              info={[
                {
                  label: t("date_label"),
                  value:
                    locale === "en"
                      ? selectedDueDate?.endDate.toDateString()
                      : translateDate(selectedDueDate.endDate.toDateString()),
                },
                {
                  label: t("timer_on_label"),
                  value: dateToTimeFormat(selectedDueDate.endTime),
                },
              ]}
              name={selectedDueDate?.subject ?? ""}
              type={selectedDueDate?.subject ? "class" : "task"}
              isVisible={isModalVisible}
              onClose={closeModal}
            />
          )}
        </View>

        <View style={styles.sessionsContainer}>
          <Text style={styles.upcomingText}>{t("recent_group_sessions")}</Text>
          {sessions.length === 0 ? (
            <PromiseWaiter />
          ) : (
            <View style={styles.timeEntryContainer}>{renderSessions()}</View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FAFAFA",
  },
  scrollViewContent: {
    paddingHorizontal: 22,
    paddingVertical: 22,
  },
  timerSectionContainer: {
    paddingTop: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  dueDatesContainer: {
    marginTop: 40,
    marginBottom: 20,
  },
  sessionsContainer: {
    marginBottom: 20,
  },
  upcomingText: {
    color: "#353535",
    lineHeight: 20,
    fontSize: 16,
    fontFamily: "Inter-Medium",
    letterSpacing: 1,
  },
  timeEntryContainer: {
    marginTop: 8,
    gap: 12,
  },
});

export default HomeScreen;
