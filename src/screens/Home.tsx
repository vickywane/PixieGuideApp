import React from 'react';
import {View, Text} from 'react-native';
import ScreenLayout from '../components/ScreenLayout';
import {Button} from 'react-native-paper';
import {StackActions, useNavigation} from '@react-navigation/native';

const Home = () => {
  const navigation = useNavigation();
  const handleNavigation = (screen: string) =>
    navigation.dispatch(StackActions.push(screen));

  return (
    <ScreenLayout>
      <Text> Home Component </Text>

      <Button onPress={() => handleNavigation("Camera")} >
        <Text> Scan An Object </Text>
      </Button>

      <Button>
        <Text> Sign Up </Text>
      </Button>

      <Button>
        <Text> Create An Account </Text>
      </Button>
    </ScreenLayout>
  );
};

export default Home;
