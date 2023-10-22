import React, { useState } from 'react';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import Home from '../screens/Home';
import Recording from '../screens/Recording';
import Tracklist from '../screens/Tracklist';

const Stack = createNativeStackNavigator()

const MainStack = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name='Home' component={Home} />
                <Stack.Screen name='Recording' component={Recording} />
                <Stack.Screen name='Tracklist' component={Tracklist} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default MainStack