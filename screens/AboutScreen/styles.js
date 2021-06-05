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
            ...Styles.secondaryTitle,
            color: Colors.PRIMARY
        }),
        buttons: StyleSheet.create({
            wrapper: {
                flexDirection: 'row',
            },
            buttonWrapper: {
                backgroundColor: Colors.WHITE,
                shadowColor: Colors.BLACK,
                shadowOffset: {
                    width: 1,
                    height: 1
                },
                shadowOpacity: 0.8,
                shadowRadius: 2,  
                elevation: 3,
                borderRadius: 30,
                margin: 10
            },
            buttonIcon: {
                tintColor: Colors.PRIMARY,
                width: 50,
                height: 50,
            }
        }),

    }
}