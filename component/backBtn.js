import { StyleSheet, Text, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation, CommonActions } from "@react-navigation/native";
import Color from "../constant/colors";

export default function BackBtn({ title, resetInput }) {
  const navigation = useNavigation();

  const goBack = () => {
    navigation.dispatch(CommonActions.goBack());
  };

  return (
    <View style={styles.header}>
      <MaterialIcons
        name="arrow-back-ios"
        size={28}
        onPress={goBack}
        color={Color.blue}
        style={styles.icon}
      />
      <View>
        <Text style={styles.txtHeader}>{title}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    height: "10%",
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "center",
    paddingTop: 10,
    paddingBottom: 15,
    backgroundColor: Color.lightGray,
    borderBottomWidth: 1,
    borderBottomColor: Color.lightGray,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    elevation: 4,
    shadowOffset: { width: 1, height: 0 },
    shadowColor: Color.gray,
    shadowOpacity: 0.3,
    shadowRadius: 2,
  },
  txtHeader: {
    fontFamily: "roboto-regular",
    fontWeight: "bold",
    fontSize: 20,
    color: Color.blue,
    letterSpacing: 1,
  },
  icon: {
    position: "absolute",
    left: 15,
    bottom: 15,
  },
});
