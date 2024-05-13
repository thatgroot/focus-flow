import React from "react";
import {
  View,
  StyleSheet,
  Image,
  Text,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Alert,
} from "react-native";

import { useRouter } from "expo-router";
import { auth } from "@/utils/firebase";
import { signOut } from "firebase/auth";
import { Avatar } from "@/components/Avatar";
import {
  t,
} from "@/utils/helpers";
import LanguageSelector from "@/components/localization/LanguageSelector";

const settings: React.FC = () => {
  const router = useRouter();

  const account_navigation = [
    {
      title: t("edit_profile"),
      icon: require("@/assets/images/user.png"),
      route: "/EditProfile",
    },
    {
      title: t("manage_account"),
      icon: require("@/assets/images/profile_9483336.png"),
      route: "/ManageAccount",
    },
    {
      title: t("contact_support"),
      icon: require("@/assets/images/customer-service_174188 .png"),
      route: "/ContactSupport",
    },
  ];

  const community_navigation = [
    {
      title: t("faqs_title"),
      icon: require("@/assets/images/FAQ.png"),
      route: "/FAQs",
    },
    {
      title: t("logout"),
      icon: require("@/assets/images/logout.png"),
      route: "",
    },
  ];

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      router.push("/auth/signin");
    } catch (error) {
      console.log({ error });
    }
  };

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

        <Text style={[styles.headingTimer]}>{t("language_settings")}</Text>
        <LanguageSelector route="/home_screen" />
        <Text style={styles.headingTimer}>{t("account_title")}</Text>
        {account_navigation.map(({ title, icon, route }, index) => (
          <TouchableOpacity
            key={index}
            style={styles.AccountView}
            onPress={() => router.push(route as any)}
          >
            <View style={styles.IconView}>
              <View style={styles.BoxView}>
                <Image style={styles.userIcon} source={icon} />
              </View>
              <Text style={styles.headingEdit}>{title}</Text>
            </View>

            <Image
              style={styles.Arrow}
              source={require("../../assets/images/GroupArrow.png")}
            />
          </TouchableOpacity>
        ))}
        <Text style={styles.headingTimer}>{t("community_title")}</Text>
        {community_navigation.map(({ title, icon, route }, index) => (
          <TouchableOpacity
            key={index}
            style={styles.AccountView}
            onPress={() => {
              Alert.alert(title);
              if (title == t("logout")) {
                handleSignOut();
              } else {
                router.push(route as any);
              }
            }}
          >
            <View style={styles.IconView}>
              <View style={styles.BoxView}>
                <Image style={styles.userIcon} source={icon} />
              </View>
              <Text style={styles.headingEdit}>{title}</Text>
            </View>

            <Image
              style={styles.Arrow}
              source={require("../../assets/images/GroupArrow.png")}
            />
          </TouchableOpacity>
        ))}
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
