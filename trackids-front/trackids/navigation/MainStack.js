import React, { useState } from 'react';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import Home from '../screens/Home';
import Recording from '../screens/Recording';
import Tracklist from '../screens/Tracklist';
import YouTubeSearch from '../screens/YouTubeSearch';
import YouTubeTutorial from '../screens/YouTubeTutorial';

const Stack = createNativeStackNavigator()

const MainStack = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name='Home' component={Home} />
                <Stack.Screen name='Recording' component={Recording} />
                <Stack.Screen name='Tracklist' component={Tracklist} />
                <Stack.Screen name='YouTubeSearch' component={YouTubeSearch} />
                <Stack.Screen name='YouTubeTutorial' component={YouTubeTutorial} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default MainStack