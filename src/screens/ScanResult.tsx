import React, {useEffect, useState} from 'react';
import {
  Text,
  StyleSheet,
  ScrollView,
  Image,
  View,
  Dimensions,
} from 'react-native';
import Header from '../components/Header';
import ScreenLayout from '../components/layout';
import {FIND_OBJECT_GUIDE_ENDPOINT, GUIDE_FEEDBACK_ENDPOINT} from '../constants';
import {AxiosClient} from '../services/AxiosClient';
import {ActivityIndicator} from 'react-native-paper';
import Markdown from 'react-native-markdown-display';
import Video from 'react-native-video';
import Icon from 'react-native-vector-icons/Feather';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {TextInput} from 'react-native-paper';
import Modal from 'react-native-modal';

type IGuideState =
  | 'IDLE'
  | 'DETECTING'
  | 'DETECTION_ERROR'
  | 'DETECTION_COMPLETE';

type UserFeedback = 'HELPFUL' | 'NON-HELPFUL';

const width = Dimensions.get('screen').width;

function ScanResult({route, navigation}): React.JSX.Element {
  const [detectionObject, setDetectionObject] = useState(null);
  const [guideState, setGuideState] = useState<IGuideState>('IDLE');
  const [feedbackState, setFeedbackState] = useState<{
    isVisible: boolean;
    value: '' | UserFeedback;
  }>({
    isVisible: false,
    value: '',
  });
  const [feedbackComment, setFeedbackComment] = useState('');

  useEffect(() => {
    if (route?.params?.scan) {
      (async () => {
        const {data: objectGuide} = await AxiosClient({
          method: 'POST',
          body: {
            name: route?.params?.scan?.Name,
          },
          endpoint: FIND_OBJECT_GUIDE_ENDPOINT,
        });

        if (objectGuide) {
          setDetectionObject(objectGuide[0]);
        }
      })();
    }
  }, [route?.params]);

  const handleUserFeedback = (value: '' | UserFeedback) => {
    setFeedbackState({
      isVisible: !feedbackState.isVisible,
      value,
    });
  };

  const submitUserFeedback = async () => {
    try {
      const {data} = await AxiosClient({
        method: 'POST',
        body: {
          comment: feedbackState.value
        },
        endpoint: GUIDE_FEEDBACK_ENDPOINT,
      });

      if (data) {
        handleUserFeedback('');
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View>
      <Header title={route?.params?.scan?.Name} displayBack />

      <Modal
        swipeDirection={['up', 'left', 'right', 'down']}
        isVisible={feedbackState.isVisible}
        // deviceHeight={300}
        // style={{justifyContent: 'flex-end', margin: 0}}
        onBackdropPress={() => handleUserFeedback('')}>
        <View style={{backgroundColor: 'white', padding: 16}}>
          <View style={styles.alignCenter}>
            <View style={[styles.feedbackIconContainer, styles.alignCenter]}>
              <Icon
                name={
                  feedbackState?.value === 'HELPFUL'
                    ? 'thumbs-up'
                    : 'thumbs-down'
                }
                size={24}
                color={'white'}
              />
            </View>
          </View>

          <View>
            <Text style={[styles.sectionTitle, {textAlign: 'center'}]}>
              Tell us more!
            </Text>

            <Text style={[styles.text, {textAlign: 'center'}]}>
              Giving us a feedback will greatly help us improve this{' '}
              {route?.params?.scan?.Name} Guide.
            </Text>
          </View>

          <View style={{marginVertical: 32}}>
            <TextInput
              value={feedbackComment}
              label="Your Feedback"
              style={{fontSize: 14, backgroundColor: '#fff8f0'}}
              multiline
              //   underlineColor='red'

              onChangeText={value => setFeedbackComment(value)}
              placeholder="How best can we improve this guide?"
            />
          </View>

          <TouchableOpacity onPress={() => {}}>
            <View style={styles.button}>
              <Text style={[styles.text, {color: '#fff'}]}>
                Submit Feedback
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </Modal>

      <ScreenLayout>
        <View>
          {!detectionObject ? (
            <ActivityIndicator />
          ) : (
            <ScrollView
              contentInsetAdjustmentBehavior="automatic"
              style={{height: '100%', marginBottom: 20}}>
              <View>
                <Image
                  src={detectionObject.cover_image}
                  style={styles.image}
                  resizeMode={'cover'}
                  resizeMethod="resize"
                />

                <Text style={{marginBottom: 16}}>
                  {detectionObject.summary}{' '}
                </Text>
              </View>

              <View style={styles.section}>
                <Text style={styles.sectionTitle}> Usage Guide </Text>

                <Markdown>{detectionObject.steps}</Markdown>
              </View>

              <View style={styles.section}>
                <Text style={styles.sectionTitle}> Explore Videos </Text>

                {detectionObject?.videos?.map((url, idx) => {
                  return (
                    <View key={idx}>
                      <Video
                        onBuffer={value => console.log(value)} // Callback when remote video is buffering
                        onError={value => console.log(value)}
                        source={{uri: url}}
                        style={styles.backgroundVideo}
                      />
                    </View>
                  );
                })}
              </View>

              <View
                style={[
                  styles.section,
                  {position: 'absolute', bottom: 30, width: width - 40},
                ]}>
                <View style={styles.feedback}>
                  <View
                    style={{
                      justifyContent: 'space-between',
                      flexDirection: 'row',
                    }}>
                    <View style={styles.alignCenter}>
                      <Text style={[styles.text, {color: 'white'}]}>
                        Has this guide been useful?{' '}
                      </Text>
                    </View>

                    <View style={{flexDirection: 'row'}}>
                      <View style={{marginHorizontal: 8}}>
                        <TouchableOpacity
                          onPress={() => handleUserFeedback('HELPFUL')}>
                          <Icon name="thumbs-up" size={24} color={'white'} />
                        </TouchableOpacity>
                      </View>

                      <View style={{marginHorizontal: 8}}>
                        <TouchableOpacity
                          onPress={() => handleUserFeedback('NON-HELPFUL')}>
                          <Icon name="thumbs-down" color={'white'} size={24} />
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>
                </View>
              </View>
            </ScrollView>
          )}
        </View>
      </ScreenLayout>
    </View>
  );
}

const styles = StyleSheet.create({
  feedback: {
    height: 45,
    borderRadius: 30,
    backgroundColor: '#115e65',
    justifyContent: 'center',
    paddingHorizontal: 16,
  },
  text: {
    fontSize: 14,
  },
  sectionTitle: {
    color: '#000',
    fontSize: 18,
    marginBottom: 16,
  },
  section: {
    marginVertical: 8,
  },
  image: {
    height: 140,
    width: 'auto',
    marginBottom: 16,
  },
  alignCenter: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  feedbackIconContainer: {
    height: 48,
    width: 48,
    borderRadius: 60,
    backgroundColor: '#115e65',
    marginBottom: 12,
  },
  button: {
    width: 'auto',
    height: 45,
    borderRadius: 30,
    backgroundColor: '#115e65',
    justifyContent: 'center',
    alignItems: 'center',
  },
  backgroundVideo: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
});

export default ScanResult;
