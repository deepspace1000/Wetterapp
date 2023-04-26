import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, ImageBackground, FlatList} from 'react-native';
import * as Location from 'expo-location';




export default function WeatherScreen() {
    const[favoritesList, setFavoritesList] = useState([{id: 0, name: "Waiting"}, {name: 'Zurich'}, {name: 'Bauma'}]);

    const [locationName, setLocationName] = useState('Waiting..');
    useEffect(() => {
        (async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                locationName('Permission to access location was denied');
                return;
            }

            let {coords} = await Location.getCurrentPositionAsync({});
            if (coords) {
                const {latitude, longitude} = coords;
                let response = await Location.reverseGeocodeAsync({
                    latitude,
                    longitude
                });
                for (let item of response) {
                    let address = `${item.postalCode}, ${item.city}`;
                    setLocationName(address);
                    console.log(address);
                }
            }

        })();
    }, []);

    useEffect(() => {
        const updateCurrentLocation = favoritesList.map((item, i) =>{
            if (i === 0) {
                return {...item, name: locationName };
            }
            else {
                return item;
            }
        });
        setFavoritesList(updateCurrentLocation)
    }, [locationName]);

    return (
        <View style={styles.container}>
            <ImageBackground source={require('./../assets/wolke.jpg')} style={styles.background}>
                <View style={styles.innerContainer}>
                    <FlatList data={favoritesList}
                              keyExtractor={(x, i) => i}
                              renderItem={({item}) =>
                                  <View style={styles.listView}>
                                      <Text style={styles.placeName}>{item.name}</Text>
                                  </View>
                    }
                    />
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
        alignItems: "stretch",
    },
    innerContainer: {
        flex: 1,
        alignItems: 'stretch',
        marginTop: 90,


    },
    listView: {
        alignItems: 'center',
        backgroundColor: '#ffffff',
        margin: 5,
        height: 50,
        borderRadius: 15,
        justifyContent: 'center',
    },
    placeName: {
        fontSize: 15,

    },
});