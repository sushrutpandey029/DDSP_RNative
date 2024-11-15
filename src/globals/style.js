import { Dimensions } from "react-native";

const screenWidth = Dimensions.get('window').width;
const marginFactor = screenWidth / 100;

module.exports = {
    btn1 : {
        height: 49,
        width: 110,
        backgroundColor: "#5B8A39",
        borderRadius: 10,
        alignItems: "center",
        justifyContent: "center",
    },
    btn2 : {
        height : 49,
        width  :110,
        borderWidth : 1,
        borderRadius : 10,
        borderColor:  '#CBD5E1',
        backgroundColor : '#fff',
        alignItems : 'center',
        justifyContent : 'center'
        
    },
    submitBtn: {
        height: 49,
        width: '50%',
        backgroundColor: "#5B8A39",
        borderRadius: 10,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 14,
        
        
    },
    globalContainer: {
        flex : 1,
        paddingHorizontal: screenWidth * 0.03, //5% of screen size width
    }
}