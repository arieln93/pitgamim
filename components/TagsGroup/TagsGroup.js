import React, { useState } from 'react'
import { Text, View, TouchableOpacity, FlatList, Image } from 'react-native'
import _ from 'lodash'
import Styles from './styles'

const cancelSelectionIcon = require('./icon_cancel_selection.png')

const Tag = props => {
  const { content, isSelected, handleTagPress } = props
  return (
    <TouchableOpacity style={Styles.tagWrapper(isSelected)} onPress={handleTagPress}>
      <Text style={Styles.tagContent}>
        {content}
      </Text>
      { isSelected && <Image style={Styles.cancelIcon} source={cancelSelectionIcon} /> }
    </TouchableOpacity>
  )
}
const TagsGroup = props => {
  const { tags, selectedTagsIDs, handleTagPress, wrapItems } = props
  const sortedBySelected = _.orderBy(tags, item => _.includes(selectedTagsIDs, item.id), 'desc')
  if (wrapItems) {
    return (
      <View
        style={{
          flexGrow: 0,
          flexWrap: 'wrap',
          flexDirection: 'row',
          justifyContent: 'flex-end',
        }}
      >
        { tags.map(item => (
          <View style={{ margin: 5 }}>
            <Tag
              key={item.id}
              content={item.name}
              isSelected={_.includes(selectedTagsIDs, item.id)}
              handleTagPress={() => handleTagPress(item.id)}
            />
          </View>
        ))}
      </View>
    )
  }
  return (
    <FlatList
      horizontal={true}
      inverted={true}
      showsHorizontalScrollIndicator={false}
      style={Styles.flatList}
      data={sortedBySelected}
      ItemSeparatorComponent={() => <View style={{ width: 10 }} />}
      renderItem={({item}) => (
        <Tag
          content={item.name}
          isSelected={_.includes(selectedTagsIDs, item.id)}
          handleTagPress={() => handleTagPress(item.id)}
        />)}
    />
  )
}

export default TagsGroup