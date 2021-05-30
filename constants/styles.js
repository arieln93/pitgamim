import { StyleSheet } from 'react-native'
import Colors from './colors'

export default {
    screen: StyleSheet.create({
        wrapper: {
            flex: 1,
            flexDirection: 'column',
            backgroundColor: Colors.SECONDARY,
        },
        header: {
        },
        body: {
            flex: 1,
            padding: 10,
        }
    }),
    mainTitle: {
        //fontFamily: 'Heebo',
        fontStyle: 'normal',
        fontWeight: '700',
        fontSize: 32,
        lineHeight: 47,
        letterSpacing: -0.3,
    },
    secondaryTitle: {
        //fontFamily: 'Heebo',
        fontStyle: 'normal',
        fontWeight: '700',
        fontSize: 21,
        lineHeight: 35,
        letterSpacing: -0.3,
    },
    lightTitle: {
        //fontFamily: 'Heebo',
        fontStyle: 'normal',
        fontWeight: '400',
        fontSize: 21,
        lineHeight: 35,
        letterSpacing: -0.3,
    },
    metadata: {
        //fontFamily: 'Heebo',
        fontStyle: 'normal',
        fontWeight: '500',
        fontSize: 15,
        lineHeight: 22,
        letterSpacing: -0.3,
    },
    content: {
        //fontFamily: 'Heebo',
        fontStyle: 'normal',
        fontWeight: '400',
        fontSize: 17,
        lineHeight: 25,
        letterSpacing: -0.3,
    }
}