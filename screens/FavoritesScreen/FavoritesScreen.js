import React, { useState } from 'react';
import { Text, View } from 'react-native';
import _ from 'lodash'
import * as DB from '../../DB'

import Styles from './styles'
import Dictionary from '../../constants/dictionary'
import TagsGroup from '../../components/TagsGroup/TagsGroup'
import CardsList from '../../components/CardsList/CardsList'
import * as Screen from '../Screen'

const HomeScreen = ({ navigation, route }) => {
  const [tags, setTags] = useState(DB.getTags())
  const [items, setItems] = useState(DB.getFavoriteItems())
  return (
    <Screen.Screen>
      <Screen.Header title={Dictionary.FAVORITES_SCREEN.HEADER} />
      <Screen.Body>
        <View style={Styles.itemsList}>
          <CardsList items={items} navigation={navigation} />
        </View>
      </Screen.Body>
    </Screen.Screen>
  )
}

export default HomeScreen