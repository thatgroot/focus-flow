import { inputRegex } from "@/utils/auth";
import React, { useState } from "react";
import { View, Text, StyleSheet, Image, TextInput } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

const stateBorderColor = {
  active: "#5F75EE",
  inactive: "#9AA5B5",
  valid: "#13CE66",
  invalid: "#E34850",
};

interface Props {
  label: string;
  placeholder: string;
  inputType: "email" | "password" | "text" | "number";
  error: string;
  onChangeText?: ((text: string) => void) | undefined;
  inputState: "active" | "invalid" | "valid" | "inactive";
}

export default function LabeledInput({
  label,
  placeholder,
  inputType,
  error,
  onChangeText,
  inputState,
}: Props) {
  const [text, setText] = useState("");
  const [compat, setCompat] = useState<"invalid" | "valid" | "inactive">(
    "inactive"
  );

  const [toggle, setToggle] = useState(false);
  const handleChangeText = (inputText: string) => {
    setText(inputText);
    if (onChangeText) onChangeText(inputText);
    validateInput(inputText);
  };

  const validateInput = (inputText: string) => {
    setCompat(inputRegex[inputType].test(inputText) ? "valid" : "invalid");
  };

  return (
    <View style={styles.container}>
      {label && <Text style={styles.label}>{label}</Text>}
      <View
        style={{
          ...styles.inputContainer,
          borderColor: stateBorderColor[compat],
        }}
      >
        <TextInput
          style={styles.input}
          onChangeText={handleChangeText}
          placeholder={placeholder}
          keyboardType={
            inputType === "number" ? "numeric" : "default" // Set keyboardType based on inputType
          }
          secureTextEntry={inputType === "password" && !toggle} // Set secureTextEntry for password inputType
          value={text}
          autoCapitalize="none"
        />
        {inputType === "password" && (
          <TouchableOpacity
            onPress={() => {
              setToggle(!toggle);
            }}
          >
            <Image
              style={styles.icon}
              source={require("@/assets/icons/eye.png")} // Placeholder icon, replace with appropriate image
            />
          </TouchableOpacity>
        )}
      </View>
      {error && inputState == "invalid" && (
        <View style={styles.errorContainer}>
          <Image
            style={styles.errorIcon}
            source={require("@/assets/icons/error.png")}
          />
          <Text style={styles.errorText}> {error}</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    maxWidth: 375,
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    gap: 7,
  },
  label: {
    flex: 0,
    fontSize: 14,
    fontWeight: "600",
    color: "#353535",
  },
  inputContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    height: 60,
    paddingLeft: 10,
    paddingRight: 16,
    borderRadius: 100,
    borderWidth: 2,
    position: "relative",
  },
  input: {
    flex: 1,
    fontSize: 14,
    color: "#353535",
  },
  icon: {
    width: 18,
    height: 12,
  },
  errorContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 2,
  },
  errorIcon: {
    width: 16,
    height: 16,
  },
  errorText: {
    fontSize: 12,
    color: "red",
  },
});
