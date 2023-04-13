import React from 'react';
import {View, Text, StyleSheet} from 'react-native';


export default function WeatherScreen() {
  return (
    <View style={styles.container}>
       <Text>Hallo von WeatherScreen!</Text>
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});

