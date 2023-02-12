import { StyleSheet } from "react-native";

import AppStyles from "../../AppStyles";


export const CustomInputToolbarStyle = StyleSheet.create({
    textToolbarContainer: {
        width: '95%',
        height: 55,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        alignSelf: 'center',
        marginTop: 10,
        paddingLeft: 20,
        paddingRight: 10,
        marginHorizontal: 10,
        // marginBottom: 10,
        borderRadius: 100,
        backgroundColor: '#f1f1f1',
    },
    textContainer: {
        width: '88%',
        height: 45,
        alignItems: 'center',
        justifyContent: 'center',
        // backgroundColor: 'red',
        // borderRadius: 100,
        // marginBottom: 20,
        // paddingHorizontal: 20,
    },
    textToolbarIcon: {
        width: '10.5%',
        // height: '100%',
        aspectRatio: 1,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 1000,
        backgroundColor: AppStyles.DarkColor,
    },
    textToolbarLoadingIcon: {
        width: '10.5%',
        // height: '100%',
        aspectRatio: 1,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 1000,
        // backgroundColor: AppStyles.DarkColor,
    },
    input: {
        width: '100%',
        height: '100%',
        fontFamily: "PoppinsRegular",
        fontSize: 14,
        backgroundColor: 'transparent'
    },
});

