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
            height: '20%',
            backgroundColor: Colors.WHITE,
            alignContent: 'space-between'
        }),
        rightSide: StyleSheet.create({
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
            digitsText: (active) => ({
                fontSize: 40,
                color: active ? Colors.BLACK : Colors.MEDIUM_GRAY,
                padding: 5,
                borderRadius: 10,
                backgroundColor: Colors.SECONDARY_LIGHT,
            }),
        }),
        leftSide: StyleSheet.create({
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
        height: '55%',
        justifyContent: 'center',
    }),
    phraseModal: StyleSheet.create({
        wrapper: {
            position: 'absolute',
            alignSelf: 'center',
            zIndex: 1,
            height: '100%',
            width: '100%',
            backgroundColor: 'white',
            shadowColor: 'black',
            shadowOffset: {
                width: 1,
                height: 1
            },
            shadowOpacity: 0.8,
            shadowRadius: 2,  
            elevation: 3,
            padding: 10,
            margin: 5,
        },
        content: {
            ...Styles.content,
            textAlign: 'center',
            color: Colors.PRIMARY
        },
    })
}