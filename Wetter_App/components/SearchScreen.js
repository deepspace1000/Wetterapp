import React from 'react';
import {View, Text, StyleSheet, ImageBackground, TextInput} from 'react-native';
import { useState, useEffect } from 'react';
import {Icon} from "@rneui/themed";


export default function SearchScreen({navigation}) {

    const [locationName, setlocationName] = useState('');

    return (
        <View style={styles.container}>
            <ImageBackground source={require('./../assets/wolke.jpg')} style={styles.background}>
                <View>
                    <TextInput
                        placeholder="Geben sie einen Ort ein"
                        value={locationName}
                        onChangeText={(text) => setlocationName(text)}
                    />
                    <Icon name="search" onPress={() => {
                        navigation.navigate('Wetter', {location: locationName})}}/>
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