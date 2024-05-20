import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  TextInput,
  Alert,
} from "react-native";
import React, { useCallback, useEffect, useRef, useState } from "react";
import Button from "@/elements/Button";
import { Modalize } from "react-native-modalize";
import { router } from "expo-router";
import DatePicker from "@/components/DatePicker";
import { Calendar } from "react-native-calendars";
import { useAppStore } from "@/store";
import { controllers } from "@/utils/crud";
import CustomTimePicker from "@/components/TimePicker";
import { hasEmptyValues, t, translateDate, ucFirst } from "@/utils/helpers";
import { IHandles } from "react-native-modalize/lib/options";
import { DropDown } from "../DropDown";
import PromiseWaiter from "../promises/PromiseWaiter";

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
  const { type, tags, scheduleItem, locale } = useAppStore();
  const [loading, setLoading] = useState(false);

  const [showCalendar, setShowCalendar] = useState(false);

  const _ref = useRef<Modalize>();

  const [data, setData] = useState<Schedule>({
    title: "",
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
  }, [open]);
  const handleSelect = useCallback((value: any) => {
    handleChange({
      name: "schedule",
      value: value,
    });
  }, []);

  return (
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
              style={{
                height: 32,
                width: 32,
                justifyContent: "center",
                alignItems: "center",
              }}
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
          <View style={styles.form_container}>
            <DropDown
              label={
                data.schedule === "daily" ||
                data.schedule === "weekly" ||
                data.schedule === "monthy"
                  ? t(data.schedule as any)
                  : data.schedule
              }
              data={recurrences}
              onSelect={handleSelect}
              actions={() => {
                return (
                  <TextInput
                    keyboardType="default"
                    placeholder={t("select_recurrence")}
                    placeholderTextColor={"#9AA5B5"}
                    autoCapitalize={"none"}
                    style={{
                      paddingVertical: 16,
                      paddingHorizontal: 12,
                      borderWidth: 1,
                      borderRadius: 100,
                      borderColor: "#9AA5B5",
                    }}
                    onChangeText={(text) => {
                      handleChange({
                        name: "schedule",
                        value: text,
                      });
                    }}
                  />
                );
              }}
            />

            {type === "task" && (
              <TextInput
                placeholder={t("note_title")}
                placeholderTextColor={"#9AA5B5"}
                style={{
                  paddingVertical: 12,
                  paddingHorizontal: 12,
                  borderWidth: 1,
                  borderRadius: 100,
                  borderColor: "#9AA5B5",
                  flex: 1,
                  alignSelf: "stretch",
                }}
                defaultValue={data.title}
                onChangeText={(text) => {
                  handleChange({
                    name: "title",
                    value: text,
                  });
                }}
              />
            )}
            <TextInput
              placeholder={t("task_title")}
              style={styles.textArea}
              defaultValue={data.note}
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
                <DatePicker
                  placeholder={
                    locale === "en"
                      ? data.startDate.toDateString()
                      : translateDate(data.startDate.toDateString())
                  }
                  icon={require("@/assets/icons/calenderIcon.png")}
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  setSelectedKey("endDate");
                  setShowCalendar(true);
                }}
              >
                <DatePicker
                  placeholder={
                    locale === "en"
                      ? data.endDate.toDateString()
                      : translateDate(data.endDate.toDateString())
                  }
                  icon={require("@/assets/icons/calenderIcon.png")}
                />
              </TouchableOpacity>
            </View>
            <View style={styles.containerDate}>
              <CustomTimePicker
                defaultValue={data.startTime}
                onPick={(date) => {
                  handleChange({
                    name: "startTime",
                    value: date,
                  });
                }}
              />

              <CustomTimePicker
                defaultValue={data.endTime}
                onPick={(date) => {
                  handleChange({
                    name: "endTime",
                    value: date,
                  });
                }}
              />
            </View>
          </View>

          {loading ? (
            <PromiseWaiter />
          ) : (
            <View style={styles.modalBtn}>
              <Button
                disabled={false}
                text={t("finish")}
                onPress={() => {
                  setLoading(true);
                  const missing = hasEmptyValues<Schedule>(data);
                  if (type === "task") {
                    setData({
                      ...data,
                      subject: "",
                    });
                    controllers.task
                      .add({
                        data: {
                          ...data,
                          subject: "",
                        },
                        onError: (error) => {
                          setLoading(false);
                        },
                        onSuccess: () => {
                          setLoading(false);
                          onAction(_ref);
                        },
                      })
                      .finally(() => {
                        setLoading(false);
                      });
                  } else {
                    setLoading(true);
                    controllers.class
                      .add({
                        data: {
                          ...data,
                          subject: scheduleItem?.subject,
                        },
                        onError: (error) => {
                          setLoading(false);
                        },
                        onSuccess: () => {
                          setLoading(false);
                          onAction(_ref);
                        },
                      })
                      .finally(() => {
                        setLoading(false);
                      });
                  }
                }}
              />
            </View>
          )}
        </View>
      )}
    </Modalize>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    gap: 50,
    marginTop: 40,
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
  form_container: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
    gap: 16,
  },
  textArea: {
    fontSize: 15,
    lineHeight: 20,
    fontFamily: "Inter-Regular",
    borderWidth: 1,
    borderColor: "#9AA5B5",
    height: 120,
    alignSelf: "stretch",
    borderRadius: 10,
    paddingLeft: 10,
    fontWeight: "500",
  },

  containerDate: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 24,
    width: "100%",
  },
  modalBtn: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
});
