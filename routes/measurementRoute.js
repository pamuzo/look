import { createStackNavigator } from "@react-navigation/stack";
import MeasurementList from "../screens/measurements/measurementList";
import MeasurementDetails from "../screens/measurements/measurementDetail";

const Stack = createStackNavigator();

export default function MeasurementRoute() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="MeasurementList"
        component={MeasurementList}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="MeasurementDetails"
        options={{ headerShown: false }}
        component={MeasurementDetails}
      />
    </Stack.Navigator>
  );
}
