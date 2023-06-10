import { View, Image, StyleSheet, Animated } from "react-native"
import { useEffect, useRef } from "react"
import icon from '../icon2.png'
export default function Loading() {
    const rotateAnim = useRef(new Animated.Value(0)).current
    useEffect(() => {
        const rotatingUmbrella = Animated.loop(
            Animated.timing(rotateAnim, {
                toValue: 1,
                duration: 1000,
                useNativeDriver: true,
            })

        );
        rotatingUmbrella.start();
    }, [])
    const rotateInterpolation = rotateAnim.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '360deg'],
    });
    return (
        <View style={styles.container}>
            <Animated.Image
                source={icon}
                style={[styles.img, { transform: [{ rotate: rotateInterpolation }] }]}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)'
    },
    img: {
        width: 80,
        height: 80
    }
})