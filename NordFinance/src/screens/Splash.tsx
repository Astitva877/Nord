import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';

const Splash = ({navigation}: any) => {
  return (
    <View style={styles.container}>
      <View style={styles.upperView} />
      <View style={styles.lowerView}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Home')}>
          <Text style={styles.buttonText}>Go to Home</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Splash;

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: '#FFFFFF'},
  lowerView: {flex: 0.4, alignItems: 'center'},
  upperView: {flex: 0.6},
  button: {
    height: '20%',
    width: '90%',
    backgroundColor: '#000000',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 15,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '500',
  },
});
