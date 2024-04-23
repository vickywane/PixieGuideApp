/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from "react";
import {
  Button,
  StyleSheet,
  View,
} from "react-native";
import { useAuth0, Auth0Provider } from "react-native-auth0";


function Home(): React.JSX.Element {
  const { getCredentials, user, authorize } = useAuth0();

  const handleLogin = async () => {
    try {
      console.log("LOGIN HANDLER CLICKED!", authorize, user);

      await authorize({}, {});

      const credentials = await getCredentials();

      console.log("CREDS", credentials);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View>
      <Button title="Authenticate" onPress={handleLogin} />
    </View>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: "600",
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: "400",
  },
  highlight: {
    fontWeight: "700",
  },
});

export default Home;
