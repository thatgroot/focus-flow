import React, { useState } from "react";
import { View, StyleSheet, ScrollView, Alert } from "react-native";
import Button from "@/elements/Button";
import { theme } from "@/styles/theme";
import { controllers, getDueDates } from "@/utils/crud";

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
            await controllers.course.add({
              data: { name: "Biology" },
              onError: (error: string) => {
                Alert.alert(error);
              },
              onSuccess: (id: string) => {
                Alert.alert(id);
              },
            });
          }}
          text="Create Dummy Course"
        />

        <Button
          disabled={false}
          onPress={async () => {
            await controllers.course.update({
              id: "8mrMTUjlGGSSCAgOy268QO3IwE92",
              data: { name: "Physics" },
              onError: (error: string) => {
                Alert.alert(error);
              },
              onSuccess: (id: string) => {
                Alert.alert(id);
              },
            });
          }}
          text="Update Dummy Course"
        />

        <Button
          disabled={false}
          onPress={async () => {
            await controllers.class.add({
              data: {
                subject: "Math Homework",
                startDate: new Date("2024-05-01T00:00:00.000Z"),
                endDate: new Date("2024-05-01T23:59:59.999Z"),
                startTime: {
                  hour: 6,
                  minutes: 30,
                  unit: "pm",
                }, // 8:00 AM
                endTime: {
                  hour: 8,
                  minutes: 30,
                  unit: "pm",
                }, // 8:00 AM
                schedule: "daily",
              },
              onSuccess: (id) => {
                Alert.alert(id);
              },
              onError: (error) => {
                Alert.alert(error);
              },
            });
          }}
          text="Create Class"
        />

        <Button
          disabled={false}
          onPress={async () => {
            await controllers.class.update({
              id: "Acgyo3JB60wOBqrSRgZC",
              data: {
                subject: "Biology Homework",
                startDate: new Date("2024-05-01T00:00:00.000Z"),
                endDate: new Date("2024-05-01T23:59:59.999Z"),
                startTime: {
                  hour: 7,
                  minutes: 30,
                  unit: "pm",
                }, // 8:00 AM
                endTime: {
                  hour: 9,
                  minutes: 30,
                  unit: "pm",
                }, // 8:00 AM
                schedule: "daily",
              },
              onSuccess: (id) => {
                Alert.alert(id);
              },
              onError: (error) => {
                Alert.alert(error);
              },
            });
          }}
          text="Update Class"
        />

        <Button
          disabled={false}
          onPress={async () => {
            await controllers.task.add({
              data: {
                subject: "Math Homework",
                tags: ["math", "homework"],
                startDate: new Date("2024-05-01T00:00:00.000Z"),
                endDate: new Date("2024-05-01T23:59:59.999Z"),
                startTime: {
                  hour: 6,
                  minutes: 30,
                  unit: "pm",
                }, // 8:00 AM
                endTime: {
                  hour: 8,
                  minutes: 30,
                  unit: "pm",
                }, // 8:00 AM
                schedule: "daily",
                completionStatus: false,
              },
              onSuccess: (id) => {
                Alert.alert(id);
              },
              onError: (error) => {
                Alert.alert(error);
              },
            });
          }}
          text="Create Task"
        />

        <Button
          disabled={false}
          onPress={async () => {
            await controllers.task.update({
              id: "GMl1X8NhrtpkAs6AjIp3",
              data: {
                subject: "Math Homework",
                tags: ["math", "homework"],
                startDate: new Date("2024-05-01T00:00:00.000Z"),
                endDate: new Date("2024-05-01T23:59:59.999Z"),
                startTime: {
                  hour: 7,
                  minutes: 30,
                  unit: "am",
                }, // 8:00 AM
                endTime: {
                  hour: 8,
                  minutes: 30,
                  unit: "am",
                }, // 8:00 AM
                schedule: "weekly",
                completionStatus: false,
              },
              onSuccess: () => {
                Alert.alert("updated");
              },
              onError: (error) => {
                Alert.alert(error);
              },
            });
          }}
          text="Update Task"
        />

        <Button
          disabled={false}
          onPress={async () => {
            const data = await getDueDates();
            const tasks = data.tasks;
            const classes = data.classes;
            console.log(tasks[0].subject);
            console.log(classes.at(0), data.classes);
          }}
          text="Get Schedules"
        />

        <Button
          disabled={false}
          onPress={async () => {
            await controllers.group.add({
              data: {
                title: "Bio Group",
                bio: "just a group",
                time: {
                  unit: "hours",
                  value: 1,
                },
              },
              onError(error) {
                Alert.alert(error);
              },
              onSuccess(error) {
                Alert.alert(error);
              },
            });
          }}
          text="Create Group"
        />

        <Button
          disabled={false}
          onPress={async () => {
            await controllers.group.update({
              id: "x",
              data: {
                title: "Math Group",
                bio: "just a group",
                time: {
                  unit: "hours",
                  value: 1,
                },
              },
              onSuccess: () => {
                Alert.alert("updated");
              },
              onError: (error) => {
                Alert.alert(error);
              },
            });
          }}
          text="Update Group"
        />

        <Button
          disabled={false}
          onPress={async () => {
            await controllers.group.join({
              id: "lUu472b6sU193YlEO7ZV",
              onSuccess: (id) => {
                Alert.alert(id);
              },
              onError: (error) => {
                Alert.alert(error);
              },
            });
          }}
          text="Join Group"
        />

        <Button
          disabled={false}
          onPress={async () => {
            await controllers.group.sessions.add({
              data: {
                group: "lUu472b6sU193YlEO7ZV",
                milliseconds: 3600 * 1000,
              },
              onError(error) {
                Alert.alert(error);
              },
              onSuccess(error) {
                Alert.alert(error);
              },
            });
          }}
          text="Create Session"
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
