import React, { useState, useEffect, useRef } from 'react';
import { View } from 'react-native';
import _ from 'lodash'
import * as DB from '../../DB'

import Styles from './styles'
import Dictionary from '../../constants/dictionary'
import CardsList from '../../components/CardsList/CardsList'
import Loading from '../../components/Loading/Loading'
import * as Screen from '../Screen'

const FavoritesScreen = ({ navigation, route }) => {
  const [items, setItems] = useState(undefined)
  const cardsListRef = useRef(null);
  const loadFavorites = () => DB.getFavoriteItems().then((favoriteItems) => setItems(favoriteItems))
  useEffect(() => {
    loadFavorites()
  }, [])
  useEffect(() => {
    const unsubscribe = navigation.addListener('tabPress', e => {
      loadFavorites()
    })
    return unsubscribe;
  }, [navigation]);
  return (
    <Screen.Screen>
      <Screen.Header title={Dictionary.FAVORITES_SCREEN.HEADER} />
      <Screen.Body>
        { items
          ? <View style={Styles.itemsList}>
              <CardsList ref={cardsListRef} items={items} navigation={navigation} />
            </View>
          : <Loading />
        }
      </Screen.Body>
    </Screen.Screen>
  )
}

export default FavoritesScreen