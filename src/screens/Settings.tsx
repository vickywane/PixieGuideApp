import React from 'react';
import {Button, StyleSheet, Text, View, Image} from 'react-native';
import {useAuth0, Auth0Provider} from 'react-native-auth0';
import ScreenLayout from '../components/layout';
import Header from '../components/Header';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Feather';

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

function Settings({ navigation }): React.JSX.Element {
  const {getCredentials, user, authorize, clearSession, clearCredentials} =
    useAuth0();

  const handleLogout = async () => {
    try {
      await clearCredentials();
      await clearSession();

      navigation.navigate("OnboardingStack")
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <ScreenLayout safeTop={false} safeHorizontal={false}>
      <Header title="Account" displayBack />

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
              style={{
                marginVertical: 15,
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}
              onPress={() => {}}
              key={idx}>
              <View>
                <Text style={styles.title}> {title} </Text>
                <Text style={styles.text}> {description} </Text>
              </View>

              <View style={styles.alignCenter}>
                <Icon name="chevron-right" size={24} />
              </View>
            </TouchableOpacity>
          ))}

          <TouchableOpacity
            style={{
              marginTop: 15,
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}
            onPress={handleLogout}>
            <View>
              <Text style={styles.title}> Logout </Text>
              <Text style={styles.text}>
                {' '}
                Logout of your PixieGuide account{' '}
              </Text>
            </View>

            <View style={styles.alignCenter}>
              <Icon name="chevron-right" size={24} />
            </View>
          </TouchableOpacity>
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
    height: 76,
    width: 76,
    borderRadius: 100,
  },
  text: {
    fontSize: 14,
  },
  alignCenter: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Settings;
