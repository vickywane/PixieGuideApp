import React from 'react';
import {Button, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {useAuth0, Auth0Provider} from 'react-native-auth0';
import Header from '../components/Header';
import ScreenLayout from '../components/layout';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import { Dirs, FileSystem } from 'react-native-file-access';
import { AxiosClient } from '../services/AxiosClient';

function Home(): React.JSX.Element {
  const {getCredentials, user, authorize} = useAuth0();

  const handleGalleryPick = async () => {
    const libraryData = await launchImageLibrary({
      mediaType: "photo"
    })

    const fileBuffer = await FileSystem.readFile(libraryData?.assets[0].uri, "base64");

    const request = await AxiosClient({
      method: "POST",
      body:  fileBuffer
    })

    console.log("RESPONSE", request)
  }

  return (
    <View>
      <Header title="Scan Object" />

      <ScreenLayout safeTop={false}>
      <View>
          <TouchableOpacity onPress={handleGalleryPick}>
            <View style={styles.button}>
              <Text style={[styles.text, {color: '#fff'}]}>Upload From Gallery</Text>
            </View>
          </TouchableOpacity>
        </View>


        {/* <View>
          <TouchableOpacity onPress={() => {}}>
            <View style={styles.button}>
              <Text style={[styles.text, {color: '#fff'}]}>Capture Image</Text>
            </View>
          </TouchableOpacity>
        </View> */}
      </ScreenLayout>
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
  }
});

export default Home;
