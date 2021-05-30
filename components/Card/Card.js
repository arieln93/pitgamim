import React, { useState, useRef } from 'react'
import { Text, View, TouchableOpacity, Animated, Image, ImageBackground, ScrollView } from 'react-native'
import _ from 'lodash'

import isDefinedAndNotEmpty from '../../utils'
import Dictionary from '../../constants/dictionary'
import Styles from './styles'

const favoriteIcon = require('../../icons/favorite.png')
const shareIcon = require('../../icons/share.png')
const infoIcon = require('../../icons/info.png')

const Card = props => {
  const { item, customHeader } = props
  const [showInfo, setShowInfo] = useState(false)
  const heightAnim = useRef(new Animated.Value(200)).current;
  const imageOpacityAnim = useRef(new Animated.Value(0.4)).current;
  const fadeOutAnim = useRef(new Animated.Value(1)).current;
  const fadeInAnim = useRef(new Animated.Value(0)).current;
  const grow = () => {
    Animated.timing(heightAnim, {
      toValue: 255,
      duration: 300,
    }).start();
    Animated.timing(imageOpacityAnim, {
      toValue: 0.2,
      duration: 300,
    }).start();
    Animated.timing(fadeOutAnim, {
      toValue: 0,
      duration: 300,
    }).start();
    Animated.timing(fadeInAnim, {
      toValue: 1,
      duration: 300,
    }).start();
  };

  const shrink = () => {
    Animated.timing(heightAnim, {
      toValue: 200,
      duration: 300,
    }).start();
    Animated.timing(imageOpacityAnim, {
      toValue: 0.4,
      duration: 300,
    }).start();
    Animated.timing(fadeOutAnim, {
      toValue: 1,
      duration: 300,
    }).start();
    Animated.timing(fadeInAnim, {
      toValue: 0,
      duration: 300,
    }).start();
  };


  const tagNamesString = _.join(item.tagNames, ' | ')
  const infoString = (isDefinedAndNotEmpty(item.explanation) ? (Dictionary.CARD.EXPLANATION + ': ' + item.explanation + '\n') : '')
    + (isDefinedAndNotEmpty(item.source) ? (Dictionary.CARD.SOURCE + ': ' + item.source + '\n') : '')
    + (isDefinedAndNotEmpty(item.example) ? (Dictionary.CARD.EXAMPLE + ': ' + item.example) : '' )
  console.log(customHeader)
  const cardHeader = customHeader
    ? <Text style={Styles.customHeaderText} numberOfLines={1}>{customHeader}</Text>
    : <Text style={Styles.headerText} numberOfLines={1}>{Dictionary.CARD.TYPE[item.type]} | {tagNamesString}</Text>
  return (
    <View style={Styles.box}>
      <View style={Styles.header}>
        <TouchableOpacity>
          <Image style={Styles.headerIcon(false)} source={favoriteIcon} />
        </TouchableOpacity>
        <TouchableOpacity>
          <Image style={Styles.headerIcon(false)} source={shareIcon} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => {
          setShowInfo(!showInfo)
          !showInfo && grow()
          showInfo && shrink()
        }}>
          <Image style={Styles.headerIcon(showInfo)} source={infoIcon} />
        </TouchableOpacity>
        <Text style={Styles.headerText} numberOfLines={1}>{cardHeader}</Text>
      </View>
      <Animated.View style={[Styles.body, { height: heightAnim }]}>
        <Animated.Image
          source={{ uri: item.image}}
          style={[{
            position: 'absolute',
            width: '100%',
            height: '100%',
            resizeMode: "cover",
          }, {
            opacity: imageOpacityAnim
          }
        ]} />
        <ScrollView
          style={{
          }}
          contentContainerStyle={{  
            flexGrow: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
            <Text style={Styles.bodyText}>"{item.content}"</Text>
            { showInfo && <Text style={Styles.footerText}>{infoString}</Text> }
        </ScrollView>
      </Animated.View>
      <Animated.View style={[Styles.footer, {opacity: fadeOutAnim }]}>
        <Text style={Styles.footerText} numberOfLines={2}>{infoString}</Text>
      </Animated.View>
    </View>
  )
}

export default Card