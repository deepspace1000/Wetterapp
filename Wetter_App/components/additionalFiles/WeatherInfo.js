import { View, Text } from "react-native";
import React from "react";
import WeatherSearch from "./WeatherSearch";


export default function WeatherInfo({weatherdata, fetchWeather}) {

    const {
        //Bald werden noch mehr Daten zu auswahl stehen
        name,
        main: {temp}
    } = weatherdata;

    return(
        <View>
            <WeatherSearch fetchWeather={fetchWeather}/>
            <View>
                <Text>{temp}°C</Text>
            </View>
        </View>
    );
}