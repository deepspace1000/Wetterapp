import {StyleSheet, Text, View} from "react-native";
import React from "react";
import Ionicons from 'react-native-vector-icons/Ionicons';

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
                <Ionicons name={'star-outline'} style={styles.Icon} size={25}/>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    Icon: {

    }

});