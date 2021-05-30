import { StyleSheet } from 'react-native'
import Colors from '../../constants/colors'
import Styles from '../../constants/styles'

export default StyleSheet.create({
    tagWrapper: (isSelected) => ({
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: 14,
        paddingRight: 14,
        padding: 4,
        borderRadius: 20,
        backgroundColor: isSelected ? Colors.PRIMARY : Colors.PRIMARY_LIGHT,
    }),
    cancelIcon: {
        width: 15,
        height: 15,
        marginLeft: 7,
    },
    tagContent: {
        ...Styles.metadata,
        color: Colors.WHITE,
    },
    flatList : {
        flexGrow: 0,
        margin: 2,
    }
})