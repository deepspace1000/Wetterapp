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
        <Tab.Navigator initialRouteName={wetterName}
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


                               return <Ionicons name={iconName} size={size} color={color} />;
                           },
                       })}>
          <Tab.Screen name={favoritenName} component={FavoritesScreen}/>
          <Tab.Screen name={wetterName} component={WeatherScreen}/>
          <Tab.Screen name={sucheName} component={SearchScreen}/>
        </Tab.Navigator>
      </NavigationContainer>
  );
};