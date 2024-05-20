import { t } from "@/utils/helpers";
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

export const GroupTimePicker = ({
  onPick,
}: {
  onPick: (value: String) => void;
}) => {
  const [value, setValue] = useState("30");
  const [unit, setUnit] = useState("hours");

  const handleHourChange = (text: string) => {
    const value = `${text.padStart(2, "0")} ${unit}`;
    setValue(text);
    onPick(value);
  };

  const toggleUnit = () => {
    onPick(
      `${value.padStart(2, "0")} ${unit === "hours" ? "minutes" : "hours"}`
    );
    setUnit(unit === "hours" ? "minutes" : "hours");
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholderTextColor={"#aeaeae"}
        style={styles.input}
        placeholder={value ?? "00"}
        onChangeText={handleHourChange}
        keyboardType="number-pad"
      />

      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          toggleUnit();
        }}
      >
        <Text style={styles.buttonText}>{unit}</Text>
      </TouchableOpacity>
    </View>
  );
};
const CustomTimePicker = ({
  defaultValue,
  onPick,
}: {
  defaultValue: Date;
  onPick: (date: Date) => void;
}) => {
  const [hour, setHour] = useState("");
  const [minute, setMinute] = useState("");
  const [isAM, setIsAM] = useState(true);

  const handleHourChange = (text: string) => {
    setHour(text);
    onPick(getDateTimeWithCurrentDate());
  };

  const handleMinuteChange = (text: string) => {
    setMinute(text);
    onPick(getDateTimeWithCurrentDate());
  };

  const toggleAMPM = () => {
    setIsAM(!isAM);
    onPick(getDateTimeWithCurrentDate());
  };

  function getDateTimeWithCurrentDate() {
    const hourString = hour.toString().padStart(2, "0");
    const minuteString = minute.toString().padStart(2, "0");
    const period = isAM ? "AM" : "PM";
    // Get current date object
    const now = new Date();

    // Extract hour and minute as integers
    let _hour = parseInt(hourString, 10);
    let _minute = parseInt(minuteString, 10);

    // Adjust hour for AM/PM
    if (period.toLowerCase() === "pm" && _hour !== 12) {
      _hour += 12;
    } else if (period.toLowerCase() === "am" && _hour === 12) {
      _hour = 0;
    }
    return new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate(),
      _hour,
      _minute
    );
  }

  function getTimeFromDefaultValue() {
    const hours = defaultValue.getHours();
    const minutes = defaultValue.getMinutes();
    const amPm = hours >= 12 ? "pm" : "am";
    setHour(`${hours % 12}`);
    setMinute(minutes.toString().padStart(2, "0"));
    setIsAM(hours >= 12 ? false : true);
  }

  useEffect(() => {
    getTimeFromDefaultValue();

    return () => {};
  }, []);

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        value={hour}
        placeholder={"00"}
        onChangeText={handleHourChange}
        keyboardType="number-pad"
      />

      <TextInput
        style={styles.input}
        placeholder="00"
        value={minute}
        onChangeText={handleMinuteChange}
        keyboardType="number-pad"
      />
      <TouchableOpacity style={styles.button} onPress={toggleAMPM}>
        <Text style={styles.buttonText}>{isAM ? t("am") : t("pm")}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderColor: "#9AA5B5",
    height: 40,
    paddingHorizontal: 6,
    borderRadius: 20,
    flex:1,
  },

  input: {
    borderRadius: 5,
    flex: 1,
    textAlign: "center",
    alignSelf: "stretch",
  },
  button: {
    borderRadius: 5,
    flex: 1,
    alignSelf: "stretch",
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    fontSize: 14,
  },
});

export default CustomTimePicker;
