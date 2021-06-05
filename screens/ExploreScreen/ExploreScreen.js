import React, { useState, useEffect, useRef } from 'react';
import { View, Keyboard, ScrollView, Animated, TextInput, Image, Text, TouchableOpacity } from 'react-native';
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

const ExploreScreen = ({ navigation, route }) => {
  const [viewSearchSuggestions, setViewSearchSuggestions] = useState(false)
  const [tags, setTags] = useState(DB.getTags())
  const [userSelectedTagsIDs, setUserSelectedTagsIDs] = useState([])
  const [selectedTagsIDs, setSelectedTagsIDs] = useState([])
  const [items, setItems] = useState(null)
  const inputRef = useRef(null);
  const cardsListRef = useRef(null);
  const fadeAnim = useRef(new Animated.Value(1)).current;

  const fadeInItemsList = () => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true
    }).start();
  };
  const fadeOutItemsList = () => {
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true
    }).start();
  };

  const handleTagPress = (tagID) => {
    if (_.includes(userSelectedTagsIDs, tagID)) {
      const updatedTags = _.filter(userSelectedTagsIDs, id => id !== tagID)
      console.log('updatedTags', updatedTags)
      setUserSelectedTagsIDs(updatedTags)
    } else {
      setUserSelectedTagsIDs([...userSelectedTagsIDs, tagID])
    }
  }

  const onFinishSearching = () => {
    setViewSearchSuggestions(false)
    inputRef.current && inputRef.current.blur()
    inputRef.current && inputRef.current.clear()
    setTags(DB.getTags())
  }

  useEffect(() => {
    if (userSelectedTagsIDs.length === 0){
      setSelectedTagsIDs(DB.getDefaultTagsIDs())
    } else {
      setSelectedTagsIDs(userSelectedTagsIDs)
    }
  }, [userSelectedTagsIDs])

  useEffect(() => {
    if (selectedTagsIDs.length > 0) {
      const allItems = DB.getItems()
      const updatedItems = _.filter(allItems, item => _.size(_.intersection(selectedTagsIDs, item.tags)) > 0)
      console.log(selectedTagsIDs, updatedItems.length)
      setItems(updatedItems)
    }
    cardsListRef.current.scrollToOffset(0)
  }, [selectedTagsIDs])

  useEffect(() => {
    if (viewSearchSuggestions) {
      fadeOutItemsList()
    } else {
      fadeInItemsList()
      cardsListRef.current.scrollToOffset(0)
    }
  }, [viewSearchSuggestions])

  useEffect(() => {
    Keyboard.addListener('keyboardDidHide', onFinishSearching)
  }, [])

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
              onFocus={() => !viewSearchSuggestions && setViewSearchSuggestions(true)}
            />
            { viewSearchSuggestions
              ? <TouchableOpacity onPress={onFinishSearching}>
                  <Image style={Styles.searchSection.searchLine.icon} source={exitIcon} />
                </TouchableOpacity>
              : <TouchableOpacity onPress={() => !viewSearchSuggestions && setViewSearchSuggestions(true)}>
                  <Image style={Styles.searchSection.searchLine.icon} source={searchIcon} />
                </TouchableOpacity>
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
        { userSelectedTagsIDs.length === 0 &&
          <Animated.Text style={[Styles.popularTopics, { opacity: fadeAnim }]}>{Dictionary.EXPLORE_SCREEN.POPULAR_TOPICS}</Animated.Text>
        }
        <Animated.View style={[Styles.selectedTags, { opacity: fadeAnim }]}>
          <TagsGroup
            tags={_.filter(tags, tag => _.includes(selectedTagsIDs, tag.id))}
            selectedTagsIDs={userSelectedTagsIDs}
            handleTagPress={handleTagPress}
          />
        </Animated.View>
        <Animated.View style={[Styles.itemsList, { opacity: fadeAnim }]}>
          <CardsList
            ref={cardsListRef}
            items={items}
            navigation={navigation}
          />
        </Animated.View>
      </Screen.Body>
    </Screen.Screen>
  );
}

export default ExploreScreen