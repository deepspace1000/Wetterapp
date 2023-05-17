import React from 'react';
import {View, Text, StyleSheet, ImageBackground, TextInput, Button} from 'react-native';
import { useState, useEffect } from 'react';
import {Icon} from "@rneui/themed";
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';




export default function SearchScreen({navigation}) {

    const [locationName, setlocationName] = useState('');
    const [position, setPosition] = useState({
        latitude: 47.3717402,
        longitude:  8.5367892,
        latitudeDelta: 0.02,
        longitudeDelta: 0.02,});

    const [error, setError] = useState(null);

    const handleGeocode = async () => {
        try{
            const response = await Location.geocodeAsync(locationName);
            console.log(response);
            setPosition(response[0]);
            setError(null);
        } catch (err) {
            setPosition(null);
            setError(err.message);
        }
    }

    useEffect(()=>{
        handleGeocode();

    }, [locationName]);

    return (
        <View style={styles.container}>
            <ImageBackground source={require('../assets/wolke.jpg')} style={styles.background}>
                <View style={styles.innerContainer}>
                    <View style={styles.searchBar}>
                        <TextInput
                            style={styles.textInput}
                            placeholder="Geben sie einen Ort ein"
                            value={locationName}
                            onChangeText={(text) => setlocationName(text)}
                        />
                        <Icon  name="search" style={styles.searchItem} onPress={() => {
                            navigation.navigate('Wetter', {location: locationName})}}/>
                    </View>
                    <MapView style={styles.map} region={position} initialRegion={position}>
                        <Marker coordinate={position} />
                    </MapView>
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
        alignItems: 'stretch',
        opacity: 0.8,
    },
    innerContainer: {
        flex: 1,
        marginTop: 90,
    },
    searchBar: {
        alignItems: 'center',
        flexDirection: 'row',
        backgroundColor: '#ffffff',
        margin: '2%',
        height: 50,
        borderRadius: 15,
        width: '60%',
        alignSelf: 'center',

    },
    textInput: {
        flex: 1,
        marginLeft: 10,
    },
    searchItem: {
        alignSelf: "flex-end",
        marginRight: 20,
    },
    map: {
        flex: 1,
        alignItems: 'center',
        borderRadius: 15,
        marginLeft: '5%',
        marginRight: '5%',
        marginBottom: '35%',
        marginTop: '5%',
    },
});