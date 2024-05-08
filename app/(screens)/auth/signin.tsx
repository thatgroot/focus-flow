import LabeledInput from "@/components/InputField";
import Button from "@/elements/Button";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { ScrollView, View, Text, Image, StyleSheet, Alert, I18nManager, KeyboardAvoidingView } from "react-native";
import { signin } from "@/utils/auth";
import { TouchableOpacity } from "react-native-gesture-handler";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "@/utils/firebase";
import { t } from "@/utils/helpers";

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
  // const shouldBeRTL = true;
  // if (shouldBeRTL !== I18nManager.isRTL && Platform.OS !== 'web') {
  //   I18nManager.allowRTL(shouldBeRTL);
  //   I18nManager.forceRTL(shouldBeRTL);
  //   reloadAsync();
  // }


  return (
    <ScrollView>
      <KeyboardAvoidingView behavior="position" enabled style={styles.container}>
        <Text  >{I18nManager.isRTL ? ' RTL' : ' LTR'}</Text>

        <Image
          style={styles.image}
          source={require("@/assets/images/register_illustration.png")}
        />
        <View style={styles.content}>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>{t("signin")}</Text>
            <Text style={styles.description}>
              {t("signin_subtitle")}
            </Text>
          </View>
          <LabeledInput
            label={t("enter_email")}
            placeholder="teebaapp123@gmail.com"
            inputType="email"
            inputState="inactive"
            error={t("invalid_email")}
            onChangeText={(text: string) => {
              setData({ ...data, email: text });
            }}
          />
          <View style={styles.inputContainer}>
            <LabeledInput
              label={t("enter_password")}
              placeholder="Password"
              inputType="password"
              inputState="inactive"
              error=""
              onChangeText={(text: string) => {
                setData({ ...data, password: text });
              }}
            />
            <TouchableOpacity style={styles.checkboxContainer} onPress={async () => {
              if (data.email) {
                await sendPasswordResetEmail(auth, auth.currentUser?.email!)
                Alert.alert(t("reset_link"))
              } else {
                Alert.alert(t("provide_email"))
              }

            }}>
              <Text style={styles.forgotPassword}>{t("forgot_password")}</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.buttonContainer}>
            <Button
              disabled={false}
              onPress={async () => {
                setLoading(true);
                signin({
                  email: data.email,
                  password: data.password,
                  onError: (error) => {
                    setLoading(false);
                    Alert.alert(error)
                  },
                  onSuccess: () => {
                    setLoading(false);
                    router.push("/home_screen")
                  }
                })
              }}
              text={loading ? t("signing_in") : t("signin")}
            />
            <View style={styles.alternateAction}>
              <Text style={styles.alternateText1}>
                {t("have_an_account")}
              </Text>
              <TouchableOpacity onPress={() => {
                router.push("/auth/register");
              }}>
                <Text style={styles.alternateText2}>{t("register")}</Text>
              </TouchableOpacity>
            </View>
          </View>
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
  content: {
    gap: 24,
    paddingHorizontal: 18,
  },
  titleContainer: {
    gap: 6,
    alignItems: "center",
  },
  title: {
    fontSize: 20,
    fontFamily: "Inter-Bold",
    textAlign: "center",
    color: "#8c99de",
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
    justifyContent: "flex-end",
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
    flexDirection: "row",
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

export default Signin;
