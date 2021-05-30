import { StyleSheet } from 'react-native'
import Colors from '../../constants/colors'
import Styles from '../../constants/styles'

export default {
    searchSection: {
        wrapper: StyleSheet.flatten({
            backgroundColor: Colors.PRIMARY,
        }),
        searchLine: StyleSheet.create({
            wrapper: {
                padding: 5,
                paddingLeft: 15,
                paddingRight: 15,
                flexDirection: 'row'
            },
            icon: {
                height: 25,
                width: 25,
                tintColor: Colors.PRIMARY_LIGHT
            },
            textInput: {
                ...Styles.content,
                flex: 1,
                paddingRight: 5,
                color: Colors.WHITE,
                borderBottomWidth: 1,
                borderBottomColor: Colors.WHITE
            },
        }),
        results: StyleSheet.create({
            wrapper: {
                padding: 5,
            }
        }),
    },
    list: {
        wrapper: StyleSheet.flatten({
            padding: 2,
        }),
    },
    selectedTags: StyleSheet.flatten({
        marginBottom: 5,
    }),
    itemsList: StyleSheet.flatten({
        //padding: 3,
    }),
}