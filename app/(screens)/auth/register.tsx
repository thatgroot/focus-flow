import React, { useState } from "react";
import { View, Text, StyleSheet, ScrollView, Alert } from "react-native";
import LabeledInput from "@/components/InputField";
import Button from "@/elements/Button";
import Link from "@/elements/Link";
import { register } from "@/utils/auth";
import { t } from "@/utils/helpers";
import { useRouter } from "expo-router";
import { Image } from "expo-image";

const Signup = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

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

  const fields: {
    label: string;
    placeholder: string;
    type: InputType;
    error: string;
    state: InputState;
    name: string;
  }[] = [
    {
      label: t("full_name"),
      placeholder: t("full_name"),
      type: "text",
      error: "Name is required!",
      state: "inactive",
      name: "name",
    },
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
      placeholder: t("password"),
      type: "password",
      error: "",
      state: "inactive",
      name: "password",
    },
  ];

  const onHandleSignup = async () => {
    try {
      setLoading(true);
      register({
        ...data,
        onError: (error) => {
          console.log(error);
        },
        onSuccess: (message) => {
          console.log(message);
        },
      }).then(({ error, message }) => {
        if (error) {
          Alert.alert(message);
        } else {
          router.push("/auth/signin");
        }
        setLoading(false);
      });
    } catch (error: any) {
      setLoading(false);
      Alert.alert(error.message);
    }
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <Image
          source={require("@/assets/images/register_illustration.png")}
          style={styles.image}
        />
        <View style={styles.formContainer}>
          <Text style={styles.title}>{t("create_account_label")}</Text>
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

          <Button
            disabled={!matching}
            onPress={onHandleSignup}
            text={loading ? t("processing_request") : t("sign_up")}
          />
          <Link
            text={t("signin")}
            onPress={() => router.push("/auth/signin")}
          />
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
});

export default Signup;
