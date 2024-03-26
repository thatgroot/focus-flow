import { Image } from 'expo-image';
import React from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import LabeledInput from '@/components/InputField';
import Checkbox from '@/components/CheckBox';
import CheckboxGroup from '../../components/CheckBoxGroup';

const SignInScreen = () => {
  const handleCheckboxChange = (selectedLabels: string[]) => {
    console.log('Selected label:', JSON.stringify(selectedLabels));
    // Handle the selected label here (e.g., update state)
  };
  return (
    <View style={styles.container}>
      <Image
        style={{
          width: 336,
          height: 281,
        }}
        source={require('@/assets/images/signin.png')}
      />
      <View style={styles.signInContainer}>
        <Text style={styles.title}>Sign In</Text>
        <Text style={styles.subtitle}>Enter Your Credentials to Continue:</Text>
      </View>
      <View style={styles.inputContainer}>
        <LabeledInput
          isValid={true}
          borderActiveColor={'green'}
          label='Enter Password'
          placeholder='Password'
          secureTextEntry={false}
        />

        <CheckboxGroup onChange={handleCheckboxChange}>
          {['Pscychology', 'Biology', 'Physics', 'Mathematics'].map(
            (label, index) => (
              <Checkbox
                isRadio={false}
                isChecked={false}
                onPress={() => {}}
                key={index}
                label={label}
              />
            ),
          )}
        </CheckboxGroup>

        <TouchableOpacity style={styles.button} onPress={() => {}}>
          <Text style={styles.buttonText}>Sign In</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.signUpContainer}>
        <Text style={styles.signUpText}>Don’t have an Account?</Text>
        <TouchableOpacity
          onPress={() => {
            // Handle navigation to sign up
          }}
        >
          <Text style={styles.signUpLink}>Sign Up</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  signInContainer: {
    alignItems: 'center',
    marginBottom: 27,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#8c99de',
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 14,
    color: '#353535',
  },
  inputContainer: {
    alignItems: 'center',
    gap: 0,
  },
  input: {
    width: 280,
    height: 40,
    borderWidth: 1,
    borderRadius: 20,
    borderColor: '#9aa5b5',
    paddingLeft: 10,
    marginBottom: 27,
  },
  button: {
    width: 280,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40,
    backgroundColor: '#8a97dd',
    shadowColor: '#000',
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
    fontWeight: 'bold',
    color: '#fff',
  },
  signUpContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  signUpText: {
    fontSize: 14,
    color: '#353535',
  },
  signUpLink: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#8c99de',
    marginLeft: 5,
  },
});

export default SignInScreen;
