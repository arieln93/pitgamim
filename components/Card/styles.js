import { StyleSheet } from 'react-native'
import Colors from '../../constants/colors'
import Styles from '../../constants/styles'

export default StyleSheet.create({
    box: {
        flexDirection: 'column',
        backgroundColor: Colors.WHITE,
        height: 245,
    },
    header: {
        height: 45,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        padding: 5
    },
    headerText: {
        ...Styles.metadata,
        flex: 1,
        paddingLeft: 10,
        color: Colors.PRIMARY
    },
    customHeaderWrapper: {
        flexDirection: 'row',
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
    customHeaderText: {
        ...Styles.secondaryTitle,
        flex: 1,
        paddingLeft: 10,
        color: Colors.PRIMARY
    },
    headerIcon: (isActive) => ({
        width: 20,
        height: 20,
        margin: 4,
        tintColor: isActive ? Colors.PRIMARY : Colors.PRIMARY_LIGHT
    }),
    body: {
        maxHeight: 200,
        justifyContent: 'center',
        alignItems: 'center',
    },
    bodyImage: {
        
    },
    bodyText: {
        ...Styles.secondaryTitle,
        textAlign: 'center',
        color: Colors.BLACK,
    },
})