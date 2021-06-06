import React, { useState, useRef, useEffect } from 'react'
import { Text, View, TouchableOpacity, Image, ImageBackground } from 'react-native'
import Collapsible from 'react-native-collapsible'

import _ from 'lodash'

import isDefinedAndNotEmpty from '../../utils'
import Dictionary from '../../constants/dictionary'
import Colors from '../../constants/colors'
import Icons from '../../icons/icons'
import Styles from './styles'

import Loading from '../Loading/Loading'
import Popup from '../Popup/Popup'

const Card = props => {
  const { item, navigation, customHeader, handleRefresh, listRef} = props
  const [showInfo, setShowInfo] = useState(false)
  const [isLoadingImage, setIsLoadingImage] = useState(true)
  const [popupContent, setPopupContent] = useState(null)
  useEffect(() => {
    setShowInfo(false)
    //setIsLoadingImage(true)
  }, [item])
  

  const handleShowInfo = () => {
    setShowInfo(!showInfo)
    listRef?.current?.scrollToItem({ item })
  }
  const tagNamesString = _.join(item.tagNames, ' | ')
  const sourceInfoString = isDefinedAndNotEmpty(item.source) ? item.source : (Dictionary.CARD.SOURCE + ': ' + 'לא ידוע')
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
        <View style={Styles.body}>
          {isLoadingImage && <Loading /> }
          <ImageBackground
            onLoadEnd={() => setIsLoadingImage(false)}
            source={{ uri: item.image}}
            style={{
              position: 'absolute',
              width: '100%',
              height: '100%',
              resizeMode: "cover",
            }}
            imageStyle={{
              opacity: 0.3
            }}
          >
            <View style={{
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              height: 200,
            }}>
            <View>
              <Text adjustsFontSizeToFit style={Styles.bodyText}>
                "{item.content}"
              </Text>
            </View>
            <View>
              <Text adjustsFontSizeToFit numberOfLines={2} style={[Styles.bodySourceText, { maxHeight: 50}]}>
                {sourceInfoString}
              </Text>
            </View>
            </View>
          </ImageBackground>
        </View>
      </TouchableOpacity>
      <Collapsible collapsed={!showInfo}>
        <View style={Styles.collapsible}>
            { isDefinedAndNotEmpty(item.explanation) && <Text style={Styles.collapsibleText}>{Dictionary.CARD.EXPLANATION}: {item.explanation}</Text> }
            { isDefinedAndNotEmpty(item.source) && <Text style={Styles.collapsibleText}>{Dictionary.CARD.SOURCE}: {item.source}</Text> }
            { isDefinedAndNotEmpty(item.example) && <Text style={Styles.collapsibleText}>{Dictionary.CARD.EXAMPLE}: {item.example}</Text> }
        </View>
        <View style={Styles.collapsibleFooter}>
          <TouchableOpacity onPress={() => {
            navigation.jumpTo(Dictionary.EXPORT_SCREEN.NAME, { item })
          }}>
            <Text style={Styles.collapsibleFooterText}>שתף פתגם זה</Text>
          </TouchableOpacity>
        </View>
      </Collapsible>
    </View>
  )
}

export default Card