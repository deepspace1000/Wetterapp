import { StyleSheet, Text, View } from 'react-native';
import WeatherScreen from './components/WeatherScreen';
import FavoritesScreen from './components/FavoritesScreen';
import SearchScreen from './components/SearchScreen';
import {NavigationContainer} from "@react-navigation/native";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";

const Tab = createBottomTabNavigator();

export default function App() {
  return (
      <NavigationContainer>
        <Tab.Navigator initialRouteName={"Wetter"}>
          <Tab.Screen name="Favoriten" component={FavoritesScreen}/>
          <Tab.Screen name="Wetter" component={WeatherScreen}/>
          <Tab.Screen name="Suche" component={SearchScreen}/>
        </Tab.Navigator>
      </NavigationContainer>
  );
};

