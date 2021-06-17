import React, { useState, useEffect } from 'react';

import { useFonts } from "@use-expo/font"

import _ from 'lodash'
import NavigationBar from './components/NavigationBar/NavigationBar'
import Loading from './components/Loading/Loading'
import * as DB from './DB'

import { I18nManager } from "react-native"
try {
  console.log(I18nManager.isRTL)
  I18nManager.forceRTL(false)
  I18nManager.allowRTL(false)
}
catch (e) {
  console.log(e)
}

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
}
export default function App() {
  const [isFontsLoaded] = useFonts(customFonts);
  const [isDatabaseLoaded, setIsDatabaseLoaded] = useState(null)
  const loadDB = async () => {
    DB.initDB().then(resp => setIsDatabaseLoaded(resp))
  }
  useEffect(() => {
    console.log('App loading')
    loadDB()
  }, [])


  return !isFontsLoaded || !isDatabaseLoaded ? <Loading /> : <NavigationBar/>
}
