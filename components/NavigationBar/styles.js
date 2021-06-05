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
        fontFamily: focused ? 'Heebo-SemiBold' : 'Heebo-Regular',
        fontSize: 12,
        color: focused ? Colors.PRIMARY : Colors.GRAY
    })
})