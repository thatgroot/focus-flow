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

const Components = () => {
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
        <TouchableOpacity
          style={{ ...styles.button, marginVertical: 12 }}
          onPress={() => {
            toggleBottomSheet();
          }}
        >
          <Text style={styles.buttonText}>Bottom Sheet</Text>
        </TouchableOpacity>
        <BottomSheet
          onBack={() => {
            setIsVisible(false);
          }}
        />
        <Today />
        <ModalWrapper isVisible={false} onClose={() => {}}>
          <Reminder />
        </ModalWrapper>

        <ShareSuccess onClose={()=>{}} share={()=>{}} />

        <ShareSchedule/>
        <AddCourseModal isVisible={false} onClose={() => {}} />

        <ReminderNotification />
        <View
          style={{
            flexDirection: "column",
            gap: 12,
            flex: 1,
            width: "100%",
            alignItems: "center",
          }}
        >
          <TimeEntry
            timestamp="NOV 10, 01:43 - 02:07"
            duration="Study 24m 39s"
            type="upcomming"
          />
          <TimeEntry
            timestamp="NOV 10, 01:43 - 02:07"
            duration="Study 24m 39s"
            type="recent"
          />
          <View
            style={{
              flexDirection: "row",
              gap: 12,
              flex: 1,
              width: "100%",
              alignItems: "center",
              maxWidth: 325,
            }}
          >
            {[
              {
                day: "Sun",
                date: "15",
                filled: false,
                active: false,
              },
              {
                day: "Mon",
                date: "16",
                filled: false,
                active: true,
              },
              {
                day: "Tue",
                date: "16",
                filled: true,
                active: false,
              },
            ].map(({ day, date, filled, active }, index) => {
              return (
                <DayCard
                  key={index}
                  filled={filled}
                  active={active}
                  dayOfWeek={day}
                  date={date}
                  onSelect={()=>{

                  }}
                />
              );
            })}
          </View>
        </View>
        <View
          style={{
            height: 40,
          }}
        ></View>

        <CircularImageWithOverlays
          mainImage={require("@/assets/images/group-illustration.png")}
          orbitImages={[
            { source: require("@/assets/images/user1.png") }, // Destructure unnecessary properties
            { source: require("@/assets/images/user2.png") },
            { source: require("@/assets/images/user3.png") },
            { source: require("@/assets/images/user4.png") },
          ].map((image, index) => ({
            source: image.source,
            position: calculatePosition(270, 128, calculateAngle(index, 4), 4),
          }))}
        />
        {/* <FlatList
          data={DATA}
          renderItem={({ item }) => (
            <View style={{ margin: 6 }}>
              <StudyGroup {...item} />
            </View>
          )}
          keyExtractor={(item) => item.gradient.toString()} // Replace with unique identifier
          numColumns={2}
        /> */}

        <View
          style={{
            gap: 30,
            alignItems: "center",
          }}
        >
          {[
            {
              title: "Sociology",
              description:
                "Lorem ipsum dolor sit amet consectetur. Quis non in nunc id.Lorem ipsum dolor sit amet.",
              completedDate: "Completed : Aug 19",
              spentTime: "Spent : 2h 25m",
            },
            {
              title: "History",
              description:
                "Lorem ipsum dolor sit amet consectetur. Quis non in nunc id.Lorem ipsum dolor sit amet.",
              completedDate: "Completed : Aug 20",
              spentTime: "Spent : 1h 45m",
            },
            {
              title: "Mathematics",
              description:
                "Lorem ipsum dolor sit amet consectetur. Quis non in nunc id.Lorem ipsum dolor sit amet.",
              completedDate: "Completed : Aug 21",
              spentTime: "Spent : 3h 10m",
            },
            {
              title: "Literature",
              description:
                "Lorem ipsum dolor sit amet consectetur. Quis non in nunc id.Lorem ipsum dolor sit amet.",
              completedDate: "Completed : Aug 22",
              spentTime: "Spent : 2h 55m",
            },
            {
              title: "Physics",
              description:
                "Lorem ipsum dolor sit amet consectetur. Quis non in nunc id.Lorem ipsum dolor sit amet.",
              completedDate: "Completed : Aug 23",
              spentTime: "Spent : 4h 20m",
            },
          ].map((data, index) => (
            <CompletedTask key={index} {...data} />
          ))}
        </View>
        <View
          style={{
            gap: 30,
            alignItems: "center",
          }}
        >
          {["Sociology", "Biology", "Physics"].map((subject, index) => (
            <SubjectCard
              key={index}
              title={subject}
              items={[
                { text: "Assignment", bg: "#FEB5A625" },
                {
                  text: "Quiz",
                  bg: "#8D99DE30",
                },
                {
                  text: "Session",
                  bg: "#FFCA6535",
                },
                {
                  text: "Exam",
                  bg: "#13CE6630",
                },
              ]}
              dueDate="27-Dec-2024"
              dueTime="09:00 PM"
              bgColor="#8d99de"
              borderColor="#000"
            />
          ))}
        </View>
        {/* <Schedules /> */}
        <Users
          users={[
            require("@/assets/images/user1.png"),
            require("@/assets/images/user2.png"),
            require("@/assets/images/user3.png"),
            require("@/assets/images/user4.png"),
          ]}
        />
        <TimerSection
          clock={require("@/assets/images/clock.png")}
          users={[
            require("@/assets/images/user1.png"),
            require("@/assets/images/user2.png"),
            require("@/assets/images/user3.png"),
            require("@/assets/images/user4.png"),
          ]}
          image={require("@/assets/images/study_illustration.png")} // Adjust the path based on your project structure
        />

        <View style={styles.signInContainer}>
          <Text style={styles.title}>Sign In</Text>
          <Text style={styles.subtitle}>
            Enter Your Credentials to Continue:
          </Text>
        </View>

        <View style={styles.inputContainer}>
          <LabeledInput
          inputState="inactive"
            label="Email"
            placeholder="Enter your email"
            inputType="email"
            error="Email taken. Try another one"
          />

          {/* <CheckboxGroup onChange={handleCheckboxChange}>
            {["Male", "Female"].map((label, index) => (
              <Checkbox
                isRadio={true}
                isChecked={false}
                onPress={() => {}}
                key={index}
                label={label}
              />
            ))}
          </CheckboxGroup> */}

          {/* <CheckboxGroup onChange={handleCheckboxChange}>
            {["Pscychology", "Biology", "Physics", "Mathematics"].map(
              (label, index) => (
                <Checkbox
                  isRadio={false}
                  isChecked={false}
                  onPress={() => {}}
                  key={index}
                  label={label}
                />
              )
            )}
          </CheckboxGroup> */}
        </View>

        <View
          style={{
            flexDirection: "column",
            gap: 24,
            alignItems: "center",
            paddingBottom: 96,
          }}
        >
          <Button disabled text="Sign In" onPress={() => {}} />
          <View style={styles.signUpContainer}>
            <Text style={styles.signUpText}>Don’t have an Account?</Text>
            <Link onPress={() => {}} text="Sign Up" />
          </View>
        </View>
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
    fontFamily: 'Inter-Bold',
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
    fontFamily: 'Inter-Bold',
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
    fontFamily: 'Inter-Bold',
    color: "#8c99de",
    marginLeft: 5,
  },
});

export default Components;
