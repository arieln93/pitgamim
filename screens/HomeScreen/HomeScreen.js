import React, { useState } from 'react';
import { Text, View, Switch, TouchableOpacity } from 'react-native';
import DateTimePickerModal from "react-native-modal-datetime-picker";

import _ from 'lodash'

import Styles from './styles'
import Dictionary from '../../constants/dictionary'
import Colors from '../../constants/colors'

import * as Screen from '../Screen'
import Card from '../../components/Card/Card'


const HomeScreen = props => {
  const [dailyPhraseEnabled, setDailyPhraseEnabled] = useState(true)
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [notificationTime, setNotificationTime] = useState(new Date())

  const tags = [
    {
      id: '1',
      name: 'אהבה',
      isSelected: true,
    },
    {
      id: '2',
      name: 'זוגיות',
      isSelected: true,
    },
    {
      id: '3',
      name: 'התפתחות',
      isSelected: false,
    },
    {
      id: '4',
      name: 'אושר',
      isSelected: false,
    },
    {
      id: '5',
      name: 'לימודים',
      isSelected: false,
    },
    {
      id: '6',
      name: 'טיולים',
      isSelected: false,
    },
    {
      id: '7',
      name: 'חלומות',
      isSelected: false,
    }
  ]
  const items = [
    {
      id: '1',
      type: 'PHRASE',
      tags: ['1', '3', '4'],
      image: 'https://www.herobuddy.org/wp-content/uploads/2020/03/Super-hero-head-sm-1.jpg',
      content: 'איזהו גבור? - הכובש את יצרו',
      explanation: 'מיהו גיבור? – אדם שיודע להתאפק ולרסן את יצריו.',
      source: 'מסכת אבות, ד פסוק א ',
      example: 'למשל מי שיודע לשבת וללמוד ללא דחיינות הוא גיבור כי הוא כבש את יצריו',
    },
    {
      id: '2',
      type: 'QUOTE',
      tags: ['2', '3', '7'],
      image: 'https://www.herobuddy.org/wp-content/uploads/2020/03/Super-hero-head-sm-1.jpg',
      content: 'יום ללא צחוק הוא יום מבוזבז',
      explanation: '',
      source: "צ'ארלי צ'פלין",
      example: '',
    },
    {
      id: '3',
      type: 'PHRASE',
      tags: ['5', '6', '2'],
      image: 'https://www.herobuddy.org/wp-content/uploads/2020/03/Super-hero-head-sm-1.jpg',
      content: 'אִם אֵין אֲנִי לִי, מִי לִי? וּכְשֶׁאֲנִי לְעַצְמִי, מָה אֲנִי? וְאִם לֹא עַכְשָׁיו, אֵימָתַי?',
      explanation: 'אם אני לא אדאג לעצמי – מי יעשה זאת במקומי? אבל כשאני דואג רק לעצמי ולא לטובת אחרים – מה עֶרְכִּי? ואם איני עושה את חובתי עכשיו – מתי אעשה אותה? (אין לדחות דברים.)',
      source: 'אבות, א פסוק יג',
      example: '',
    },
    {
      id: '12',
      type: 'PHRASE',
      tags: ['1', '3', '4'],
      image: 'https://www.herobuddy.org/wp-content/uploads/2020/03/Super-hero-head-sm-1.jpg',
      content: 'איזהו גבור? - הכובש את יצרו',
      explanation: 'מיהו גיבור? – אדם שיודע להתאפק ולרסן את יצריו.',
      source: 'מסכת אבות, ד פסוק א ',
      example: 'למשל מי שיודע לשבת וללמוד ללא דחיינות הוא גיבור כי הוא כבש את יצריו',
    },
    {
      id: '22',
      type: 'QUOTE',
      tags: ['2', '3', '7'],
      image: 'https://www.herobuddy.org/wp-content/uploads/2020/03/Super-hero-head-sm-1.jpg',
      content: 'יום ללא צחוק הוא יום מבוזבז',
      explanation: '',
      source: "צ'ארלי צ'פלין",
      example: '',
    },
    {
      id: '32',
      type: 'PHRASE',
      tags: ['5', '6', '2'],
      image: 'https://www.herobuddy.org/wp-content/uploads/2020/03/Super-hero-head-sm-1.jpg',
      content: 'אִם אֵין אֲנִי לִי, מִי לִי? וּכְשֶׁאֲנִי לְעַצְמִי, מָה אֲנִי? וְאִם לֹא עַכְשָׁיו, אֵימָתַי?',
      explanation: 'אם אני לא אדאג לעצמי – מי יעשה זאת במקומי? אבל כשאני דואג רק לעצמי ולא לטובת אחרים – מה עֶרְכִּי? ואם איני עושה את חובתי עכשיו – מתי אעשה אותה? (אין לדחות דברים.)',
      source: 'אבות, א פסוק יג',
      example: '',
    }
  ]
  const enhancedItems = _.map(items, item => ({
    ...item,
    tags: _.map(item.tags, tagID => _.find(tags, { 'id': tagID }))
  }))
  const padTimeString = (time) => {
    const pad = "00" + time
    return pad.substring(pad.length-2, pad.length)
  }
  return (
    <Screen.Screen>
      <Screen.Header title={Dictionary.HOME_SCREEN.HEADER} />
      <Screen.Body>
        <View style={Styles.welcome.wrapper}>
          <Text style={Styles.welcome.greeting}>{Dictionary.HOME_SCREEN.GREETING}</Text>
          <Text style={Styles.welcome.sentence}>{Dictionary.HOME_SCREEN.SENTENCE}</Text>
        </View>
        <View style={Styles.timer.wrapper}>
          <View style={Styles.timer.rightSide.wrapper}>
            <View style={Styles.timer.rightSide.headerWrapper} >
              <Text style={Styles.timer.rightSide.headerText}>{Dictionary.HOME_SCREEN.TIMER.TITLE}</Text>
              <Switch
                style={Styles.timer.rightSide.switch}
                trackColor={{ false: Colors.GRAY, true: Colors.PRIMARY }}
                thumbColor={Colors.LIGHT_GRAY}
                ios_backgroundColor="#3e3e3e"
                onValueChange={() => setDailyPhraseEnabled(!dailyPhraseEnabled)}
                value={dailyPhraseEnabled}
              />
            </View>
            <Text style={Styles.timer.rightSide.contentText}>{Dictionary.HOME_SCREEN.TIMER.CONTENT}</Text>
          </View>
          
          <TouchableOpacity style={Styles.timer.leftSide.wrapper} onPress={() => setDatePickerVisibility(true)}>
              <Text style={Styles.timer.leftSide.digitsText}>{padTimeString(notificationTime.getHours())}</Text>
              <Text style={Styles.timer.leftSide.colon}>:</Text>
              <Text style={Styles.timer.leftSide.digitsText}>{padTimeString(notificationTime.getMinutes().toString())}</Text>
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
            item={enhancedItems[0]}
            customHeader={Dictionary.HOME_SCREEN.RANDOM_ITEM.TITLE}
          />
        </View>
      </Screen.Body>
    </Screen.Screen>
  )
}

export default HomeScreen