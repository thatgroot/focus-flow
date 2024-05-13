import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Alert,
  TouchableOpacity,
  KeyboardAvoidingView,
} from "react-native";
import LabeledInput from "@/components/InputField";
import Button from "@/elements/Button";
import Link from "@/elements/Link";
import { register, signin, updateUser } from "@/utils/auth";
import { getFlexDirection, t } from "@/utils/helpers";
import { useRouter } from "expo-router";
import { Image } from "expo-image";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "@/utils/firebase";
import { useAppStore } from "@/store";
import LanguageSelector from "@/components/localization/LanguageSelector";

const Signin = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const [data, setData] = useState<{
    email: string;
    password: string;
  }>({
    email: "",
    password: "",
  });

  const { locale } = useAppStore();
  const direction = getFlexDirection(locale);

  const fields: {
    label: string;
    placeholder: string;
    type: InputType;
    error: string;
    state: InputState;
    name: string;
  }[] = [
    {
      label: t("enter_email"),
      placeholder: "teebaapp123@gmail.com",
      type: "email",
      error: t("invalid_email"),
      state: "inactive",
      name: "email",
    },
    {
      label: t("enter_password"),
      placeholder: "Password",
      type: "password",
      error: "",
      state: "inactive",
      name: "password",
    },
  ];

  const handleSignin = async () => {
    setLoading(true);
    signin({
      email: data.email,
      password: data.password,
      onError: (error) => {
        setLoading(false);
      },
      onSuccess: () => {
        setLoading(false);
        router.push("/home_screen");
      },
    });
  };

  const handleForgotPassword = async () => {
    if (data.email) {
      updateUser.forgotPassword({
        email: data.email,
        onError: (error) => {
          console.log(error);
        },
        onSuccess: (message) => {
          Alert.alert(message);
        },
      });
    } else {
      Alert.alert(t("provide_email"));
    }
  };

  return (
    <ScrollView>
      <KeyboardAvoidingView behavior="padding" style={styles.container}>
        <Image
          source={require("@/assets/images/register_illustration.png")}
          style={styles.image}
        />
        <View style={styles.formContainer}>
          <Text style={styles.title}>{t("signin")}</Text>
          <Text style={styles.description}>{t("signin_subtitle")}</Text>
          {fields.map(
            ({ label, placeholder, type, error, state, name }, index) => (
              <LabeledInput
                key={index}
                label={label}
                placeholder={placeholder}
                inputType={type}
                error={error}
                inputState={state}
                onChangeText={(text) => setData({ ...data, [name]: text })}
              />
            )
          )}

          <TouchableOpacity onPress={handleForgotPassword}>
            <Text style={styles.description}>{t("forgot_password")}</Text>
          </TouchableOpacity>

          <Button
            disabled={!data.email && !data.password}
            onPress={handleSignin}
            text={loading ? t("processing_request") : t("signin")}
          />
          <View style={[styles.alternateAction, direction]}>
            <Text style={styles.alternateText1}>{t("have_an_account")}</Text>
            <TouchableOpacity
              onPress={() => {
                router.push("/auth/register");
              }}
            >
              <Text style={styles.alternateText2}>{t("register")}</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View
          style={{
            position: "absolute",
            top: 78,
            right: 32,
          }}
        >
          <LanguageSelector route="/auth/signin" />
        </View>
      </KeyboardAvoidingView>
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
  formContainer: {
    alignItems: "center",
    gap: 24,
    paddingHorizontal: 18,
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
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderBottomWidth: 1,
    gap: 12,
    borderBottomColor: "#ccc",
  },

  alternateText1: {
    fontSize: 16,
    color: "#666",
  },

  alternateText2: {
    fontSize: 16,
    color: "#8c99de",
    fontWeight: "bold",
  },
});

export default Signin;
