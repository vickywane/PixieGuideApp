import React, {useEffect, useRef} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import ScreenLayout from '../components/ScreenLayout';
import {StackActions, useNavigation} from '@react-navigation/native';
import {
  Camera,
  useCameraDevice,
  useCameraPermission,
} from 'react-native-vision-camera';
import Reanimated, {
  interpolate,
  useAnimatedProps,
  useSharedValue,
} from 'react-native-reanimated';

// const ReanimatedCamera = Reanimated.createAnimatedComponent(Camera)
// Reanimated.addWhitelistedNativeProps({
//   zoom: true,
// })

const ScanObject = () => {
  const navigation = useNavigation();
  const handleNavigation = (screen: string) =>
    navigation.dispatch(StackActions.push(screen));
  const {hasPermission, requestPermission} = useCameraPermission();

  useEffect(() => {
    (async () => {
      if (!hasPermission) {
        await requestPermission();
      }
    })();
  }, [hasPermission]);

  const device = useCameraDevice('back');
  const camera = useRef<Camera>(null);

  console.warn('DEVICE', device);
  // console.warn('PERMISSION', hasPermission);

  return (
    <ScreenLayout>
      <Text> CAMERA SCREEN </Text>

      {device && hasPermission && (
        <Camera
          ref={camera}
          style={{ height: 400, width : 400 }}
          device={device}
          isActive={true}
          // format={format}
          // fps={fps}
          // photoHdr={enableHdr}
          // videoHdr={enableHdr}
          // lowLightBoost={device.supportsLowLightBoost && enableNightMode}
          // isActive={isActive}
          onInitialized={() => console.log('CAMERA STARTED!')}
          onError={e => console.log(e)}
          exposure={0}
          orientation="portrait"
          photo={true}
        />
      )}

      {/* <Button>
        <Text> Create An Account </Text>
      </Button> */}
    </ScreenLayout>
  );
};

export default ScanObject;
