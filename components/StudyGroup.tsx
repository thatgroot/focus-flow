import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Users } from "./Users";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { useAppStore } from "@/store";
import { arabic_dates } from "@/utils/helpers";

export const StudyGroup = ({
  title,
  memberCount,
  gradient,
  users,
}: Group & { gradient: string[]; users: any[] }) => {
  const { locale } = useAppStore();

  return (
    <LinearGradient
      colors={gradient}
      start={[0, 0]}
      end={[1, 0]}
      style={styles.container}
    >
      <View style={styles.innerContainer}>
        <View style={styles.titleContainer}>
          <Text style={styles.titleText}>{"Study Group"}</Text>
          <Image
            source={require("@/assets/icons/group.png")}
            style={{
              width: 22,
              height: 22,
            }}
          />
        </View>
        <Text style={styles.subtitleText}>{title}</Text>
      </View>
      <View style={styles.infoContainer}>
        <Users users={users} />
        <Text style={styles.countText}>
          {locale === "en" ? memberCount : arabic_dates[`${memberCount}`]}
        </Text>
        <Image
          source={require("@/assets/icons/next-white.png")}
          style={{ height: 12, width: 12 }}
        />
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "space-between",
    alignItems: "center",
    height: 148,
    width: "100%",
    padding: 8,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.04,
    shadowRadius: 48,
    elevation: 8,
  },
  innerContainer: {
    gap: 6,
    alignSelf: "stretch",
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "stretch",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  titleText: {
    fontSize: 14,
    color: "white",
    opacity: 0.74,
  },
  subtitleText: {
    fontSize: 20,
    fontFamily: "Inter-Bold",
    color: "white",
  },
  infoContainer: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "stretch",
    justifyContent: "space-between",
    backgroundColor: "#FFFFFF14",
    borderRadius: 40,
    paddingHorizontal: 6,
  },

  avatarWrapper: {
    borderRadius: 20,
    backgroundColor: "rgba(255, 255, 255, 0.14)",
  },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
  },
  countText: {
    fontSize: 16,
    fontFamily: "Inter-Bold",
    color: "white",
  },
});
