import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React from 'react';
import {StyleSheet} from 'react-native';
import {useAuth0} from 'react-native-auth0';
import Home from '../screens/Home';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function HomeStack(): React.JSX.Element {
  const {getCredentials, user, authorize} = useAuth0();

  return (
    <Tab.Navigator>
      <Tab.Screen name="Scan" component={Home} />

      <Tab.Screen name="Saved Scans" component={Home} />

      <Tab.Screen name="Settings" component={Home} />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default HomeStack;
