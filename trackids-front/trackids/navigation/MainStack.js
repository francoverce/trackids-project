import React, { useState, useEffect } from 'react';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import Home from '../screens/Home';
import Main from '../screens/Main';
import Login from '../screens/Login';
import Register from '../screens/Register';
import Recording from '../screens/Recording';
import Library from '../screens/Library';
import Tracklist from '../screens/Tracklist';
import YouTubeSearch from '../screens/YouTubeSearch';
import YouTubeTutorial from '../screens/YouTubeTutorial';
import { obtenerToken } from '../secureStore';

const Stack = createNativeStackNavigator()

const MainStack = () => {

    const [token, setToken] = useState(null);
    // Obtener el token al cargar el componente
    useEffect(() => {
        const obtenerYConfigurarToken = async () => {
            const tokenAlmacenado = await obtenerToken();
            setToken(tokenAlmacenado);
        };

        obtenerYConfigurarToken();
    }, []);

    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{ headerShown: false }}>
                <Stack.Screen name='Main' component={Main} />
                <Stack.Screen name='Login' component={Login} />
                <Stack.Screen name='Register' component={Register} />
                <Stack.Screen name='Home' component={Home} />
                <Stack.Screen name='Recording' component={Recording} />
                <Stack.Screen name='Library' component={Library} />
                <Stack.Screen name='Tracklist' component={Tracklist} />
                <Stack.Screen name='YouTubeSearch' component={YouTubeSearch} />
                <Stack.Screen name='YouTubeTutorial' component={YouTubeTutorial} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default MainStack