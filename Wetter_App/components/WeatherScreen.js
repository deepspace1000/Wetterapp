import React from 'react';
import {ImageBackground, View, Text, StyleSheet} from 'react-native';



export default function WeatherScreen() {
    const image = {
        uri: "https://static.spektrum.de/fm/912/f2000x857/Wolken_Sonne_fotolia_65398541_SunnyForest.jpg",
    };
  return (
    <View style={styles.container}>
        <ImageBackground source={image} style={styles.background}>
           <Text>Hallo von WeatherScreen!</Text>
        </ImageBackground>
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
    background: {
        flex: 1,
        //resizeMode: 'cover',
        justifyContent: 'center',
    },
});

