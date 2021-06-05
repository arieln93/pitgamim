import React from 'react';
import { Text, View, Image } from 'react-native';
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
          <View style={Styles.wrapper}>
            <Text style={Styles.title}>{Dictionary.ABOUT_SCREEN.PAGE_TITLE}</Text>
            <Text style={Styles.content}>{Dictionary.ABOUT_SCREEN.PAGE_CONTENT}</Text>
          </View>
          <View style={Styles.contactUs.wrapper}>
            <Text style={Styles.contactUs.title}>{Dictionary.ABOUT_SCREEN.CONTACT_US}</Text>
            <View style={Styles.contactUs.buttons.wrapper}>
              <View style={Styles.contactUs.buttons.buttonWrapper}>
                <Image style={Styles.contactUs.buttons.buttonIcon} source={Icons.email} />
              </View>
              <View style={Styles.contactUs.buttons.buttonWrapper}>
                <Image style={Styles.contactUs.buttons.buttonIcon} source={Icons.phone} />
              </View>
            </View>
          </View>
        </Screen.Body>
    </Screen.Screen>
  )
}

export default AboutScreen