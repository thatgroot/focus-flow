import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

interface InputProps {
  label: string;
  placeholder: string;
  borderActiveColor: string;
  isValid: boolean;
  secureTextEntry?: boolean;
  forgotPassword?: () => void;
}

const Input: React.FC<InputProps> = ({
  label,
  placeholder,
  borderActiveColor,
  isValid,
  secureTextEntry = false,
  forgotPassword,
}) => {
  const [value, setValue] = useState('');

  return (
    <View style={[styles.container]}>
      <Text style={styles.label}>{placeholder}</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={[
            styles.inputText,
            { color: isValid ? '#353535' : '#e34850' },
            { borderColor: isValid ? borderActiveColor : '#e34850' },
          ]}
          value={value}
          onChangeText={setValue}
          placeholder={placeholder}
          secureTextEntry={secureTextEntry}
        />
        <View style={styles.iconContainer}>
          {forgotPassword && (
            <TouchableOpacity onPress={forgotPassword}>
              <Text style={styles.forgotPasswordText}>Forgot?</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
      {!isValid && (
        <View style={styles.errorContainer}>
          <Text style={styles.errorMessage}>Email taken. Try another one</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    position: 'relative',
    paddingBottom: 7, // Adjust if needed
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'left',
    color: '#808191',
  },
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 60, // Adjust if needed
    position: 'relative',
    paddingLeft: 10,
    paddingRight: 16,
  },
  inputText: {
    height: 40,
    borderWidth: 1,
    borderRadius: 20,
    paddingHorizontal: 12,
    fontSize: 14,
    textAlign: 'left',
    flex: 1, // Take up remaining space
  },
  iconContainer: {
    width: 18, // Adjust if needed
    height: 12, // Adjust if needed
  },
  forgotPasswordText: {
    fontSize: 12,
    fontWeight: '600',
    textAlign: 'right',
    color: '#808191',
  },
  errorContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    position: 'relative',
    gap: 8,
    marginTop: 8, // Adjust if needed
  },
  errorMessage: {
    fontSize: 14,
    fontWeight: '300',
    textAlign: 'left',
    color: '#e34850',
  },
});

export default Input;
