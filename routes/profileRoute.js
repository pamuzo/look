import { createStackNavigator } from "@react-navigation/stack";
import Profile from "../screens/profile/profile";
import About from "../screens/admin/about";

const Stack = createStackNavigator();

export default function ProfileRoute() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Profile"
        component={Profile}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="About"
        options={{ headerShown: false }}
        component={About}
      />
    </Stack.Navigator>
  );
}
