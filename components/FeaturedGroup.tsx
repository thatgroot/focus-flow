import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Users } from "./Users";
import { Image } from "expo-image";
// import { LinearGradient } from "expo-linear-gradient";


export const FeaturedGroup: React.FC<StudyGroupProps> = ({
  title,
  type,
  users,
  count,
//   gradient
}) => {
  return (
    <View

      style={styles.container}
    >
        <View style={styles.innerContainer}>
          <View style={styles.titleContainer}>
            <Text style={styles.titleText}>{type}</Text>
            <Image
            tintColor={"#9AA5B5"}
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
          <Text style={styles.countText}>{count}</Text>
          <Image
          tintColor={"rgba(154, 165, 181, 1)"}
            source={require("@/assets/icons/next-white.png")}
            style={{ height: 12, width: 12 }}
          />
        </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "space-between",
    backgroundColor:'white',

    alignItems: "center",
    height: 148,
    maxWidth: 185,
    width:"100%",
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
    color: "#9AA5B5",
    opacity: 0.74,
  },
  subtitleText: {
    fontSize: 20,
    fontWeight: "600",
    color: "#353535",
  },
  infoContainer: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "stretch",
    justifyContent: "space-between",
    backgroundColor: "rgba(128, 129, 145, 0.09)",
    borderRadius: 40,
    paddingHorizontal: 6,
  },

  avatarWrapper: {
    borderRadius: 20,
    // backgroundColor: "rgba(255, 255, 255, 0.14)",
  },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
  },
  countText: {
    fontSize: 16,
    fontFamily: 'Inter-Bold',
    color: "rgba(154, 165, 181, 1)",
  },
});
