import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, ImageBackground, FlatList, TouchableOpacity, Button} from 'react-native';
import * as Location from 'expo-location';
import AsyncStorage from '@react-native-async-storage/async-storage';


export default function WeatherScreen({navigation}) {
    const [favoritesList, setFavoritesList] = useState([{key: 0, name: "Waiting.."}]);
    const [locationName, setLocationName] = useState('Waiting..');

    const[value, setValue] = useState([{key: 1, name: "Zurich"}]);

    const storePlace = async () => {
        try {
            await AsyncStorage.setItem("locations", JSON.stringify(value));
        } catch (error) {
            console.log(error);
        }
    };

    const getPlace = async () => {
        try {
            const savedPlace = await AsyncStorage.getItem("locations");
            const currentPlace = JSON.parse(savedPlace);
            console.log(currentPlace);
        } catch (error) {
            console.log(error);
        }
    };

    //UseEffect for getting Current Location
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
                    //console.log(address);
                }
            }

        })();
    }, []);

    //Update the Current location with Favorites List
    useEffect(() => {
        const updateCurrentLocation = favoritesList.map((item, i) =>{
            if (item.key === 0) {
                return {...item, name: locationName };
            }
            else {
                return item;
            }
        });
        setFavoritesList(updateCurrentLocation)
    }, [locationName]);

    //useEffect get all saved favorites places
    useEffect(() => {
        (async () => {
            try {
                const savedPlace = await AsyncStorage.getItem("locations");
                const currentPlace = JSON.parse(savedPlace);
                const newList = [...favoritesList, ...currentPlace];
                setFavoritesList(newList);
                console.log(currentPlace);
            } catch (error) {
                console.log(error)
            }
        })();
    }, []);

    //Update Local storage
    useEffect(() => {
        const temp = favoritesList.filter((item) => item.key !== 0);
        (async () => {
            try {
                await AsyncStorage.setItem("locations", JSON.stringify(temp));
            } catch (error) {
                console.log(error);
            }
        })();
    }, [favoritesList]);

    return (
        <View style={styles.container}>
            <ImageBackground source={require('./../assets/wolke.jpg')} style={styles.background}>
                <View style={styles.innerContainer}>
                    <Button title={'save'} onPress={storePlace}></Button>
                    <Button title={'show'} onPress={getPlace}></Button>
                    <FlatList data={favoritesList}
                              keyExtractor={(x, i) => i}
                              renderItem={({item}) =>
                                  <TouchableOpacity style={styles.listView} onPress={() => {
                                      navigation.navigate('Wetter', {location: item.name,});
                                  }}>
                                      <Text style={styles.placeName}>key: {item.key}; {item.name}</Text>
                                  </TouchableOpacity>

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