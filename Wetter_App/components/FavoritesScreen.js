import React from 'react';
import {View, Text, StyleSheet, ImageBackground} from 'react-native';


export default function WeatherScreen() {
    return (
        <View style={styles.container}>
            <ImageBackground source={require('./../assets/wolke.jpg')} style={styles.background}>
                <View>
                    <Text>Hallo von FavoritesScreen!</Text>
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