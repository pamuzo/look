import { useNavigation } from "@react-navigation/native";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import Color from "../constant/colors";

export default function PlusIcon({ onPress, children }) {
  // const navigation = useNavigation()

  // const onPress = () =>{
  //     navigation.navigate('AddJobs')
  //  }
  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <Text style={styles.plus}>{children}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: 55,
    height: 55,
    borderRadius: 50,
    backgroundColor: Color.blue,
  },
  plus: {
    color: Color.white,
    fontSize: 16,
    fontWeight: "600",
  },
});
