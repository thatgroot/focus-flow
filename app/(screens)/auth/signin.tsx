import LabeledInput from "@/components/InputField";
import Button from "@/elements/Button";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { ScrollView, View, Text, Image, StyleSheet, Alert } from "react-native";
import { signin } from "@/utils/auth";

const Signup = () => {
  const router = useRouter();
  const [data, setData] = useState<{
    email: string;
    password: string;
  }>({
    email: "",
    password: "",
  });
  return (
    <ScrollView>
      <View style={styles.container}>
        <Image
          style={styles.image}
          source={require("@/assets/images/register_illustration.png")}
        />
        <View style={styles.content}>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>Create an Account</Text>
            <Text style={styles.description}>
              Enter Your Credentials to Continue:
            </Text>
          </View>
          <LabeledInput
            label="Enter Email"
            placeholder="teebaapp123@gmail.com"
            inputType="email"
            inputState="inactive"
            error="Invalid Email. Try another one"
            onChangeText={(text: string) => {
              setData({ ...data, email: text });
            }}
          />
          <View style={styles.inputContainer}>
            <LabeledInput
              label="Enter Password"
              placeholder="Password"
              inputType="password"
              inputState="inactive"
              error=""
              onChangeText={(text: string) => {
                setData({ ...data, password: text });
              }}
            />
            <View style={styles.checkboxContainer}>
              <View style={styles.checkboxContent}>
                <View style={styles.checkbox}></View>
                <Text style={styles.checkboxText}>Remember me</Text>
              </View>
              <Text style={styles.forgotPassword}>Forgot Password?</Text>
            </View>
          </View>
          <View style={styles.buttonContainer}>

            <Button
              disabled={false}
              onPress={async () => {
                await signin({ ...data }).then(({ error, message }) => {
                  if (error) {
                    Alert.alert(message);
                  } else {
                    router.push("/home_screen");
                  }
                });
              }}
              text="Sign In"
            />
            <View style={styles.alternateAction}>
              <Text style={styles.alternateText1}>
                Already have an Account ?
              </Text>
              <Text style={styles.alternateText2}>Sign In</Text>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 18,
    paddingVertical: 48,
  },
  image: {
    width: "100%",
    height: 350,
  },
  content: {
    gap: 24,
    paddingHorizontal: 18,
  },
  titleContainer: {
    gap: 24,
    alignItems: "center",
  },
  title: {
    fontSize: 20,
    fontFamily: "Inter-Bold",
    textAlign: "center",
  },
  description: {
    fontSize: 16,
    textAlign: "center",
    color: "#777",
  },
  inputContainer: {
    alignSelf: "stretch",
    gap: 12,
  },
  checkboxContainer: {
    justifyContent: "space-between",
    alignItems: "flex-start",
    flexDirection: "row",
    alignSelf: "stretch",
  },
  checkboxContent: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  checkbox: {
    width: 16,
    height: 16,
    borderRadius: 2,
    borderWidth: 1,
    borderColor: "#9aa5b5",
  },
  checkboxText: {
    fontSize: 14,
    textAlign: "left",
    color: "#353535",
  },
  forgotPassword: {
    fontSize: 14,
    textAlign: "left",
    color: "#353535",
  },
  buttonContainer: {
    alignItems: "center",
    gap: 24,
  },
  alternateAction: {
    alignItems: "center",
    gap: 24,
  },
  alternateText1: {
    fontSize: 14,
    textAlign: "left",
    color: "#353535",
  },
  alternateText2: {
    fontSize: 14,
    textAlign: "left",
    color: "#8c99de",
    fontWeight: "700",
  },
});

export default Signup;
