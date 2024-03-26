import { Image } from "expo-image";
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import LabeledInput from "@/components/InputField";
import Checkbox from "@/components/CheckBox";
import CheckboxGroup from "@/components/CheckBoxGroup";
import BottomSheet from "@/components/BottomSheet";
import Button from "@/elements/Button";
import Link from "@/elements/Link";
import TimeEntry from "@/components/TimeEntry";
import DayCard from "@/components/DayCard";

const SignInScreen = () => {
  const [isVisible, setIsVisible] = useState(false);

  const toggleBottomSheet = () => {
    setIsVisible(!isVisible);
  };

  const handleCheckboxChange = (selectedLabels: string[]) => {
    console.log("Selected label:", JSON.stringify(selectedLabels));
    // Handle the selected label here (e.g., update state)
  };
  return (
    <ScrollView>
      <View style={styles.container}>
        <TouchableOpacity
          style={{ ...styles.button, marginVertical: 12 }}
          onPress={() => {
            setIsVisible(!isVisible);
          }}
        >
          <Text style={styles.buttonText}>Bottom Sheet</Text>
        </TouchableOpacity>
        {isVisible && (
          <BottomSheet
            onBack={() => {
              setIsVisible(false);
            }}
          />
        )}

        <View
          style={{
            flexDirection: "column",
            gap: 12,
            flex: 1,
            width: "100%",
            alignItems: "center",
          }}
        >
          <TimeEntry
            timestamp="NOV 10, 01:43 - 02:07"
            duration="Study 24m 39s"
            type="upcomming"
          />
          <TimeEntry
            timestamp="NOV 10, 01:43 - 02:07"
            duration="Study 24m 39s"
            type="recent"
          />
          <View
            style={{
              flexDirection: "row",
              gap: 12,
              flex: 1,
              width: "100%",
              alignItems: "center",
              maxWidth: 325,
            }}
          >
            {[
              {
                day: "Sun",
                date: "15",
                filled: false,
                active: false,
              },
              {
                day: "Mon",
                date: "16",
                filled: false,
                active: true,
              },
              {
                day: "Tue",
                date: "16",
                filled: true,
                active: false,
              },

            ].map(({ day, date, filled, active }) => {
              return (
                <DayCard
                  filled={filled}
                  active={active}
                  dayOfWeek={day}
                  date={date}
                />
              );
            })}
          </View>
        </View>
        <View style={styles.signInContainer}>
          <Text style={styles.title}>Sign In</Text>
          <Text style={styles.subtitle}>
            Enter Your Credentials to Continue:
          </Text>
        </View>
        <View style={styles.inputContainer}>
          <LabeledInput
            label="Email"
            placeholder="Enter your email"
            inputType="email"
            error="Email taken. Try another one"
          />

          <CheckboxGroup onChange={handleCheckboxChange}>
            {["Male", "Female"].map((label, index) => (
              <Checkbox
                isRadio={true}
                isChecked={false}
                onPress={() => {}}
                key={index}
                label={label}
              />
            ))}
          </CheckboxGroup>

          <CheckboxGroup onChange={handleCheckboxChange}>
            {["Pscychology", "Biology", "Physics", "Mathematics"].map(
              (label, index) => (
                <Checkbox
                  isRadio={false}
                  isChecked={false}
                  onPress={() => {}}
                  key={index}
                  label={label}
                />
              )
            )}
          </CheckboxGroup>
        </View>

        <View
          style={{
            flexDirection: "column",
            gap: 24,
            alignItems: "center",
            paddingBottom: 96,
          }}
        >
          <Button text="Sign In" onPress={() => {}} />

          <View style={styles.signUpContainer}>
            <Text style={styles.signUpText}>Don’t have an Account?</Text>
            <Link onPress={() => {}} text="Sign Up" />
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  signInContainer: {
    alignItems: "center",
    marginBottom: 27,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#8c99de",
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 14,
    color: "#353535",
  },
  inputContainer: {
    alignItems: "center",
    gap: 12,
  },
  input: {
    width: 280,
    height: 40,
    borderWidth: 1,
    borderRadius: 20,
    borderColor: "#9aa5b5",
    paddingLeft: 10,
    marginBottom: 27,
  },
  button: {
    width: 280,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 40,
    backgroundColor: "#8a97dd",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 6,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#fff",
  },
  signUpContainer: {
    flexDirection: "row",
    marginBottom: 20,
  },
  signUpText: {
    fontSize: 14,
    color: "#353535",
  },
  signUpLink: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#8c99de",
    marginLeft: 5,
  },
});

export default SignInScreen;
