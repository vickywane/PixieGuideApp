import {StackActions, useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {TextInput} from 'react-native-gesture-handler';
import {AxiosClient} from '../../utils/AxiosClient';

const SignUp = () => {
  const [email, onChangeEmail] = useState('');
  const [username, onChangeUsername] = useState('');
  const [password, onChangePassword] = useState('');

  const navigation = useNavigation();

  const handleCreateAccount = async () => {
    const {status} = await AxiosClient({
      endpoint: 'user',
      method: 'POST',
      body: {
        email,
        password,
        username,
      },
    });

    if (status === 200) {
      navigation.dispatch(
        StackActions.push('OTPVerification', {
          email,
          username
        }),
      );
    }
  };

  return (
    <View style={styles.container}>
      <View>
        <View>
          <Text style={styles.heading}> Create Account </Text>
          <Text style={styles.text}>Let's create your PixieGuide account </Text>
        </View>

        <View style={{marginTop: 30}}>
          <View style={{marginBottom: 26}}>
            <Text style={[styles.text, {marginBottom: 8}]}>Your username</Text>
            <View style={{flexDirection: 'row'}}>
              <View style={{flex: 1}}>
                <TextInput
                  style={styles.input}
                  value={username}
                  keyboardType="numeric"
                  placeholder="Username"
                  onChangeText={onChangeUsername}
                />
              </View>
            </View>
          </View>

          <View style={{marginBottom: 26}}>
            <Text style={[styles.text, {marginBottom: 8}]}>Your Email </Text>
            <TextInput
              value={email}
              style={styles.input}
              inputMode="email"
              placeholder="Email"
              onChangeText={onChangeEmail}
            />
          </View>

          <View>
            <Text style={[styles.text, {marginBottom: 8}]}>Your Password </Text>
            <TextInput
              value={password}
              style={styles.input}
              placeholder="Password"
              inputMode="text"
              onChangeText={onChangePassword}
            />
          </View>
        </View>
      </View>

      <View style={{marginBottom: 32}}>
        <Text style={[styles.text, {color: '#CCC', marginBottom: 16}]}>
          By proceeding, you agree to PixieGuide’s{' '}
          <Text
            style={{
              color: '#BC5CFF',
              textDecorationColor: '#BC5CFF',
              textDecorationLine: 'underline',
            }}>
            User Agreement{' '}
          </Text>
        </Text>

        <TouchableOpacity onPress={handleCreateAccount} style={styles.button}>
          <Text style={[styles.text, {color: '#000', fontWeight: '600'}]}>
            Join PixieGuide
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

export default SignUp;
