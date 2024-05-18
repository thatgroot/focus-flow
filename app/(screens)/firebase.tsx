import React, { useState } from "react";
import { View, StyleSheet, ScrollView, Alert } from "react-native";
import Button from "@/elements/Button";
import { theme } from "@/styles/theme";
import { controllers, getDueDates } from "@/utils/crud";
import { auth } from "@/utils/firebase";

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
                tags: ["math", "homework"],
                completionStatus:false,
                note:"",
                startDate: new Date("2024-05-01T00:00:00.000Z"),
                endDate: new Date("2024-05-01T23:59:59.999Z"),
                startTime: new Date("2024-05-01T20:50:59.999Z"), // 8:00 AM
                endTime: new Date("2024-05-01T20:50:59.999Z"), // 8:00 AM// 8:00 AM
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
                completionStatus:false,
                note:"",
                tags:[],
                subject: "Biology Homework",
                startDate: new Date("2024-05-01T00:00:00.000Z"),
                endDate: new Date("2024-05-01T23:59:59.999Z"),
                startTime: new Date("2024-05-01T20:50:59.999Z"), // 8:00 AM
                endTime: new Date("2024-05-01T20:50:59.999Z"), // 8:00 AM// 8:00 AM
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
                completionStatus:false,
                note:"",
                startDate: new Date("2024-05-01T00:00:00.000Z"),
                endDate: new Date("2024-05-01T23:59:59.999Z"),
                startTime: new Date("2024-05-01T20:50:59.999Z"), // 8:00 AM
                endTime: new Date("2024-05-01T20:50:59.999Z"), // 8:00 AM// 8:00 AM
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
                completionStatus:false,
                note:"",
                startDate: new Date("2024-05-01T00:00:00.000Z"),
                endDate: new Date("2024-05-01T23:59:59.999Z"),
                startTime: new Date("2024-05-01T20:50:59.999Z"), // 8:00 AM
                endTime: new Date("2024-05-01T20:50:59.999Z"), // 8:00 AM// 8:00 AM
                schedule: "daily",
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
          }}
          text="Get Schedules"
        />

        <Button
          disabled={false}
          onPress={async () => {
            await controllers.group.add({
              data: {
                uid:auth.currentUser?.uid,
                title: "Bio Group",
                bio: "just a group",
                time:  "60 minutes",
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
                time:  "30 minutes",
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
              id: "m9epW53D95IfwPDv3htu",
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
            // await controllers.group.sessions.add({
            //   group:"zDrwbl7eytqraNsuUmEl",
            //   data:{
            //     time: (new Date()).getMilliseconds()
            //   },
            //   onError(error) {
            //     Alert.alert(error);
            //   },
            //   onSuccess(id) {
            //     Alert.alert(id);
            //   },
            // });
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
