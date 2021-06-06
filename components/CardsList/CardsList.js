import React, { forwardRef } from 'react'
import { FlatList, View, Text } from 'react-native'
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
      ListEmptyComponent={() => <Text style={Styles.noDataToDisplay}>אין פריטים להצגה</Text>}
      renderItem={({item}) => (
        <Card
          item={item}
          navigation={navigation}
          listRef={ref}
        />)}
    />
  )
}

export default forwardRef(CardsList)