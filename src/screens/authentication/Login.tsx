import {StackActions, useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import {View, Text, StyleSheet, Button, TouchableOpacity} from 'react-native';
import {TextInput} from 'react-native-gesture-handler';

// TODO: Move into constants file
const INPUT_USER_DETAILS = 'INPUT_USER_DETAILS';
const INPUT_USER_OTP = 'INPUT_USER_OTP';
const USER_VERIFIED = 'USER_VERIFIED';

const Login = () => {
  const [email, onChangeEmail] = useState('');
  const [phoneNumber, onChangePhoneNumber] = useState('0');

  //   TODO: Implement dynamic retrieval of country code by geolocation status
  const [countryCode, oncountryCode] = useState('+49');
  const [createAcountStage, setCreateAccountStage] =
    useState(INPUT_USER_DETAILS);
  const navigation = useNavigation();

  const handleCreateAccount = () => {
    // AWS Amplify Logic
    setCreateAccountStage(INPUT_USER_OTP);
    navigation.dispatch(StackActions.push('otpVerification'));
  };

  return (
    <View style={styles.container}>
      <View>
        <View>
          <Text style={styles.heading}> Sign Up </Text>
          <Text style={styles.text}> Let's create your account </Text>
        </View>

        <View style={{marginTop: 30}}>
          <View style={{marginBottom: 26}}>
            <Text style={[styles.text, {marginBottom: 8}]}>
              {' '}
              Your phone number{' '}
            </Text>
            <View style={{flexDirection: 'row'}}>
              <View style={{width: 53, marginRight: 8}}>
                <TextInput
                  style={styles.input}
                  value={countryCode}
                  keyboardType="numeric"
                  onChangeText={oncountryCode}
                />
              </View>

              <View style={{flex: 1}}>
                <TextInput
                  style={styles.input}
                  value={phoneNumber}
                  keyboardType="numeric"
                  onChangeText={onChangePhoneNumber}
                />
              </View>
            </View>
          </View>

          <View>
            <Text style={[styles.text, {marginBottom: 8}]}>Your email </Text>
            <TextInput
              value={email}
              style={styles.input}
              inputMode="email"
              onChangeText={onChangeEmail}
            />
          </View>
        </View>
      </View>

      <View style={{marginBottom: 32}}>
        <Text style={[styles.text, {color: '#CCC', marginBottom: 16}]}>
          By clicking the “Create account” button, you agree to Yyenza’s{' '}
          <Text
            style={{
              color: '#BC5CFF',
              textDecorationColor: '#BC5CFF',
              textDecorationLine: 'underline',
            }}>
            User Agreement{' '}
          </Text>{' '}
          and{' '}
          <Text
            style={{
              color: '#BC5CFF',
              textDecorationColor: '#BC5CFF',
              textDecorationLine: 'underline',
            }}>
            Privacy policy
          </Text>
        </Text>

        <TouchableOpacity onPress={handleCreateAccount} style={styles.button}>
          <Text style={[styles.text, {color: '#000', fontWeight: '600'}]}>
            {' '}
            Create Account{' '}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  section: {
    marginBottom: 30,
  },
  heading: {
    color: '#fff',
    fontSize: 30,
    fontWeight: '700',
    marginBottom: 10,
  },
  input: {
    height: 48,
    color: '#fff',
    paddingLeft: 12,
    borderWidth: 1,
    borderColor: '#343434',
    borderRadius: 16,
  },
  text: {
    color: '#CCC',
    fontSize: 14,
  },
  container: {
    backgroundColor: '#060606',
    paddingTop: 15,
    paddingHorizontal: 15,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    flex: 1,
  },
  button: {
    height: 46,
    backgroundColor: '#fff',
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Login;
