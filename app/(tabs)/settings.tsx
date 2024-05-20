import React, { useMemo } from "react";
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
import { getFlexDirection, getTextAlignment, t } from "@/utils/helpers";
import LanguageSelector from "@/components/localization/LanguageSelector";
import { useAppStore } from "@/store";

const settings: React.FC = () => {
  const router = useRouter();

  const { locale } = useAppStore();

  const direction =   getFlexDirection(locale)

  const account_navigation = [
    {
      title: "edit_profile",
      icon: require("@/assets/images/user.png"),
      route: "/pages/edit_profile",
    },
    {
      title: "manage_account",
      icon: require("@/assets/images/profile_9483336.png"),
      route: "/ManageAccount",
    },
    {
      title: "contact_support",
      icon: require("@/assets/images/customer-service_174188 .png"),
      route: "/ContactSupport",
    },
  ];

  const community_navigation = [
    {
      title: "faqs_title",
      icon: require("@/assets/images/FAQ.png"),
      route: "/FAQs",
    },
    {
      title: "logout",
      icon: require("@/assets/images/logout.png"),
      route: "",
    },
  ];

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      router.push("/auth/signin");
    } catch (_error) {
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView style={styles.container}>
        <View style={[styles.mainsection, direction]}>
          <View style={[styles.ProfileMain, direction]}>
            <Avatar />
            <View>
              <Text style={styles.heading}>
                {auth.currentUser?.displayName}
              </Text>
            </View>
          </View>
          <TouchableOpacity
            onPress={() => router.push("/pages/edit_profileUploads")}
          >
            <Image
              style={styles.ProfileEdit}
              source={require("@/assets/icons/pencil.png")}
            />
          </TouchableOpacity>
        </View>

        <Text
          style={[
            styles.headingTimer,
            {
              textAlign: locale === "ar" ? "right" : "left",
            },
          ]}
        >
          {t("language_settings")}
        </Text>
        <LanguageSelector route="/settings" />
        <View
          style={{
            gap: 12,
          }}
        >
          <Text style={styles.headingTimer}>{t("account_title")}</Text>
          <View
            style={{
              gap: 4,
            }}
          >
            {account_navigation.map(({ title, icon, route }, index) => (
              <TouchableOpacity
                key={index}
                style={[styles.AccountView, direction]}
                onPress={() => router.push(route as any)}
              >
                <View style={[styles.IconView, direction]}>
                  <View style={styles.BoxView}>
                    <Image style={styles.userIcon} source={icon} />
                  </View>
                  <Text style={styles.headingEdit}>{t(title as any)}</Text>
                </View>

                <Image
                  style={[
                    styles.Arrow,
                    {
                      transform: [
                        { rotate: locale === "ar" ? "180deg" : "0deg" },
                      ],
                    },
                  ]}
                  source={require("@/assets/images/GroupArrow.png")}
                />
              </TouchableOpacity>
            ))}
          </View>
        </View>
        <View
          style={{
            gap: 12,
          }}
        >
          <Text style={styles.headingTimer}>{t("community_title")}</Text>
          <View
            style={{
              gap: 4,
            }}
          >
            {community_navigation.map(({ title, icon, route }, index) => (
              <TouchableOpacity
                key={index}
                style={[styles.AccountView,direction]}
                onPress={() => {
                  if (title == "logout") {
                    handleSignOut();
                  } else {
                    router.push(route as any);
                  }
                }}
              >
                <View style={[styles.IconView,direction]}>
                  <View style={styles.BoxView}>
                    <Image style={styles.userIcon} source={icon} />
                  </View>
                  <Text style={styles.headingEdit}>{t(title as any)}</Text>
                </View>

                <Image
                   style={[
                    styles.Arrow,
                    {
                      transform: [
                        { rotate: locale === "ar" ? "180deg" : "0deg" },
                      ],
                    },
                  ]}
                  source={require("@/assets/images/GroupArrow.png")}
                />
              </TouchableOpacity>
            ))}
          </View>
        </View>
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
