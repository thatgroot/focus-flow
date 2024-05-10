import React, { useState, ReactNode } from "react";
import { View, StyleSheet } from "react-native";
import { CheckboxProps } from "./CheckBox"; // Adjust import path as needed

interface CheckboxGroupProps {
  children: ReactNode;
  onChange: ({
    current,
    selected,
  }: {
    current: string;
    selected: string[];
  }) => void;
}

const CheckboxGroup: React.FC<CheckboxGroupProps> = ({
  children,
  onChange,
}) => {
  const [selectedLabels, setSelectedLabels] = useState<string[]>([]);
  const [currentLabel, setCurrentLabel] = useState<string>("");

  const handleCheckboxChange = (value: string, isRadio?: boolean) => {
    if (isRadio) {
      setSelectedLabels([value]);
      onChange({ current: value, selected: [...selectedLabels, value] });
      setCurrentLabel(value);
    } else {
      const updatedLabels = selectedLabels.includes(value)
        ? selectedLabels.filter((item) => item !== value)
        : [...selectedLabels, value];
      setSelectedLabels(updatedLabels);
      onChange({
        current: updatedLabels[updatedLabels.length - 1],
        selected: updatedLabels,
      });
    }
  };

  return (
    <View style={styles.container}>
      {React.Children.map(children, (child) =>
        React.cloneElement(child as React.ReactElement<CheckboxProps>, {
          onPress: handleCheckboxChange,
          isChecked: selectedLabels.includes(
            (child as React.ReactElement<CheckboxProps>).props.value
          ),
        })
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    alignItems: "flex-start",
    gap: 6,
  },
});

export default CheckboxGroup;
