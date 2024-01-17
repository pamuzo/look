import React from "react";
import { View, StyleSheet, Text, Image } from "react-native";

import Card from "./card";
import Input from "./input";
export default function Female({ handleChange, values }) {
  return (
    <Card>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          paddingBottom: 10,
        }}
      >
        <Image
          source={require("../assets/female1.png")}
          style={{ width: 20, height: 30, marginRight: 10 }}
        />
        <Text style={{ fontSize: 18, fontWeight: "bold" }}>Female</Text>
      </View>

      <View style={styles.twoColum}>
        <View style={styles.colContent}>
          {/* <Text style={styles.lebal}>Top</Text> */}
          <Input
            onChangeText={handleChange("fShoulder")}
            value={values.fShoulder}
            keyboardType="numeric"
            outLine
            placeholder="Shoulder"
          />
          <Input
            onChangeText={handleChange("burst")}
            value={values.burst}
            keyboardType="numeric"
            outLine
            placeholder="Burst"
          />
          <Input
            onChangeText={handleChange("halfCult")}
            value={values.halfCult}
            keyboardType="numeric"
            outLine
            placeholder="Half Cult"
          />
          <Input
            onChangeText={handleChange("hipLenght")}
            value={values.hipLenght}
            keyboardType="numeric"
            outLine
            placeholder="Hip Lenght"
          />
          <Input
            onChangeText={handleChange("nipple")}
            value={values.nipple}
            keyboardType="numeric"
            outLine
            placeholder="Nipple"
          />
          <Input
            onChangeText={handleChange("uBurst")}
            value={values.uBurst}
            keyboardType="numeric"
            outLine
            placeholder="U/Burst"
          />
          <Input
            onChangeText={handleChange("fWaist")}
            value={values.fWaist}
            keyboardType="numeric"
            outLine
            placeholder="Waist"
          />

          <Input
            onChangeText={handleChange("hip")}
            value={values.hip}
            keyboardType="numeric"
            outLine
            placeholder="Hip"
          />

          <Input
            onChangeText={handleChange("hipLength")}
            value={values.hipLength}
            keyboardType="numeric"
            outLine
            placeholder="Hip Length"
          />

          <Input
            onChangeText={handleChange("gownLength")}
            value={values.gownLength}
            keyboardType="numeric"
            outLine
            placeholder="Hip Lenght"
          />

          <Input
            onChangeText={handleChange("waitsKneel")}
            value={values.waitsKneel}
            keyboardType="numeric"
            outLine
            placeholder="Waits Kneel"
          />
        </View>

        <View style={styles.colContent}>
          {/* ...........................................Bottom Measurement ........................................ */}
          {/* <Text style={styles.lebal}>Trouser/Bottom</Text> */}
          <Input
            onChangeText={handleChange("shoulderKneel")}
            value={values.shoulderKneel}
            keyboardType="numeric"
            outLine
            placeholder="Shoulder Kneel"
          />
          <Input
            onChangeText={handleChange("skirtLength")}
            value={values.skirtLength}
            keyboardType="numeric"
            outLine
            placeholder="Skirt Length"
          />
          <Input
            onChangeText={handleChange("fullLength")}
            value={values.fullLength}
            keyboardType="numeric"
            outLine
            placeholder="Full Length"
          />
          <Input
            onChangeText={handleChange("fSleeve")}
            value={values.fSleeve}
            keyboardType="numeric"
            outLine
            placeholder="Sleeve"
          />
          <Input
            onChangeText={handleChange("roundSleeve")}
            value={values.roundSleeve}
            keyboardType="numeric"
            outLine
            placeholder="Round Sleeve"
          />

          <Input
            onChangeText={handleChange("arm")}
            value={values.arm}
            keyboardType="numeric"
            outLine
            placeholder="Arm"
          />
          <Input
            onChangeText={handleChange("lap")}
            value={values.lap}
            keyboardType="numeric"
            outLine
            placeholder="Lap"
          />
          <Input
            onChangeText={handleChange("fKnee")}
            value={values.fKnee}
            keyboardType="numeric"
            outLine
            placeholder="Knee"
          />
          <Input
            onChangeText={handleChange("trouserWaist")}
            value={values.trouserWaist}
            keyboardType="numeric"
            outLine
            placeholder="Trouser Waist"
          />
          <Input
            onChangeText={handleChange("trouserMouth")}
            value={values.trouserMouth}
            keyboardType="numeric"
            outLine
            placeholder="Trouser Mouth"
          />
          <Input
            onChangeText={handleChange("topLength")}
            value={values.topLength}
            keyboardType="numeric"
            outLine
            placeholder="Top Length"
          />
        </View>
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
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
