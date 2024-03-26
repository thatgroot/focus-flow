import React, { useMemo } from "react";
import { Text, StyleSheet, View, ImageSourcePropType } from "react-native";
import { Image } from "expo-image";
import { FontSize, FontFamily, Color, Padding, Border } from "../GlobalStyles";

export type PasswordInputType = {
  password?: string;
  icEye?: ImageSourcePropType;

  /** Style props */
  passwordInputPosition?: string;
  passwordInputMarginLeft?: number | string;
  passwordInputTop?: number | string;
  passwordInputLeft?: number | string;
};

const getStyleValue = (key: string, value: string | number | undefined) => {
  if (value === undefined) return;
  return { [key]: value === "unset" ? undefined : value };
};
const PasswordInput = ({
  password,
  icEye,
  passwordInputPosition,
  passwordInputMarginLeft,
  passwordInputTop,
  passwordInputLeft,
}: PasswordInputType) => {
  const passwordInputStyle = useMemo(() => {
    return {
      ...getStyleValue("position", passwordInputPosition),
      ...getStyleValue("marginLeft", passwordInputMarginLeft),
      ...getStyleValue("top", passwordInputTop),
      ...getStyleValue("left", passwordInputLeft),
    };
  }, [
    passwordInputPosition,
    passwordInputMarginLeft,
    passwordInputTop,
    passwordInputLeft,
  ]);

  return (
    <View
      style={[styles.passwordInput, styles.passwordFlexBox, passwordInputStyle]}
    >
      <View style={[styles.passwordWrapper, styles.passwordFlexBox]}>
        <Text style={styles.password}>{password}</Text>
      </View>
      <Image style={styles.icEyeIcon} contentFit="cover" source={icEye} />
    </View>
  );
};

const styles = StyleSheet.create({
  passwordFlexBox: {
    alignItems: "center",
    flexDirection: "row",
  },
  password: {
    fontSize: FontSize.pxRegularInputs_size,
    fontFamily: FontFamily.pxRegularInputs,
    color: Color.colorGray_100,
    textAlign: "left",
  },
  passwordWrapper: {
    justifyContent: "center",
    padding: Padding.p_3xs,
    zIndex: 0,
  },
  icEyeIcon: {
    position: "absolute",
    top: 18,
    left: 358,
    width: 24,
    height: 24,
    zIndex: 1,
  },
  passwordInput: {
    borderRadius: Border.br_81xl,
    borderStyle: "solid",
    borderColor: Color.inputStrokeColor,
    borderWidth: 2,
    width: 394,
    height: 60,
    paddingLeft: Padding.p_3xs,
    paddingRight: Padding.p_base,
  },
});

export default PasswordInput;
