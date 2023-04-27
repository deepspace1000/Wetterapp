import { View, Text, TextInput, Button } from "react-native";
import React, {useState} from "react";
import { Icon } from '@rneui/themed';


export default function WeatherSearch({fetchWeather}) {

    const [locationName, setlocationName] = useState('');

    return(
        <View>
            <TextInput
                placeholder="Geben sie einen Ort ein"
                value={locationName}
                onChangeText={(text) => setlocationName(text)}
            />
            <Icon name="search" onPress={() => fetchWeather(locationName)}/>
        </View>
    );
}