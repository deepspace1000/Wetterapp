import React from 'react';
import {View, Text, StyleSheet, ImageBackground, TextInput, Button} from 'react-native';
import { useState, useEffect } from 'react';
import {Icon} from "@rneui/themed";
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import {geocodeAsync} from "expo-location";



export default function SearchScreen({navigation}) {

    const [locationName, setlocationName] = useState('');
    const [position, setPosition] = useState({"accuracy": 100, "altitude": 0, "latitude": 47.3870107, "longitude": 8.8604146});
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
            <ImageBackground source={require('./../assets/wolke.jpg')} style={styles.background}>
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
                    <View style={styles.mapView}>

                            <MapView style={styles.map} region={position} initialRegion={{latitude: 47.36667, longitude: 8.55}}>
                                <Marker coordinate={position} />
                            </MapView>

                    </View>
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
        alignItems: 'stretch',
    },
    innerContainer: {
        flex: 1,
        alignItems: 'center',
        marginTop: 90,
    },
    searchBar: {
        alignItems: 'center',
        flexDirection: 'row',
        backgroundColor: '#ffffff',
        margin: 5,
        height: 50,
        borderRadius: 15,
        width: '60%'

    },
    textInput: {
        flex: 1,
        marginLeft: 10,
    },
    searchItem: {
        alignSelf: "flex-end",
        marginRight: 20,
    },
    mapView: {
        flex: 1,
        //alignItems: 'stretch',
    },
    map: {
        height: 300,
        width: 300,
    },
});