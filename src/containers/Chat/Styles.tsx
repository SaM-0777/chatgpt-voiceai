import { StyleSheet, Dimensions } from 'react-native';

import AppStyles from '../../AppStyles';


export default StyleSheet.create({
  main: {
    width: '100%',
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 15,

  },
  container: {
    width: '100%',
    // flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    alignSelf: 'center',
  },
  wrapper: {
    width: '32%',
    // justifyContent: 'space-between',
    alignItems: 'center',
    // height: '100%',
  },
  titleContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  title: {
    fontFamily: "PoppinsSemiBold",
    marginTop: 5,
  },
  boxContainer: {
    width: '100%',
  },
  box: {
    width: '100%',
    height: 60,
    borderWidth: 1,
    padding: 4,
    marginTop: 5,
    borderRadius: 5,
    borderColor: AppStyles.BorderColor,
    backgroundColor: AppStyles.GrayColor3,
  },
  boxText: {
    color: AppStyles.DarkColor,
    fontFamily: "PoppinsRegular",
    fontSize: 12,
  },
  startBtn: {
    width: 120,
    height: 48,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40,
    borderRadius: 10,
    backgroundColor: AppStyles.DarkColor,
  },
  startText: {
    color: '#FFF',
    fontFamily: "PoppinsSemiBold",
    fontSize: 15,
  },
});

