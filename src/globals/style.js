import { Dimensions } from "react-native";

const screenWidth = Dimensions.get("window").width;
const marginFactor = screenWidth / 100;

module.exports = {
  btn1: {
    height: 49,
    width: 110,
    backgroundColor: "#5B8A39",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  btn2: {
    height: 49,
    width: 110,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: "#efefef",
    // backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    padding: 1,
    backgroundColor: "#efefef",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.5,
    shadowRadius: 20,
    elevation:10
  },
  submitBtn: {
    height: 49,
    width: "100%",
    backgroundColor: "#5B8A39",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 14,
  },
  globalContainer: {
    flex: 1,
    paddingHorizontal: screenWidth * 0.03, //5% of screen size width
  },
  removeButton: {
    backgroundColor: "#fbddd8",
    padding: 6,
    borderRadius: 8,
    width: "30%",
    marginTop: 20,
  },
  removeButtonText: {
    color: "red",
    textAlign: "center",
    fontFamily:"Poppins-SemiBold"
   },
  addButton: {
    backgroundColor: "#6a9aff",
    padding: 6,
    borderRadius: 10,
    marginBottom: 20,
    width: "30%",
  },
  addButtonText: {
    color: "white",
    textAlign: "center",
    fontFamily:"Poppins-SemiBold"
  },
  regular:{
    fontFamily:"Poppins-Regular"
  },
  semibold:{
    fontFamily:"Poppins-SemiBold"
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    width: "90%",
    padding: 10,
    alignItems: "center",
    shadowColor: "#0d258a",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.5,
    shadowRadius: 4,
    elevation: 5,
  },
  closeButton: {
     padding: 5,
   },
};
