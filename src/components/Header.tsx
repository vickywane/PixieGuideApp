import React from 'react';
import {StyleSheet, View, Text} from 'react-native';

interface HeaderProps {
  title: string;
}

function Header({title}: HeaderProps): React.JSX.Element {
  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.sectionTitle} > {title}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    marginBottom: 18,
    height: 45,
    // elevation: 8,
    // shadowColor: "red",
    // borderBottomColor: '#000',
    // borderBottomWidth: 1,
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
    color: "#000"
  },
});

export default Header;
