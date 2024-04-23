import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React from 'react';
import {StyleSheet, View} from 'react-native';
import {useAuth0} from 'react-native-auth0';
import Home from '../screens/Home';
import SavedScans from '../screens/SavedScans';
import Settings from '../screens/Settings';
import Icon from 'react-native-vector-icons/Feather';

const Tab = createBottomTabNavigator();

function HomeStack(): React.JSX.Element {
  const {getCredentials, user, authorize} = useAuth0();

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: '#115e65',
        tabBarInactiveTintColor: '#000',
        tabBarInactiveBackgroundColor: '#fff8f0',
        tabBarActiveBackgroundColor: '#fff8f0',
      }}>
      <Tab.Screen
        options={{
          tabBarIcon: ({color}) => (
            <View>
              <Icon color={color} size={24} name="home" />
            </View>
          ),
          headerShown: false,
        }}
        name="Scan"
        component={Home}
      />

      <Tab.Screen
        options={{
          tabBarIcon: ({color}) => (
            <View>
              <Icon color={color} size={24} name="camera" />
            </View>
          ),
          headerShown: false,
        }}
        name="Saved Scans"
        component={SavedScans}
      />

      <Tab.Screen
        options={{
          tabBarIcon: ({color}) => (
            <View>
              <Icon color={color} size={24} name="settings" />
            </View>
          ),
          headerShown: false,
        }}
        name="Settings"
        component={Settings}
      />
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
