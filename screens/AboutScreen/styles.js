import { StyleSheet } from 'react-native'
import Colors from '../../constants/colors'
import Styles from '../../constants/styles'

export default {
    wrapper: StyleSheet.flatten({
        padding: 10
    }),
    title: StyleSheet.flatten({
        ...Styles.mainTitle,
        color: Colors.PRIMARY
    }),
    content: StyleSheet.flatten({
        ...Styles.content,
        color: Colors.PRIMARY
    }),
    contactUs: {
        wrapper: StyleSheet.flatten({
            padding: 10,
            flexDirection: 'column',
            alignItems: 'center',
        }),
        title: StyleSheet.flatten({
            ...Styles.metadata,
            fontSize: 17,
            color: Colors.PRIMARY
        }),
        buttons: StyleSheet.create({
            wrapper: {
                flexDirection: 'row',
                justifyContent: 'center',
                alignContent: 'center',
                alignItems: 'center'
            },
            buttonWrapper: {
                margin: 5,
            },
            buttonIcon: {
                tintColor: Colors.PRIMARY,
                width: 50,
                height: 50,
            }
        }),

    }
}