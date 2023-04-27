import React, {useEffect, useState} from 'react';
import {ImageBackground, View, Text, StyleSheet} from 'react-native';
import Details from './View/WeatherScreenView'


export default function WeatherScreen({route, navigation}) {

    const{location} = route.params;
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

    useEffect(() => {
        fetchWeather(location);
        navigation.setOptions({title: location});
    }, [location]);




  return (
    <View style={styles.container}>
        <ImageBackground source={require('./../assets/wolke.jpg')} style={styles.background}>
            <Details weatherData={weatherData} loaded={loaded}/>
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

