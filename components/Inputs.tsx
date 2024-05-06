import { StyleSheet, Text, View, TextInput, Image } from 'react-native';
import React from 'react';

const Inputs = ({
  placeholder,
  icon,
  isTime,
  onChangeText,
}: {
  placeholder: string;
  icon: any;
  isTime: boolean;
  onChangeText?: (text: string) => void;
}) => {
  return (
    <View style={styles.searchSection}>
      <TextInput
        placeholder={placeholder}
        style={styles.inputTime}
        onChangeText={onChangeText}
      />
      <View style={styles.iconContainer}>
        <Image source={icon} style={[styles.icon, isTime && styles.Time]} />
      </View>
    </View>
  );
};

export default Inputs;

const styles = StyleSheet.create({
  searchSection: {
    // flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconContainer: {
    position: 'absolute',
    right: 10,
    bottom: 13,
  },
  icon: {
    width: 30,
    height: 30,
    alignSelf: 'center',
  },
  inputTime: {
    fontSize: 15,
    lineHeight: 20,
    fontFamily: 'Inter-Regular',
    borderWidth: 1,
    borderColor: '#9AA5B5',
    width: 155,
    height: 50,
    borderRadius: 100,
    paddingLeft: 10,
    marginTop: 20,
    fontWeight: '400',
  },

  Time: {
    width: 18,
    height: 18,
  },
});
