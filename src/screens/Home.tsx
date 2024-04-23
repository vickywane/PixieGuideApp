import React, {useState} from 'react';
import {Button, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Header from '../components/Header';
import ScreenLayout from '../components/layout';
import {launchImageLibrary} from 'react-native-image-picker';
import {Dirs, FileSystem} from 'react-native-file-access';
import {AxiosClient} from '../services/AxiosClient';
import {DETECT_OBJECT_ENDPOINT} from '../constants';
import {createStackNavigator} from '@react-navigation/stack';
import ScanResult from './ScanResult';

type IDetectionState =
  | 'IDLE'
  | 'DETECTING'
  | 'DETECTION_ERROR'
  | 'DETECTION_COMPLETE';

function Home({navigation}): React.JSX.Element {
  const [detectionState, setDetectionState] = useState<IDetectionState>('IDLE');

  const handleGalleryPick = async () => {
    try {
      const libraryData = await launchImageLibrary({
        mediaType: 'photo',
      });

      const fileBuffer = await FileSystem.readFile(
        libraryData?.assets[0]?.uri,
        'base64',
      );

      setDetectionState('DETECTING');

      const {data: detectObjectData} = await AxiosClient({
        method: 'POST',
        body: fileBuffer,
        endpoint: DETECT_OBJECT_ENDPOINT,
      });

      if (detectObjectData) {
        setDetectionState('DETECTION_COMPLETE');

        return navigation.push('ScanResult', {
          scan: detectObjectData[0],
        });
      }

      setDetectionState('DETECTION_ERROR');
    } catch (error) {
      console.log('Error =>', error);

      setDetectionState('DETECTION_ERROR');
    }
  };

  return (
    <View>
      <Header title="Scan Object" />

      <ScreenLayout safeTop={true}>
        <View>
          <View>
            {detectionState === 'DETECTING' ? (
              <View>
                <Text>Hang on! </Text>
                <Text>
                  PixiGuide is searching for user manual for your device.{' '}
                </Text>
              </View>
            ) : (
              <View>
                <TouchableOpacity onPress={handleGalleryPick}>
                  <View style={styles.button}>
                    <Text style={[styles.text, {color: '#fff'}]}>
                      Upload From Gallery
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
            )}
          </View>
        </View>
      </ScreenLayout>
    </View>
  );
}

const Stack = createStackNavigator();

function HomeScreensStack(): React.JSX.Element {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="Home" component={Home} />

      <Stack.Screen name="ScanResult" component={ScanResult} />
    </Stack.Navigator>
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
  button: {
    width: 'auto',
    height: 45,
    borderRadius: 30,
    backgroundColor: '#115e65',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 14,
  },
});

export default HomeScreensStack;
