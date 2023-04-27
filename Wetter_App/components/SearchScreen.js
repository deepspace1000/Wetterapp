import React from 'react';
import {View, Text, StyleSheet, ImageBackground} from 'react-native';
import { useState, useEffect } from 'react';
import WeatherInfo from "./additionalFiles/WeatherInfo";


export default function WeatherScreen() {

    const [weatherdata, setWeatherData] = useState(null);
    const [loaded, setLoaded] = useState(false);

    const fetchWeather = async (locationName) => {
        try {
            setLoaded(false);
            const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${locationName}&appid=80f9a4a554335611a1e77e5b09782627&units=metric`);
            if(response.status == 200)
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
        fetchWeather('Zurich');
    }, []);

    if(!loaded){
        return(
            <View style={styles.container}>
                <Text>Loading</Text>
            </View>
        );
    }
    else if(weatherdata === null){
        return(
            <View style={styles.container}>
                <Text>City not Found</Text>
            </View>
        );
    }


    return (
        <View style={styles.container}>
            <ImageBackground source={require('./../assets/wolke.jpg')} style={styles.background}>
                <View>
                    <WeatherInfo weatherdata={weatherdata} fetchWeather={fetchWeather}/>
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