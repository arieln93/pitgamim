import React, { useState, useEffect } from 'react';
import { Text, View, Switch, TouchableOpacity, Platform } from 'react-native';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import * as Notifications from 'expo-notifications'
import _ from 'lodash'

import Styles from './styles'
import Dictionary from '../../constants/dictionary'
import Colors from '../../constants/colors'

import * as DB from '../../DB'
import * as Screen from '../Screen'
import Card from '../../components/Card/Card'
import Loading from '../../components/Loading/Loading'
import Popup from '../../components/Popup/Popup'

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

async function registerForPushNotification(){
  const isPermGranted = await Notifications.getPermissionsAsync();
  let finalStatus = isPermGranted.status
  if (isPermGranted.status != 'granted') {
    const { IsPermApproved } = await Notifications.requestPermissionsAsync();
    finalStatus = IsPermApproved.status;
  }
  if (finalStatus !== 'granted') {
    alert('Failed to get push token for push notification!');
    return;
  }
  let tokenResponse = await Notifications.getExpoPushTokenAsync();
  if (Platform.OS === 'android') {
    Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }
  return tokenResponse.data
}

const HomeScreen = ({ navigation, route }) => {
  const [randomItem, setRandomItem] = useState(undefined)
  const [dailyPhraseEnabled, setDailyPhraseEnabled] = useState(false)
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [notificationTime, setNotificationTime] = useState(new Date())
  const [popupContent, setPopupContent] = useState(null)
  const [expoPushToken, setExpoPushToken] = useState('');

  const randomItemRefresh = () => {
    setRandomItem(undefined)
    DB.getRandomItem().then(item => setRandomItem(item))
  }
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

  const handleDailyPhraseSwitch = async (on) => {
    if (on) {
      registerForPushNotification().then(token => {
        console.log(token)
        if (token !== undefined) {
          setDailyPhraseEnabled(true)
          setExpoPushToken(token)
          Notifications.scheduleNotificationAsync({
            content: {
              title: "פתגם אחד ביום",
              body: 'סדנא דארעה חד הוא',
              data: { data: 'goes here' },
            },
            trigger: {
              hour: notificationTime.getHours(),
              minute: notificationTime.getMinutes(),
              repeats: true
            },
          }).then(resp => {
            console.log('notification', resp)
          })
        }
      })
    } else {
      Notifications.cancelAllScheduledNotificationsAsync()
      setDailyPhraseEnabled(false)
    }
  }

  useEffect(() => {
    randomItemRefresh()
  }, [])

  useEffect(() => {
    if (dailyPhraseEnabled){
      setPopupContent({
        content: "תזמון פתגם יומי פעיל",
        timeStamp: Date()
      })
    } else {
      setPopupContent({
        content: "תזמון פתגם יומי כבוי",
        timeStamp: Date()
      })
    }
  }, [dailyPhraseEnabled])
  return (
    <Screen.Screen>
      <Screen.Header title={Dictionary.HOME_SCREEN.HEADER} />
      <Screen.Body>
        <Popup {...popupContent} />
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
                onValueChange={(value) => handleDailyPhraseSwitch(value)}
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
          { randomItem
            ? <Card
                item={randomItem}
                navigation={navigation}
                customHeader={Dictionary.HOME_SCREEN.RANDOM_ITEM.TITLE}
                handleRefresh={randomItemRefresh}
              />
            : <Loading />
          }
        </View>
      </Screen.Body>
    </Screen.Screen>
  )
}

export default HomeScreen