import { createStackNavigator } from '@react-navigation/stack';
import DetailScreen from '../screens/DetailScreen'
import HomeScreen from '../screens/HomeScreen'
import WelcomeScreen from '../screens/WelcomeScreen'
import LoadingScreen from '../components/Loading'
const Stack = createStackNavigator();
export default function MainStackNavigator() {
    return (
        <Stack.Navigator initialRouteName="Welcome Screen" >
            <Stack.Screen name="Weather App" component={HomeScreen} options={{
                title: 'Weather App',
                headerTitleAlign: 'left',
                headerLeft: null,
                headerStyle: {
                    backgroundColor: '#4995ed',
                    shadowColor: 'black',
                    shadowOpacity: 0.7,
                    shadowOffset: {
                        width: 0,
                        height: 2,
                    },
                    shadowRadius: 4,
                    elevation: 5,
                },
                headerTintColor: 'black',
                headerTitleStyle: {
                    fontWeight: '100',
                    fontSize: 20,

                },
            }} />
            <Stack.Screen name="Weather Details" component={DetailScreen} options={{
                title: 'Weather Details',
                headerBackTitleVisible: false,
                headerTitleAlign: 'left',
                headerStyle: {
                    backgroundColor: '#4995ed',
                    shadowColor: 'black',
                    shadowOpacity: 0.7,
                    shadowOffset: {
                        width: 0,
                        height: 2,
                    },
                    shadowRadius: 4,
                    elevation: 5,
                },
                headerTintColor: 'black',
                headerTitleStyle: {
                    fontWeight: '100',
                    fontSize: 20,

                },
            }} />
            <Stack.Screen name="Welcome Screen" component={WelcomeScreen} options={{
                headerShown: false
            }} />
            <Stack.Screen name="Loading" component={LoadingScreen} options={{
                headerShown: false
            }} />
        </Stack.Navigator>
    );
};

