import { StyleSheet, Text, View, Image, Dimensions, ImageBackground } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { useState, useEffect } from 'react';
import { hourFormater, formatTemperature, formatDetailDate } from '../helpers/detailDateFormater.js'
import Cloud from './images/cloud.gif'
import Clear from './images/clear.gif'
import Rain from './images/rain.gif'
const screenHeight = Dimensions.get('window').height;
export default function Detail() {
    const route = useRoute();
    const { item } = route.params;

    let backgroundImageSource;
    if (item.weather[0].main === 'Clouds') {
        backgroundImageSource = Cloud;
    } else if (item.weather[0].main === 'Rain') {
        backgroundImageSource = Rain;
    } else if (item.weather[0].main === 'Clear') {
        backgroundImageSource = Clear;
    }
    return <>
        <ImageBackground
            source={backgroundImageSource}
            style={styles.backgroundImage}
            resizeMode="cover"
        >
            <View style={styles.container} >
                <View style={styles.containerCard} >
                    <View style={styles.dateContainer} >
                        <Text style={styles.dateText} >{formatDetailDate(item.dt_txt)}</Text>
                        <Text style={styles.hourText} >{hourFormater(item.dt_txt)}</Text>
                    </View>
                    <View style={styles.mainTempContainer} >
                        <Text style={styles.tempText} >{formatTemperature(item.main.temp)}&#176;C</Text>
                    </View>
                    <View style={styles.containerImage} >
                        <Image source={{ uri: `https://openweathermap.org/img/wn/${item.weather[0].icon}.png` }} style={{ width: 180, height: 180 }} />
                    </View>
                    <View style={styles.descriptionContainer}>
                        <Text style={styles.descriptionContainerText} >{item.weather[0].main}({item.weather[0].description})</Text>
                    </View>
                    <View style={styles.containerTemps} >
                        <Text style={styles.minTempTextDesc} > Min</Text>
                        <Text style={styles.minTempText} >{formatTemperature(item.main.temp_min)}&#176;C</Text>
                        <Text style={styles.maxTempTextDesc} > Max</Text>
                        <Text style={styles.maxTempText} >{formatTemperature(item.main.temp_max)}&#176;C</Text>
                    </View>
                </View>
            </View>
        </ImageBackground>
    </>
}
const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        display: 'flex',
        alignContent: 'center',
        alignItems: 'center',
        height: screenHeight,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    containerTemps: {
        display: 'flex',
        flexDirection: 'row',
        borderRadius: 20,
        marginVertical: 20,
        backgroundColor: '#4995ed',
        shadowColor: 'black',
        shadowOpacity: 0.7,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowRadius: 4,
        elevation: 5,
        paddingHorizontal: 10
    },
    containerTempDesc: {
        display: 'flex',
        flexDirection: 'row',
        position: 'absolute',
        bottom: 60,
    },
    containerImage: {
        marginVertical: 10
    },
    containerCard: {
        borderRadius: 20,
        paddingTop: 5,
        justifyContent: 'center',
        display: 'flex',
        alignContent: 'center',
        alignItems: 'center',
        marginBottom: 50,
        width: 350,
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
    dateText: {
        fontWeight: 'bold',
        fontSize: 25,
        textAlign: 'center',
    },
    hourText: {
        marginBottom: 60,
        fontWeight: '500',
        fontSize: 25,
        textAlign: 'center',
    },
    mainTempContainer: {
        position: 'absolute',
        bottom: 310
    },
    tempText: {
        fontSize: 25,
        fontWeight: '500',

    },
    dateContainer: {
        paddingHorizontal: 5,
        width: 350,
    },
    minTempText: {
        fontSize: 30,
    },
    maxTempText: {
        fontSize: 30,
    },
    minTempTextDesc: {
        fontSize: 20,
        marginRight: 5
    },
    maxTempTextDesc: {
        fontSize: 20,
        marginHorizontal: 5
    },
    descriptionContainerText: {
        fontSize: 20,
        fontWeight: '500',
    }
});
