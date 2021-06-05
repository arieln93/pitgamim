import { StyleSheet } from 'react-native'
import Colors from '../../constants/colors'
import Styles from '../../constants/styles'

export default {
    filtersSection: StyleSheet.flatten({
        flexDirection: 'row',
        justifyContent: 'center'
    }),
    sliderFilter: StyleSheet.create({
        wrapper: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
        },
        slider: {
            width: '100%'
        },
    }),
    fontsFilter: {
        wrapper: StyleSheet.flatten({
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
        }),
        option: StyleSheet.create({
            wrapper: (isOptionSelected) => ({
                backgroundColor: isOptionSelected ? Colors.PRIMARY : Colors.WHITE,
                shadowColor: Colors.BLACK,
                shadowOffset: {
                    width: 1,
                    height: 1
                },
                shadowOpacity: 0.8,
                shadowRadius: 2,  
                elevation: 3,
                borderRadius: 30,
                padding: 10,
                margin: 5
            }),
            text: (isOptionSelected) => ({
                color: isOptionSelected? Colors.WHITE : Colors.PRIMARY
            })
        }),
    },
    filterButton: StyleSheet.create({
        wrapper: {
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
            padding: 10,
            margin: 5
        },
        icon: {
            tintColor: Colors.PRIMARY,
            width: 40,
            height: 40,
        },
    }),
    filter: StyleSheet.create({
        wrapper: {
            paddingRight: 20,
            paddingLeft: 20,
            paddingBottom: 10,
        },
        title: {
            ...Styles.content,
            padding: 5,
            color: Colors.PRIMARY,
        },
    }),
    filtersGroup: StyleSheet.flatten({
        marginBottom: 20
    }),
    exportSection: {
        wrapper: StyleSheet.flatten({
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
        }),
        sharingSentence: StyleSheet.create({
            wrapper: {
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center'
            },
            phrase: {
                ...Styles.secondaryTitle,
                color: Colors.PRIMARY
            },
            source: {
                ...Styles.content,
                color: Colors.PRIMARY
            },
        }),
        exportButton: StyleSheet.create({
            wrapper: {
                shadowColor: Colors.BLACK,
                shadowOffset: {
                    width: 1,
                    height: 1
                },
                shadowOpacity: 0.8,
                shadowRadius: 2,  
                elevation: 3,
                backgroundColor: Colors.PRIMARY,
                borderRadius: 50,
                padding: 15,
                margin: 5
            },
            icon: {
                tintColor: Colors.WHITE,
                width: 30,
                height: 30,
            },
        }),
    }
}