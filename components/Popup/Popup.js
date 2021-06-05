import React, { useState, useRef, useEffect } from 'react'
import { Text, Animated } from 'react-native'
import Styles from './styles'

const Popup = props => {
    const { content, timeStamp } = props
    const [active, setActive] = useState(false)
    const fadeAnim = useRef(new Animated.Value(0)).current;
    const showPopup = () => {
        Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true
        }).start(({ finished }) => {
            if (finished) {
                Animated.sequence([
                    Animated.delay(1500),
                    Animated.timing(fadeAnim, {
                        toValue: 0,
                        duration: 300,
                        useNativeDriver: true
                    })
                ]).start(({ finished }) => finished && setActive(false))
            }
        });
    };
    useEffect(() => {
        if (content?.length) {
            setActive(true)
            showPopup()
        }
    }, [timeStamp])
    if (!active) {
        return <></>
    }
    return (
        <Animated.View style={[Styles.wrapper, { opacity: fadeAnim }]}>
            <Text style={Styles.content} >{content}</Text>
        </Animated.View>
    )
}

export default Popup