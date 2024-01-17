import React from "react";
import { View, StyleSheet, Text, Image } from "react-native";

import Card from "./card";
import Input from "./input";
export default function Male({ handleChange, values }) {
  return (
    <View>
      <Card>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            paddingBottom: 10,
          }}
        >
          <Image
            source={require("../assets/male1.png")}
            style={{ width: 20, height: 30, marginRight: 10 }}
          />
          <Text style={{ fontSize: 18, fontWeight: "bold" }}>Male</Text>
        </View>
        <View style={styles.twoColum}>
          <View style={styles.colContent}>
            <Text style={styles.lebal}>Top</Text>
            <Input
              onChangeText={handleChange("topLenght")}
              value={values.topLenght}
              keyboardType="numeric"
              outLine
              placeholder="Length"
            />
            <Input
              onChangeText={handleChange("showlder")}
              value={values.showlder}
              keyboardType="numeric"
              outLine
              placeholder="Shoulder"
            />
            <Input
              onChangeText={handleChange("chest")}
              value={values.chest}
              keyboardType="numeric"
              outLine
              placeholder="Chest"
            />
            <Input
              onChangeText={handleChange("sleeve")}
              value={values.sleeve}
              keyboardType="numeric"
              outLine
              placeholder="Sleeve"
            />
            <Input
              onChangeText={handleChange("tummy")}
              value={values.tummy}
              keyboardType="numeric"
              outLine
              placeholder="Fit or Tummy"
            />
            <Input
              onChangeText={handleChange("neck")}
              value={values.neck}
              keyboardType="numeric"
              outLine
              placeholder="Neck"
            />
            <Input
              onChangeText={handleChange("roundSleve")}
              value={values.roundSleve}
              keyboardType="numeric"
              outLine
              placeholder="round Sleve"
            />
          </View>

          <View style={styles.colContent}>
            {/* ...........................................Bottom Measurement ........................................ */}
            <Text style={styles.lebal}>Trouser/Bottom</Text>
            <Input
              onChangeText={handleChange("bottomLenght")}
              value={values.bottomLenght}
              keyboardType="numeric"
              outLine
              placeholder="Length"
            />
            <Input
              onChangeText={handleChange("waist")}
              value={values.waist}
              keyboardType="numeric"
              outLine
              placeholder="Waist"
            />
            <Input
              onChangeText={handleChange("laps")}
              value={values.laps}
              keyboardType="numeric"
              outLine
              placeholder="laps"
            />
            <Input
              onChangeText={handleChange("knee")}
              value={values.knee}
              keyboardType="numeric"
              outLine
              placeholder="Knee"
            />
            <Input
              onChangeText={handleChange("seat")}
              value={values.seat}
              keyboardType="numeric"
              outLine
              placeholder="Seat"
            />

            <Input
              onChangeText={handleChange("flap")}
              value={values.flap}
              keyboardType="numeric"
              outLine
              placeholder="Flap"
            />
            <Input
              onChangeText={handleChange("bottom")}
              value={values.bottom}
              keyboardType="numeric"
              outLine
              placeholder="Bottom"
            />
          </View>
        </View>
      </Card>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  modalToggle: {
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#f2f2d2",
    padding: 10,
    borderRadius: 10,
    alignSelf: "center",
  },
  modalTcolse: {
    marginTop: 15,
    marginRight: 24,
    marginBottom: 8,
  },
  modalContent: {
    flex: 1,
  },
  twoColum: {
    flex: 2,
    flexDirection: "row",
    gap: 8,
  },
  colContent: {
    flexGrow: 1,
  },
  lebal: {
    fontSize: 16,
    fontFamily: "roboto-regular",
    paddingRight: 10,
  },
});
