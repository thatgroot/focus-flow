import LabeledInput from "@/components/InputField";
import Button from "@/elements/Button";
import Link from "@/elements/Link";
import { register } from "@/utils/auth";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Alert, ScrollView, StyleSheet, Text, View } from "react-native";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "@/utils/firebase";
const Signup = () => {
  const router = useRouter();

  const [data, setData] = useState<{
    name: string;
    email: string;
    password: string;
  }>({
    name: "",
    email: "",
    password: "",
  });
  const [matching, setMatching] = useState(false);

  const onHandleSignup = async () => {
    try {
      register({ ...data }).then(({ error, message }) => {
        if (error) {
          Alert.alert(message);
        } else {
          router.push("/auth/signin");
        }
      });
    } catch (error: any) {
      Alert.alert(error.message);
    }
  };

  return (
    <ScrollView>
      <View style={{ flex: 1, gap: 18, paddingVertical: 48 }}>
        <Image
          style={{
            width: "100%",
            height: 350,
          }}
          source={require("@/assets/images/register_illustration.png")}
        />
        <View
          style={{
            gap: 56,
            paddingHorizontal: 18,
          }}
        >
          <View style={{ gap: 24, alignItems: "center" }}>
            <View
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "flex-start",
                alignItems: "center",
                flexGrow: 0,
                flexShrink: 0,
                position: "relative",
                gap: 7,
              }}
            >
              <Text style={styles.title}>Create an Account</Text>
              <Text style={styles.description}>
                Enter Your Credentials to Continue:
              </Text>
            </View>

            <LabeledInput
              label="Full Name"
              placeholder="Full Name"
              inputType="text"
              error="Name is require!"
              inputState="inactive"
              onChangeText={(text) => {
                setData({ ...data, name: text });
              }}
            />

            <LabeledInput
              label="Enter Email"
              placeholder="teebaapp123@gmail.com"
              inputType="email"
              error="Invalid Email. Try another one"
              inputState="inactive"
              onChangeText={(text) => {
                setData({ ...data, email: text });
              }}
            />

            <LabeledInput
              label="Enter Password"
              placeholder="Password"
              inputType="password"
              error=""
              inputState="inactive"
              onChangeText={(text) => {
                setData({ ...data, password: text });
              }}
            />

            <LabeledInput
              label="Confirm Password"
              placeholder="Confirm Password"
              inputType="password"
              error={!matching ? "Passwords do not match." : ""}
              inputState={!matching ? "invalid" : "valid"}
              onChangeText={(text) => {
                setMatching(text === data.password);
              }}
            />
          </View>

          <View
            style={{
              alignItems: "center",
              gap: 24,
            }}
          >
            <Button
              disabled={!matching}
              onPress={onHandleSignup}
              text="Signup"
            />
            <Link
              text="Sign in"
              onPress={() => {
                router.push("/auth/signin");
              }}
            />
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    fontFamily: "Inter-Bold",
    textAlign: "left",
    color: "#8c99de",
  },
  description: {
    fontSize: 14,
    textAlign: "left",
    color: "#353535",
  },
  alternateAction: {
    gap: 24,
    justifyContent: "center",
    flexDirection: "row",
  },
  text1: {
    fontSize: 14,
    textAlign: "left",
    color: "#353535",
  },
  text2: {
    fontSize: 14,
    fontWeight: "700",
    textAlign: "left",
    color: "#8c99de",
  },
});

export default Signup;
