import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, ScrollView, TouchableOpacity, Image, } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { formatTemperature, formatHomeDate } from '../helpers/detailDateFormater.js'
import Loading from '../components/Loading.jsx'
import axios from 'axios'

export default function WeatherHome() {
    const [weatherData, setWeatherData] = useState()
    const [iconWeather, setIconWeather] = useState()
    const [isLoading, setIsLoading] = useState(true)
    const API_KEY = '1fd1ee78d2d5f3ed4f8eec8d3ac71def';
    const lat = -6.302287708604747;
    const lon = 106.6541003450607;
    let navigation = useNavigation()
    const handleItemPress = (item) => {
        navigation.navigate('Weather Details', { item })
    }

    async function getWeather() {
        try {
            const response = await axios.get(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}`);
            const data = response.data;
            setWeatherData(data)
        } catch (error) {
            console.error(error);
        }
    }

    async function getWeatherIcon() {
        try {
            const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}`)
            const weatherData = response.data;
            const weatherIcon = weatherData.weather;
            setIconWeather(weatherIcon)
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getWeather()
        getWeatherIcon()
        setTimeout(() => {
            setIsLoading(false);
        }, 800);
    }, [])

    if (isLoading) {
        return (
            <Loading />
        )
    }

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <View style={styles.containerItem}>
                {weatherData &&
                    weatherData.list.map((item) => (
                        <TouchableOpacity
                            key={item.dt}
                            style={styles.item}
                            onPress={() => handleItemPress(item)}
                        >
                            <View style={styles.containerImage}>
                                <Image
                                    source={{ uri: `https://openweathermap.org/img/wn/${item.weather[0].icon}.png` }}
                                    style={{ width: 100, height: 100 }}
                                />
                            </View>
                            <View style={styles.containerDescription}>
                                <Text style={styles.dateText}>{formatHomeDate(item.dt_txt)}</Text>
                                <Text style={styles.weatherText}>{item.weather[0].main}</Text>
                                <Text style={{ paddingTop: 5, fontSize: 17 }}>Temp: {formatTemperature(item.main.temp)}&#176;C</Text>
                            </View>
                        </TouchableOpacity>
                    ))}
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        paddingHorizontal: 7,
    },
    containerItem: {
        display: 'flex',
        flexDirection: 'column',
    },
    item: {
        marginTop: 10,
        backgroundColor: '#f2f2f2',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        height: 120,
        borderRadius: 20,
        marginBottom: 3,
        backgroundColor: '#BEA493',
        shadowColor: 'black',
        shadowOpacity: 0.7,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowRadius: 4,
        elevation: 5,
    },
    title: {
        fontSize: 16,
        fontWeight: 'bold',
    },

    containerImage: {
        marginRight: 1,
    },
    containerDescription: {
        flex: 1,
    },
    dateText: {
        fontWeight: 'bold',
        fontSize: 18,
        marginBottom: 5
    },
    weatherText: {
        fontSize: 17
    },
    backgroundImage: {
        flex: 1,
        position: 'relative',
        resizeMode: 'cover',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 20
    },
});
