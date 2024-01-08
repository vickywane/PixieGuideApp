import {StackActions, useNavigation} from '@react-navigation/native';
import React, {
  ComponentType,
  MutableRefObject,
  RefObject,
  useEffect,
  useReducer,
  useRef,
  useState,
} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Button,
  TouchableOpacity,
  Image,
} from 'react-native';
import {TextInput} from 'react-native-gesture-handler';
import ScreenLayout from '../../components/ScreenLayout';
import {AxiosClient} from '../../utils/AxiosClient';

// TODO: Move into constants file
const VERIFY_SMS_OTP = 'VERIFY_SMS_OTP';
const VERIFY_EMAIL_OTP = 'VERIFY_EMAIL_OTP';
const OTP_VERIFICATION_SUCCESSFUL = 'OTP_VERIFICATION_SUCCESSFUL';

interface VerificationProps {
  setVerificationStage: (stage: string) => void;
  email: string;
  username: string;
}

const EmailAndSMSCode = ({
  setVerificationStage,
  email,
  username,
}: VerificationProps) => {
  const [codeDigits, setCodeDigit] = useState([]);
  const verifyCode = async () => {

    console.log(codeDigits)
    console.log(codeDigits.join(""))

    const {status} = await AxiosClient( {
      endpoint: 'user/register-otp',
      method: 'POST',
      body: {
        username,
        userOtp: codeDigits.join("")
      },
    });

    if (status === 200) {
      setVerificationStage(VERIFY_EMAIL_OTP);
    }
  };

  const boxOneRef = useRef<View>();
  const boxTwoRef = useRef<View>();
  const boxThreeRef = useRef<View>();
  const boxFourRef = useRef<View>();
  const boxFiveRef = useRef<View>();
  const boxSixRef = useRef<View>();

  return (
    <View style={styles.container}>
      <ScreenLayout safeHorizontal={false}>
        <View>
          <View>
            <Text style={styles.heading}> OTP Verification </Text>
            <Text style={styles.text}>
              Enter the security code sent to {email}
            </Text>
          </View>

          <View style={styles.codeBoxesContainer}>
            <View style={{flexDirection: 'row', marginRight: 24}}>
              <View style={styles.resetCodeBox}>
                <TextInput
                  style={styles.codeText}
                  autoFocus
                  ref={boxOneRef}
                  onChangeText={input => {
                    setCodeDigit(state => {
                      state.push(input);

                      return state;
                    });

                    boxTwoRef?.current?.focus();
                  }}
                  value={codeDigits[0]}
                  keyboardType="numeric"
                  placeholder="-"
                />
              </View>

              <View style={styles.resetCodeBox}>
                <TextInput
                  onChangeText={input => {
                    setCodeDigit(state => {
                      state.push(input);

                      return state;
                    });

                    boxThreeRef?.current?.focus();
                  }}
                  value={codeDigits[1]}
                  style={styles.codeText}
                  ref={boxTwoRef}
                  keyboardType="numeric"
                />
              </View>

              <View style={styles.resetCodeBox}>
                <TextInput
                  style={styles.codeText}
                  ref={boxThreeRef}
                  onChangeText={input => {
                    setCodeDigit(state => {
                      state.push(input);

                      return state;
                    });

                    boxFourRef?.current?.focus();
                  }}
                  value={codeDigits[2]}
                  placeholder="-"
                  keyboardType="numeric"
                />
              </View>
            </View>

            <View style={{flexDirection: 'row'}}>
              <View style={styles.resetCodeBox}>
                <TextInput
                  style={styles.codeText}
                  ref={boxFourRef}
                  onChangeText={input => {
                    setCodeDigit(state => {
                      state.push(input);

                      return state;
                    });

                    boxFiveRef?.current?.focus();
                  }}
                  value={codeDigits[3]}
                  placeholder="-"
                  keyboardType="numeric"
                />
              </View>

              <View style={styles.resetCodeBox}>
                <TextInput
                  style={styles.codeText}
                  ref={boxFiveRef}
                  onChangeText={input => {
                    setCodeDigit(state => {
                      state.push(input);

                      return state;
                    });

                    boxSixRef?.current?.focus();
                  }}
                  value={codeDigits[4]}
                  placeholder="-"
                  keyboardType="numeric"
                />
              </View>

              <View style={styles.resetCodeBox}>
                <TextInput
                  style={styles.codeText}
                  ref={boxSixRef}
                  onChangeText={input => {
                    setCodeDigit(state => {
                      state.push(input);

                      return state;
                    });

                    verifyCode();
                  }}
                  value={codeDigits[5]}
                  placeholder="-"
                  keyboardType="numeric"
                />
              </View>
            </View>
          </View>
        </View>

        <View style={{marginBottom: 32}}>
          <Text style={[styles.text, {color: '#CCC', marginBottom: 16}]}>
            Didn't get code?{' '}
            <Text
              style={{
                color: '#BC5CFF',
                textDecorationColor: '#BC5CFF',
                textDecorationLine: 'underline',
              }}>
              Resend Code
            </Text>
          </Text>
        </View>
      </ScreenLayout>
    </View>
  );
};

const OTPVerification = ({route}: any) => {
  const [OTPVerificationStage, setOTPVerificationStage] =
    useState(VERIFY_SMS_OTP);

  useEffect(() => {
    if (OTPVerificationStage === VERIFY_SMS_OTP) {
      setTimeout(() => {
        // navigate('Auth', {screen: 'EnableNotification'});
      }, 6000);
    }
  }, [OTPVerificationStage]);

  if (OTPVerificationStage === VERIFY_SMS_OTP) {
    return (
      <EmailAndSMSCode
        email={route?.params?.email}
        username={route?.params?.username}
        setVerificationStage={stage => setOTPVerificationStage(stage)}
      />
    );
  }

  return (
    <View style={styles.container}>
      <ScreenLayout>
        <View style={styles.successContainer}>
          <Image
            style={styles.image}
            source={require('../../assets/success-checkmark.png')}
          />
          <Text style={styles.subTitle}> Verification Successful </Text>
          <Text style={[styles.text, {maxWidth: 248, textAlign: 'center'}]}>
            {' '}
            We’ve successfully verified your PixieGuide email.
          </Text>
        </View>
      </ScreenLayout>
    </View>
  );
};

const styles = StyleSheet.create({
  resetCodeBox: {
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    width: 30,
    borderBottomColor: '#fff',
    marginRight: 8,
  },
  codeText: {
    color: '#fff',
    fontSize: 14,
  },
  codeBoxesContainer: {
    flexDirection: 'row',
    marginTop: 30,
    marginBottom: 26,
  },
  successContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    height: 82,
    width: 82,
    marginBottom: 24,
  },
  subTitle: {
    color: '#fff',
    marginBottom: 24,
    fontSize: 18,
    fontWeight: '500',
    textAlign: 'center',
  },
  section: {
    marginBottom: 30,
  },
  heading: {
    color: '#fff',
    fontSize: 30,
    fontWeight: '700',
    marginBottom: 10,
  },
  input: {
    height: 48,
    color: '#fff',
    paddingLeft: 12,
    borderWidth: 1,
    borderColor: '#343434',
    borderRadius: 16,
  },
  text: {
    color: '#CCC',
    fontSize: 14,
  },
  container: {
    backgroundColor: '#060606',
    paddingTop: 15,
    paddingHorizontal: 15,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    flex: 1,
  },
  button: {
    height: 46,
    backgroundColor: '#9F22F6',
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default OTPVerification;
