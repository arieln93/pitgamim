import { StyleSheet } from 'react-native'
import Colors from '../../constants/colors'
import Styles from '../../constants/styles'

export default {
    searchSection: {
        wrapper: StyleSheet.flatten({
            padding: 15,
            backgroundColor: Colors.PRIMARY,
        }),
        searchLine: StyleSheet.create({
            wrapper: {
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
                marginTop: 10
            }
        }),
        collection: StyleSheet.create({
            wrapper: {
                marginBottom: 5,
                flexDirection: 'row',
                justifyContent: 'flex-end'
            },
            collectionName: (active) => ({
                ...Styles.lightTitle,
                color: active ? Colors.WHITE : Colors.PRIMARY_LIGHT,
            })
        }),
        tags: StyleSheet.create({
            wrapper: {
                maxHeight: 200
            }
        }),
    },
    popularTopics: StyleSheet.flatten({
        ...Styles.lightTitle,
        color: Colors.PRIMARY,
        marginBottom: 5,
    }),
    selectedTags: StyleSheet.flatten({
        marginBottom: 10,
    }),
    list: {
        wrapper: StyleSheet.flatten({
            padding: 2,
        }),
    },
    itemsList: StyleSheet.flatten({
        //padding: 3,
    }),
}