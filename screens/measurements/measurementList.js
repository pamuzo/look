import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Image,
  SafeAreaView,
  TextInput,
  Alert,
} from "react-native";
import { useState, useEffect } from "react";
import {
  collection,
  onSnapshot,
  orderBy,
  updateDoc,
  query,
  rderByChild,
  ref,
  doc,
} from "firebase/firestore";
import { db, auth } from "../../config/firebase";
import moment from "moment";
import filter from "lodash.filter";

import MeasurementModal from "./measurementModal";
import PlusIcon from "../../component/plusButton";
import Card from "../../component/card";
import Color from "../../constant/colors";
import { globalStyles } from "../../style/globalStyles";
import Header from "../../component/header";
import { Field } from "formik";

export default function MeasurementList({ navigation }) {
  const [measured, setMeasured] = useState([]);
  const [noOfJobs, SetNoOfJobs] = useState("");
  const [modalData, setModalData] = useState({});
  const [openModal, setOpenModal] = useState(false);
  const [isEdith, setIsEdith] = useState(false);
  const [isNew, setIsNew] = useState(false);
  const [search, setSearch] = useState("");
  const [searchDate, setSearchDate] = useState("");

  //when the plus button is clicked..... to Add new job
  const newJob = () => {
    setOpenModal(true);
    setIsEdith(false);
    setIsNew(false);
  };
  //_________Handle the searchBar __________________//
  const handeleSearch = (query) => {
    setSearch(query);
    const formatedQuery = query.toLowerCase();
    const filtedDate = filter(searchDate, (user) => {
      return contains(user, formatedQuery);
    });
    setMeasured(filtedDate);
  };
  const contains = ({ customerName, phoneNumber }, query) => {
    if (
      customerName.toLowerCase().includes(query) ||
      phoneNumber.includes(query)
    ) {
      return true;
    }
  };

  // to show each measurement details in full
  const measuredDetails = (measuremnt) => {
    navigation.navigate("MeasurementDetails", { measuremnt });
  };

  // to handle the submited value
  const handleSubmit = (values) => {
    //console.log(values);
  };

  const daysLeft = (item) => {
    return Math.round(
      (item.deadLineDate.toDate() - new Date()) / (1000 * 60 * 60 * 24)
    );
  };

  // to handle the update input
  const passDataToModal = (item) => {
    if (item.jobState === "complete") {
      setIsNew(true);
      setIsEdith(false);
      setModalData(item);
      setOpenModal(true);
    } else {
      setIsEdith(true);
      setModalData(item);
      setOpenModal(true);
      setIsNew(false);
    }
  };

  const completeHandler = (item) => {
    updateDoc(doc(db, "user", auth.currentUser.uid, "measured_list", item.id), {
      jobState: "complete",
      paires: 1,
    }).then(() => {
      Alert.alert("One Job Completed! \n Saved to list....");
    });
  };

  const onClose = () => {
    setOpenModal(false);
    setIsEdith(false);
    setIsNew(false);
  };
  // ---------------------------------------------to fetch the data

  useEffect(() => {
    const q = query(
      collection(db, "user", auth.currentUser.uid, "measured_list"),
      orderBy("jobState", "desc"),
      orderBy("deadLineDate")
    );
    const getMeasurements = onSnapshot(q, (snapshot) => {
      let customerinfor = [];
      snapshot.docs.forEach((doc) => {
        customerinfor.push({ ...doc.data(), id: doc.id });
      });
      setMeasured(customerinfor);
      SetNoOfJobs(customerinfor.length);
      setSearchDate(customerinfor);
    });
    return () => {
      getMeasurements();
    };
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View
        style={{
          position: "absolute",
          bottom: 24,
          right: 24,
          zIndex: 1,
        }}
      >
        <PlusIcon onPress={newJob}>+</PlusIcon>
      </View>

      <Header />

      <FlatList
        data={measured}
        renderItem={({ item, index }) => {
          const isEnd = index === measured.length - 1;
          return (
            <View>
              <View style={{ paddingLeft: 20, paddingRight: 20 }}>
                <View>
                  <TouchableOpacity
                    style={
                      item.jobState === "complete"
                        ? styles.newBtn
                        : styles.updateBtn
                    }
                    onPress={() => {
                      passDataToModal(item);
                    }}
                  >
                    <Text style={styles.bgTxt}>
                      {item.jobState === "complete" ? "New" : " Update"}
                    </Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={
                      daysLeft(item) <= 0 && item.jobState === "pending"
                        ? styles.completeBtn
                        : { display: "none" }
                    }
                    onPress={() => {
                      completeHandler(item);
                    }}
                  >
                    <Text style={styles.bgTxt}>Complete?</Text>
                  </TouchableOpacity>

                  {/* _____________________Passing the Data to the modal__________________ */}
                  <TouchableOpacity
                    onPress={() => {
                      measuredDetails(item);
                    }}
                  >
                    <Card>
                      <View
                        style={{
                          ...globalStyles.twoColum,
                          justifyContent: "flex-start",
                        }}
                      >
                        <Image
                          source={
                            !item.image
                              ? require("../../assets/noImage.png")
                              : { uri: item.image }
                          }
                          style={{
                            width: 100,
                            height: 100,
                            resizeMode: "cover",
                          }}
                        />

                        <View style={{ flexGrow: 1 }}>
                          <Text
                            style={{
                              fontSize: 18,
                              fontWeight: "bold",
                              color: Color.blue,
                              fontFamily: "roboto-regular",
                            }}
                          >
                            {item.customerName}
                          </Text>
                          <Text
                            style={{
                              fontSize: 16,
                              fontWeight: "bold",
                              color: Color.blue,
                              fontFamily: "roboto-regular",
                            }}
                          >
                            {item.phoneNumber}
                          </Text>

                          <View
                            style={{ ...globalStyles.hrLine, width: "100%" }}
                          />
                          <Text
                            style={
                              daysLeft(item) <= 0 && item.jobState === "pending"
                                ? { display: "none" }
                                : { display: "flex" }
                            }
                          >
                            {`${
                              item.jobState === "complete"
                                ? "Click New to book again"
                                : moment(item.deadLineDate?.toDate()).format(
                                    "LL"
                                  )
                            }`}
                          </Text>

                          <Text
                            style={
                              item.jobState === "complete"
                                ? { display: "none" }
                                : daysLeft(item) <= 0
                                ? { color: "red", fontWeight: "bold" }
                                : "" || daysLeft(item) <= 2
                                ? { color: "green", fontWeight: "bold" }
                                : ""
                            }
                          >{`${
                            daysLeft(item) <= 0 ? 0 : daysLeft(item)
                          } Days Left`}</Text>
                        </View>
                      </View>
                    </Card>
                  </TouchableOpacity>
                </View>
              </View>
              {isEnd && (
                <View style={{ height: 70 }}>{/* <Text>The End</Text> */}</View>
              )}
            </View>
          );
        }}
        ListEmptyComponent={
          <Text style={styles.noItemTxt}> No Items found</Text>
        }
        ListHeaderComponent={
          <View
            style={{
              flexDirection: "row",
              gap: 12,
              justifyContent: "space-between",
              alignItems: "center",
              marginHorizontal: 20,
            }}
          >
            <TextInput
              clearButtonMode="always"
              style={{
                borderColor: Color.midGray,
                borderWidth: 1,
                paddingHorizontal: 10,
                paddingVertical: 5,
                marginVertical: 5,
                borderRadius: 8,
                flexGrow: 1,
              }}
              autoCapitalize="none"
              autoCorrect={false}
              onChangeText={(query) => handeleSearch(query)}
              value={search}
              placeholder="Search"
            />
            <Text
              style={{
                textAlign: "right",
                fontSize: 18,
                color: Color.blue,
              }}
            >
              Total: <Text style={{ fontWeight: "bold" }}>{noOfJobs} </Text>
            </Text>
          </View>
        }
        ListFooterComponent={() => ""}
      />
      <MeasurementModal
        visible={openModal}
        onClose={onClose}
        onSubmit={handleSubmit}
        mesurement={modalData}
        isEdith={isEdith}
        isNew={isNew}
        style={{ backgroundColor: "red", height: 70, width: 60 }}
      />
      <View style={{}}></View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  updateBtn: {
    backgroundColor: Color.orange,
    borderBottomRightRadius: 5,
    borderTopLeftRadius: 5,
    width: "25%",
    position: "absolute",
    zIndex: 1,
    bottom: 10,
    right: 4,
  },
  newBtn: {
    backgroundColor: Color.blue,
    borderBottomRightRadius: 5,
    borderTopLeftRadius: 5,
    width: "25%",
    position: "absolute",
    zIndex: 1,
    bottom: 10,
    right: 4,
  },
  bgTxt: {
    fontWeight: "bold",
    fontSize: 14,
    color: Color.white,
    textAlign: "center",
    padding: 3,
  },
  noItemTxt: {
    flex: 1,
    height: "100%",
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center",
    fontSize: 30,
  },
  completeBtn: {
    backgroundColor: Color.green,
    borderTopRightRadius: 5,
    borderTopLeftRadius: 5,
    width: "25%",
    position: "absolute",
    zIndex: 1,
    bottom: 10,
    right: 80,
  },
});
