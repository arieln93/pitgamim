import React, { useState, useEffect, useRef } from 'react';
import { View, ScrollView, TextInput, Image, Text, TouchableOpacity } from 'react-native';
import Collapsible from 'react-native-collapsible'
import _ from 'lodash'

import * as DB from '../../DB'
import Dictionary from '../../constants/dictionary'
import Colors from '../../constants/colors'
import Styles from './styles'
import * as Screen from '../Screen'
import TagsGroup from '../../components/TagsGroup/TagsGroup'
import CardsList from '../../components/CardsList/CardsList'

const searchIcon = require('../../icons/search.png')
const exitIcon = require('../../icons/exit.png')
const ExploreScreen = () => {
  const [viewSearchSuggestions, setViewSearchSuggestions] = useState(false)
  const [tags, setTags] = useState(DB.getTags())
  const [userSelectedTagsIDs, setUserSelectedTagsIDs] = useState([])
  const [selectedTagsIDs, setSelectedTagsIDs] = useState([])
  const [items, setItems] = useState(null)
  const inputRef = useRef(null);


  const handleTagPress = (tagID) => {
    console.log('p1')
    if (_.includes(userSelectedTagsIDs, tagID)) {
      const updatedTags = _.filter(userSelectedTagsIDs, id => id !== tagID)
      console.log('updatedTags', updatedTags)
      setUserSelectedTagsIDs(updatedTags)
    } else {
      setUserSelectedTagsIDs([...userSelectedTagsIDs, tagID])
    }
  }

  useEffect(() => {
    console.log('e1', userSelectedTagsIDs.length)
    if (userSelectedTagsIDs.length === 0){
      setSelectedTagsIDs(DB.getDefaultTagsIDs())
    } else {
      setSelectedTagsIDs(userSelectedTagsIDs)
    }
  }, [userSelectedTagsIDs])

  useEffect(() => {
    console.log('e2', selectedTagsIDs.length)
    if (selectedTagsIDs.length > 0) {
      const allItems = DB.getItems()
      const updatedItems = _.filter(allItems, item => _.size(_.intersection(selectedTagsIDs, item.tags)) > 0)
      console.log(selectedTagsIDs, updatedItems.length)
      setItems(updatedItems)
    }
  }, [selectedTagsIDs])

  return (
    <Screen.Screen>
      <Screen.Header title={Dictionary.EXPLORE_SCREEN.HEADER}>
        <View style={Styles.searchSection.wrapper}>
          <View style={Styles.searchSection.searchLine.wrapper}>
            <TextInput
              ref={inputRef}
              style={Styles.searchSection.searchLine.textInput}
              placeholder={Dictionary.EXPLORE_SCREEN.SEARCH_SECTION.SEARCH_INPUT_PLACEHOLDER}
              placeholderTextColor={Colors.PRIMARY_LIGHT}
              onChangeText={(value) => {
                console.log('text is', value)
                setTags(DB.getTags(value))
              }}
              onFocus={() => setViewSearchSuggestions(true)}
            />
            { viewSearchSuggestions
              ? <TouchableOpacity onPress={() => {
                  setViewSearchSuggestions(false)
                  inputRef.current.blur()
                  inputRef.current.clear()
                  setTags(DB.getTags())
                }}>
                  <Image style={Styles.searchSection.searchLine.icon} source={exitIcon} />
                </TouchableOpacity>
              : <Image style={Styles.searchSection.searchLine.icon} source={searchIcon} />
            }
          </View>
          <Collapsible collapsed={!viewSearchSuggestions}>
            <View style={Styles.searchSection.results.wrapper}>
              <View style={Styles.searchSection.collection.wrapper}>
                <Text style={Styles.searchSection.collection.collectionName(true)}>{Dictionary.EXPLORE_SCREEN.ALL_TOPICS}</Text>
              </View>
              <View style={Styles.searchSection.tags.wrapper}>
                <ScrollView
                  keyboardShouldPersistTaps={'always'}
                >
                  <TagsGroup
                    tags={tags}
                    selectedTagsIDs={userSelectedTagsIDs}
                    handleTagPress={handleTagPress}
                    wrapItems={true}
                  />
                </ScrollView>
              </View>
            </View>
          </Collapsible>
        </View>
      </Screen.Header>
      <Screen.Body>
        { !viewSearchSuggestions &&  userSelectedTagsIDs.length === 0 && <Text style={Styles.popularTopics}>{Dictionary.EXPLORE_SCREEN.POPULAR_TOPICS}</Text> }
        { !viewSearchSuggestions && 
          <View style={Styles.selectedTags}>
            <TagsGroup
              tags={_.filter(tags, tag => _.includes(selectedTagsIDs, tag.id))}
              selectedTagsIDs={userSelectedTagsIDs}
              handleTagPress={handleTagPress}
            />
          </View>
        }
        <View style={Styles.itemsList}>
          <CardsList items={items} />
        </View>
      </Screen.Body>
    </Screen.Screen>
  );
}

export default ExploreScreen