/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Pressable} from 'react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import IndexStack from './src/stacks/IndexStack';
import AuthStack from './src/stacks/AuthStack';

export type RootStackParamList = {
  Auth: {
    setIsLoggedIn?: (value: boolean) => void;
    screen: 'Index';
  };
  Root: {
    screen: 'Index' | 'Send';
  };
  Index: undefined;
};

const RootStack = createNativeStackNavigator<RootStackParamList>();

function CustomBackArrow() {
  const {goBack} = {goBack: null};

  return (
    <Pressable onPress={goBack}>
      <Ionicons name="chevron-back-outline" size={24} color="#fff" />
    </Pressable>
  );
}

function App(): JSX.Element {
  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <NavigationContainer>
        <RootStack.Navigator>
          <RootStack.Screen
            name="AuthStack"
            component={AuthStack}
            options={{
              headerShown: false,
              headerBackVisible: false,
            }}
          />

          <RootStack.Screen
            name="Index"
            component={IndexStack}
            options={{
              headerShown: false,
              headerBackVisible: false,
            }}
          />
        </RootStack.Navigator>
      </NavigationContainer>
    </GestureHandlerRootView>
  );
}

export default App;
