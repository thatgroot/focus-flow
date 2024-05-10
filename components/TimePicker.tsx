import { t } from '@/utils/helpers';
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

const CustomTimePicker = ({ onPick }: { onPick: (date: Date) => void }) => {
  const [hour, setHour] = useState("");
  const [minute, setMinute] = useState("");
  const [isAM, setIsAM] = useState(true);

  const handleHourChange = (text: string) => {
    setHour(text);
    onPick(getDateTimeWithCurrentDate())
  };

  const handleMinuteChange = (text: string) => {
    setMinute(text);
    onPick(getDateTimeWithCurrentDate())
  };

  const toggleAMPM = () => {
    setIsAM(!isAM);
    onPick(getDateTimeWithCurrentDate())
  };

  function getDateTimeWithCurrentDate() {
    const hourString = hour.toString().padStart(2, '0');
    const minuteString = minute.toString().padStart(2, '0');
    const period = isAM ? 'AM' : 'PM';
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
    return new Date(now.getFullYear(), now.getMonth(), now.getDate(), _hour, _minute);
  }

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        value={hour}
        placeholder={'00'}
        onChangeText={handleHourChange}
        keyboardType="number-pad"
      />

      <TextInput
        style={styles.input}
        placeholder='00'
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
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    gap: 6,
    padding: 12,
  },

  input: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    backgroundColor: '#ccc',
    borderRadius: 5,
  },
  button: {
    backgroundColor: '#ccc',
    borderRadius: 5,
  },
  buttonText: {
    fontSize: 14,
  },

});

export default CustomTimePicker;
