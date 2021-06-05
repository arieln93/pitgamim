import React from 'react';
import _ from 'lodash'
import NavigationBar from './components/NavigationBar/NavigationBar'
import Loading from './components/Loading/Loading'
import { useFonts } from "@use-expo/font";

const customFonts = {
  "Heebo-Regular" : require("./assets/fonts/Heebo-Regular.ttf"),
  "Heebo-Bold": require("./assets/fonts/Heebo-Bold.ttf"),
  "Heebo-SemiBold": require("./assets/fonts/Heebo-SemiBold.ttf"),
  "Heebo-Medium": require("./assets/fonts/Heebo-Medium.ttf"),
  "AmaticSC-Bold": require("./assets/fonts/AmaticSC-Bold.ttf"),
  "SecularOne-Regular": require("./assets/fonts/SecularOne-Regular.ttf"),
  "Rubik-Regular": require("./assets/fonts/Rubik-Regular.ttf"),
  "Tinos-Regular": require("./assets/fonts/Tinos-Regular.ttf"),
  "VarelaRound-Regular": require("./assets/fonts/VarelaRound-Regular.ttf"),
};
export default function App() {
  const [isLoaded] = useFonts(customFonts);
  if (!isLoaded) {
    return <Loading />;
  }
  return  <NavigationBar />
}
