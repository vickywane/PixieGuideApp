import React from 'react';
import {View, Text} from 'react-native';
import {Button} from 'react-native-paper';
import {StackActions, useNavigation} from '@react-navigation/native';
import ScreenLayout from '../../components/ScreenLayout';

const WelcomeSwiper = () => {
  const navigation = useNavigation();
  const handleNavigation = (screen: string) =>
    navigation.dispatch(StackActions.push(screen));

  return (
    <ScreenLayout>
      <Text> ONBOARDING SCREEN </Text>

      <Button onPress={() => handleNavigation('Camera')}>
        <Text> Scan An Object </Text>
      </Button>

      <Button onPress={() => handleNavigation('SignUp')}>
        <Text> Sign Up </Text>
      </Button>

      <Button onPress={() => handleNavigation('Login')}>
        <Text> Create An Account </Text>
      </Button>
    </ScreenLayout>
  );
};

export default WelcomeSwiper;
