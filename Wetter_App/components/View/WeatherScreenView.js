import {Text, View} from "react-native";
import React from "react";

export default function Details(props) {



    if(!props.loaded){
        return(
            <View>
                <Text>Loading</Text>
            </View>
        );
    }
    else if(props.weatherData === null) {
        return (
            <View>
                <Text>City not Found</Text>
            </View>
        );
    } else {
        const {
            //Bald werden noch mehr Daten zu auswahl stehen
            main: {temp}
        } = props.weatherData;

        return (
            <View>
                <Text>Hallo von WeatherScreen!</Text>
                <Text>{temp}</Text>
            </View>
        );
    }
}