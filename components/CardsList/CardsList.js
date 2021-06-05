import React, { forwardRef } from 'react'
import { FlatList, View } from 'react-native'
import Card from '../Card/Card'
import Styles from './styles'

const CardsList = (props, ref) => {
  const { items, navigation} = props
  return (
    <FlatList
      ref={ref}
      style={Styles.flatList}
      data={items}
      ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
      renderItem={({item}) => (
        <Card
          item={item}
          navigation={navigation}
        />)}
    />
  )
}

export default forwardRef(CardsList)