import { StyleSheet } from "react-native";
import Colors from "../../constants/colors";
import Styles from "../../constants/styles";

export default {
  filtersSection: StyleSheet.flatten({
    flexDirection: "row",
    justifyContent: "center",
  }),
  sliderFilter: StyleSheet.create({
    wrapper: {
      alignItems: "center",
    },
    slider: {
      width: "100%",
      margin: 0,
      padding: 0,
    },
  }),
  fontsFilter: {
    wrapper: StyleSheet.flatten({
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
    }),
    option: StyleSheet.create({
      wrapper: (isOptionSelected) => ({
        backgroundColor: isOptionSelected ? Colors.PRIMARY : Colors.WHITE,
        shadowColor: Colors.BLACK,
        shadowOffset: {
          width: 1,
          height: 1,
        },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 3,
        borderRadius: 30,
        padding: 10,
        margin: 5,
      }),
      text: (isOptionSelected) => ({
        color: isOptionSelected ? Colors.WHITE : Colors.PRIMARY,
      }),
    }),
  },
  backgroundFilter: (color, isOptionSelected) =>
    StyleSheet.flatten({
      width: 60,
      height: 60,
      backgroundColor: color,
      borderColor: isOptionSelected ? color : Colors.WHITE,
      borderWidth: 6,
      borderRadius: 30,
      shadowColor: Colors.BLACK,
      shadowOffset: {
        width: 1,
        height: 1,
      },
      shadowOpacity: 0.8,
      shadowRadius: 2,
      elevation: 3,
      padding: 10,
      margin: 5,
    }),
  filterButton: StyleSheet.create({
    wrapper: {
      backgroundColor: Colors.WHITE,
      shadowColor: Colors.BLACK,
      shadowOffset: {
        width: 1,
        height: 1,
      },
      shadowOpacity: 0.8,
      shadowRadius: 2,
      elevation: 3,
      borderRadius: 30,
      padding: 10,
      margin: 5,
    },
    icon: {
      tintColor: Colors.PRIMARY,
      width: 40,
      height: 40,
    },
  }),
  filter: StyleSheet.create({
    wrapper: {
      paddingRight: 20,
      paddingLeft: 20,
      paddingBottom: 0,
    },
    title: {
      ...Styles.content,
      padding: 5,
      color: Colors.PRIMARY,
    },
  }),
  filtersGroup: StyleSheet.flatten({
    marginBottom: 20,
  }),
  exportSection: {
    wrapper: StyleSheet.flatten({
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      flexGrow: 1,
    }),
    sharingSentence: StyleSheet.create({
      wrapper: {
        flexDirection: "column",
        justifyContent: "flex-end",
        width: "70%",
        margin: -30,
        marginTop: 10,
      },
      button: {
        ...Styles.lightTitle,
        color: Colors.PRIMARY,
        textAlign: "center",
      },
    }),
    exportButton: StyleSheet.create({
      wrapper: {
        shadowColor: Colors.BLACK,
        shadowOffset: {
          width: 1,
          height: 1,
        },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 3,
        backgroundColor: Colors.PRIMARY,
        borderRadius: 50,
        padding: 15,
        margin: 5,
      },
      icon: {
        tintColor: Colors.WHITE,
        width: 30,
        height: 30,
      },
    }),
  },
  instructions: StyleSheet.create({
    wrapper: {
      width: "100%",
      height: 300,
      borderWidth: 10,
      borderColor: Colors.BLACK,
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      padding: 20,
    },
    title: {
      ...Styles.lightTitle,
      color: Colors.PRIMARY,
      textAlign: "center",
    },
    content: {
      ...Styles.content,
      textAlign: "center",
    },
    icon: {
      width: 20,
      height: 20,
      margin: 4,
      tintColor: Colors.PRIMARY_LIGHT,
    },
    buttonWrapper: {
      margin: 10,
      flexDirection: "row",
      alignItems: "center",
      paddingLeft: 14,
      paddingRight: 14,
      padding: 4,
      borderRadius: 20,
      backgroundColor: Colors.PRIMARY,
    },
    buttonText: {
      ...Styles.metadata,
      color: Colors.WHITE,
    },
    buttonIcon: {
      width: 20,
      height: 20,
      margin: 4,
      tintColor: Colors.WHITE,
    },
  }),
};
