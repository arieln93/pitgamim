import React from 'react';
import { ActivityIndicator, View, Text } from 'react-native';
 
import Styles from './styles'
import Colors from '../../constants/colors'
import Icons from '../../icons/icons'

const Loading = props => {
  return (
    <View style={Styles.wrapper}>
      <ActivityIndicator size="large" color={Colors.PRIMARY} />
    </View>
  )
}

export default Loading