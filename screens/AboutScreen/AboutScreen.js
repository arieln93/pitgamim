import React from 'react';
import { Text, View, ScrollView, Image } from 'react-native';
import _ from 'lodash'

import Styles from './styles'
import Dictionary from '../../constants/dictionary'
import Icons from '../../icons/icons'

import * as Screen from '../Screen'

const AboutScreen = ({ navigation, route }) => {
  return (
    <Screen.Screen>
      <Screen.Header title={Dictionary.ABOUT_SCREEN.HEADER} />
        <Screen.Body>
          <ScrollView style={Styles.wrapper}>
            <Text style={Styles.title}>{Dictionary.ABOUT_SCREEN.PAGE_TITLE}</Text>
            <Text style={Styles.content}>{Dictionary.ABOUT_SCREEN.PAGE_CONTENT}</Text>
            <Text style={Styles.contactUs.title}>בברכה, אריאל ואלון.</Text>
          </ScrollView>
          <View style={Styles.contactUs.wrapper}>
            <View style={Styles.contactUs.buttons.wrapper}>            
              <View style={Styles.contactUs.buttons.buttonWrapper}>
                <Image style={Styles.contactUs.buttons.buttonIcon} source={Icons.email} />
              </View>
              <Text style={Styles.contactUs.title}>pitgamimproject@gmail.com</Text>
            </View>
          </View>
        </Screen.Body>
    </Screen.Screen>
  )
}

export default AboutScreen