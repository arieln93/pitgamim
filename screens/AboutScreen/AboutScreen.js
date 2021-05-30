import React from 'react';
import { Text, View } from 'react-native';
import _ from 'lodash'

import Styles from '../../constants/styles'
import Dictionary from '../../constants/dictionary'

import * as Screen from '../Screen'

const HomeScreen = props => {
  return (
    <Screen.Screen>
      <Screen.Header title={Dictionary.HOME_SCREEN.HEADER} />
        <Screen.Body>
          <Text style={Styles.mainTitle}>About</Text>
        </Screen.Body>
    </Screen.Screen>
  )
}

export default HomeScreen