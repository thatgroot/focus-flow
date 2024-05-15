import { useAppStore } from "@/store";
import { inputRegex } from "@/utils/auth";
import { getFlexDirection, stateBorderColor } from "@/utils/helpers";
import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
} from "react-native";

interface Props {
  label: string;
  placeholder: string;
  inputType: "email" | "password" | "text" | "number";
  error: string;
  onChangeText?: ((text: string) => void) | undefined;
  inputState: InputState;
  multiline?: boolean;
}

export default function LabeledInput({
  label,
  placeholder,
  inputType,
  error,
  onChangeText,
  inputState,
  multiline,
}: Props) {
  const { locale } = useAppStore();

  const direction = getFlexDirection(locale);

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
    <View style={[styles.container]}>
      <View
        style={[
          {
            alignSelf: "stretch",
          },
          direction,
        ]}
      >
        {label && <Text style={[styles.label]}>{label}</Text>}
      </View>
      <View
        style={[
          {
            ...styles.inputContainer,
            borderColor: stateBorderColor[compat],
            borderRadius: multiline ? 24 : 100,
          },
          direction,
        ]}
      >
        <TextInput
          style={[
            styles.input,
            {
              height: multiline ? 84 : 60,
              paddingTop: multiline ? 22 : 0,
              textAlign: locale === "ar" ? "right" : "left",
            },
          ]}
          onChangeText={handleChangeText}
          placeholder={multiline ? "" : placeholder}
          multiline={multiline}
          keyboardType={
            inputType === "number" ? "numeric" : "default" // Set keyboardType based on inputType
          }
          secureTextEntry={inputType === "password" && !toggle} // Set secureTextEntry for password inputType
          value={text}
          autoCapitalize="none"
          textContentType={inputType === "password" ? "oneTimeCode" : "none"}
          autoComplete="off"
          autoCorrect={false}
        />
        {inputType === "password" && (
          <TouchableOpacity
            style={{
              width: 48,
              justifyContent: "center",
              alignItems: "center",
              alignSelf: "stretch",
            }}
            onPress={() => {
              setToggle(!toggle);
            }}
          >
            <Ionicons
              name={toggle ? "eye-off" : "eye"}
              size={18}
              color="grey"
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
          <Text style={styles.errorText}>{error}</Text>
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
    gap: 6,
  },
  label: {
    flex: 0,
    fontSize: 14,
    alignSelf: "stretch",
    fontWeight: "600",
    color: "#353535",
  },
  inputContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderRadius: 100,
    borderWidth: 2,
    position: "relative",
    paddingRight: 18,
  },
  input: {
    flex: 1,
    minHeight: 60,
    paddingHorizontal: 18,
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
