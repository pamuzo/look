import {
  StyleSheet,
  Text,
  ScrollView,
  Image,
  View,
  SafeAreaView,
  TouchableOpacity,
  StatusBar,
  Alert,
} from "react-native";
import { useState } from "react";
import moment from "moment";
import { MaterialIcons } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { doc, deleteDoc, collection } from "firebase/firestore";
import { db, auth } from "../../config/firebase";
import Color from "../../constant/colors";
import BackBtn from "../../component/backBtn";
import Card from "../../component/card";
import { globalStyles } from "../../style/globalStyles";

export default function MeasurementDetails({ route, navigation }) {
  const [disabled, setDisabled] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const { measuremnt } = route.params;

  //to delete the measurements
  const deleteMethod = async () => {
    setDisabled(true);
    try {
      await deleteDoc(
        doc(
          collection(db, "user", auth.currentUser.uid, "measured_list"),
          route.params.measuremnt.id
        )
      ).then(() => {
        setDisabled(false);
        navigation.navigate("MeasurementList");
      });
    } catch (err) {
      console.log(err);
    }
  };
  const deleteMesurement = () => {
    Alert.alert(
      "Are You Sure?",
      "This will delete the permanently!",
      [
        {
          text: "Delete",
          onPress: deleteMethod,
        },
        {
          text: "No Thanks",
          onPress: () => {},
        },
      ],
      {
        cancelable: true,
      }
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={Color.lightGray} barStyle={"dark-content"} />
      <BackBtn title={`${measuremnt.customerName} Details`} />
      <ScrollView style={{ paddingRight: 20, paddingLeft: 20 }}>
        <Card>
          <Text style={styles.bookDate}>
            {measuremnt.jobState === "complete"
              ? `Created Date: ${moment(measuremnt?.createAt?.toDate()).format(
                  "ll"
                )}`
              : `Booked Date: ${moment(measuremnt?.bookedDate?.toDate()).format(
                  "ll"
                )}`}
          </Text>

          <View style={{ ...globalStyles.twoColum, marginTop: 20 }}>
            <Text
              style={{ fontSize: 20, fontWeight: "bold", color: Color.blue }}
            >
              {measuremnt.phoneNumber}
            </Text>
            <View style={{ flexDirection: "row" }}>
              <MaterialIcons
                title="calll"
                style={globalStyles.btnSmall}
                name="call"
                size={16}
                color={Color.blue}
              />
              <FontAwesome
                style={globalStyles.btnSmall}
                name="envelope-o"
                size={16}
                color={Color.blue}
              />
            </View>
          </View>

          <View style={globalStyles.hrLine} />

          <View style={globalStyles.twoColum}>
            <Text style={styles.txtValue}> Paires </Text>
            <Text style={styles.txtValue}>{measuremnt.paires} </Text>
          </View>

          <View style={globalStyles.hrLine} />

          <View
            style={
              measuremnt.gender === "male"
                ? globalStyles.twoColum
                : { display: "none" }
            }
          >
            <View style={styles.colContent}>
              <Text style={styles.txtHeading}> Top </Text>
              <View style={globalStyles.twoColum}>
                <Text style={styles.txtUnit}>Lenght:</Text>
                <Text style={styles.txtValue}>{measuremnt.topLenght} </Text>
              </View>
              <View style={globalStyles.twoColum}>
                <Text style={styles.txtUnit}>Showlder:</Text>
                <Text style={styles.txtValue}>{measuremnt.showlder} </Text>
              </View>
              <View style={globalStyles.twoColum}>
                <Text style={styles.txtUnit}>Chest:</Text>
                <Text style={styles.txtValue}>{measuremnt.chest} </Text>
              </View>
              <View style={globalStyles.twoColum}>
                <Text style={styles.txtUnit}>Sleeve:</Text>
                <Text style={styles.txtValue}>{measuremnt.sleeve} </Text>
              </View>
              <View style={globalStyles.twoColum}>
                <Text style={styles.txtUnit}>Tummy:</Text>
                <Text style={styles.txtValue}>{measuremnt.tummy} </Text>
              </View>
              <View style={globalStyles.twoColum}>
                <Text style={styles.txtUnit}>Neck:</Text>
                <Text style={styles.txtValue}>{measuremnt.neck} </Text>
              </View>
              <View style={globalStyles.twoColum}>
                <Text style={styles.txtUnit}>R. Sleve:</Text>
                <Text style={styles.txtValue}>{measuremnt.roundSleve} </Text>
              </View>
            </View>

            <View style={styles.colContent}>
              <Text style={styles.txtHeading}> Trouser/Botton</Text>
              <View style={globalStyles.twoColum}>
                <Text style={styles.txtUnit}>Lenght:</Text>
                <Text style={styles.txtValue}>{measuremnt.bottomLenght} </Text>
              </View>
              <View style={globalStyles.twoColum}>
                <Text style={styles.txtUnit}>Waist:</Text>
                <Text style={styles.txtValue}>{measuremnt.waist} </Text>
              </View>
              <View style={globalStyles.twoColum}>
                <Text style={styles.txtUnit}>Laps:</Text>
                <Text style={styles.txtValue}>{measuremnt.laps} </Text>
              </View>
              <View style={globalStyles.twoColum}>
                <Text style={styles.txtUnit}>Knee:</Text>
                <Text style={styles.txtValue}>{measuremnt.knee} </Text>
              </View>
              <View style={globalStyles.twoColum}>
                <Text style={styles.txtUnit}>Seat:</Text>
                <Text style={styles.txtValue}>{measuremnt.seat} </Text>
              </View>
              <View style={globalStyles.twoColum}>
                <Text style={styles.txtUnit}>Flap:</Text>
                <Text style={styles.txtValue}>{measuremnt.flap} </Text>
              </View>
              <View style={globalStyles.twoColum}>
                <Text style={styles.txtUnit}>Bottom: </Text>
                <Text style={styles.txtValue}>{measuremnt.bottom} </Text>
              </View>
            </View>
          </View>

          {/* .............................female >............................. */}
          <View
            style={
              measuremnt.gender === "female"
                ? globalStyles.twoColum
                : { display: "none" }
            }
          >
            <View style={styles.colContent}>
              {/* <Text style={styles.txtHeading}> Top </Text> */}
              <View style={globalStyles.twoColum}>
                <Text style={styles.txtUnit}>Shoulder:</Text>
                <Text style={styles.txtValue}>{measuremnt.fShoulder} </Text>
              </View>
              <View style={globalStyles.twoColum}>
                <Text style={styles.txtUnit}>Burst:</Text>
                <Text style={styles.txtValue}>{measuremnt.burst} </Text>
              </View>
              <View style={globalStyles.twoColum}>
                <Text style={styles.txtUnit}>Half Cult:</Text>
                <Text style={styles.txtValue}>{measuremnt.halfCult} </Text>
              </View>
              <View style={globalStyles.twoColum}>
                <Text style={styles.txtUnit}>Hip Lenght:</Text>
                <Text style={styles.txtValue}>{measuremnt.hipLenght} </Text>
              </View>
              <View style={globalStyles.twoColum}>
                <Text style={styles.txtUnit}>Nipple:</Text>
                <Text style={styles.txtValue}>{measuremnt.nipple} </Text>
              </View>
              <View style={globalStyles.twoColum}>
                <Text style={styles.txtUnit}>U/Burst:</Text>
                <Text style={styles.txtValue}>{measuremnt.uBurst} </Text>
              </View>
              <View style={globalStyles.twoColum}>
                <Text style={styles.txtUnit}>Waist:</Text>
                <Text style={styles.txtValue}>{measuremnt.fWaist} </Text>
              </View>
              <View style={globalStyles.twoColum}>
                <Text style={styles.txtUnit}>Hip:</Text>
                <Text style={styles.txtValue}>{measuremnt.hip} </Text>
              </View>
              <View style={globalStyles.twoColum}>
                <Text style={styles.txtUnit}>Hip Length:</Text>
                <Text style={styles.txtValue}>{measuremnt.hipLength} </Text>
              </View>
              <View style={globalStyles.twoColum}>
                <Text style={styles.txtUnit}>Gown Length:</Text>
                <Text style={styles.txtValue}>{measuremnt.gownLength} </Text>
              </View>
              <View style={globalStyles.twoColum}>
                <Text style={styles.txtUnit}>Waits Kneel:</Text>
                <Text style={styles.txtValue}>{measuremnt.waitsKneel} </Text>
              </View>
            </View>

            <View style={styles.colContent}>
              {/* <Text style={styles.txtHeading}> Trouser/Botton</Text> */}
              <View style={globalStyles.twoColum}>
                <Text style={styles.txtUnit}>Shoulder Kneel:</Text>
                <Text style={styles.txtValue}>{measuremnt.shoulderKneel} </Text>
              </View>
              <View style={globalStyles.twoColum}>
                <Text style={styles.txtUnit}>Skirt Length:</Text>
                <Text style={styles.txtValue}>{measuremnt.skirtLength} </Text>
              </View>
              <View style={globalStyles.twoColum}>
                <Text style={styles.txtUnit}>Full Length:</Text>
                <Text style={styles.txtValue}>{measuremnt.fullLength} </Text>
              </View>
              <View style={globalStyles.twoColum}>
                <Text style={styles.txtUnit}>Sleeve:</Text>
                <Text style={styles.txtValue}>{measuremnt.fSleeve} </Text>
              </View>
              <View style={globalStyles.twoColum}>
                <Text style={styles.txtUnit}>Round Sleeve:</Text>
                <Text style={styles.txtValue}>{measuremnt.roundSleeve} </Text>
              </View>
              <View style={globalStyles.twoColum}>
                <Text style={styles.txtUnit}>Arm:</Text>
                <Text style={styles.txtValue}>{measuremnt.arm} </Text>
              </View>
              <View style={globalStyles.twoColum}>
                <Text style={styles.txtUnit}>Lap: </Text>
                <Text style={styles.txtValue}>{measuremnt.lap} </Text>
              </View>
              <View style={globalStyles.twoColum}>
                <Text style={styles.txtUnit}>Knee: </Text>
                <Text style={styles.txtValue}>{measuremnt.fKnee} </Text>
              </View>
              <View style={globalStyles.twoColum}>
                <Text style={styles.txtUnit}>Trouser Waist: </Text>
                <Text style={styles.txtValue}>{measuremnt.trouserWaist} </Text>
              </View>
              <View style={globalStyles.twoColum}>
                <Text style={styles.txtUnit}>Trouser Mouth: </Text>
                <Text style={styles.txtValue}>{measuremnt.trouserMouth} </Text>
              </View>
              <View style={globalStyles.twoColum}>
                <Text style={styles.txtUnit}>Top Length: </Text>
                <Text style={styles.txtValue}>{measuremnt.topLength} </Text>
              </View>
            </View>
          </View>

          {/* ......................Cap................................ */}
          <Text style={styles.txtHeading}> Cap </Text>
          <View style={globalStyles.twoColum}>
            <View style={styles.colContent}>
              <View style={globalStyles.twoColum}>
                <Text style={styles.txtUnit}>Cap Lenght:</Text>
                <Text style={styles.txtValue}>{measuremnt.capLenght} </Text>
              </View>
            </View>
            <View style={styles.colContent}>
              <View style={globalStyles.twoColum}>
                <Text style={styles.txtUnit}>Cap Width:</Text>
                <Text style={styles.txtValue}>{measuremnt.capWidth} </Text>
              </View>
            </View>
          </View>

          <View style={globalStyles.hrLine} />
          <Text>
            {measuremnt.jobState === "complete"
              ? "Not Booked for a new Job yet!"
              : `DeadLine Date: ${moment(
                  measuremnt?.deadLineDate?.toDate()
                ).format("ll")}`}
          </Text>
          <View style={globalStyles.hrLine} />

          <Image
            source={
              !measuremnt.image
                ? require("../../assets/noImage.png")
                : { uri: measuremnt.image }
            }
            style={{
              width: "100%",
              height: 150,
              resizeMode: "cover",
              marginBottom: 15,
            }}
          />
          <Text>Additional Message: </Text>
          <View style={globalStyles.hrLine} />
          <View style={globalStyles.twoColum}>
            <Text style={styles.txtValue}>{measuremnt.addMessage} </Text>
          </View>

          <View
            style={
              disabled === true
                ? { display: "none" }
                : { ...globalStyles.twoColum }
            }
          >
            <TouchableOpacity
              style={globalStyles.btnTextIcon}
              onPress={deleteMesurement}
            >
              <MaterialIcons name="delete" color="#fff" size={18} />
              <Text style={{ fontSize: 16, color: Color.white }}>Delete</Text>
            </TouchableOpacity>

            {/* <TouchableOpacity
              style={{
                ...globalStyles.btnTextIcon,
                backgroundColor: Color.orange,
              }}
              // onPress={"Save Details"}
            >
              <MaterialIcons name="save" color="#fff" size={18} />
              <Text style={{ fontSize: 16, color: Color.white }}>Save</Text>
            </TouchableOpacity> */}

            {/* <TouchableOpacity
            style={{ ...globalStyles.btnTextIcon, backgroundColor: Color.blue }}
            onPress={"update"}
          >
            <MaterialIcons name="save" color="#fff" size={18} />
            <Text style={{ fontSize: 16, color: Color.white }}>Update</Text>
          </TouchableOpacity> */}
          </View>

          {/* <MaterialIcons name="note" size={24} onPress={edithMeadurment} /> */}
          {/* <TouchableOpacity onPress={setOpenModal(true)}>
          <Text style={{ color: "green" }}>Update infor</Text>
        </TouchableOpacity> */}
        </Card>

        {/* <JobModal
          visible={modalOpen}
          onClose={handleClose}
          onSubmit={handleUpdate}
          // isEdith={isEdith}
          // measuremnt={measuremnt}
        /> */}
        <View style={{ marginBottom: 40 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  bookDate: {
    textAlign: "right",
    fontSize: 12,
    color: Color.orange,
  },
  txtUnit: {
    fontSize: 16,
    paddingBottom: 10,
    color: Color.gray,
  },
  txtValue: {
    color: Color.blue,
    textAlign: "right",
    paddingBottom: 10,
    paddingRight: 8,
    fontSize: 16,
  },
  colContent: {
    flexGrow: 1,
  },
  txtHeading: {
    fontSize: 16,
    fontWeight: "bold",
    paddingBottom: 10,
    paddingTop: 10,
  },
});
