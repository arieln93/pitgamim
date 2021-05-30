import React, { useState } from 'react'
import { FlatList, View } from 'react-native'
import Card from '../Card/Card'
import Styles from './styles'

const CardsList = props => {
  const { items } = props
  return (
    <FlatList
      style={Styles.flatList}
      data={items}
      ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
      renderItem={({item}) => (
        <Card
          item={item}
        />)}
    />
  )
}

export default CardsList