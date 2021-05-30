import { BackHandler, StyleSheet } from 'react-native'
import Colors from '../../constants/colors'
import Styles from '../../constants/styles'

export default StyleSheet.create({
    tabBar: {
        height: '10%',
    },
    icon: focused => ({
        width: 40,
        height: 40,
        tintColor: focused ? Colors.PRIMARY : Colors.PRIMARY
    }),
    title: focused => ({
        fontSize: 12,
        fontWeight: focused ? '700' : '600',
        color: focused ? Colors.PRIMARY : Colors.GRAY
    })
})