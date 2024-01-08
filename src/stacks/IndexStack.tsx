import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';
import {View} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Home from '../screens/Home';
import ScanObject from '../screens/ScanObject';

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

const IndexStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        options={{headerShown: false}}
        name="Home"
        component={Home}
      />

      <Stack.Screen options={AuthHeaderOptions} name="Camera" component={ScanObject} />

      <Stack.Screen options={AuthHeaderOptions} name="Login" component={Home} />
    </Stack.Navigator>
  );
};

export default IndexStack;
