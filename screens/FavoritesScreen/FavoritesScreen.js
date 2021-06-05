import React, { useState, useEffect } from 'react';
import { Text, View } from 'react-native';
import _ from 'lodash'
import * as DB from '../../DB'

import Styles from './styles'
import Dictionary from '../../constants/dictionary'
import TagsGroup from '../../components/TagsGroup/TagsGroup'
import CardsList from '../../components/CardsList/CardsList'
import Loading from '../../components/Loading/Loading'
import * as Screen from '../Screen'

const HomeScreen = ({ navigation, route }) => {
  const [tags, setTags] = useState(DB.getTags())
  const [items, setItems] = useState(undefined)
  useEffect(() => {
    (async () => {
      DB.getFavoriteItems().then((favoriteItems) => setItems(favoriteItems))
    })()
  }, [])
  return (
    <Screen.Screen>
      <Screen.Header title={Dictionary.FAVORITES_SCREEN.HEADER} />
      <Screen.Body>
        { items
          ? <View style={Styles.itemsList}>
              <CardsList items={items} navigation={navigation} />
            </View>
          : <Loading />
        }
      </Screen.Body>
    </Screen.Screen>
  )
}

export default HomeScreen