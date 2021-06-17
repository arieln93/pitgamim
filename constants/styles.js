import { StyleSheet } from "react-native";
import Colors from "./colors";

export default {
  screen: StyleSheet.create({
    wrapper: {
      flex: 1,
      flexDirection: "column",
      backgroundColor: Colors.SECONDARY,
    },
    header: {},
    body: {
      flex: 1,
      padding: 5,
    },
  }),
  mainTitle: {
    fontFamily: "Heebo-SemiBold",
    fontStyle: "normal",
    fontSize: 32,
    lineHeight: 47,
    letterSpacing: -0.3,
  },
  secondaryTitle: {
    fontFamily: "Heebo-SemiBold",
    fontStyle: "normal",
    fontSize: 21,
    lineHeight: 35,
    letterSpacing: -0.3,
  },
  lightTitle: {
    fontFamily: "Heebo-Regular",
    fontStyle: "normal",
    fontSize: 21,
    lineHeight: 35,
    letterSpacing: -0.3,
  },
  metadata: {
    fontFamily: "Heebo-Medium",
    fontStyle: "normal",
    fontSize: 14,
    lineHeight: 17,
    letterSpacing: -0.3,
  },
  content: {
    fontFamily: "Heebo-Regular",
    fontStyle: "normal",
    fontSize: 17,
    lineHeight: 25,
    letterSpacing: -0.3,
  },
  info: {
    fontFamily: "Heebo-Regular",
    fontStyle: "normal",
    fontSize: 14,
    lineHeight: 25,
    letterSpacing: -0.3,
  },
};
