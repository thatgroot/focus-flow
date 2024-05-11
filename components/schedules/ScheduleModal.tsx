import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  TextInput,
  Alert,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import Button from "@/elements/Button";
import { Modalize } from "react-native-modalize";
import { router } from "expo-router";
import SelectDropdown from "react-native-select-dropdown";
import Inputs from "@/components/Inputs";
import { Calendar } from "react-native-calendars";
import { useAppStore } from "@/store";
import { controllers } from "@/utils/crud";
import CustomTimePicker from "@/components/TimePicker";
import { hasEmptyValues, t, translateDate, ucFirst } from "@/utils/helpers";
import { IHandles } from "react-native-modalize/lib/options";

const recurrences: Recurrence[] = ["daily", "weekly", "monthly"];

export const ScheduleModal = ({
  open,
  onAction,
  onBack,
}: {
  open: boolean;
  onAction: (innerRef: React.MutableRefObject<IHandles | undefined>) => void;
  onBack: (innerRef: React.MutableRefObject<IHandles | undefined>) => void;
}) => {
  const { type, tags, scheduleItem, setScheduleItem } = useAppStore();

  const [showCalendar, setShowCalendar] = useState(false);

  const [selectedRecurrence, setSelectedRecurrence] =
    useState<Recurrence>("daily");
  const _ref = useRef<Modalize>();

  const [data, setData] = useState<Schedule>({
    startDate: new Date(),
    endDate: new Date(),
    startTime: new Date(),
    endTime: new Date(),
    note: "",
    schedule: "daily",
    completionStatus: false,
    tags,
  });

  const [selectedKey, setSelectedKey] =
    useState<
      keyof Pick<Schedule, "startDate" | "endDate" | "startTime" | "endTime">
    >("startDate");

  function handleChange<K extends keyof Schedule>({
    name,
    value,
  }: {
    name: K;
    value: Schedule[K];
  }) {
    setData({
      ...data,
      [name]: value,
    });
  }

  useEffect(() => {
    setData({
      ...data,
      subject: scheduleItem?.subject,
    });
    if (open) _ref.current?.open();
  }, []);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Modalize
        modalHeight={570}
        ref={_ref}
        onOverlayPress={() => {
          _ref.current?.close();
          if (type === "task") {
            router.push("/schedule");
          }
        }}
        handleStyle={{
          marginTop: 30,
          backgroundColor: "#e9e9e9",
          width: 80,
          zIndex: 9999,
          elevation: 9999,
        }}
      >
        {showCalendar && (
          <View style={styles.modalView}>
            <Calendar
              onDayPress={(day) => {
                handleChange({
                  name: selectedKey,
                  value: new Date(day.dateString),
                });
                setShowCalendar(false);
              }}
              theme={{
                backgroundColor: "#ffffff",
                calendarBackground: "#ffffff",
                arrowColor: "#8D99DE",
                todayTextColor: "#8D99DE",
              }}
            />
          </View>
        )}
        {!showCalendar && (
          <View style={styles.modalView}>
            <View style={[styles.header2, { marginTop: 20, marginLeft: 0 }]}>
              <TouchableOpacity
                onPress={() => {
                  onBack(_ref);
                  if (type === "task") {
                    router.push("/schedule");
                  }
                }}
              >
                <Image
                  source={require("@/assets/icons/back.png")}
                  style={styles.backBtn}
                />
              </TouchableOpacity>
              <Text style={styles.headerTxt}>
                {/* @ts-ignore */}
                {ucFirst(t(`schedule_${type}`))}
              </Text>
            </View>
            <View style={styles.dropDownlistContainer}>
              <SelectDropdown
                data={recurrences}
                onSelect={(recurrence: Recurrence) => {
                  setSelectedRecurrence(recurrence);
                  handleChange({
                    name: "schedule",
                    value: recurrence,
                  });
                }}
                renderDropdownIcon={() => (
                  <Image
                    source={require("@/assets/icons/drop.png")}
                    resizeMode="contain"
                    style={{ width: 9, height: 14 }}
                  />
                )}
                defaultButtonText={t(selectedRecurrence) || t("daily")}
                buttonTextAfterSelection={() => t(selectedRecurrence)}
                rowTextForSelection={(item) => {
                  return t(item);
                }}
                buttonStyle={styles.dropDownlist}
              />

              <TextInput
                placeholder={t("note_placeholder")}
                style={styles.textArea}
                onChangeText={(text) => {
                  handleChange({
                    name: "note",
                    value: text,
                  });
                }}
              />

              <View style={styles.containerDate}>
                <TouchableOpacity
                  onPress={() => {
                    setSelectedKey("startDate");
                    setShowCalendar(true);
                  }}
                >
                  <Inputs
                    placeholder={
                      translateDate(data.startDate.toDateString()) ??
                      t("startDate")
                    }
                    icon={require("@/assets/icons/calenderIcon.png")}
                    isTime={false}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    setSelectedKey("endDate");
                    setShowCalendar(true);
                  }}
                >
                  <Inputs
                    onChangeText={() => {}}
                    placeholder={
                      translateDate(data.startDate.toDateString()) ??
                      t("endDate")
                    }
                    icon={require("@/assets/icons/calenderIcon.png")}
                    isTime={false}
                  />
                </TouchableOpacity>
              </View>
              <View style={styles.containerDate}>
                <View
                  style={{
                    borderWidth: 1,
                    borderColor: "#9AA5B5",
                    backgroundColor: "#ccc",
                    width: 155,
                    height: 50,
                    borderRadius: 100,
                    paddingLeft: 10,
                    marginTop: 20,
                  }}
                >
                  <CustomTimePicker
                    onPick={(date) => {
                      handleChange({
                        name: "startTime",
                        value: date,
                      });
                    }}
                  />
                </View>
                <View
                  style={{
                    borderWidth: 1,
                    borderColor: "#9AA5B5",
                    backgroundColor: "#ccc",
                    width: 155,
                    height: 50,
                    borderRadius: 100,
                    paddingLeft: 10,
                    marginTop: 20,
                  }}
                >
                  <CustomTimePicker
                    onPick={(date) => {
                      handleChange({
                        name: "endTime",
                        value: date,
                      });
                    }}
                  />
                </View>
              </View>
            </View>

            <View style={styles.modalBtn}>
              <Button
                disabled={false}
                text={t("finish")}
                onPress={() => {
                  const missing = hasEmptyValues<Schedule>(data);
                  console.log(missing);
                  if (missing.length === 0) {
                    setScheduleItem({
                      ...data,
                      subject: scheduleItem?.subject,
                    });
                    controllers.class.add({
                      data,
                      onError: (error) => {
                        Alert.alert(error);
                      },
                      onSuccess: () => {
                        onAction(_ref);
                      },
                    });
                  } else {
                    console.log(JSON.stringify(data));
                    Alert.alert("Please provide ", missing.join(","));
                  }
                }}
              />
            </View>
          </View>
        )}
      </Modalize>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    gap: 50,
    marginTop: 40,
    // justifyContent:'center',
    alignItems: "center",
    marginLeft: 20,
  },
  headerTxt: {
    fontWeight: "700",
    fontSize: 20,
    lineHeight: 24,
    fontFamily: "Inter-Bold",
    color: "#8D99DE",
  },
  backBtn: {
    width: 20,
    height: 20,
  },

  modalView: {
    paddingHorizontal: 34,
    paddingVertical: 34,
    marginTop: 5,
    width: "100%",
  },
  dropDownlist: {
    borderWidth: 1,
    borderColor: "rgba(154, 165, 181, 1)",
    width: 308,
    height: 50,
    backgroundColor: "#FAFAFA",
    borderRadius: 100,
    marginTop: 20,
  },
  header2: {
    flexDirection: "row",
    gap: 50,
    marginTop: 40,
    // justifyContent:'center',
    alignItems: "center",
  },
  dropDownlistContainer: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  textArea: {
    fontSize: 15,
    lineHeight: 20,
    fontFamily: "Inter-Regular",
    borderWidth: 1,
    borderColor: "#9AA5B5",
    width: 308,
    height: 127,
    borderRadius: 10,
    paddingLeft: 10,
    marginTop: 20,
    fontWeight: "500",
  },

  containerDate: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
  },
  modalBtn: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
});
