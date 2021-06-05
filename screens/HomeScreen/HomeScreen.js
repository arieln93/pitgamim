import React, { useState } from 'react';
import { Text, View, Switch, TouchableOpacity } from 'react-native';
import DateTimePickerModal from "react-native-modal-datetime-picker";

import _ from 'lodash'

import Styles from './styles'
import Dictionary from '../../constants/dictionary'
import Colors from '../../constants/colors'

import * as DB from '../../DB'
import * as Screen from '../Screen'
import Card from '../../components/Card/Card'


const HomeScreen = ({ navigation, route }) => {
  const [randomItem, setRandomItem] = useState(DB.getRandomItem())
  const [dailyPhraseEnabled, setDailyPhraseEnabled] = useState(true)
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [notificationTime, setNotificationTime] = useState(new Date())

  const padTimeString = (time) => {
    const pad = "00" + time
    return pad.substring(pad.length-2, pad.length)
  }
  const getDayGreeting = () => {
    const now  = new Date()
    const hour = now.getHours()
    if (5 <= hour && hour < 12) {
      return Dictionary.HOME_SCREEN.GREETINGS.MORNING
    }
    if (12 <= hour && hour < 18) {
      return Dictionary.HOME_SCREEN.GREETINGS.NOON
    }
    if (18 <= hour && hour < 21) {
      return Dictionary.HOME_SCREEN.GREETINGS.EVENING
    }
    if ((21 <= hour && hour <= 24) || (0 <= hour && hour < 5)) {
      return Dictionary.HOME_SCREEN.GREETINGS.NIGHT
    } 
  }
  return (
    <Screen.Screen>
      <Screen.Header title={Dictionary.HOME_SCREEN.HEADER} />
      <Screen.Body>
        <View style={Styles.welcome.wrapper}>
          <Text style={Styles.welcome.greeting}>{getDayGreeting()}</Text>
          <Text style={Styles.welcome.sentence}>{Dictionary.HOME_SCREEN.SENTENCE}</Text>
        </View>
        <View style={Styles.timer.wrapper}>
          <View style={Styles.timer.leftSide.wrapper}>
            <View style={Styles.timer.leftSide.headerWrapper} >
              <Text style={Styles.timer.leftSide.headerText}>{Dictionary.HOME_SCREEN.TIMER.TITLE}</Text>
              <Switch
                style={Styles.timer.leftSide.switch}
                trackColor={{ false: Colors.GRAY, true: Colors.PRIMARY }}
                thumbColor={Colors.LIGHT_GRAY}
                ios_backgroundColor="#3e3e3e"
                onValueChange={() => setDailyPhraseEnabled(!dailyPhraseEnabled)}
                value={dailyPhraseEnabled}
              />
            </View>
            <Text style={Styles.timer.leftSide.contentText}>{Dictionary.HOME_SCREEN.TIMER.CONTENT}</Text>
          </View>
          
          <TouchableOpacity style={Styles.timer.rightSide.wrapper} onPress={() => setDatePickerVisibility(true)}>
              <Text style={Styles.timer.rightSide.digitsText}>{padTimeString(notificationTime.getHours())}</Text>
              <Text style={Styles.timer.rightSide.colon}>:</Text>
              <Text style={Styles.timer.rightSide.digitsText}>{padTimeString(notificationTime.getMinutes().toString())}</Text>
          </TouchableOpacity>
          <DateTimePickerModal
            isVisible={isDatePickerVisible}
            mode="time"
            onConfirm={(selectedDate) => {
              setNotificationTime(selectedDate)
              setDatePickerVisibility(false)
            }}
            onCancel={() => setDatePickerVisibility(false)}
          />
          
        </View>
        <View style={Styles.random}>
          <Card
            item={randomItem}
            navigation={navigation}
            customHeader={Dictionary.HOME_SCREEN.RANDOM_ITEM.TITLE}
          />
        </View>
      </Screen.Body>
    </Screen.Screen>
  )
}

export default HomeScreen