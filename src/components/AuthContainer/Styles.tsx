import { StyleSheet, Dimensions } from "react-native";

import Styles from "../../AppStyles";


export const headerStyles = StyleSheet.create({
    container: {
        width: '100%',
        justifyContent: 'center',
    },
    text: {
        color: Styles.DarkColor,
        textAlign: 'center',
        // fontFamily: "PoppinsSemiBold",
    },
});

export const inputAreaStyles = StyleSheet.create({
    container: {
        width: '100%',
        height: 56,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginVertical: 10,
        backgroundColor: Styles.BorderColor,
        borderRadius: 10,
    },
    iconContainer: {
        width: '10%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    icon: {
        
    },
    input: {
        width: '90%',
        // height: '100%',
        fontFamily: 'PoppinsRegular',
        fontSize: 16,
        paddingHorizontal: 10,
        // backgroundColor: 'red',
    },
});

export const passwordInputStyles = StyleSheet.create({
    container: {
        width: '100%',
        height: 56,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginVertical: 10,
        backgroundColor: Styles.BorderColor,
        borderRadius: 10,
    },
    iconContainer: {
        width: '10%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    icon: {
        
    },
    input: {
        width: '80%',
        // height: '100%',
        fontFamily: 'PoppinsRegular',
        fontSize: 16,
        paddingHorizontal: 10,
        // backgroundColor: 'red',
    },
});

