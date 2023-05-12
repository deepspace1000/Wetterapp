import React, {useEffect, useState} from 'react';
import {ImageBackground, View, Text, StyleSheet} from 'react-native';
import Details from './View/WeatherScreenView'
import AsyncStorage from "@react-native-async-storage/async-storage";


export default function WeatherScreen({route, navigation}) {

    const [savedPlaces, setSavedPlaces] = useState([]);
    const [isFavorite, setIsFavorite] = useState(true);
    const {location} = route.params;
    const [weatherData, setWeatherData] = useState(null);
    const [loaded, setLoaded] = useState(false);


    const fetchWeather = async (locationName) => {
        try {
            setLoaded(false);
            const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${locationName}&appid=80f9a4a554335611a1e77e5b09782627&units=metric`);
            if(response.status === 200)
            {
                const data = await response.json();
                setWeatherData(data);
            }
            else
            {
                setWeatherData(null);
            }
            setLoaded(true);
        } catch (error) {
            console.error("Error");
        }
    };
    const fetchSavedPlaces = async () => {
        try {
            const savedPlace = await AsyncStorage.getItem("locations");
            const currentPlace = JSON.parse(savedPlace);
            const newList = [...currentPlace];
            setSavedPlaces(newList);
        } catch (error) {
            console.log(error);
        }
    };

    const isSaved = () => {
       if (savedPlaces.find(obj => obj.name === location)){
           return true;
       }
       return false;
    };

    const handleStatusChange = () => {
        if (isFavorite){
            const temp = savedPlaces.filter((item) => item.name !== location);
            setSavedPlaces(temp);

        }else {
            const generateKey = savedPlaces.length + 1;
            setSavedPlaces([
                ...savedPlaces,
                {
                    key: generateKey,
                    name: location,
                },
            ]);
        }
    };

    const updateStorage = async () => {
        try {
            await AsyncStorage.setItem("locations", JSON.stringify(savedPlaces));
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            fetchSavedPlaces();
        });

        return unsubscribe;
    }, [navigation]);

    useEffect(() => {
        fetchWeather(location);
        //fetchSavedPlaces();
        navigation.setOptions({title: location});

    }, [location]);

    useEffect(() => {
        if(isSaved()){
            setIsFavorite(true);
        } else {
            setIsFavorite(false);
        }
        updateStorage();
    }, [savedPlaces]);




  return (
    <View style={styles.container}>
        <ImageBackground source={require('../assets/wolke1.jpg')} style={styles.background}>
            <Details weatherData={weatherData} loaded={loaded} isFavorite={isFavorite} handleStatusChange={handleStatusChange}/>
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

});

