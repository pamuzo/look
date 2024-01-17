import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import ProfileRoute from "./profileRoute";
import Ionicons from "react-native-vector-icons/Ionicons";
import Color from "../constant/colors";
import MeasurementRoute from "./measurementRoute";

const Tab = createBottomTabNavigator();

export default function TabScreen({ session }) {
  return (
    <Tab.Navigator
      defaultScreenOptions={MeasurementRoute}
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarShowLabel: false,
        tabBarHideOnKeyboard: true,
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === "MeasurementRoute") {
            iconName = focused ? "ios-home-sharp" : "ios-home-outline";
          } else if (route.name === "ProfileRoute") {
            iconName = focused ? "person" : "person-outline";
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: Color.blue,
        tabBarInacttiveTintColor: "#ff0000",
      })}
    >
      <Tab.Screen name="MeasurementRoute" component={MeasurementRoute} />
      <Tab.Screen name="ProfileRoute" component={ProfileRoute} />
    </Tab.Navigator>
  );
}
