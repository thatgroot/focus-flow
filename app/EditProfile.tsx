import React, { useState } from "react";
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
} from "react-native";

import { useNavigation, useRouter } from "expo-router";
import { auth } from "@/utils/firebase";
import { updateUser } from "@/utils/auth";

const EditProfile: React.FC = () => {
  const router = useRouter();

  const [user, setUser] = useState<{
    email: string;
    password: string;
  }>({
    email: "",
    password: "",
  });

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView style={styles.container}>
        <View style={styles.mainView}>
          <TouchableOpacity onPress={() => router.back()}>
            <Image
              style={styles.LeftIcon}
              source={require("../assets/images/iconleft.png")}
            />
          </TouchableOpacity>

          <Text style={styles.heading}>Settings</Text>

          <View />
        </View>
        <Text style={[styles.heading, styles.ManageAccout]}>
          Manage Account
        </Text>
        <View style={{ paddingVertical: 30 }}>
          <Text style={styles.StylesTitle}>Change Email Address</Text>
          <View style={styles.mainSearch}>
            <TextInput
              autoCapitalize="none"
              placeholder={auth.currentUser?.email || ""}
              style={styles.TextInput}
              placeholderTextColor={"#9AA5B5"}
              onChangeText={(text) => {
                setUser({
                  ...user,
                  email: text,
                });
              }}
            />
            <TouchableOpacity>
              <Image
                style={{
                  objectFit: "contain",
                  width: 18,
                }}
                source={require("../assets/icons/pencil.png")}
              />
            </TouchableOpacity>
          </View>
        </View>
        <View>
          <Text style={styles.StylesTitle}>Change Password</Text>
          <View style={styles.mainSearch}>
            <TextInput
              placeholder="Password"
              style={styles.TextInput}
              placeholderTextColor={"#9AA5B5"}
              onChangeText={(text) => {
                setUser({
                  ...user,
                  password: text,
                });
              }}
            />
            <TouchableOpacity>
              <Image
                style={{
                  objectFit: "contain",
                  width: 18,
                }}
                source={require("../assets/icons/pencil.png")}
              />
            </TouchableOpacity>
          </View>
        </View>

        <TouchableOpacity
          style={styles.btn}
          onPress={() => {
            if (user?.email && auth.currentUser?.email !== user.email) {
              updateUser.email({
                value: user.email,
                onSuccess: (message) => {
                  Alert.alert(message);
                },
                onError: (error) => {
                  console.log(error);
                },
              });
            }else {
                console.log(user.password)
                updateUser.password({
                    value: user.password,
                    onSuccess: (message) => {
                      Alert.alert(message);
                    },
                    onError: (error) => {
                     console.log(error);
                    },
                  });
            }
          }}
        >
          <Text style={[styles.heading, styles.BtnText]}>Save Changes</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FAFAFA",
    width: "100%",
    height: "100%",
    paddingHorizontal: 22,
    paddingVertical: 22,
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
    marginTop: 37,
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

  mainSearch: {
    borderWidth: 2,
    borderColor: "rgba(154, 165, 181, 1)",
    width: "100%",
    height: 60,
    borderRadius: 100,
    justifyContent: "center",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    marginTop: 16,
  },

  TextInput: {
    flex: 1,
    color: "#9AA5B5",
    fontSize: 16,
    fontWeight: "300",
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
