import { StyleSheet } from 'react-native'
import Colors from '../../constants/colors'
import Styles from '../../constants/styles'

export default {
    welcome: StyleSheet.create({
        wrapper: {
            height: '25%',
            justifyContent: 'center'
        },
        greeting: {
            ...Styles.mainTitle,
            color: Colors.PRIMARY
        },
        sentence: {
            ...Styles.content,
            color: Colors.PRIMARY
        },
    }),
    timer: {
        wrapper: StyleSheet.flatten({
            padding: 5,
            flexDirection: 'row',
            height: '18%',
            backgroundColor: Colors.WHITE,
            alignContent: 'space-between'
        }),
        leftSide: StyleSheet.create({
            wrapper: {
                padding: 10,
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
            },
            colon: {
                fontSize: 35,
                color: Colors.BLACK,
                padding: 2,
            },
            digitsText: {
                fontSize: 40,
                color: Colors.BLACK,
                padding: 5,
                borderRadius: 10,
                backgroundColor: Colors.SECONDARY_LIGHT,
            },
        }),
        rightSide: StyleSheet.create({
            wrapper: {
                flex: 1,
                flexDirection: 'column',
                alignContent: 'stretch',
            },
            headerWrapper: {
                flexDirection: 'row',
            },
            switch: {
                marginLeft: 10,
            },
            headerText: {
                ...Styles.secondaryTitle,
                flex: 1,
                color: Colors.PRIMARY,
            },
            contentText: {
                flex: 1,
                ...Styles.metadata,
                paddingRight: 10,
                paddingLeft: 10,
                color: Colors.BLACK
            },
        })
    },   
    random: StyleSheet.flatten({
        height: '57%',
        justifyContent: 'center',
    }),
}