import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';
import {View} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import SignUp from '../screens/authentication/SignUp';
import Login from '../screens/authentication/Login';
import WelcomeSwiper from '../screens/authentication/WelcomeSwiper';
import OTPVerification from '../screens/authentication/OtpVerification';

export type AuthStackParamList = {
  Onboarding: undefined;
  Login: {setIsLoggedIn: (value: boolean) => void};
  EnableNotification: undefined;
  Signup: undefined;
  otpVerification: undefined;
};

const Stack = createStackNavigator<AuthStackParamList>();

const HeaderLeftIcon = () => {
  return (
    <View style={{marginLeft: 10}}>
      <TouchableWithoutFeedback onPress={() => {}}>
        <Icon size={30} color={'#fff'} name="chevron-back" />
      </TouchableWithoutFeedback>
    </View>
  );
};

const AuthHeaderOptions = {
  headerBackTitleVisible: false,
  headerTitle: ' ',
  headerTintColor: '#fff',
  headerLeft: () => <HeaderLeftIcon />,
  headerStyle: {
    backgroundColor: '#060606',
    shadowColor: 'transparent', // iOS remove tiny underline
    elevation: 0, // Android remove tiny underline
  },
};

const AuthStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        options={{headerShown: false}}
        name="Onboarding"
        component={WelcomeSwiper}
      />

      <Stack.Screen
        options={AuthHeaderOptions}
        name="SignUp"
        component={SignUp}
      />

      <Stack.Screen
        options={AuthHeaderOptions}
        name="Login"
        component={Login}
      />

      <Stack.Screen
        options={{headerShown: false}}
        name="OTPVerification"
        component={OTPVerification}
      />
    </Stack.Navigator>
  );
};

export default AuthStack;
