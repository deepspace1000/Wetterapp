import React from 'react';
import {ImageBackground, View, Text, StyleSheet} from 'react-native';



export default function WeatherScreen({route}) {
    const{location} = route.params;
  return (
    <View style={styles.container}>
        <ImageBackground source={require('./../assets/wolke.jpg')} style={styles.background}>
            <View>
                <Text>Hallo von WeatherScreen!</Text>
                <Text>{location}</Text>
            </View>

        </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    background: {
        flex: 1,
        resizeMode: 'cover',
        justifyContent: 'center',
        alignItems: "center",
    },
});

