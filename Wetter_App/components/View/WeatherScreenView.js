import {StyleSheet, Text, View} from "react-native";
import React, {useEffect, useState} from "react";
import Ionicons from 'react-native-vector-icons/Ionicons';
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Details(props, ) {
    const [savedPlaces, setSavedPlaces] = useState([]);


    const SaveStar = () => {
        if (props.isFavorite){
            return(
                <Ionicons name={'star'} style={styles.Icon} size={25} onPress={() => {props.handleStatusChange()}}/>
            );
        }else {
            return (
                <Ionicons name={'star-outline'} style={styles.Icon} size={25} onPress={() => {props.handleStatusChange()}}/>
        );}
    }

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
            <View style={styles.innerContainer}>
                <View style={styles.topBar}>
                    <SaveStar/>
                </View>
                <View style={styles.weatherDetails}>
                    <Text>{temp}</Text>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    innerContainer: {
        flex: 1,
        alignItems: 'stretch',
        marginTop: 90,
    },
    topBar: {
        alignItems: "flex-end",
        marginRight: 40,
    },
    weatherDetails: {

    },
});