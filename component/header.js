import { View, Text, StyleSheet, StatusBar } from "react-native";
import { useState, useEffect } from "react";
import { doc, onSnapshot } from "firebase/firestore";
import { db, auth } from "../config/firebase";

import Color from "../constant/colors";
import { MaterialIcons } from "@expo/vector-icons";

export default function Header() {
  const [greet, setGreet] = useState();
  const [loading, setLoading] = useState(true);
  const [username, setUsername] = useState("");

  const greetTime = () => {
    const hrs = new Date().getHours();
    if (hrs === 0 || hrs < 12) return setGreet("Morning");
    if (hrs === 1 || hrs < 17) return setGreet("Afternoon");
    setGreet("Evening");
  };

  useEffect(() => {
    const docRef = doc(db, "user", auth.currentUser.uid);
    onSnapshot(docRef, (doc) => {
      setUsername(doc.data()?.displayName);
    });

    greetTime();
  }, []);

  return (
    <View style={styles.header}>
      <StatusBar backgroundColor={Color.lightGray} barStyle={"dark-content"} />
      <Text style={styles.txtHeader}>LOOK</Text>
      <Text>{`${greet} ${username}`}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  header: {
    backgroundColor: Color.lightGray,
    width: "100%",
    height: "13%",
    borderBottomWidth: 1,
    borderBottomColor: Color.midGray,
    elevation: 3,
    paddingBottom: 10,
    paddingHorizontal: 20,
    shadowOffset: { width: 1, height: 0 },
    shadowColor: Color.gray,
    shadowOpacity: 0.3,
    shadowRadius: 2,
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "space-between",
    borderBottomRightRadius: 20,
    borderBottomLeftRadius: 20,
  },
  txtHeader: {
    //fontWeight: "bold",
    fontSize: 36,
    color: Color.blue,
    fontFamily: "roboto-light",
    letterSpacing: 1,
  },
  icon: {
    position: "absolute",
    left: 6,
    bottom: 8,
  },
});
