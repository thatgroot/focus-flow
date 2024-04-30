import { Image } from "expo-image";
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  FlatList,
  LayoutAnimation,
  Alert,
} from "react-native";
import LabeledInput from "@/components/InputField";
import Checkbox from "@/components/CheckBox";
import CheckboxGroup from "@/components/CheckBoxGroup";
import BottomSheet from "@/components/BottomSheet";
import Button from "@/elements/Button";
import Link from "@/elements/Link";
import TimeEntry from "@/components/TimeEntry";
import DayCard from "@/components/DayCard";
import { TimerSection } from "@/components/TimerSection";
import { BottomNav } from "@/components/BottomNav";
import { Schedules } from "@/components/Schedules";
import { SubjectCard } from "@/components/SubjectCard";
import { CompletedTask } from "@/components/CompletedTask";
import { Users } from "@/components/Users";
import { StudyGroup } from "@/components/StudyGroup";
import { CircularImageWithOverlays } from "@/components/CircularImageWithOverlays";
import { calculateAngle, calculatePosition } from "@/utils";
import { theme } from "@/styles/theme";
import Today from "@/components/Today";
import Reminder from "@/components/Reminder";
import ModalWrapper from "@/components/ModalWrapper";
import AddCourseModal from "@/components/AddCourseModal";
import ReminderNotification from "@/components/ReminderNotification";
import ShareSuccess from "@/components/ShareSuccess";
import TaskCategories from "@/components/TaskCategories";
import ShareSchedule from "@/components/ShareSchedule";
import { CourseController, ScheduleController } from "@/utils/init";

const DATA = [
  {
    gradient: ["#9AA5B5", "#9AA5B5"],
    type: "Study",
    title: "Study Together",
    users: [
      require("@/assets/images/user1.png"),
      require("@/assets/images/user2.png"),
      require("@/assets/images/user3.png"),
      require("@/assets/images/user4.png"),
    ],
    count: "33,558",
  },
  {
    gradient: ["#8a97dd", "#8a97dd85"],
    type: "Study",
    title: "Practical Group",
    users: [
      require("@/assets/images/user1.png"),
      require("@/assets/images/user2.png"),
      require("@/assets/images/user3.png"),
      require("@/assets/images/user4.png"),
    ],
    count: "33,558",
  },
  {
    gradient: ["#FFCA65", "#FFCA65"],
    type: "Study",
    title: "Practical Group",
    users: [
      require("@/assets/images/user1.png"),
      require("@/assets/images/user2.png"),
      require("@/assets/images/user3.png"),
      require("@/assets/images/user4.png"),
    ],
    count: "33,558",
  },
  {
    gradient: ["#FEB5A6", "#FEB5A6"],
    type: "Study",
    title: "Practical Group",
    users: [
      require("@/assets/images/user1.png"),
      require("@/assets/images/user2.png"),
      require("@/assets/images/user3.png"),
      require("@/assets/images/user4.png"),
    ],
    count: "33,558",
  },
];

const SignInScreen = () => {
  const [isVisible, setIsVisible] = useState(false);

  const toggleBottomSheet = () => {
    setIsVisible(!isVisible);
  };

  const handleCheckboxChange = (selectedLabels: string[]) => {
    console.log("Selected label:", JSON.stringify(selectedLabels));
    // Handle the selected label here (e.g., update state)
  };
  return (
    <ScrollView style={{ backgroundColor: theme.colors.background, flex: 1 }}>
      <View style={styles.container}>
        <Button
          disabled={false}
          onPress={async () => {
            await CourseController.add({
              data: { name: "Biology" },
              onError: (error) => {
                Alert.alert(error);
              },
              onSuccess: (id) => {
                Alert.alert(id);
              },
            });
          }}
          text="Create Dummy Course"
        />

        <Button
          disabled={false}
          onPress={async () => {
            await ScheduleController.add({
              data: {
                entity: {
                  type: "task",
                  name: "Write a report",
                  course: "abc123",
                },
                tags: ["work", "important"],
                notes: "Gather data from marketing and sales teams by EOD",
                period: {
                  value: 1,
                  unit: "day",
                },
                date: {
                  start: new Date("2024-05-01"),
                  end: new Date("2024-05-01"),
                },
                time: {
                  start: 9,
                  end: 17,
                },
              },
              onError: (error) => {
                Alert.alert(error);
              },
              onSuccess: (id) => {
                Alert.alert(id);
              },
            });
          }}
          text="Create Dummy Schedule"
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  signInContainer: {
    alignItems: "center",
    marginBottom: 27,
  },
  title: {
    fontSize: 20,
    fontFamily: "Inter-Bold",
    color: "#8c99de",
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 14,
    color: "#353535",
  },
  inputContainer: {
    alignItems: "center",
    gap: 12,
  },
  input: {
    width: 280,
    height: 40,
    borderWidth: 1,
    borderRadius: 20,
    borderColor: "#9aa5b5",
    paddingLeft: 10,
    marginBottom: 27,
  },
  button: {
    width: 280,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 40,
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
  buttonText: {
    fontSize: 16,
    fontFamily: "Inter-Bold",
    color: "#fff",
  },
  signUpContainer: {
    flexDirection: "row",
    marginBottom: 20,
  },
  signUpText: {
    fontSize: 14,
    color: "#353535",
  },
  signUpLink: {
    fontSize: 14,
    fontFamily: "Inter-Bold",
    color: "#8c99de",
    marginLeft: 5,
  },
});

export default SignInScreen;
