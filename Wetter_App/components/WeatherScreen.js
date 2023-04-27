import React, {useEffect, useState} from 'react';
import {ImageBackground, View, Text, StyleSheet} from 'react-native';




export default function WeatherScreen({route}) {

    const [weatherdata, setWeatherData] = useState(null);
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

    useEffect(() => {
        fetchWeather('Havanna');
    }, []);



    const{location} = route.params;


    if(!loaded){
        return(
            <View style={styles.container}>
                <Text>Loading</Text>
            </View>
        );
    }
    else if(weatherdata === null) {
        return (
            <View style={styles.container}>
                <Text>City not Found</Text>
            </View>
        );
    }

    const {
        //Bald werden noch mehr Daten zu auswahl stehen
        main: {temp}
    } = weatherdata;


  return (
    <View style={styles.container}>
        <ImageBackground source={require('./../assets/wolke.jpg')} style={styles.background}>
            <View>
                <Text>Hallo von WeatherScreen!</Text>
                <Text>{location}</Text>
                <Text>{temp}</Text>
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

