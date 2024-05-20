import React, { createRef, useEffect, useRef, useState } from "react";
import {
  View,
  StyleSheet,
  Image,
  Text,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  TextInput,
  Alert,
  InteractionManager,
  KeyboardAvoidingView,
  Platform,
} from "react-native";

import { useRouter } from "expo-router";
import { auth } from "@/utils/firebase";
import { updateUser } from "@/utils/auth";
import { t } from "@/utils/helpers";
import PromiseWaiter from "@/components/promises/PromiseWaiter";

const EditProfile: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const emailRef = useRef<any>(null);
  const passwordRef = useRef<any>(null);
  const confirmRef = useRef<any>(null);

  const [editable, setEditable] = useState({
    email: false,
    password: false,
  });

  const [user, setUser] = useState<{
    email: string;
    password: string;
    new_password: string;
  }>({
    email: "",
    password: "",
    new_password: "",
  });
  const handleButtonPress = () => {
    emailRef.current?.focus();
  };
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView style={styles.container}>
        <View style={styles.mainView}>
          <TouchableOpacity
            style={{
              height: 32,
              width: 32,
              justifyContent: "center",
              alignItems: "center",
            }}
            onPress={() => router.back()}
          >
            <Image
              style={styles.LeftIcon}
              source={require("@/assets/icons/back.png")}
            />
          </TouchableOpacity>

          <Text style={styles.heading}>Settings</Text>

          <View />
        </View>
        <Text style={[styles.heading, styles.ManageAccout]}>
          {t("manage_account")}
        </Text>
        <View style={{ paddingVertical: 30, gap: 36 }}>
          <View>
            <Text style={styles.StylesTitle}>{t("change_email_address")}</Text>
            <View
              style={[
                styles.input_container,
                {
                  borderColor: !editable.email ? "#ececec" : "#afafaf",
                },
              ]}
            >
              {editable.email ? (
                <TextInput
                  ref={emailRef}
                  editable={editable.email}
                  autoCapitalize="none"
                  autoFocus={true}
                  placeholder={auth.currentUser?.email || ""}
                  style={styles.input}
                  showSoftInputOnFocus={true}
                  placeholderTextColor={"#9AA5B5"}
                  onChangeText={(text) => {
                    emailRef.current.focus();
                    setUser({
                      ...user,
                      email: text,
                    });
                  }}
                />
              ) : (
                <Text
                  style={[
                    styles.input,
                    { textAlign: "left", alignSelf: "auto" },
                  ]}
                >
                  {auth.currentUser?.email}
                </Text>
              )}
              <TouchableOpacity
                style={styles.action}
                onPress={() => {
                  handleButtonPress();
                  setEditable({
                    ...editable,
                    email: !editable.email,
                    password: false,
                  });
                }}
              >
                <Image
                  style={{
                    objectFit: "contain",
                    width: 18,
                  }}
                  source={require("@/assets/icons/pencil.png")}
                />
              </TouchableOpacity>
            </View>
          </View>
          <View>
            <Text style={styles.StylesTitle}>{t("old_password")}</Text>
            <View
              style={[
                styles.input_container,
                {
                  borderColor: !editable.password ? "#ececec" : "#afafaf",
                },
              ]}
            >
              {editable.password ? (
                <TextInput
                  ref={passwordRef}
                  autoCapitalize={"none"}
                  editable={editable.password}
                  placeholder={t("password")}
                  autoComplete="off"
                  autoFocus={true}
                  defaultValue={user.password}
                  style={[
                    styles.input,
                    {
                      opacity: editable.password ? 1 : 0.3,
                    },
                  ]}
                  placeholderTextColor={"#9AA5B5"}
                  onChangeText={(text) => {
                    setUser({
                      ...user,
                      password: text,
                    });
                  }}
                />
              ) : (
                <Text
                  style={[
                    styles.input,
                    { textAlign: "left", alignSelf: "auto" },
                  ]}
                >
                  {user.password || t("password")}
                </Text>
              )}
              <TouchableOpacity
                style={styles.action}
                onPress={() => {
                  if (!editable.password) {
                    passwordRef.current?.focus();
                  }
                  setEditable({
                    ...editable,
                    password: !editable.password,
                    email: false,
                  });
                }}
              >
                <Image
                  style={{
                    objectFit: "contain",
                    width: 18,
                  }}
                  source={require("@/assets/icons/pencil.png")}
                />
              </TouchableOpacity>
            </View>
          </View>
          <View>
            <Text style={styles.StylesTitle}>{t("new_password")}</Text>
            <View
              style={[
                styles.input_container,
                {
                  borderColor: !editable.password ? "#ececec" : "#afafaf",
                },
              ]}
            >
              <TextInput
                autoCapitalize={"none"}
                editable={editable.password}
                placeholder={t("new_password")}
                autoComplete="off"
                autoFocus={true}
                style={[
                  styles.input,
                  {
                    opacity: editable.password ? 1 : 0.3,
                  },
                ]}
                placeholderTextColor={"#9AA5B5"}
                onChangeText={(text) => {
                  setUser({
                    ...user,
                    new_password: text,
                  });
                }}
              />
            </View>
          </View>
        </View>

        {loading ? (
          <View
            style={{
              marginTop: 90,
            }}
          >
            <PromiseWaiter />
          </View>
        ) : (
          <TouchableOpacity
            style={styles.btn}
            onPress={() => {
              if (
                editable.email &&
                user?.email &&
                auth.currentUser?.email !== user.email
              ) {
                setLoading(true);
                updateUser.email({
                  value: user.email,
                  onSuccess: (message) => {
                    setLoading(false);
                    Alert.alert(message);
                  },
                  onError: (error) => {
                    setLoading(false);
                  },
                });
              } else if (
                editable.password &&
                user.password &&
                user.new_password
              ) {
                setLoading(true);
                updateUser.password({
                  old_password: user.password,
                  new_password: user.new_password,
                  onSuccess: (message) => {
                    setLoading(false);
                    Alert.alert(message);
                  },
                  onError: (error) => {
                    setLoading(false);
                    Alert.alert(error.toString());
                  },
                });
              } else {
                setLoading(false);
                Alert.alert("Nothing to update");
              }
            }}
          >
            <Text style={[styles.heading, styles.BtnText]}>Save Changes</Text>
          </TouchableOpacity>
        )}
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FAFAFA",
    width: "100%",
    height: "100%",
    paddingHorizontal: 22,
    paddingVertical: 22,
    paddingTop: 72,
  },
  LeftIcon: {
    width: 18,
    height: 18,
  },
  heading: {
    color: "rgba(53, 53, 53, 1)",
    fontFamily: "Inter-Bold",
    lineHeight: 24,
    fontSize: 16,
    letterSpacing: 1,
  },
  BtnText: {
    color: "rgba(255, 255, 255, 1)",
  },
  ManageAccout: {
    fontSize: 16,
    fontWeight: "600",
    marginTop: 36,
  },
  mainStudy: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
  },

  mainView: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  StylesTitle: {
    color: "rgba(53, 53, 53, 1)",
    lineHeight: 20,
    fontSize: 16,
    fontFamily: "Inter-Medium",
    letterSpacing: 1,
    marginLeft: 10,
  },

  input_container: {
    borderWidth: 2,
    borderColor: "#afafaf",
    width: "100%",
    height: 60,
    borderRadius: 100,
    justifyContent: "flex-end",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    marginTop: 16,
  },

  input: {
    flex: 1,
    color: "#9AA5B5",
    fontSize: 16,
    fontWeight: "300",
    alignSelf: "stretch",
  },

  action: {
    alignSelf: "stretch",
    width: 36,
    justifyContent: "center",
    alignItems: "center",
  },

  btn: {
    width: 196,
    height: 50,
    backgroundColor: "rgba(139, 152, 221, 0.77)",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 100,
    marginTop: 90,
    alignSelf: "center",
  },
});

export default EditProfile;
