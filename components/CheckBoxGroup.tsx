import React, { useState, ReactNode } from 'react';
import { View, StyleSheet } from 'react-native';
import { CheckboxProps } from './CheckBox'; // Adjust import path as needed

interface CheckboxGroupProps {
  children: ReactNode;
  onChange: (selectedLabels: string[]) => void;
}

const CheckboxGroup: React.FC<CheckboxGroupProps> = ({
  children,
  onChange,
}) => {
  const [selectedLabels, setSelectedLabels] = useState<string[]>([]);

  const handleCheckboxChange = (label: string, isRadio?: boolean) => {
    if (isRadio) {
      setSelectedLabels([label]);
      onChange([label]);
    } else {
      const updatedLabels = selectedLabels.includes(label)
        ? selectedLabels.filter((item) => item !== label)
        : [...selectedLabels, label];
      setSelectedLabels(updatedLabels);
      onChange(updatedLabels);
    }
  };

  return (
    <View style={styles.container}>
      {React.Children.map(children, (child) =>
        React.cloneElement(child as React.ReactElement<CheckboxProps>, {
          onPress: handleCheckboxChange,
          isChecked: selectedLabels.includes(
            (child as React.ReactElement<CheckboxProps>).props.label,
          ),
        }),
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
});

export default CheckboxGroup;
