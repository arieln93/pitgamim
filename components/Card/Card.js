import React, { useState, useRef, useEffect } from 'react'
import { Text, View, TouchableOpacity, Animated, Image, ImageBackground, ScrollView } from 'react-native'
import _ from 'lodash'

import isDefinedAndNotEmpty from '../../utils'
import Dictionary from '../../constants/dictionary'
import Colors from '../../constants/colors'
import Icons from '../../icons/icons'
import Styles from './styles'

import Loading from '../Loading/Loading'
import Popup from '../Popup/Popup'

const Card = props => {
  const { item, navigation, customHeader, handleRefresh } = props
  const [showInfo, setShowInfo] = useState(false)
  const [isLoadingImage, setIsLoadingImage] = useState(true)
  const [popupContent, setPopupContent] = useState(null)
  useEffect(() => {
    setShowInfo(false)
    //setIsLoadingImage(true)
  }, [item])
  const heightAnim = useRef(new Animated.Value(200)).current;
  const imageOpacityAnim = useRef(new Animated.Value(0.3)).current;
  const fadeOutAnim = useRef(new Animated.Value(1)).current;
  const fadeInAnim = useRef(new Animated.Value(0)).current;
  const grow = () => {
    Animated.timing(heightAnim, {
      toValue: 255,
      duration: 300,
      useNativeDriver: false
    }).start();
    Animated.timing(imageOpacityAnim, {
      toValue: 0.2,
      duration: 300,
       useNativeDriver: true
    }).start();
    Animated.timing(fadeOutAnim, {
      toValue: 0,
      duration: 300,
       useNativeDriver: true
    }).start();
    Animated.timing(fadeInAnim, {
      toValue: 1,
      duration: 300,
       useNativeDriver: true
    }).start();
  };

  const shrink = () => {
    Animated.timing(heightAnim, {
      toValue: 200,
      duration: 300,
       useNativeDriver: false
    }).start();
    Animated.timing(imageOpacityAnim, {
      toValue: 0.4,
      duration: 300,
       useNativeDriver: true
    }).start();
    Animated.timing(fadeOutAnim, {
      toValue: 1,
      duration: 300,
       useNativeDriver: true
    }).start();
    Animated.timing(fadeInAnim, {
      toValue: 0,
      duration: 300,
       useNativeDriver: true
    }).start();
  };

  const handleShowInfo = () => {
    setShowInfo(!showInfo)
    !showInfo && grow()
    showInfo && shrink()
  }
  const tagNamesString = _.join(item.tagNames, ' | ')
  const sourceInfoString = isDefinedAndNotEmpty(item.source) ? item.source : (Dictionary.CARD.SOURCE + ': ' + 'לא ידוע')
  const infoString = (isDefinedAndNotEmpty(item.explanation) ? (Dictionary.CARD.EXPLANATION + ': ' + item.explanation + '\n') : '')
    + (isDefinedAndNotEmpty(item.source) ? (Dictionary.CARD.SOURCE + ': ' + item.source + '\n') : '')
    + (isDefinedAndNotEmpty(item.example) ? (Dictionary.CARD.EXAMPLE + ': ' + item.example) : '' )
  const cardHeader = customHeader
    ? <TouchableOpacity style={Styles.customHeaderWrapper} onPress={handleRefresh}>
        <Text style={Styles.customHeaderText} numberOfLines={1}>
          {customHeader}
        </Text>
        <View style={{ marginLeft: 5 }}>
          <Image style={[Styles.headerIcon(true), { tintColor: Colors.PRIMARY }]} source={Icons.refresh} />
        </View>
      </TouchableOpacity>
    : <Text style={Styles.headerText} numberOfLines={1}>{Dictionary.CARD.TYPE[item.type]} | {tagNamesString}</Text>
  return (
    <View style={Styles.box}>
      <Popup {...popupContent} />
      <View style={Styles.header}>
        <TouchableOpacity onPress={() => setPopupContent({content: "פתגם נשמר למועדפים", timeStamp: Date() })}>
          <Image style={Styles.headerIcon(item.isFavorite)} source={Icons.favorite} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => {
          navigation.jumpTo(Dictionary.EXPORT_SCREEN.NAME, { item })
        }}>
          <Image style={Styles.headerIcon(false)} source={Icons.share} />
        </TouchableOpacity>
        <TouchableOpacity onPress={handleShowInfo}>
          <Image style={Styles.headerIcon(showInfo)} source={Icons.info} />
        </TouchableOpacity>
        {cardHeader}
      </View>
      <TouchableOpacity onPress={handleShowInfo}>
        <Animated.View style={[Styles.body, { height: heightAnim }]}>
          {isLoadingImage && <Loading /> }
          <ImageBackground
            onLoadEnd={() => setIsLoadingImage(false)}
            source={{ uri: item.image}}
            style={{
              position: 'absolute',
              width: '100%',
              height: '100%',
              resizeMode: "cover"
            }}
            imageStyle={{
              opacity: 0.3
            }}
          >
            <ScrollView
              contentContainerStyle={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
                <Text style={Styles.bodyText}>"{item.content}"</Text>
                { showInfo
                  ? <Text style={Styles.footerText}>{infoString}</Text>
                  : <Text style={Styles.footerText}>{sourceInfoString}</Text>
                }
            </ScrollView>
          </ImageBackground>
        </Animated.View>
      </TouchableOpacity>
    </View>
  )
}

export default Card