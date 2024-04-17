import React from 'react';
import {Dimensions, StyleSheet, Text, View, Image} from 'react-native';
import {useAuth0} from 'react-native-auth0';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Onboarding, {Page} from 'react-native-onboarding-swiper';
import ScreenLayout from '../components/layout';
import {StackActions, useNavigation} from '@react-navigation/native';

const ONBOARDING_PAGES_DATA: Page[] = [
  {
    backgroundColor: '#fff8f0',
    image: (
      <Image
        src={
          'https://res.cloudinary.com/dkfptto8m/image/upload/v1713273210/pixieguide-mdx-project/pixieguide-logo.png'
        }
      />
    ),
    title: 'Discover devices near you!',
    subtitle:
      'PixieGuide app offers unique features to scan, and learn how to use devices around you!',
  },
  {
    backgroundColor: '#fff8f0',
    title: 'Guide on foreign devices',
    subtitle:
      'Don’t know what a gadget is? -- Scan it to find out how to use it!',
    image: (
      <Image
        src={
          'https://res.cloudinary.com/dkfptto8m/image/upload/v1713273210/pixieguide-mdx-project/pixieguide-logo.png'
        }
      />
    ),
  },
  {
    backgroundColor: '#060606',
    title: 'Social World on Manuals',
    subtitle:
      'An interactive platform to create videos on how you use a device and share them!  ',
    image: (
      <Image
        src={
          'https://res.cloudinary.com/dkfptto8m/image/upload/v1713273210/pixieguide-mdx-project/pixieguide-logo.png'
        }
      />
    ),
  },
];

const width = Dimensions.get('window').width;

function OnboardingSwiper(): React.JSX.Element {
  const {user, authorize} = useAuth0();

  const navigation = useNavigation();

  if (user) {
    navigation.dispatch(StackActions.push('HomeStack'));
    return <></>
  }

  const handleLogin = async () => {
    try {
      await authorize({}, {});

      return navigation.dispatch(StackActions.push('Home'));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <ScreenLayout safeHorizontal={false} backgroundColor="#fff8f0">
      <Onboarding
        pages={ONBOARDING_PAGES_DATA}
        showDone={false}
        showSkip={false}
        showPagination={false}
        pageIndexCallback={index => {}}
        flatlistProps={{
          renderItem: ({item, index}) => {
            return (
              <View
                style={{
                  flex: 1,
                  width,
                  backgroundColor: '#fff8f0',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <View style={styles.spaceHorizontal}>
                  <View style={styles.alignCenter}>
                    <Text style={styles.sectionTitle}> {item?.title} </Text>
                  </View>

                  <View style={styles.alignCenter}>
                    <Text
                      style={[
                        styles.text,
                        {textAlign: 'center', marginTop: 15},
                      ]}>
                      {' '}
                      {item?.subtitle}{' '}
                    </Text>
                  </View>
                </View>
              </View>
            );
          },
          data: ONBOARDING_PAGES_DATA,
        }}
      />

      <View style={styles.spaceHorizontal}>
        <TouchableOpacity onPress={handleLogin}>
          <View style={styles.button}>
            <Text style={[styles.text, {color: '#fff'}]}>Get Started</Text>
          </View>
        </TouchableOpacity>
      </View>
    </ScreenLayout>
  );
}

const styles = StyleSheet.create({
  spaceHorizontal: {
    marginHorizontal: 15,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  alignCenter: {
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
  },
  text: {
    fontSize: 16,
  },
  button: {
    width: 'auto',
    height: 45,
    borderRadius: 30,
    backgroundColor: '#115e65',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default OnboardingSwiper;
