import React from 'react'
import { View, Text } from 'react-native'
import Styles from './styles'

const ScreenHeader = props => {
    const { title } = props
    return (
        <View style={Styles.header}>
            <Text style={Styles.headerTitle} >{title}</Text>
        </View>
    )
}

export default ScreenHeader