import React, {useState} from 'react';
import {View, Text, StyleSheet, ImageBackground, FlatList} from 'react-native';



export default function WeatherScreen() {
    const[favorites, setFavorites] = useState([{name: 'Zurich'}, {name: 'Bauma'}]);
    return (
        <View style={styles.container}>
            <ImageBackground source={require('./../assets/wolke.jpg')} style={styles.background}>
                <View style={styles.innerContainer}>
                    <FlatList data={favorites}
                              keyExtractor={(x, i) => i}
                              renderItem={({item}) =>
                                  <View style={styles.listView}>
                                      <Text style={styles.placeName}>{item.name}</Text>
                                  </View>

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
        fontStyle: '',
    },
});