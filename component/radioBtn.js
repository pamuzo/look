import * as React from "react";
import { View, StyleSheet } from "react-native";
import { RadioButton, Text } from "react-native-paper";
import Color from "../constant/colors";

export default function RadioBtn({ gender }) {
  const [value, setValue] = React.useState("male");

  const handleValueChange = (value) => {
    setValue(value);
    gender(value);
  };

  return (
    <RadioButton.Group onValueChange={handleValueChange} value={value}>
      <View style={styles.radioGroup}>
        <View style={styles.radioButton}>
          <RadioButton
            value="male"
            uncheckedColor={Color.blue}
            color={Color.blue}
          />
          <Text>Male</Text>
        </View>
        <View style={styles.radioButton}>
          <RadioButton
            value="female"
            uncheckedColor={Color.blue}
            color={Color.blue}
          />
          <Text>Female</Text>
        </View>
      </View>
    </RadioButton.Group>
  );
}

const styles = StyleSheet.create({
  radioGroup: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    padding: 4,
  },
  radioButton: {
    flexDirection: "row",
    alignItems: "center",
  },
  radioLabel: {
    marginLeft: 8,
    fontSize: 16,
    color: "#333",
  },
});
