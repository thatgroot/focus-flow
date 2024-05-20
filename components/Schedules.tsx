import { useAppStore } from "@/store";
import { controllers } from "@/utils/crud";
import { getFlexDirection, t, translateDate } from "@/utils/helpers";
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Alert,
} from "react-native";

export const Schedules = ({
  bgColor,
  icon,
  data,
}: {
  bgColor:
    | "rgba(255, 202, 101, 1)"
    | "rgba(154, 165, 181, 0.25)"
    | "rgba(254, 181, 166, 1)"
    | "rgba(141, 153, 222, 1)"
    | "rgba(154, 165, 181, 0.25)";

  icon: any;
  data: Schedule;
}) => {
  const [checked, setChecked] = useState(false);
  const { locale } = useAppStore();
  const direction = getFlexDirection(locale);
  useEffect(() => {
    setChecked(data.completionStatus);
  }, []);
  return (
    <View style={[styles.card, { backgroundColor: bgColor, gap: 6 }]}>
      <View
        style={[
          styles.item,
          {
            justifyContent: "flex-end",
            alignItems: locale === "ar" ? "flex-end" : "flex-start",
          },
        ]}
      >
        <View
          style={[
            {
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              position: "relative",
              borderRadius: 24,
              width: 48,
              height: 24,
              marginVertical: 6,
              backgroundColor: "rgba(255,255,255,0.31)",
            },
          ]}
        >
          <Text
            style={{
              fontSize: 10,
              fontWeight: "300",
              textAlign: "left",
              color: "#000",
            }}
          >
            {data.subject ? t("class_title") : t("task_title")}
          </Text>
        </View>
        <View style={[styles.headerTitle, direction]}>
          <Text style={styles.subtitle}>
            {data.subject
              ? t(data.subject?.toLocaleLowerCase() as any)
              : data.title}
          </Text>
          <TouchableOpacity onPress={() => {}}>
            <Image source={icon} style={styles.shareIcon} />
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
              <Text style={styles.subDetailText}>
                {locale === "en"
                  ? data?.startDate.toDateString()
                  : translateDate(data?.startDate.toDateString())}
              </Text>
            </View>
          </View>
          <View style={styles.subDetail}>
            {data.endDate.toDateString() && (
              <View
                style={[styles.subDetailBox, { backgroundColor: "#e3485020" }]}
              >
                <Text style={[styles.subDetailText, { color: "#fff" }]}>
                  {locale === "en"
                    ? data?.endDate.toDateString()
                    : translateDate(data.endDate.toDateString())}
                </Text>
              </View>
            )}
          </View>
        </View>
      </View>
      <TouchableOpacity
        style={{
          display: "flex",
          flexDirection: "row",
          alignSelf: "stretch",
          justifyContent: "flex-end",
          alignItems: "center",
          position: "relative",
          gap: 6,
        }}
        onPress={() => {
          const { id, ...others } = data;
          if (data.subject) {
            controllers.class.update({
              onError: (error) => {
                Alert.alert(error);
              },
              onSuccess: (id) => {

              },
              id: id!,
              data: {
                ...others,
                completionStatus: !checked,
                completedOn: new Date(),
              },
            });
          } else {
            controllers.task.update({
              onError: (error) => {
                Alert.alert(error);
              },
              onSuccess: (id) => {

              },
              id: id!,
              data: {
                ...others,
                completionStatus: !checked,
                completedOn: new Date(),
              },
            });
          }

          setChecked(!checked);
        }}
      >
        <Text
          style={{
            fontSize: 12,
            textAlign: "left",
            fontWeight: checked ? "700" : "normal",
            color: checked ? "#8D99DE" : "#fff",
          }}
        >
          {t("mark_as_complete")}
        </Text>

        {checked ? (
          <Image
            style={{
              width: 18,
              height: 18,
            }}
            source={require("@/assets/images/checked_radio.png")}
          />
        ) : (
          <View style={[styles.checkbox]} />
        )}
      </TouchableOpacity>
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
    fontSize: 11,
    color: "white",
  },
  shareIcon: {
    width: 18,
    height: 20,
  },
  headerTitle: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignSelf: "stretch",
  },
  checkbox: {
    width: 18,
    height: 18,
    borderWidth: 1.3,
    borderColor: "#fff",
    borderRadius: 10,
  },
});
