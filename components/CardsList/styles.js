import { StyleSheet } from 'react-native'
import Colors from '../../constants/colors'
import Styles from '../../constants/styles'

export default StyleSheet.create({
    flatList : {
        flexGrow: 0,
        margin: 2,
    },
    noDataToDisplay: {
        ...Styles.lightTitle,
        color: Colors.PRIMARY,
        padding: 10,
        textAlign: 'center',
    }
})