import { View, Text } from "react-native";
import React from "react";

export default function Test({ session }) {
  return (
    <View>
      <Text>Test{session.user.email}</Text>
    </View>
  );
}
