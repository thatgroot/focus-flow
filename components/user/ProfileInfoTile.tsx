import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Avatar } from "../Avatar";
import { auth } from "@/utils/firebase";
import { getFlexDirection, t } from "@/utils/helpers";
import { useAppStore } from "@/store";

export default function ProfileInfoTile() {
  const { locale } = useAppStore();

  return (
    <View style={[styles.mainProfile,  getFlexDirection(locale)]}>
      <Avatar />
      <View>
        <Text style={styles.heading}>
          {t("hi")}, {auth.currentUser?.displayName}
        </Text>
        <Text style={[styles.heading, styles.headingSub]}>
          {t("good_morning")}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  mainProfile: {
    flexDirection: "row",
    gap: 10,
  },
  heading: {
    color: "#353535",
    lineHeight: 20,
    fontSize: 15,
    fontFamily: "Inter-Medium",
    letterSpacing: 1,
  },
  headingSub: {
    color: "#9AA5B5",
    fontSize: 14,
    lineHeight: 20,
    letterSpacing: 1,
  },
});
