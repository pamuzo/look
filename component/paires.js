import { View, Text, StyleSheet } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useState } from "react";
import Card from "./card";
import Color from "../constant/colors";
import Input from "./input";
import { globalStyles } from "../style/globalStyles";

export default function Paires({ isEdith, mesurement, handleChange, values }) {
  const [disabled, setDisabled] = useState(false);
  const [count, setCount] = useState(1);
  //...................for increment ................................
  const increament = () => {
    setCount(count + 1);
  };
  //..........................for decrement .............................
  const decreament = () => {
    setCount(count - 1);
  };
  console.log(values);
  return (
    <View>
      <Card>
        <View
          style={
            disabled === true
              ? {
                  flexDirection: "row",
                  alignItems: "center",
                  opacity: 0.4,
                }
              : {
                  flexDirection: "row",
                  alignItems: "center",
                }
          }
        >
          <Text style={styles.lebal}>Paires:</Text>
          <MaterialIcons
            name="remove"
            style={[
              globalStyles.btnSmall,
              count === 1 ? { opacity: 0.5 } : { opacity: 1 },
            ]}
            size={16}
            color={Color.blue}
            onPress={decreament}
            disabled={count === 1 ? true : false}
          />
          <Text>{count}</Text>
          {/* <Input
            onChangeText={handleChange("paires")}
            value={count.toString()}
            editable={false}
            outLine
            style={{
              paddingHorizontal: 7,
              fontSize: 24,
            }}
            keyboardType="numeric"
          /> */}
          <MaterialIcons
            name="add"
            style={{
              ...globalStyles.btnSmall,
            }}
            size={16}
            color={Color.blue}
            onPress={increament}
          />
        </View>
      </Card>
    </View>
  );
}

const styles = StyleSheet.create({
  lebal: {
    fontSize: 16,
    fontFamily: "roboto-regular",
    paddingRight: 10,
  },
});
