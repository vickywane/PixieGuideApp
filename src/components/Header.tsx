import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Ionicons';

interface HeaderProps {
  title: string;
  displayBack?: boolean;
}

function Header({title, displayBack}: HeaderProps): React.JSX.Element {
  const navigation = useNavigation();

  const handleBackPress = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <View style={{flexDirection: 'row'}}>
        {displayBack && (
          <View style={{marginRight: 8}}>
            <TouchableWithoutFeedback onPress={handleBackPress}>
              <Icon name="arrow-back" size={24} />
            </TouchableWithoutFeedback>
          </View>
        )}

        <View style={{justifyContent: 'center'}}>
          <Text style={styles.sectionTitle}> {title}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    marginBottom: 18,
    height: 45,
    paddingHorizontal: 15,
    justifyContent: 'center',

    shadowColor: '#171717',
    shadowOffset: {width: -2, height: 4},
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '500',
    color: '#000',
    textTransform: 'capitalize',
  },
});

export default Header;
