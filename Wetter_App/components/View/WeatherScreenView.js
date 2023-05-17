import {StyleSheet, Text, View, Image} from "react-native";
import React, {useEffect, useState} from "react";
import Ionicons from 'react-native-vector-icons/Ionicons';
import {BlurView} from 'expo-blur';

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
            weather: [{icon, description}],
            main: {temp, feels_like,temp_min, temp_max, pressure, humidity},
            visibility,
            wind: {speed},
            clouds: {all},
            sys: {country,sunrise, sunset},
            timezone,
            name
        } = props.weatherData;

        return (
            <View style={styles.innerContainer}>
                <View style={styles.topBar}>
                    <SaveStar/>
                </View>
                <View style={styles.weatherDetails}>
                        <View>
                            <Image
                                style={styles.icon}
                                source={{uri: `https://openweathermap.org/img/wn/${icon}.png`}}
                            />
                            <Text style={styles.description}>{description}</Text>
                        </View>
                        <View style={styles.weatherInfos}>
                            <BlurView intensity={50}  style={styles.blurBorderTemp}>
                                <Text style={styles.text}>{temp}°C</Text>
                            </BlurView>
                            <View style={styles.view}>
                                <BlurView intensity={50}  style={styles.blurBorderTempMax_Min}>
                                    <Text style={styles.text}>{temp_min}°C --- {temp_max}°C</Text>
                                </BlurView>
                                <BlurView intensity={50}  style={styles.blurBorderFeelsLike_WindSpeed}>
                                    <Text style={styles.text}>
                                        Feels like {feels_like}°C
                                        Wind speed {speed}m/s
                                    </Text>
                                </BlurView>
                            </View>
                            <View style={styles.view}>
                                <BlurView intensity={50}  style={styles.blurBorderPressure_humidity}>
                                    <Text style={styles.text}>
                                        Pressure {pressure} hPa
                                        Humidity {humidity}%
                                    </Text>
                                </BlurView>
                                <BlurView intensity={50}  style={styles.blurBorderClouds}>
                                    <Text style={styles.text}>Cloudiness {all}%</Text>
                                </BlurView>
                            </View>
                            <BlurView intensity={50}  style={styles.blurBorderSunrise_Sunset}>
                                <Text style={styles.text}>Country {country} | Name {name}</Text>
                            </BlurView>
                        </View>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    innerContainer: {
        flex: 1,
        marginTop: 90,
        alignItems: "stretch",
    },
    topBar: {
        alignItems: "flex-end",
        marginRight: 40,
    },
    weatherDetails: {
        flex: 1,
        alignItems: "stretch",
    },
    weatherInfos:{
        alignItems: "center",
        marginRight: 20,
        marginLeft: 20,
    },
    blurBorderTemp: {
        width: '30%',
        height: 80,
        borderWidth: 2,
        borderRadius: 4,
        borderColor: '#fff',
        alignItems: "center",
        paddingTop: 25,

    },
    blurBorderTempMax_Min: {
        width: 180,
        height: 80,
        borderWidth: 2,
        borderRadius: 4,
        borderColor: '#fff',
        alignItems: "center",
        alignSelf: "flex-start",
        paddingTop: 25,

        marginTop: 5,
    },
    blurBorderFeelsLike_WindSpeed: {
        width: 180,
        height: 80,
        borderWidth: 2,
        borderRadius: 4,
        borderColor: '#fff',
        alignItems: "center",
        paddingTop: 15,
        marginLeft: 200,
        marginTop: -80,
    },
    blurBorderPressure_humidity: {
        width: 180,
        height: 80,
        borderWidth: 2,
        borderRadius: 4,
        borderColor: '#fff',
        alignItems: "center",
        alignSelf: "flex-start",
        paddingTop: 15,
        //marginLeft: 17,
        marginTop: 5,

    },
    blurBorderClouds: {
        width: 180,
        height: 80,
        borderWidth: 2,
        borderRadius: 4,
        borderColor: '#fff',
        alignItems: "center",
        paddingTop: 25,
        marginLeft: 200,
        marginTop: -80,
    },
    blurBorderSunrise_Sunset: {
        width: 378,
        height: 80,
        borderWidth: 2,
        borderRadius: 4,
        borderColor: '#fff',
        alignItems: "center",
        paddingTop: 25,
        alignSelf: "center",
        marginTop: 5,
    },
    text: {
        fontWeight: "bold",
        fontSize: 18,
    },
    icon:{
        width: 200,
        height: 200,
        alignSelf: "center",
    },
    description: {
        fontWeight: "bold",
        fontSize: 18,
        alignSelf: "center",
        paddingBottom: 25
    },
    view: {
        alignItems: "center"
    }
});