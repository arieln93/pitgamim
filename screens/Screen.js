import React from 'react';
import { View, I18nManager } from 'react-native';
try { 
  I18nManager.forceRTL(false)
  I18nManager.allowRTL(false)
}
catch (e) {
  console.log(e)
}
import Styles from '../constants/styles'

import ScreenHeader from '../components/ScreenHeader/ScreenHeader'

const Header = props => {
  const { title, children } = props
  return (
    <View style={Styles.screen.header}>
      <ScreenHeader title={title} />
      {children && children}
    </View>
  )
}

const Body = props => {
  const { children } = props
  return (
    <View style={Styles.screen.body}>
      {children}
    </View>
  )
}

const Screen = props => {
  const { children } = props
  return (
    <View style={Styles.screen.wrapper}>
      {children}
    </View>
  )
}

export {
  Screen,
  Header,
  Body,
}