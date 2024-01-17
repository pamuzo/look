import {
  StyleSheet,
  View,
  Text,
  Modal,
  ActivityIndicator,
  Alert,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { useState, useEffect } from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { Formik } from "formik";
import {
  addDoc,
  doc,
  serverTimestamp,
  setDoc,
  collection,
} from "firebase/firestore";
import * as yup from "yup";
import { Timestamp } from "@firebase/firestore";
import moment from "moment/moment";

import { db, auth } from "../../config/firebase";
import Input from "../../component/input";

import Card from "../../component/card";
import Button from "../../component/button";
import DateSelector from "../../component/dateSelector";
import ImageSelector from "../../component/imageSelector";
import { globalStyles } from "../../style/globalStyles";
import Color from "../../constant/colors";
import Male from "../../component/Male";
import Female from "../../component/female";

import RadioBtn from "../../component/radioBtn";

// creating the job schma for yup
let addJobSchma = yup.object({
  customerName: yup.string().required(),
  deadLineDate: yup.date().nullable(),
});

export default function MeasurementModal({
  visible,
  onClose,
  onSubmit,
  mesurement,
  isEdith,
  isNew,
}) {
  const [loading, setLoading] = useState(false);
  const [isGender, setisGendal] = useState(
    isEdith || isNew ? mesurement.gender : "male"
  );
  const [date, setDate] = useState(
    isEdith ? new Date(mesurement?.deadLineDate?.seconds * 1000) : new Date()
  );
  const [count, setCount] = useState(
    isEdith || isNew ? Number(mesurement.paires) : 1
  );
  const [imageUri, setImageUri] = useState(
    isEdith || isNew ? mesurement.image : ""
  );
  const [disabled, setDisabled] = useState(false);
  const [complete, setComplete] = useState("pending");

  // .......................initial values .............................................
  const newMeasurement = {
    customerName: isEdith || isNew ? mesurement.customerName : "",
    phoneNumber: isEdith || isNew ? mesurement.phoneNumber : "",
    paires: isEdith || isNew ? mesurement.paires : "1",
    //gender: isEdith ? setisGendal(mesurement.gender) : "male",
    // ..........female measurement..................................//

    topLenght: isEdith || isNew ? mesurement.topLenght : "",
    showlder: isEdith || isNew ? mesurement.showlder : "",
    chest: isEdith || isNew ? mesurement.chest : "",
    sleeve: isEdith || isNew ? mesurement.sleeve : "",
    tummy: isEdith || isNew ? mesurement.tummy : "",
    neck: isEdith || isNew ? mesurement.neck : "",
    roundSleve: isEdith || isNew ? mesurement.roundSleve : "",
    bottomLenght: isEdith || isNew ? mesurement.bottomLenght : "",
    waist: isEdith || isNew ? mesurement.waist : "",
    laps: isEdith || isNew ? mesurement.laps : "",
    knee: isEdith || isNew ? mesurement.knee : "",
    seat: isEdith || isNew ? mesurement.seat : "",
    flap: isEdith || isNew ? mesurement.flap : "",
    bottom: isEdith || isNew ? mesurement.bottom : "",
    // ..........female measurement..................................//

    fShoulder: isEdith || isNew ? mesurement.fShoulder : "",
    burst: isEdith || isNew ? mesurement.burst : "",
    halfCult: isEdith || isNew ? mesurement.halfCult : "",
    hipLenght: isEdith || isNew ? mesurement.hipLenght : "",
    nipple: isEdith || isNew ? mesurement.nipple : "",
    uBurst: isEdith || isNew ? mesurement.uBurst : "",
    fWaist: isEdith || isNew ? mesurement.fWaist : "",
    hip: isEdith || isNew ? mesurement.hip : "",
    hipLength: isEdith || isNew ? mesurement.hipLength : "",
    gownLength: isEdith || isNew ? mesurement.gownLength : "",
    waitsKneel: isEdith || isNew ? mesurement.waitsKneel : "",
    shoulderKneel: isEdith || isNew ? mesurement.shoulderKneel : "",
    skirtLength: isEdith || isNew ? mesurement.skirtLength : "",
    fullLength: isEdith || isNew ? mesurement.fullLength : "",
    fSleeve: isEdith || isNew ? mesurement.fSleeve : "",
    roundSleeve: isEdith || isNew ? mesurement.roundSleeve : "",
    arm: isEdith || isNew ? mesurement.arm : "",
    lap: isEdith || isNew ? mesurement.lap : "",
    fKnee: isEdith || isNew ? mesurement.fKnee : "",
    trouserWaist: isEdith || isNew ? mesurement.trouserWaist : "",
    trouserMouth: isEdith || isNew ? mesurement.trouserMouth : "",
    topLength: isEdith || isNew ? mesurement.topLength : "",

    //>...........................Cap............................................//
    capLenght: isEdith || isNew ? mesurement.capLenght : "",
    capWidth: isEdith || isNew ? mesurement.capWidth : "",

    addMessage: isEdith || isNew ? mesurement.addMessage : "",
    deadLineDate: isEdith ? new Date(mesurement.deadLineDate * 1000) : "",
    bookedDate: isEdith ? new Date(mesurement.bookedDate * 1000) : new Date(),
    image: isEdith || isNew ? mesurement.image : "",
  };

  //...................for increment ................................
  const increament = () => {
    setCount(count + 1);
  };
  //..........................for decrement .............................
  const decreament = () => {
    setCount(count - 1);
  };

  //.........................to handle the submit button.............................
  const handleSubmit = async (values, actions) => {
    try {
      if (moment(new Date()).isSameOrBefore(moment(date), "day") === false) {
        Alert.alert("Please enter a future date");
        return setLoading(false);
      }
      setDisabled(true);
      setLoading(true);
      onSubmit(values);

      // for updating data in firbase
      if (isEdith || isNew) {
        await setDoc(
          doc(db, "user", auth.currentUser.uid, "measured_list", mesurement.id),
          {
            customerName: values.customerName,
            phoneNumber: values.phoneNumber,
            paires: count,
            gender: isGender,
            //................male....................................///
            topLenght: values.topLenght,
            showlder: values.showlder,
            chest: values.chest,
            sleeve: values.sleeve,
            tummy: values.tummy,
            neck: values.neck,
            roundSleve: values.roundSleve,
            bottomLenght: values.bottomLenght,
            waist: values.waist,
            laps: values.laps,
            knee: values.knee,
            seat: values.seat,
            flap: values.flap,
            bottom: values.bottom,
            // //................female....................................///
            fShoulder: values.fShoulder,
            burst: values.burst,
            halfCult: values.halfCult,
            hipLenght: values.hipLenght,
            nipple: values.nipple,
            uBurst: values.uBurst,
            fWaist: values.fWaist,
            hip: values.hip,
            hipLength: values.hipLength,
            gownLength: values.gownLength,
            waitsKneel: values.waitsKneel,
            shoulderKneel: values.shoulderKneel,
            skirtLength: values.skirtLength,
            fullLength: values.fullLength,
            fSleeve: values.fSleeve,
            roundSleeve: values.roundSleeve,
            arm: values.arm,
            lap: values.lap,
            fKnee: values.fKnee,
            trouserWaist: values.trouserWaist,
            trouserMouth: values.trouserMouth,
            topLength: values.topLength,
            //>...........................Cap............................................//
            capLenght: values.capLenght,
            capWidth: values.capWidth,
            addMessage: values.addMessage,
            //deadLineDate: values.deadLineDate,
            deadLineDate: Timestamp.fromDate(date),
            bookedDate: new Date(mesurement?.bookedDate?.seconds * 1000),
            image: imageUri,
            jobState: complete,
          }
        ).then(() => {
          setLoading(true);
          setDisabled(true);
          actions.resetForm();
          setDate(new Date());
          setImageUri("");
          onClose();
        });
      } else {
        //adding new data to firestore

        await addDoc(
          collection(db, "user", auth.currentUser.uid, "measured_list"),
          {
            customerName: values.customerName,
            phoneNumber: values.phoneNumber,
            paires: count,
            gender: isGender,
            //................male....................................///
            topLenght: values.topLenght,
            showlder: values.showlder,
            chest: values.chest,
            sleeve: values.sleeve,
            tummy: values.tummy,
            neck: values.neck,
            roundSleve: values.roundSleve,
            bottomLenght: values.bottomLenght,
            waist: values.waist,
            laps: values.laps,
            knee: values.knee,
            seat: values.seat,
            flap: values.flap,
            bottom: values.bottom,
            //................female....................................///
            fShoulder: values.fShoulder,
            burst: values.burst,
            halfCult: values.halfCult,
            hipLenght: values.hipLenght,
            nipple: values.nipple,
            uBurst: values.uBurst,
            fWaist: values.fWaist,
            hip: values.hip,
            hipLength: values.hipLength,
            gownLength: values.gownLength,
            waitsKneel: values.waitsKneel,
            shoulderKneel: values.shoulderKneel,
            skirtLength: values.skirtLength,
            fullLength: values.fullLength,
            fSleeve: values.fSleeve,
            roundSleeve: values.roundSleeve,
            arm: values.arm,
            lap: values.lap,
            fKnee: values.fKnee,
            trouserWaist: values.trouserWaist,
            trouserMouth: values.trouserMouth,
            topLength: values.topLength,
            //>...........................Cap............................................//
            capLenght: values.capLenght,
            capWidth: values.capWidth,

            addMessage: values.addMessage,
            bookedDate: serverTimestamp(),
            deadLineDate: Timestamp.fromDate(date),
            image: imageUri,
            jobState: complete,
          }
          //console.log(mesurement)
        ).then(() => {
          setLoading(true);
          actions.resetForm();
          setDate(new Date());
          setImageUri("");
          onClose();
        });
      }
    } catch (error) {
      Alert.alert(
        `${
          isEdith || isNew
            ? "Fail to update   ...Please check your network connection"
            : "Fail to save  ...Please check your network connection"
        }`
      );
      console.log(error);
      console.error(error);
      setLoading(false);
      setDisabled(false);
    }
  };

  // to close the modal
  const closeModal = () => {
    setDate(new Date());
    onClose();
    setLoading(false);
    setDisabled(false);
  };

  return (
    <>
      {/* .........................page heading................................... */}
      <Modal visible={visible} animationType={"fade"} transparent>
        <View style={styles.modal}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "flex-end",
            }}
          >
            <Text
              style={{
                color: Color.blue,
                fontSize: 22,
                paddingLeft: 24,
                marginBottom: 5,
              }}
            >
              {isEdith
                ? `Update ${mesurement.customerName} Details...`
                : isNew
                ? `Update ${mesurement.customerName} for new job`
                : "Add a new measurement"}
            </Text>

            <MaterialIcons
              name="close"
              size={18}
              color={Color.blue}
              onPress={closeModal}
              disabled={disabled}
              style={
                disabled === true
                  ? {
                      ...globalStyles.btnSmall,
                      ...styles.modalTcolse,
                      opacity: 0.4,
                    }
                  : { ...globalStyles.btnSmall, ...styles.modalTcolse }
              }
            />
          </View>

          {/* ...............................................page Body................................. */}
          <ScrollView>
            <View style={styles.container}>
              <Formik
                initialValues={newMeasurement}
                enableReinitialize
                validationSchema={addJobSchma}
                onSubmit={handleSubmit}
              >
                {({ handleChange, handleSubmit, values, errors, touched }) => (
                  <View style={{ ...globalStyles.container, paddingTop: 10 }}>
                    <Text style={styles.lebal}>Customer Information</Text>

                    <Card>
                      <Input
                        onChangeText={handleChange("customerName")}
                        value={values.customerName}
                        outLine
                        placeholder="Customer Name"
                      />
                      {errors.customerName && touched.customerName && (
                        <Text style={globalStyles.errorTxt}>
                          {errors.customerName}
                        </Text>
                      )}
                      <Input
                        onChangeText={handleChange("phoneNumber")}
                        value={values.phoneNumber}
                        outLine
                        placeholder="Phone Number"
                        keyboardType="numeric"
                      />
                      {/* >>>>>>>>>>>>>>>>>>>>>>for Gendal................ */}
                      {isEdith || isNew ? (
                        <Text>
                          {mesurement.gender === "male" ? "Male" : "Female"}
                        </Text>
                      ) : (
                        <View style={{ flexDirection: "row" }}>
                          <RadioBtn gender={setisGendal} />
                        </View>
                      )}
                    </Card>

                    {/* ........................................PAIRES............................. */}
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
                        <Input
                          onChangeText={handleChange("paires")}
                          value={count.toString()}
                          editable={false}
                          outLine
                          style={{
                            paddingHorizontal: 7,
                            fontSize: 24,
                          }}
                          keyboardType="numeric"
                        />
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

                    {/* ...................Take Measurement readings..................................................... */}
                    <Text style={styles.lebal}>Take Measurement</Text>

                    {isGender === "male" ? (
                      <Male handleChange={handleChange} values={values} />
                    ) : (
                      <Female handleChange={handleChange} values={values} />
                    )}
                    {/* .....................................Cap......................... */}
                    <Card>
                      <View style={{ flexDirection: "row", gap: 8 }}>
                        <Text style={styles.lebal}>Add Cap</Text>
                      </View>

                      <View style={styles.twoColum}>
                        <View style={styles.colContent}>
                          <Input
                            onChangeText={handleChange("capLenght")}
                            value={values.capLenght}
                            keyboardType="numeric"
                            outLine
                            placeholder="Length"
                          />
                        </View>

                        <View style={styles.colContent}>
                          <Input
                            onChangeText={handleChange("capWidth")}
                            value={values.capWidth}
                            keyboardType="numeric"
                            outLine
                            placeholder="Width"
                          />
                        </View>
                      </View>
                    </Card>
                    {/* ........................Dealindate........................................... */}
                    <Text style={styles.lebal}>Deadline</Text>
                    <Card>
                      <View
                        style={
                          disabled === true ? { opacity: 0.4 } : { opacity: 1 }
                        }
                      >
                        <DateSelector dateValue={date} onChange={setDate} />
                      </View>
                    </Card>

                    {/* .......................................Image Selector  */}
                    <Card>
                      <View
                        style={
                          disabled === true ? { opacity: 0.4 } : { opacity: 1 }
                        }
                      >
                        <ImageSelector
                          value={imageUri}
                          size={24}
                          type={!isEdith ? "blue" : ""}
                          imageValue={setImageUri}
                          //onChangeText={handleChange("")}
                        >
                          Add Picture
                        </ImageSelector>
                      </View>
                    </Card>
                    {/* ..............................Additional Messages............................................ */}
                    <Text style={styles.lebal}>Additional Message</Text>
                    <Card>
                      <Input
                        onChangeText={handleChange("addMessage")}
                        value={values.addMessage}
                        multiline
                        outLine
                        placeholder="Add a message"
                      />
                    </Card>

                    {loading ? (
                      <View
                        style={{
                          flex: 1,
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <ActivityIndicator size="large" color={Color.blue} />
                      </View>
                    ) : (
                      <Button
                        onPress={handleSubmit}
                        title="Submit"
                        type={isEdith ? "orange" : "blue"}
                      >
                        {isEdith ? "Update" : "Submit"}
                      </Button>
                    )}
                  </View>
                )}
              </Formik>
            </View>
          </ScrollView>
        </View>
      </Modal>
    </>
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
  modal: {
    backgroundColor: Color.white,
    flex: 1,
    justifyContent: "center",
    borderTopEndRadius: 40,
    borderTopStartRadius: 40,
    marginTop: 20,
  },
});
