import { StyleSheet } from 'react-native'
import Colors from '../../constants/colors'
import Styles from '../../constants/styles'

export default StyleSheet.create({
    box: {
        flexDirection: 'column',
        backgroundColor: Colors.WHITE,
        height: 300,
    },
    header: {
        height: 45,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        padding: 5
    },
    headerText: {
        flex: 1,
        ...Styles.metadata,
        fontWeight: 'bold',
        color: Colors.PRIMARY
    },
    customHeaderText: {
        ...Styles.secondaryTitle,
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
        color: Colors.BLACK,
    },
    footer: {
        height: 55,
    },
    footerText: {
        ...Styles.content,
        padding: 5,
    }
})