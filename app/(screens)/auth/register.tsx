import React, {  useState, useMemo } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Alert,
  KeyboardAvoidingView,
} from "react-native";
import LabeledInput from "@/components/InputField";
import Button from "@/elements/Button";
import Link from "@/elements/Link";
import { register } from "@/utils/auth";
import { getFlexDirection, t } from "@/utils/helpers";
import { useRouter } from "expo-router";
import { Image } from "expo-image";
import LanguageSelector from "@/components/localization/LanguageSelector";
import { useAppStore } from "@/store";

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
  const direction = useMemo(() => getFlexDirection(locale), [locale]);

  const fields = useMemo(
    () => [
      {
        label: t("full_name"),
        placeholder: t("full_name"),
        type: "text",
        error: "Name is required!",
        state: "inactive",
        name: "name",
      },
      {
        label: t("email_address"),
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
    ],
    [locale]
  );

  const onHandleSignup = async () => {
    try {
      setLoading(true);
      register({
        ...data,
        onError: (error) => {

          Alert.alert(error.message);
        },
        onSuccess: (message) => {
          Alert.alert(message);
          router.push("/auth/signin");
        },
      }).finally(() => setLoading(false));
    } catch (error: any) {
      setLoading(false);
      Alert.alert(error.message);
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
          <Text style={styles.title}>{t("create_account_label")}</Text>
          <Text style={styles.description}>{t("signin_subtitle")}</Text>

          {fields.map(
            ({ label, placeholder, type, error, state, name }, index) => (
              <LabeledInput
                key={index}
                label={label}
                placeholder={placeholder}
                inputType={type as any}
                error={error}
                inputState={
                  matching && type === "password" ? "valid" : (state as any)
                }
                onChangeText={(text) =>
                  setData((prevData) => ({ ...prevData, [name]: text }))
                }
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

export default React.memo(Signup);
