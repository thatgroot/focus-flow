import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  Pressable,
  TouchableOpacity,
  Modal,
} from "react-native";
import { useRouter, useNavigation } from "expo-router";

export const Schedules = ({
  item,
}: {
  item: {
    title: string[];
    time: string[];
    due: string[];
    bgColor: string;
    icon: any;
  };
}) => {
  return (
    <View style={styles.container}>
      <View style={[styles.card, { backgroundColor: item?.bgColor, gap: 12 }]}>
        {item?.title?.map((subject: string, index: number) => (
          <View key={index} style={{ ...styles.item, }}>
            <View style={styles.headerTitle}>
              <Text style={styles.subtitle}>{subject}</Text>
              <TouchableOpacity onPress={() => {}}>
                <Image source={item?.icon} style={styles.shareIcon} />
              </TouchableOpacity>
            </View>
            <View style={styles.subDetails}>
              <View style={styles.subDetail}>
                <View
                  style={[
                    styles.subDetailBox,
                    { backgroundColor: "rgba(0, 0, 0, 0.28)" },
                  ]}
                >
                  <Text style={styles.subDetailText}>{item?.time[index]}</Text>
                </View>
              </View>
              <View style={styles.subDetail}>
                {item.due[index] && (
                  <View
                    style={[
                      styles.subDetailBox,
                      { backgroundColor: "#e3485020" },
                    ]}
                  >
                    <Text style={[styles.subDetailText, { color: "#fff" }]}>
                      {item?.due[index]}
                    </Text>
                  </View>
                )}
              </View>
            </View>
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "flex-start",
  },
  card: {
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
    alignSelf: "stretch",
  },
  item: {
    justifyContent: "flex-start",
    flexDirection: "column",
    alignSelf: "stretch",
    gap: 2,
  },
  iconContainer: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    height: 25,
    width: 25,
    borderRadius: 1000,
    backgroundColor: "#8d99de",
  },
  iconText: {
    fontSize: 14,
    fontFamily: "Inter-Bold",
    color: "white",
  },
  title: {
    fontSize: 16,
    fontFamily: "Inter-Bold",
    color: "white",
    flexShrink: 1,
  },
  details: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "flex-start",
  },
  detailText: {
    fontSize: 12,
    color: "white",
  },
  subContainer: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "flex-start",

    width: "100%",
  },

  subtitle: {
    fontSize: 16,
    fontFamily: "Inter-Bold",
    color: "#fff",
    marginBottom: 10,
  },
  subDetails: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    marginBottom: 10,
  },
  subDetail: {
    marginRight: 10,
  },
  subDetailBox: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 20,
  },
  subDetailText: {
    fontSize: 12,
    color: "white",
  },
  shareIcon: {
    width: 22,
    height: 24,
  },
  headerTitle: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
