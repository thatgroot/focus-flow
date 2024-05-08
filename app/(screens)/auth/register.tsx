import LabeledInput from "@/components/InputField";
import Button from "@/elements/Button";
import Link from "@/elements/Link";
import { register } from "@/utils/auth";
import { t } from "@/utils/helpers";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Alert, KeyboardAvoidingView, ScrollView, StyleSheet, Text, View } from "react-native";
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
      <KeyboardAvoidingView behavior="padding" enabled style={{ flex: 1, gap: 18, paddingVertical: 48 }}>
        <Image
          style={{
            width: "100%",
            height: 350,
          }}
          source={require("@/assets/images/register_illustration.png")}
        />
        <View
          style={{
            gap: 48,
            paddingHorizontal: 18,
          }}
        >
          <View style={{ gap: 24, alignItems: "center" }}>
            <View
              style={styles.titleContainer}
            >
              <Text style={styles.title}>{t("create_account_label")}</Text>
              <Text style={styles.description}>
                {t("signin_subtitle")}
              </Text>
            </View>

            <LabeledInput
              label={t("full_name")}
              placeholder={t("full_name")}
              inputType="text"
              error="Name is require!"
              inputState="inactive"
              onChangeText={(text) => {
                setData({ ...data, name: text });
              }}
            />

            <LabeledInput
              label={t("enter_email")}
              placeholder="teebaapp123@gmail.com"
              inputType="email"
              error={t("invalid_email")}
              inputState="inactive"
              onChangeText={(text) => {
                setData({ ...data, email: text });
              }}
            />

            <LabeledInput
              label={t("enter_password")}
              placeholder="Password"
              inputType="password"
              error=""
              inputState="inactive"
              onChangeText={(text) => {
                setData({ ...data, password: text });
              }}
            />

            <LabeledInput
              label={t("confirm_password")}
              placeholder={t("confirm_password")}
              inputType="password"
              error={!matching && data.password ? t("password_mismatch") : ""}
              inputState={!matching ? "invalid" : "valid"}
              onChangeText={(text) => {
                setMatching(text === data.password);
              }}
            />
          </View>

          <View
            style={{
              alignItems: "center",
              justifyContent: "flex-start",
              gap: 24,
            }}
          >
            <Button
              disabled={!matching}
              onPress={onHandleSignup}
              text={t("sign_up")}
            />
            <Link
              text={t("signin")}
              onPress={() => {
                router.push("/auth/signin");
              }}
            />
          </View>
        </View>
      </KeyboardAvoidingView>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  titleContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center",
    position: "relative",
    gap: 6,
  },
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
