/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {Button, StyleSheet, Text, View, Image} from 'react-native';
import {useAuth0, Auth0Provider} from 'react-native-auth0';
import ScreenLayout from '../components/layout';
import Header from '../components/Header';
import {TouchableOpacity} from 'react-native-gesture-handler';

const ITEMS = [
  {
    title: 'About Pixieguide',
    description: 'Learn about the motivation behind PixieGuide.',
  },
  {
    title: 'Notification Preferences',
    description: 'Learn about how PixieGuide handles your snapped images',
  },
  {
    title: 'Privacy Information',
    description: 'Learn about how PixieGuide handles your snapped images',
  },
];

function Settings(): React.JSX.Element {
  const {getCredentials, user, authorize} = useAuth0();

  const handleLogout = async () => {
    try {
      console.log('LOGIN HANDLER CLICKED!', authorize, user);

      await authorize({}, {});

      const credentials = await getCredentials();

      console.log('CREDS', credentials);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <ScreenLayout safeTop={false} safeHorizontal={false}>
      <Header title="Account" />

      <ScreenLayout safeTop={false}>
        <View>
          <View style={{flexDirection: 'row'}}>
            <Image
              style={styles.image}
              resizeMode="cover"
              src={user?.picture}
            />

            <View style={{marginLeft: 8, justifyContent: 'center'}}>
              <Text style={styles.title}> {user?.name} </Text>
              <Text style={styles.text}> {user?.email} </Text>
            </View>
          </View>
        </View>

        <View
          style={{
            marginTop: 15,
            borderBottomColor: '#000',
            borderBottomWidth: 1,
          }}
        />

        <View style={{marginTop: 30}}>
          {ITEMS.map(({description, title}, idx) => (
            <TouchableOpacity
              style={{marginVertical: 15}}
              onPress={() => {}}
              key={idx}>
              <View>
                <Text style={styles.title}> {title} </Text>
                <Text style={styles.text}> {description} </Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScreenLayout>
    </ScreenLayout>
  );
}

const styles = StyleSheet.create({
  pageTitle: {
    fontSize: 26,
    fontWeight: '700',
  },
  title: {
    fontSize: 18,
    fontWeight: '500',
    textTransform: 'capitalize',
    marginBottom: 6,
    color: '#000',
  },
  image: {
    height: 86,
    width: 86,
    borderRadius: 100,
  },
  text: {
    fontSize: 14,
  },
});

export default Settings;
