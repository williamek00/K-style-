import { View, StyleSheet, Text, ScrollView, TouchableOpacity, Image, Animated } from 'react-native';
import icon from '../icon2.png'
import { useEffect, useRef } from 'react';
import { useNavigation } from '@react-navigation/native';

export default function Welcome() {
    const fadeAnim = useRef(new Animated.Value(0)).current;
    const translateYAnim = useRef(new Animated.Value(-100)).current;
    const rotateAnim = useRef(new Animated.Value(0)).current;
    const navigation = useNavigation()
    useEffect(() => {
        const fadeInAnimation = Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 2000,
            useNativeDriver: true,
        });

        const translateYAnimation = Animated.timing(translateYAnim, {
            toValue: 0,
            duration: 500,
            useNativeDriver: true,
        });

        const rotateAnimation = Animated.timing(rotateAnim, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: true,
        });

        Animated.parallel([fadeInAnimation, translateYAnimation, rotateAnimation]).start();
        setTimeout(() => {
            navigation.replace('Weather App')
        }, 2000)

    }, []);

    const rotateInterpolation = rotateAnim.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '360deg'],
    });

    return (
        <View style={styles.container}>
            <Animated.View
                style={[styles.imgContainer, { transform: [{ translateY: translateYAnim }] }]}
            >
                <Animated.Image source={icon} style={[styles.img, { transform: [{ rotate: rotateInterpolation }] }]} />
            </Animated.View>
            <Animated.Text style={[styles.weatherText, { opacity: fadeAnim }]}>
                Weather App
            </Animated.Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#4995ed'
    },
    weatherText: {
        fontSize: 40
    },
    imgContainer: {
        position: 'absolute',
        right: 40,
        bottom: 345
    },
    img: {
        width: 80,
        height: 80
    }
})