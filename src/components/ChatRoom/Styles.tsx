import { StyleSheet } from "react-native";

import AppStyles from "../../AppStyles";


export const CustomInputToolbarStyle = StyleSheet.create({
    textToolbarContainer: {
        width: '95%',
        height: 60,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        alignSelf: 'center',
        marginHorizontal: 10,
        marginBottom: 20,
    },
    textContainer: {
        width: '85%',
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#FFF',
        borderRadius: 100,
        // paddingBottom: 20,
        paddingHorizontal: 20,
    },
    textToolbarIcon: {
        width: '12%',
        // height: '100%',
        aspectRatio: 1,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 1000,
        backgroundColor: '#0084D0',
    },
    input: {
        width: '100%',
        height: '100%',
        fontFamily: "PoppinsRegular",
        fontSize: 14,
        // backgroundColor: 'red'
    },
});

