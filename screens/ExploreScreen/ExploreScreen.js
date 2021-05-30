import React, { useState, useEffect } from 'react';
import { View, TextInput, Image, Text } from 'react-native';
import _ from 'lodash'

import * as DB from '../../DB'
import Dictionary from '../../constants/dictionary'
import Colors from '../../constants/colors'
import Styles from './styles'
import * as Screen from '../Screen'
import TagsGroup from '../../components/TagsGroup/TagsGroup'
import CardsList from '../../components/CardsList/CardsList'

const searchIcon = require('../../icons/search.png')
const ExploreScreen = () => {
  const [tags, setTags] = useState(DB.getTags())
  const [selectedTagsIDs, setSelectedTagsIDs] = useState(DB.getDefaultTagsIDs())
  const [items, setItems] = useState(null)

  const handleTagPress = (tagID) => {
    if (_.includes(selectedTagsIDs, tagID)) {
      const updatedTags = _.filter(selectedTagsIDs, id => id !== tagID)
      console.log('updatedTags', updatedTags)
      setSelectedTagsIDs(updatedTags)
    } else {
      setSelectedTagsIDs([...selectedTagsIDs, tagID])
    }
  }

  useEffect(() => {
    const allItems = DB.getItems()
    const updatedItems = _.filter(allItems, item => _.size(_.intersection(selectedTagsIDs, item.tags)) > 0)
    console.log(selectedTagsIDs, updatedItems.length)
    setItems(updatedItems)
  }, [selectedTagsIDs])
  return (
    <Screen.Screen>
      <Screen.Header title={Dictionary.EXPLORE_SCREEN.HEADER}>
        <View style={Styles.searchSection.wrapper}>
          <View style={Styles.searchSection.searchLine.wrapper}>
            <TextInput
              style={Styles.searchSection.searchLine.textInput}
              placeholder={Dictionary.EXPLORE_SCREEN.SEARCH_SECTION.SEARCH_INPUT_PLACEHOLDER}
              placeholderTextColor={Colors.PRIMARY_LIGHT}
            />
            <Image style={Styles.searchSection.searchLine.icon} source={searchIcon} />
          </View>
          <View style={Styles.searchSection.collections.wrapper}>
            <Text style={Styles.searchSection.collections.collectionName(false)}>כל הנושאים</Text>
            <Text style={Styles.searchSection.collections.collectionName(false)}> | </Text>
            <Text style={Styles.searchSection.collections.collectionName(true)}>נושאים פופולריים</Text>
          </View>
          <View style={Styles.searchSection.results.wrapper}>
            <TagsGroup
              tags={tags}
              selectedTagsIDs={[]}
              handleTagPress={handleTagPress}
            />
          </View>
        </View>
      </Screen.Header>
      <Screen.Body>
        <View style={Styles.selectedTags}>
          <TagsGroup
            tags={_.filter(tags, tag => _.includes(selectedTagsIDs, tag.id))}
            selectedTagsIDs={selectedTagsIDs}
            handleTagPress={handleTagPress}
          />
        </View>
        <View style={Styles.itemsList}>
          <CardsList items={items} />
        </View>
      </Screen.Body>
    </Screen.Screen>
  );
}

export default ExploreScreen