import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Alert,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import CheckboxGroup from "@/components/CheckBoxGroup";
import Checkbox from "@/components/CheckBox";
import Button from "../../elements/Button";
import { Modalize } from "react-native-modalize";
import { router } from "expo-router";
import SelectDropdown from "react-native-select-dropdown";
import Inputs from "@/components/Inputs";
import ShareSuccess from "@/components/ShareSuccess";
import BottomSheet from "@/components/BottomSheet";
import { Calendar } from "react-native-calendars";
import { useAppStore } from "@/store";
import { dateToTimeFormat } from "@/utils/helpers";
import { controllers } from "@/utils/crud";
import CustomTimePicker from "@/components/TimePicker";

const recurrences: Recurrence[] = ["daily", "weekly", "monthly"];

const addToPlanner = () => {
  const { type, tags, scheduleItem, setScheduleItem } = useAppStore();

  const [selectedRecurrence, setSelectedRecurrence] =
    useState<Recurrence>("daily");
  const [data, setData] = useState<Schedule>({
    startDate: new Date(),
    endDate: new Date(),
    startTime: new Date(),
    endTime: new Date(),
    note: "",
    schedule: "daily",
    subject: "",
    completionStatus: false,
    tags,
  });

  const [selectedKey, setSelectedKey] =
    useState<
      keyof Pick<Schedule, "startDate" | "endDate" | "startTime" | "endTime">
    >("startDate");

  const [showTimePicker, setShowTimePicker] = useState(false);
  const scheduleFormRef = useRef<Modalize>(null);
  const modalizeRefSuccess = useRef<Modalize>(null);
  const calendarModelRef = useRef<Modalize>(null);
  const modalizeRefShare = useRef<Modalize>(null);

  const handleCheckboxChange = ({
    current,
    selected,
  }: {
    current: string;
    selected: string[];
  }) => {
    setData({
      ...data,
      subject: current,
    });
  };

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

  const onOpenShare = () => {
    modalizeRefShare.current?.open();
  };

  const closeShare = () => {
    modalizeRefShare.current?.close();
  };

  const onOpenSuccess = () => {
    modalizeRefSuccess.current?.open();
  };
  const closeSuccess = () => {
    modalizeRefSuccess.current?.close();
  };
  const close = () => {
    onOpenSuccess();
    scheduleFormRef.current?.close();
  };
  const onOpen = () => {
    scheduleFormRef.current?.open();
  };

  useEffect(() => {
    if (type === "task") {
      scheduleFormRef.current?.open();
    }
    return () => { };
  }, []);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      {type === "class" && (
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()}>
            <Image
              source={require("../../assets/icons/back.png")}
              style={styles.backBtn}
            />
          </TouchableOpacity>
          <Text style={styles.headerTxt}>Add to Planner</Text>
        </View>
      )}
      {type === "class" && (
        <ScrollView>
          <View style={styles.mainContainer}>
            <CheckboxGroup onChange={handleCheckboxChange}>
              {[
                "Chemistry",
                "English",
                "Arabic",
                "Biology",
                "Physics",
                "Mathematics",
              ].map((label, index) => (
                <Checkbox
                  isRadio={true}
                  isChecked={false}
                  onPress={() => { }}
                  key={index}
                  label={label}
                />
              ))}
            </CheckboxGroup>
          </View>
          <View style={styles.btn}>
            <Button disabled={false} text="Schedule" onPress={onOpen} />
          </View>
        </ScrollView>
      )}
      <Modalize
        modalHeight={570}
        ref={scheduleFormRef}
        handleStyle={{
          marginTop: 30,
          backgroundColor: "#e9e9e9",
          width: 80,
          zIndex: 9999,
          elevation: 9999,
        }}
      >
        <View style={styles.modalView}>
          <View style={[styles.header2, { marginTop: 20, marginLeft: 0 }]}>
            <TouchableOpacity
              onPress={() => {
                  router.back();
              }}
            >
              <Image
                source={require("../../assets/icons/back.png")}
                style={styles.backBtn}
              />
            </TouchableOpacity>
            <Text style={styles.headerTxt}>Schedule a Class</Text>
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
                  source={require("../../assets/icons/drop.png")}
                  resizeMode="contain"
                  style={{ width: 9, height: 14 }}
                />
              )}
              defaultButtonText={selectedRecurrence || "daily"}
              buttonTextAfterSelection={() => selectedRecurrence}
              rowTextForSelection={(item) => {
                return item;
              }}
              buttonStyle={styles.dropDownlist}
            />

            <TextInput
              placeholder="Type the note here..."
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
                  calendarModelRef.current?.open();
                }}
              >
                <Inputs
                  placeholder={data.startDate.toDateString() ?? "Start Date"}
                  icon={require("../../assets/icons/calenderIcon.png")}
                  isTime={false}
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  setSelectedKey("endDate");
                  calendarModelRef.current?.open();
                }}
              >
                <Inputs
                  onChangeText={(text) => { }}
                  placeholder={data.endDate.toDateString() ?? "End Date"}
                  icon={require("../../assets/icons/calenderIcon.png")}
                  isTime={false}
                />
              </TouchableOpacity>
            </View>
            <View style={styles.containerDate}>

              <View
                style={{
                  borderWidth: 1,
                  borderColor: '#9AA5B5',
                  backgroundColor: '#ccc',
                  width: 155,
                  height: 50,
                  borderRadius: 100,
                  paddingLeft: 10,
                  marginTop: 20,
                }}
              >
                <CustomTimePicker onPick={(date) => {
                  handleChange({
                    name: "startTime",
                    value: date,
                  });
                }} />
              </View>
              <View
                style={{
                  borderWidth: 1,
                  borderColor: '#9AA5B5',
                  backgroundColor: '#ccc',
                  width: 155,
                  height: 50,
                  borderRadius: 100,
                  paddingLeft: 10,
                  marginTop: 20,
                }}
              >
                <CustomTimePicker onPick={(date) => {
                  handleChange({
                    name: "endTime",
                    value: date,
                  });
                }} />
              </View>
            </View>
          </View>


          <View style={styles.modalBtn}>
            <Button
              disabled={false}
              text="Finish"
              onPress={() => {
                setScheduleItem({
                  ...data,
                });

                if (type === "class") {
                  controllers.class.add({
                    data,
                    onError: (error) => {
                      Alert.alert(error);
                    },
                    onSuccess: (id) => {
                      router.push("/schedule");
                    },
                  });
                } else if (type === "task") {
                  controllers.task.add({
                    data,
                    onError: (error) => {
                      Alert.alert(error);
                    },
                    onSuccess: (id) => {
                      router.push("/schedule");
                    },
                  });
                }
              }}
            />
          </View>
        </View>
      </Modalize>
      {/* <DateTimePickerModal
        isVisible={showTimePicker}
        mode="time"
        onConfirm={(date: any) => {
          handleChange({
            name: selectedKey,
            value: date,
          });
          setShowTimePicker(false);
        }}
        onCancel={() => {
          setShowTimePicker(false);
        }}
      /> */}
      <Modalize
        modalHeight={450}
        ref={calendarModelRef}
        handleStyle={{
          marginTop: 30,
          backgroundColor: "#e9e9e9",
          width: 80,
          zIndex: 9999,
          elevation: 9999,
        }}
      >
        <View style={styles.modalView}>
          <Calendar
            onDayPress={(day) => {
              handleChange({
                name: selectedKey,
                value: new Date(day.dateString),
              });
              calendarModelRef.current?.close();
            }}
            theme={{
              backgroundColor: "#ffffff",
              calendarBackground: "#ffffff",
              arrowColor: "#8D99DE",
              todayTextColor: "#8D99DE",
            }}
          />
        </View>
      </Modalize>

      <Modalize
        modalHeight={570}
        ref={modalizeRefSuccess}
        handleStyle={{
          marginTop: 30,
          backgroundColor: "#e9e9e9",
          width: 80,
          zIndex: 9999,
          elevation: 9999,
        }}
      >
        <View style={styles.modalView}>
          <ShareSuccess onClose={closeSuccess} share={onOpenShare} />
        </View>
      </Modalize>
      <Modalize
        modalHeight={570}
        ref={modalizeRefShare}
        handleStyle={{
          marginTop: 30,
          backgroundColor: "#e9e9e9",
          width: 80,
          zIndex: 9999,
          elevation: 9999,
        }}
      >
        <View style={[styles.modalView]}>
          <BottomSheet onBack={closeShare} />
        </View>
      </Modalize>
    </SafeAreaView>
  );
};

export default addToPlanner;

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
  mainContainer: {
    flex: 1,
    // justifyContent:'center',
    alignItems: "center",
    marginTop: 30,
  },
  btn: {
    justifyContent: "center",
    alignItems: "center",
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
