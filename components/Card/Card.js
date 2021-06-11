import React, { useState, useEffect } from 'react'
import { Text, View, TouchableOpacity, Image, ImageBackground, ScrollView } from 'react-native'
import Collapsible from 'react-native-collapsible'

import _ from 'lodash'

import isDefinedAndNotEmpty from '../../utils'
import Dictionary from '../../constants/dictionary'
import Colors from '../../constants/colors'
import Icons from '../../icons/icons'
import Styles from './styles'

import Loading from '../Loading/Loading'
import Popup from '../Popup/Popup'
import * as DB from '../../DB'

const Card = props => {
  const { item, navigation, customHeader, handleRefresh, listRef, notificationTrigger, onClose} = props
  const [showInfo, setShowInfo] = useState(false)
  const [isLoadingImage, setIsLoadingImage] = useState(true)
  const [popupContent, setPopupContent] = useState(null)
  const [isFavorite, setIsFavorite] = useState(null)
  const [isModalOpened, setIsModalOpened] = useState(false)
  useEffect(() => {
    setShowInfo(false)
    setIsFavorite(item.isFavorite)
  }, [item])

  useEffect(() => {
    if (notificationTrigger) {
      setIsModalOpened(true)
    }
  }, [notificationTrigger])

  const handleShowInfo = () => {
    if (customHeader) {
      setIsModalOpened(true)
    } else {
      setShowInfo(!showInfo)
      listRef?.current?.scrollToItem({ item })
    }
  }
  const tagNamesString = _.join(item.tags, ' | ')
  const sourceInfoString = isDefinedAndNotEmpty(item.source_or_related_phrase) ? item.source_or_related_phrase : (Dictionary.CARD.SOURCE + ': ' + 'לא ידוע')
  const cardHeader = customHeader
    ? <TouchableOpacity style={Styles.customHeaderWrapper} onPress={handleRefresh}>
        <Text style={Styles.customHeaderText} numberOfLines={1}>
          {customHeader}
        </Text>
        <View style={{ marginLeft: 5 }}>
          <Image style={[Styles.headerIcon(true), { tintColor: Colors.PRIMARY }]} source={Icons.refresh} />
        </View>
      </TouchableOpacity>
    : <Text style={Styles.headerText} numberOfLines={1}>{Dictionary.CARD.TYPE.QUOTE} | {tagNamesString}</Text>
  if (!isModalOpened) {
    return (
      <View style={Styles.box}>
        <Popup {...popupContent} />
        <View style={Styles.header}>
          <TouchableOpacity onPress={() => {
            DB.addToFavorites(item.id).then(resp => {
              let message
              if (resp === 'added'){
                setIsFavorite(true)
                message = Dictionary.CARD.SAVED_TO_FAVORITES
              } else {
                setIsFavorite(false)
                message = Dictionary.CARD.REMOVED_FROM_FAVORITES
              }
              setPopupContent({content: message, timeStamp: Date() })
            })
          }}>
            <Image style={Styles.headerIcon(isFavorite)} source={Icons.favorite} />
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
              style={Styles.imageBackground}
              imageStyle={{
                opacity: 0.3
              }}
            >
              <View style={Styles.imageBackgroundContent}>
              <View>
                <Text adjustsFontSizeToFit style={Styles.bodyText}>
                  "{item.phrase}"
                </Text>
              </View>
              <View>
                <Text numberOfLines={1} style={Styles.bodySourceText}>
                  {sourceInfoString}
                </Text>
              </View>
              </View>
            </ImageBackground>
          </View>
        </TouchableOpacity>
        <Collapsible collapsed={!showInfo}>
          <View style={Styles.collapsible}>
              { isDefinedAndNotEmpty(item.meaning) && <Text style={Styles.collapsibleText}>{Dictionary.CARD.EXPLANATION}: {item.meaning}</Text> }
              { isDefinedAndNotEmpty(item.source_or_related_phrase) && <Text style={Styles.collapsibleText}>{Dictionary.CARD.SOURCE}: {item.source_or_related_phrase}</Text> }
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
  } else {
    return (
      <View style={Styles.phraseModalWrapper}>
        <Popup {...popupContent} />
        <View style={[Styles.header, {marginBottom: 15}]}>
          <TouchableOpacity onPress={() => {
            DB.addToFavorites(item.id).then(resp => {
              let message
              if (resp === 'added'){
                setIsFavorite(true)
                message = Dictionary.CARD.SAVED_TO_FAVORITES
              } else {
                setIsFavorite(false)
                message = Dictionary.CARD.REMOVED_FROM_FAVORITES
              }
              setPopupContent({content: message, timeStamp: Date() })
            })
          }}>
            <Image style={[Styles.headerIcon(isFavorite), { width: 25, height: 25 }]} source={Icons.favorite} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => {
            navigation.jumpTo(Dictionary.EXPORT_SCREEN.NAME, { item })
          }}>
            <Image style={[Styles.headerIcon(false), { width: 25, height: 25 }]} source={Icons.share} />
          </TouchableOpacity>
          <Text style={[Styles.customHeaderText, {fontSize: 25}]}>
            {customHeader}
          </Text>
        </View>
        <View style={Styles.body}>
          {isLoadingImage && <Loading /> }
          <ImageBackground
            onLoadEnd={() => setIsLoadingImage(false)}
            source={{ uri: item.image}}
            style={Styles.imageBackground}
            imageStyle={{
              opacity: 0.3
            }}
          >
            <View style={Styles.imageBackgroundContent}>
            <View>
              <Text adjustsFontSizeToFit style={Styles.bodyText}>
                "{item.phrase}"
              </Text>
            </View>
            </View>
          </ImageBackground>
        </View>
        <View style={{ marginTop: 20, marginBottom: 20, height: 150}}>
          <ScrollView style={{ padding: 5}}>
            { isDefinedAndNotEmpty(item.meaning) && <Text style={Styles.collapsibleText}>{Dictionary.CARD.EXPLANATION}: {item.meaning}</Text> }
            { isDefinedAndNotEmpty(item.source_or_related_phrase) && <Text style={Styles.collapsibleText}>{Dictionary.CARD.SOURCE}: {item.source_or_related_phrase}</Text> }
            { isDefinedAndNotEmpty(item.example) && <Text style={Styles.collapsibleText}>{Dictionary.CARD.EXAMPLE}: {item.example}</Text> }
          </ScrollView>
        </View>
        <View style={[Styles.collapsibleFooter]}>
            <TouchableOpacity onPress={() => {
              setIsModalOpened(false)
              if (onClose) {
                onClose()
              }
            }}>
              <Text style={Styles.collapsibleCloseText}>סגור</Text>
            </TouchableOpacity>
        </View>
      </View>
    )
  }
}

export default Card