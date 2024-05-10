import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Image,
  Text,
  TouchableOpacity,
  SafeAreaView,
  FlatList,
  Modal,
  ScrollView,
  TextInput,
  Switch,
} from "react-native";
import SelectDropdown from "react-native-select-dropdown";

import { Link, useNavigation, useRouter } from "expo-router";
import { auth } from "@/utils/firebase";
import { signOut } from "firebase/auth";
import { Avatar } from "@/components/Avatar";
import { I18n } from "i18n-js";
import { setTranslationHandler, ucFirst } from "@/utils/helpers";
import { useAppStore } from "@/store";
import { translations } from "@/utils/localization";

const settings: React.FC = () => {
  const router = useRouter();
  const { setLocale, locale } = useAppStore();
  const [isEnabled, setIsEnabled] = useState<boolean>(false);

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      console.log("Signed out successfully");
      router.push("/auth/signin");
    } catch (error) {
      console.log({ error });
    }
  };

  function changeLocale(_locale: "en" | "ar") {
    const i18n = new I18n(translations);
    i18n.locale = _locale;
    setTranslationHandler(i18n);
    setLocale(_locale);
    router.push("/home_screen");
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView style={styles.container}>
        <View style={styles.mainsection}>
          <View style={styles.ProfileMain}>
            <Avatar />
            <View>
              <Text style={styles.heading}>
                {auth.currentUser?.displayName}
              </Text>
            </View>
          </View>
          <TouchableOpacity onPress={() => router.push("/EditProfileUploads")}>
            <Image
              style={styles.ProfileEdit}
              source={require("../../assets/icons/pencil.png")}
            />
          </TouchableOpacity>
        </View>

        <Text style={styles.headingTimer}>Language Settings</Text>
        <View style={styles.btnView}>
          <Text style={styles.headingTimerON}>Change Language ({locale})</Text>
          <View
            style={{
              flexDirection: "row",
              gap: 12,
            }}
          >
            <TouchableOpacity
              onPress={() => {
                changeLocale("en");
              }}
            >
              <Text style={styles.headingTimerON}>English</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                changeLocale("ar");
              }}
            >
              <Text style={styles.headingTimerON}>Arabic</Text>
            </TouchableOpacity>
          </View>
        </View>
        <Text style={styles.headingTimer}>Your Account</Text>
        <TouchableOpacity
          style={styles.AccountView}
          onPress={() => router.push("/EditProfile")}
        >
          <View style={styles.IconView}>
            <View style={styles.BoxView}>
              <Image
                style={styles.userIcon}
                source={require("../../assets/images/user.png")}
              />
            </View>
            <Text style={styles.headingEdit}>Edit profile</Text>
          </View>

          <Image
            style={styles.Arrow}
            source={require("../../assets/images/GroupArrow.png")}
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.AccountView}>
          <View style={styles.IconView}>
            <View style={styles.BoxView}>
              <Image
                style={styles.userIcon}
                source={require("../../assets/images/profile_9483336.png")}
              />
            </View>
            <Text style={styles.headingEdit}>Manage account</Text>
          </View>

          <Image
            style={styles.Arrow}
            source={require("../../assets/images/GroupArrow.png")}
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.AccountView}>
          <View style={styles.IconView}>
            <View style={styles.BoxView}>
              <Image
                style={styles.userIcon}
                source={require("../../assets/images/customer-service_174188 .png")}
              />
            </View>
            <Text style={styles.headingEdit}>Contact support</Text>
          </View>

          <Image
            style={styles.Arrow}
            source={require("../../assets/images/GroupArrow.png")}
          />
        </TouchableOpacity>
        <Text style={styles.headingTimer}>Community</Text>
        <TouchableOpacity style={styles.AccountView}>
          <View style={styles.IconView}>
            <View style={styles.BoxView}>
              <Image
                style={styles.userIcon}
                source={require("../../assets/images/FAQ.png")}
              />
            </View>
            <Text style={styles.headingEdit}>FAQ’s</Text>
          </View>

          <Image
            style={styles.Arrow}
            source={require("../../assets/images/GroupArrow.png")}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.AccountView}
          onPress={() => {
            handleSignOut();
          }}
        >
          <View style={styles.IconView}>
            <View style={styles.BoxView}>
              <Image
                style={styles.userIcon}
                source={require("../../assets/images/logout.png")}
              />
            </View>
            <Text style={styles.headingEdit}>Logout</Text>
          </View>

          <Image
            style={styles.Arrow}
            source={require("../../assets/images/GroupArrow.png")}
          />
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
  mainsection: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
  },
  ProfileMain: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
  },
  Profile: {
    width: 90,
    height: 90,
    borderRadius: 100,
  },
  ProfileEdit: {
    width: 14,
    height: 14,
  },
  heading: {
    color: "rgba(30, 32, 34, 1)",
    lineHeight: 24.2,
    fontSize: 14,
    fontFamily: "Inter-Medium",
    letterSpacing: 1,
  },
  btnView: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 29,
  },
  headingTimer: {
    color: "rgba(53, 53, 53, 1)",
    fontWeight: "700",
    lineHeight: 19,
    fontSize: 16,
    fontFamily: "Inter-Bold",
    letterSpacing: 1,
    marginTop: 40,
  },
  AccountView: {
    flexDirection: "row",

    justifyContent: "space-between",
    alignItems: "center",
  },
  IconView: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 15,
    marginTop: 20,
  },
  BoxView: {
    backgroundColor: "white",
    width: 34,
    height: 34,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 100,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 1.84,

    elevation: 5,
  },
  userIcon: {
    width: 14,
    height: 14,
  },

  headingTimerON: {
    color: "rgba(53, 53, 53, 0.61)",
    fontFamily: "Inter-Medium",
    lineHeight: 16.94,
    fontSize: 14,
  },
  headingEdit: {
    color: "rgba(53, 53, 53, 0.61)",
    fontFamily: "Inter-Medium",
    lineHeight: 16.94,
    fontSize: 16,
  },
  headingSub: {
    color: "rgba(119, 131, 143, 1)",
    fontSize: 14,
    lineHeight: 20,
    letterSpacing: 1,
  },
  Arrow: {
    width: 13,
    height: 12,
  },
});

export default settings;
