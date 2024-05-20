import React, { memo, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import LabeledInput from "@/components/InputField";
import Button from "@/elements/Button";
import { register } from "@/utils/auth";
import { getFlexDirection, t } from "@/utils/helpers";
import { useRouter } from "expo-router";
import { Image } from "expo-image";
import { useAppStore } from "@/store";
import LanguageSelector from "@/components/localization/LanguageSelector";
import Link from "@/elements/Link";

const Signup = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [matching, setMatching] = useState(false);

  const { locale } = useAppStore();
  const direction = getFlexDirection(locale);

  const onHandleSignup = () => {
    setLoading(true);
    register({
      name: data.name,
      email: data.email,
      password: data.password,
      onError: (error) => {
        setLoading(false);
        Alert.alert(error);
      },
      onSuccess: (message) => {
        Alert.alert(message);
        setLoading(false);
        router.push("/auth/signin");
      },
    });
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView>
        <Image
          source={require("@/assets/images/register_illustration.png")}
          style={styles.image}
        />
        <View style={styles.formContainer}>
          <Text style={styles.title}>{t("create_account_label")}</Text>
          <Text style={styles.description}>{t("signin_subtitle")}</Text>
          <LabeledInput
            label={t("full_name")}
            placeholder={t("full_name")}
            keyboardType="default"
            inputType="text"
            error="Name is required!"
            inputState="inactive"
            name="name"
            onChangeText={(name, text) => {
              setData((prevData) => ({ ...prevData, [name]: text }));
            }}
          />

          <LabeledInput
            label={t("email_address")}
            placeholder="teebaapp123@gmail.com"
            keyboardType="email-address"
            inputType="email"
            error={t("invalid_email")}
            inputState="inactive"
            name="email"
            onChangeText={(name, text) => {
              setData((prevData) => ({ ...prevData, [name]: text }));
            }}
          />

          <LabeledInput
            label={t("enter_password")}
            placeholder={t("password")}
            keyboardType="default"
            inputType="password"
            error=""
            inputState="inactive"
            name="password"
            onChangeText={(name, text) => {
              setData((prevData) => ({ ...prevData, [name]: text }));
            }}
          />

          <LabeledInput
            label={t("confirm_password")}
            placeholder={t("confirm_password")}
            keyboardType="default"
            inputType="password"
            error={!matching && data.password ? t("password_mismatch") : ""}
            inputState={!matching ? "invalid" : "valid"}
            name="confirm_password"
            onChangeText={(name, text) => {
              setMatching(text === data.password);
            }}
          />

          <Button
            disabled={!matching || loading}
            onPress={onHandleSignup}
            text={loading ? t("processing_request") : t("sign_up")}
          />

          <View style={[styles.alternateAction, direction]}>
            <Text style={styles.alternateText1}>
              {t("already_have_account")}
            </Text>
            <Link
              text={t("signin")}
              onPress={() => router.push("/auth/signin")}
            />
          </View>
        </View>
        <View style={styles.languageSelector}>
          <LanguageSelector route="/auth/register" />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
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
  formContainer: {
    alignItems: "center",
    gap: 24,
    paddingHorizontal: 18,
    paddingBottom: 96,
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
    justifyContent: "flex-start",
    alignItems: "flex-start",
    position: "relative",
    gap: 8,
  },
  alternateText1: {
    fontSize: 14,
    textAlign: "left",
    color: "#353535",
  },
  languageSelector: {
    position: "absolute",
    top: 78,
    right: 32,
  },
});

export default memo(Signup);
