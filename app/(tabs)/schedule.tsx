import React, { useMemo, useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  SafeAreaView,
  Image,
  Pressable,
  ScrollView,
  TextInput,
} from "react-native";

import { useRouter } from "expo-router";
import ModalWrapper from "@/components/ModalWrapper";
import { useAppStore } from "@/store";
import { Chip } from "@/components/TaskCategories";
import Button from "@/elements/Button";
import { getFlexDirection, t, ucFirst } from "@/utils/helpers";
import ScheduleTimeline from "@/components/schedules/ScheduleTimeline";
import CurrentDateTile from "@/components/date/CurrentDateTile";

const schedule: React.FC = () => {
  const { setType, tags, setTags, type, locale } = useAppStore();

  const direction = useMemo(() => getFlexDirection(locale), [locale]);

  const [Isvisible, setVisible] = useState(false);
  const [showBadges, setShowBadges] = useState(false);

  const router = useRouter();

  const ScheduleActions = () => {
    return (
      <View style={{ height: 460 }}>
        <TouchableOpacity onPress={() => setVisible(!Isvisible)}>
          <Image
            source={require("@/assets/icons/close.png")}
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
            <Text style={styles.text}>{t("class_title")}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setType("task");
              setShowBadges(true);
            }}
            style={[styles.button, { backgroundColor: "#FEB5A6" }]}
          >
            <Text style={styles.text}>{t("task_title")}</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };
  const [all_tags, setAllTags] = useState<any[]>([]);

  function BadgeContainer() {
    const [new_tag, setNewTag] = useState("");
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
          <TouchableOpacity
            onPress={() => {
              setVisible(false);
              router.push("/schedule");
            }}
          >
            <Image
              source={require("@/assets/icons/back.png")}
              style={{
                width: 18,
                height: 18,
              }}
            />
          </TouchableOpacity>
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
              {/* @ts-ignore */}
              {ucFirst(t(`schedule_${type}`))}
            </Text>
          </View>
        </View>
        <View style={styles.taskContent}>
          <View style={styles.goalSection}>
            <Text style={styles.goalTitle}>{t("task_goal")}</Text>
            <Text style={styles.goalDescription}>{t("track_spent_time")}</Text>
          </View>
          <View style={styles.tasks}>
            {[
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
                title: "Exercise",
                icon: "🏋️",
                backgroundColor: "rgba(227, 72, 80, 0.21)",
              },
              ...all_tags,
            ].map(({ title, icon, backgroundColor }, index) => (
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
          {/* <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignSelf: "stretch",
              height: 48,
              gap: 12,
            }}
          >
            <TextInput
              placeholder={t("select_recurrence")}
              autoCapitalize="none"
              style={{
                paddingVertical: 8,
                paddingHorizontal: 12,
                borderWidth: 1,
                borderRadius: 100,
                borderColor: "#9AA5B5",
                alignSelf: "stretch",
                flex: 1,
              }}
              onChangeText={(text) => {
                setNewTag(text);
              }}
            />
            <TouchableOpacity
              style={[
                styles.button,
                {
                  width: 72,
                },
              ]}
              onPress={() => {
                if (new_tag) {
                  if (!tags.includes(new_tag)) {
                    setTags([...tags, new_tag]);
                  } else {
                    const newTags = tags.filter((v) => v !== new_tag);
                    setTags([...newTags]);
                  }
                  setAllTags([
                    ...all_tags,
                    {
                      title: new_tag,
                      icon: "✨ ",
                      backgroundColor: "#EAECEE",
                    },
                  ]);
                }
              }}
            >
              <Text style={[styles.text, { fontSize: 12 }]}>{t("create")}</Text>
            </TouchableOpacity>
          </View> */}
        </View>
        <Button
          disabled={false}
          text={t("schedule")}
          onPress={() => {
            setVisible(false);
            setType("task");
            router.push("/(screens)/addToPlanner");
          }}
        />
      </View>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView style={styles.container}>
        <View style={[styles.mainProfile, direction]}>
          <Text style={[styles.headingSub]}>{t("schedule")}</Text>

          <Pressable>
            <Image
              source={require("@/assets/icons/share.png")}
              style={{ width: 23, height: 24, tintColor: "#000" }}
            />
          </Pressable>
        </View>

        <CurrentDateTile illustration={false} />
        <ScheduleTimeline />
        <ModalWrapper
          isVisible={Isvisible}
          onClose={() => {
            setVisible(!Isvisible);
          }}
        >
          {showBadges ? <BadgeContainer /> : <ScheduleActions />}
        </ModalWrapper>
      </ScrollView>
      <View style={[styles.bottomBtn, direction]}>
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

  header: {
    justifyContent: "center",
    alignItems: "flex-start",
    display: "flex",
    flexDirection: "column",
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
    gap: 12,
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
    marginTop: 24,
    gap: 16,
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
