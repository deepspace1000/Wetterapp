import React, {useEffect, useState} from 'react';
import {Button, FlatList, ImageBackground, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import * as Location from 'expo-location';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Swipeable} from 'react-native-gesture-handler';
import {IconButton} from "react-native-paper";


export default function WeatherScreen({navigation}) {
    const [favoritesList, setFavoritesList] = useState([]);
    const [showList, setShowList] = useState([]);
    const [locationName, setLocationName] = useState('Waiting..');
    const [swipeableRef, setSwipeableRef] = useState(null);


    //UseEffect for getting Current Location
    useEffect(() => {
        (async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                setLocationName('Permission to access location was denied');
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
                    let address = `${item.city}`;
                    setLocationName(address);
                }
            }

        })();
    }, []);

    //Update the Current location with Show List
    useEffect(() => {
        const updateCurrentLocation = showList.map((item, i) =>{
            if (item.key === 0) {
                return {...item, name: locationName };
            }
            else {
                return item;
            }
        });
        setShowList(updateCurrentLocation)
    }, [locationName]);



    //Update Local storage
    useEffect(() => {
        (async () => {
            try {
                await AsyncStorage.setItem("locations", JSON.stringify(favoritesList));
            } catch (error) {
                console.log(error);
            }
        })();
    }, [favoritesList]);

    //update Favorites List on site load
    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            getLocations();
        });

        return unsubscribe;
    }, [navigation]);

    //add favorite list to show list
    useEffect(() => {
        setShowList([{key: 0, name: locationName}, ...favoritesList]);
    }, [favoritesList])

    const getLocations = async () => {
        try {
            const savedPlace = await AsyncStorage.getItem("locations");
            const currentPlace = JSON.parse(savedPlace);
            const newList = [...currentPlace];
            console.log(newList)
            setFavoritesList(newList);
        } catch (error) {
            console.log(error)
        }
    };

    const handleDelete = (index) => {
        const temp = favoritesList.filter((item) => item.key !== index);
        setFavoritesList(temp);

    }



    return (
        <View style={styles.container}>
            <ImageBackground source={require('../assets/wolke.jpg')} style={styles.background}>
                <View style={styles.innerContainer}>
                    <Button title={'Rerender'} onPress={getLocations}/>
                    <FlatList data={showList}
                              keyExtractor={item => item.key}
                              renderItem={({item}) =>
                                  <Swipeable
                                      ref={ref => setSwipeableRef(ref)}
                                      renderRightActions={() => (
                                          <View style={styles.deleteButton}>
                                              <IconButton icon={'trash-can-outline'} onPress={() => handleDelete(item.key)}/>
                                          </View>
                                      )}
                                  >
                                      <TouchableOpacity style={styles.listView} onPress={() => {
                                          navigation.navigate('Wetter', {location: item.name,});
                                      }}>
                                          <Text style={styles.placeName}>{item.name}</Text>
                                      </TouchableOpacity>
                                  </Swipeable>
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
        opacity: 0.8,
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
    deleteButton: {
        alignItems: 'center',
        backgroundColor: '#ff0000',
        margin: 5,
        height: 50,
        borderRadius: 15,
        justifyContent: 'center',
    }
});