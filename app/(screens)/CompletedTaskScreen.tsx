import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Image,
  Text,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
} from "react-native";

import { useNavigation, useRouter } from "expo-router";
import { CompletedTask } from "@/components/CompletedTask";
import { t, timestampToDate } from "@/utils/helpers";
import { controllers } from "@/utils/crud";

const CompletedTaskScreen: React.FC = () => {
  const router = useRouter();

  const [tasks, setTasks] = useState<Schedule[]>([]);

  useEffect(() => {
    controllers.task
      .completed()
      .then((_data) => {
        setTasks(_data);
      })
      .catch((error) => {
        console.log("error", error);
      });
  }, []);
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView style={styles.container}>
        <View style={styles.mainView}>
          <TouchableOpacity onPress={() => router.back()}>
            <Image
              style={styles.LeftIcon}
              source={require("@/assets/images/iconleft.png")}
            />
          </TouchableOpacity>
          <Text style={styles.heading}>{t("completed_label")} {t("task_title")}</Text>
          <View />
        </View>
        <View
          style={{
            gap: 30,
            alignItems: "center",
            marginTop: 30,
          }}
        >
          {tasks.map((data, index) => (
            <CompletedTask
              key={index}
              completedDate={timestampToDate({
                ...data.completedOn,
              }).toDateString()}
              notes={data.note}
              spentTime={data.schedule}
              title={data.title! ?? data.note.substring(0, 8)}
            />
          ))}
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
  LeftIcon: {
    width: 18,
    height: 18,
  },
  heading: {
    color: "rgba(141, 153, 222, 1)",
    fontFamily: "Inter-Bold",
    lineHeight: 24,
    fontSize: 16,
    letterSpacing: 1,
  },
  BtnText: {
    color: "rgba(255, 255, 255, 1)",
  },

  mainStudy: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
  },
  mainView: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});

export default CompletedTaskScreen;
