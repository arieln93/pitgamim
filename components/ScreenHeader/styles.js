import { StyleSheet } from 'react-native'
import Colors from '../../constants/colors'
import Styles from '../../constants/styles'

export default StyleSheet.create({
    header: {
        height: 100,
        backgroundColor: Colors.PRIMARY,
        justifyContent: 'flex-end',
        alignItems: 'center'
    },
    headerTitle: {
        ...Styles.secondaryTitle,
        margin: 10,
        color: Colors.WHITE,
    }
})