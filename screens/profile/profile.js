import React, { useEffect, useState } from "react";
import {
  ImageBackground,
  Text,
  StyleSheet,
  View,
  ScrollView,
  Image,
  Modal,
  TouchableOpacity,
} from "react-native";

import { doc, onSnapshot, setDoc } from "firebase/firestore";
import { db, auth } from "../../config/firebase";
import { MaterialIcons } from "@expo/vector-icons";

import { globalStyles } from "../../style/globalStyles";
import Input from "../../component/input";

import Color from "../../constant/colors";
import ImageSelector from "../../component/imageSelector";

export default function Profile({ navigation }) {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [fullName, setFullName] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [brandName, setBrandName] = useState("");
  const [profileImage, setProfileImage] = useState();
  const [email, setEmail] = useState();
  const [bio, setBio] = useState([]);

  const [modalOpen, setModalOpen] = useState(false);
  const [imageSelector, setImageSlector] = useState(true);
  const [editImage, setEdithImage] = useState(true);
  const [disabled, setDisabled] = useState(false);
  const [loaded, setLoaded] = useState(false);

  // ......... to get User information from fireStrore...........................
  useEffect(() => {
    const docRef = doc(db, "user", auth.currentUser.uid);
    onSnapshot(docRef, (doc) => {
      setPhoneNumber(doc.data()?.phoneNumber);
      setFullName(doc.data()?.fullName);
      setDisplayName(doc.data()?.displayName);
      setBrandName(doc.data()?.brandName);
      setEmail(doc.data()?.email);
      setBio(doc.data()?.bio);

      setProfileImage(doc.data()?.profileImage);
    });

    // Unsubscribe from events on unmount
    return () => {};
    // console.log(dateOfBirth.toDate());
  }, []);

  const handleCancel = () => {
    setModalOpen(false);
  };

  //  open model
  const openModal = () => {
    setModalOpen(true);
  };
  // ........................To udate the user.............................................
  const handleUpdate = async () => {
    setDisabled(true);

    await setDoc(doc(db, "user", auth.currentUser.uid), {
      phoneNumber: phoneNumber || "",
      fullName,
      brandName,
      displayName: displayName || "",
      email: email || "",
      bio,

      profileImage: profileImage || "",
    })
      .then(() => {
        setModalOpen(false);
        setDisabled(false);
      })
      .catch((error) => {
        setDisabled(false);
        console.log(error);
      });
  };

  useEffect(() => {
    const docRef = doc(db, "user", auth.currentUser.uid);
    onSnapshot(docRef, (doc) => {
      setProfileImage(doc.data()?.profileImage);
    });
  }, []);

  //logout functionality
  const logOut = () => {
    auth.signOut().then(() => console.log("User signed out!"));
  };

  return (
    <ScrollView style={styles.container}>
      <View>
        {/* <ImageBackground
          source={require("../../assets/chatbg.jpg")}
          style={styles.backgroundImage}
        /> */}
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            paddingTop: 20,
            paddingBottom: 20,
            marginBottom: 10,
            height: 230,
            backgroundColor: "rgba(52, 52, 52, 0.05)",
          }}
        >
          <View
            style={{
              width: 100,
              height: 100,
              backgroundColor: Color.blue,
              borderRadius: 100,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <View style={{ width: 130, height: 130, zIndex: 1, opacity: 1 }}>
              <Image
                source={
                  !profileImage
                    ? require("../../assets/noImage.png")
                    : { uri: profileImage }
                }
                style={{
                  width: 120,
                  height: 120,
                  resizeMode: "cover",
                  borderRadius: 100,

                  //margin: 10,
                }}
              />
            </View>
          </View>
          <Text style={styles.profileTxt}>{auth.currentUser?.displayName}</Text>
        </View>

        {/* <View style={{ ...globalStyles.hrLine, borderColor: Color.black }} /> */}

        <View style={{ ...styles.profileContent }}>
          <Text style={{ ...styles.profileTxt, ...styles.profileTxtBold }}>
            Email:
          </Text>
          <View style={{ width: "100%", marginBottom: 10 }}>
            <Text style={styles.profileTxt}>{auth?.currentUser?.email}</Text>
            <View style={{ ...globalStyles.hrLine }} />
          </View>
        </View>

        <View style={{ ...styles.profileContent }}>
          <Text style={{ ...styles.profileTxt, ...styles.profileTxtBold }}>
            PhoneNumber:
          </Text>
          <View style={{ width: "100%", marginBottom: 10 }}>
            <Text style={styles.profileTxt}> {phoneNumber}</Text>
            <View style={{ ...globalStyles.hrLine }} />
          </View>
        </View>

        <View style={{ ...styles.profileContent }}>
          <Text style={{ ...styles.profileTxt, ...styles.profileTxtBold }}>
            Full Name:
          </Text>
          <View style={{ width: "100%", marginBottom: 10 }}>
            <Text style={styles.profileTxt}> {fullName}</Text>
            <View style={{ ...globalStyles.hrLine }} />
          </View>
        </View>

        <View style={{ ...styles.profileContent }}>
          <Text style={{ ...styles.profileTxt, ...styles.profileTxtBold }}>
            Bio:
          </Text>
          <View style={{ width: "100%", marginBottom: 10 }}>
            <Text style={styles.profileTxt}> {bio}</Text>
            <View style={{ ...globalStyles.hrLine }} />
          </View>
        </View>

        {/* <View style={{ ...styles.profileContent }}>
            <Text style={{ ...styles.profileTxt, ...styles.profileTxtBold }}>
              Birthday:
            </Text>
            <View style={{ width: "100%", marginBottom: 10 }}>
              <Text style={styles.profileTxt}>
                {`${moment(dateOfBirth).format("LL")}`}
              </Text>
            </View>
          </View> */}

        {/* <View style={{ ...globalStyles.hrLine, borderColor: Color.black }} /> */}

        <View style={{ ...styles.profileContent }}>
          <Text style={{ ...styles.profileTxt, ...styles.profileTxtBold }}>
            Brand Name:
          </Text>
          <View style={{ width: "100%", marginBottom: 10 }}>
            <Text style={styles.profileTxt}> {brandName}</Text>
            <View style={{ ...globalStyles.hrLine }} />
          </View>
        </View>
      </View>

      {/* ........to Edith the profile Button ............*/}
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          margin: 20,
          gap: 5,
        }}
      >
        <TouchableOpacity
          onPress={openModal}
          style={{
            ...globalStyles.btnTextIcon,
            backgroundColor: Color.blue,
            flexGrow: 1,
          }}
        >
          <Text
            style={{
              color: Color.white,
              paddingHorizontal: 10,
              paddingVertical: 5,
              fontWeight: "bold",
              textAlign: "center",
            }}
          >
            Edith Profile
          </Text>
        </TouchableOpacity>
        {/* <TouchableOpacity>
        <Text style={{ color: "blue", paddingLeft: 20, fontWeight: "bold" }}>
          Reset Password
        </Text>
      </TouchableOpacity> */}
        <TouchableOpacity
          onPress={() => navigation.navigate("About")}
          style={{
            ...globalStyles.btnTextIcon,
            backgroundColor: Color.blue,
            flexGrow: 1,
          }}
        >
          <Text
            style={{
              color: Color.white,
              paddingHorizontal: 10,
              paddingVertical: 5,
              fontWeight: "bold",
              textAlign: "center",
            }}
          >
            About
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={logOut}
          style={{
            ...globalStyles.btnTextIcon,
            backgroundColor: Color.blue,
            flexGrow: 1,
          }}
        >
          <Text
            style={{
              color: Color.white,
              paddingHorizontal: 10,
              paddingVertical: 5,
              fontWeight: "bold",
              textAlign: "center",
            }}
          >
            Log Out
          </Text>
        </TouchableOpacity>
      </View>
      {/*......................... to Open the modal for edithing....................  */}
      <Modal visible={modalOpen} animationType={"fade"}>
        <View style={styles.container}>
          <View
            style={{
              ...styles.modalTcolse,
              paddingBottom: 10,
              borderColor: Color.midGray,
              borderBottomWidth: 1,
            }}
          >
            <TouchableOpacity onPress={handleCancel}>
              <Text
                style={
                  disabled === true
                    ? { fontSize: 18, color: "red", opacity: 0.4 }
                    : { fontSize: 18, color: "red" }
                }
              >
                Cancle
              </Text>
            </TouchableOpacity>

            <Text
              style={{ fontSize: 18, color: Color.blue, fontWeight: "bold" }}
            >
              Edith Profile
            </Text>
            <MaterialIcons
              name="check"
              size={26}
              style={disabled === true ? { opacity: 0.4 } : { opacity: 1 }}
              color={Color.blue}
              onPress={handleUpdate}
              disabled={disabled}
            />
          </View>
          <ScrollView style={{ padding: 20 }}>
            <Text style={{ ...styles.profileTxt, ...styles.profileTxtBold }}>
              Phone Number
            </Text>
            <Input
              placeholder="Phone Number"
              autoCapitalize="none"
              autoFocus={false}
              value={phoneNumber}
              onChangeText={(text) => setPhoneNumber(text)}
            />
            <Text style={{ ...styles.profileTxt, ...styles.profileTxtBold }}>
              FullName
            </Text>
            <Input
              placeholder="fullName"
              autoCapitalize="none"
              autoFocus={false}
              value={fullName}
              onChangeText={(text) => setFullName(text)}
            />
            <Text style={{ ...styles.profileTxt, ...styles.profileTxtBold }}>
              Bio
            </Text>
            <Input
              placeholder="Bio"
              autoCapitalize="none"
              autoFocus={false}
              value={bio}
              onChangeText={(text) => setBio(text)}
            />
            <Text style={{ ...styles.profileTxt, ...styles.profileTxtBold }}>
              Brand Name
            </Text>
            <Input
              placeholder="Brand Name"
              autoCapitalize="none"
              autoFocus={false}
              value={brandName}
              onChangeText={(text) => setBrandName(text)}
            />
            {/* <Text style={{ ...styles.profileTxt, ...styles.profileTxtBold }}>
                Date of birth
              </Text>
              <DateSelector dateValue={dateOfBirth} onChange={setDateOfBirth} /> */}

            <View
              style={
                disabled === true
                  ? { opacity: 0.4, marginBottom: 50 }
                  : { marginBottom: 50 }
              }
            >
              <ImageSelector
                imageSelector={imageSelector}
                imageValue={setProfileImage}
                editImage={editImage}
                type={"blue"}
                size={18}
              >
                Edith profile image
              </ImageSelector>
            </View>
          </ScrollView>
        </View>
      </Modal>

      <View style={{ marginBottom: 40 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  profileTxt: {
    fontSize: 18,
    fontFamily: "roboto-regular",
    paddingTop: 2,
    color: Color.lightBlack,
  },
  profileTxtBold: {
    fontFamily: "roboto-light",
    fontSize: 12,
    color: Color.gray,
  },
  profileContent: {
    justifyContent: "flex-start",
    paddingHorizontal: 15,
  },
  modalTcolse: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 20,
    paddingHorizontal: 15,
    marginBottom: 0,
  },
  backgroundImage: {
    flex: 1,
    resizeMode: "cover",
    opacity: 0.1,
    width: "100%",
    height: 200,
    position: "absolute",
  },
});
