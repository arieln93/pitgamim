import { StyleSheet } from 'react-native'
import Colors from '../../constants/colors'
import Styles from '../../constants/styles'

export default StyleSheet.create({
    wrapper: {
        position: 'absolute',
        alignSelf: 'center',
        zIndex: 1,
        bottom: '5%',
        width: '90%',
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