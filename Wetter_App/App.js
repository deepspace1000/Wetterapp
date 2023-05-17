import React from "react";
import {StyleSheet} from 'react-native'
import WeatherScreen from './components/WeatherScreen';
import FavoritesScreen from './components/FavoritesScreen';
import SearchScreen from './components/SearchScreen';
import {NavigationContainer} from "@react-navigation/native";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import Ionicons from 'react-native-vector-icons/Ionicons';

const Tab = createBottomTabNavigator();

const favoritenName = "Favoriten";
const wetterName = "Wetter";
const sucheName = "Suche";



export default function App() {
  return (

      <NavigationContainer>
        <Tab.Navigator initialRouteName={favoritenName}
                       screenOptions={({ route }) => ({
                           tabBarIcon: ({ focused, color, size }) => {
                               let iconName;
                               let rn = route.name;

                               if (rn === wetterName) {
                                   iconName = focused ? 'cloud' : 'cloud-outline';

                               } else if (rn === favoritenName) {
                                   iconName = focused ? 'star' : 'star-outline';

                               } else if (rn === sucheName) {
                                   iconName = focused ? 'search' : 'search-outline';
                               }


                               return <Ionicons name={iconName} size={size} color={color}/>;
                           },
                           tabBarShowLabel: true,
                           tabBarStyle: {
                               position: 'absolute',
                               bottom: 25,
                               left: 20,
                               right: 20,
                               elevation: 0,
                               backgroundColor: '#ffffff',
                               borderRadius: 15,
                               height: 90,
                               ...styles.shadow
                           },
                           headerTransparent: true,
                       })
        }>
          <Tab.Screen name={favoritenName} component={FavoritesScreen}/>
          <Tab.Screen name={wetterName} component={WeatherScreen} initialParams={{location: 'Zurich'}}/>
          <Tab.Screen name={sucheName} component={SearchScreen}/>
        </Tab.Navigator>
      </NavigationContainer>
  );
};

const styles = StyleSheet.create({
    shadow: {
        shadowColor: '#7F5DFO',
        shadowoffset: {
            width: 0,
            height: 10,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.5,
        elevation: 5
    },
    background: {
        flex: 1,
        resizeMode: 'cover',
        justifyContent: 'center',
    },
});