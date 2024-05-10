import { Image } from "expo-image";
import React from "react";
import { View, Text, StyleSheet, StyleProp, ViewStyle } from "react-native";

interface CompletedTaskProps {
  title: string;
  notes: string;
  completedDate?: string;
  spentTime: string;
}

export const CompletedTask: React.FC<CompletedTaskProps> = ({
  title,
  notes,
  completedDate,
  spentTime,
}) => {
  return (
    <View
      style={{
        display: "flex",
        justifyContent: "flex-start",
        alignItems: "flex-start",
        gap: 12,
        paddingHorizontal: 18,
        paddingVertical: 12,
        alignSelf:"stretch",
        backgroundColor: "#fff",
      }}
    >
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "flex-start",
          position: "relative",
          alignSelf:"stretch"
        }}
      >
        <Text
          style={{
            fontSize: 22,
            fontWeight: "500",
            textAlign: "left",
            color: "#8d99de",
          }}
        >
          {title}
        </Text>
        <View
          style={{
            display: "flex",
            justifyContent: "flex-start",
            alignItems: "center",
            flexGrow: 0,
            flexShrink: 0,
            position: "relative",
            gap: 13,
          }}
        >
          {/* tick svg */}
          <Text
            style={{
              fontSize: 14,
              fontWeight: "500",
              textAlign: "left",
              color: "#13ce66",
            }}
          >
            Completed : {completedDate}
          </Text>
        </View>
      </View>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "flex-end",
          alignSelf: "stretch",
        }}
      >
        <Text
          style={{
            fontSize: 12,
            fontWeight: "300",
            textAlign: "left",
            color: "#5b5b5b",
            flex:1,
          }}
        >
         {notes}
        </Text>
        {/* <View
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            position: "relative",
            gap: 10,
            padding: 10,
            borderRadius: 100,
            backgroundColor: "rgba(255,202,101,0.36)",
          }}
        >
          <Text
            style={{
              fontSize: 12,
              fontWeight: "600",
              textAlign: "right",
              color: "#ffca65",
            }}
          >
            Spent : 2h 25m
          </Text>
        </View>*/}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    paddingHorizontal: 36,
    paddingVertical: 12,
    backgroundColor: "white",
    alignSelf: "stretch",
    shadowColor: "#828FAF",
    shadowOffset: {
      width: 0,
      height: 20,
    },
    shadowOpacity: 0.07,
    shadowRadius: 30,
    elevation: 5,
  },
  leftContainer: {
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "flex-start",
    maxWidth: 215,
  },
  rightContainer: {
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "flex-end",
    alignSelf: "stretch",
  },
  title: {
    fontSize: 22,
    fontFamily: "Inter-Bold",
    color: "#8D99DE",
  },
  notes: {
    fontSize: 12,
    fontFamily: "Inter-Regular",
    color: "#5B5B5B",
  },
  statusContainer: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    gap: 6,
  },
  statusIcon: {},
  statusText: {
    fontSize: 14,
    fontFamily: "Inter-Bold",
    color: "#13CE66",
  },
  spentTimeContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    borderRadius: 100,
    backgroundColor: "rgba(255, 202, 101, 0.36)",
  },
  spentTimeText: {
    fontSize: 12,
    fontFamily: "Inter-Bold",
    color: "#FFCA65",
    textAlign: "right",
  },
});
