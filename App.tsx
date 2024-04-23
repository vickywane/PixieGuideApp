import React from 'react';
import {Auth0Provider} from 'react-native-auth0';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import HomeStack from './src/stacks/HomeStack';
import OnboardingStack from './src/stacks/OnboardingStack';

const AUTH0_DOMAIN = 'dev-ueaowzyxfxo2jk4d.us.auth0.com';
const AUTH0_CLIENT_ID = 'iaV8VbQenhYoU1gMqZQJJ21K9uNolvYd';

const RootStack = createNativeStackNavigator();

function App(): React.JSX.Element {
  return (
    <Auth0Provider domain={AUTH0_DOMAIN} clientId={AUTH0_CLIENT_ID}>
      <GestureHandlerRootView>
        <NavigationContainer>
          <RootStack.Navigator>
            <RootStack.Screen
              name="OnboardingStack"
              component={OnboardingStack}
              options={{
                headerShown: false,
                headerBackVisible: false,
              }}
            />

            <RootStack.Screen
              name="HomeStack"
              component={HomeStack}
              options={{
                headerShown: false,
                headerBackVisible: false,
              }}
            />
          </RootStack.Navigator>
        </NavigationContainer>
      </GestureHandlerRootView>
    </Auth0Provider>
  );
}

export default App;
