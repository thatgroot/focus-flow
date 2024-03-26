import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Image } from 'expo-image'; // Make sure this import is correct

export interface CheckboxProps {
  label: string;
  isRadio?: boolean; // New prop to specify if it's a radio button
  isChecked: boolean;
  onPress: (label: string, isRadio?: boolean) => void;
}

const Checkbox: React.FC<CheckboxProps> = ({
  label,
  isRadio = false,
  isChecked,
  onPress,
}) => {
  const handleToggle = () => {
    onPress(label, isRadio);
  };

  return (
    <TouchableOpacity style={styles.container} onPress={handleToggle}>
      {isChecked ? (
        <Image
          style={{
            width: 24,
            height: 24,
          }}
          source={
            isRadio
              ? require('@/assets/images/checked_radio.png')
              : require('@/assets/images/checked.png')
          }
        />
      ) : (
        <View style={[styles.checkbox]} />
      )}
      <Text style={styles.label}>{label}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    width: 356,
    borderRadius: 12,
    backgroundColor: '#fff',
    paddingHorizontal: 9,
    paddingVertical: 25,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderWidth: 1.5,
    borderColor: '#9aa5b5',
    borderRadius: 12,
  },
  checked: {
    backgroundColor: '#9aa5b5', // Change color when checked
  },
  label: {
    fontSize: 16,
    fontWeight: '500',
    color: '#353535',
    marginLeft: 10,
  },
});

export default Checkbox;
