import React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { Dimensions } from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome';

const NavButton = ({ navigation }) => {

    return (
        <View style={style.view}>
            <TouchableOpacity onPress={() => navigation.navigate('YouTubeSearch')}>
                <Icon name='youtube-play' size={40}/>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => navigation.navigate('Recording')}>
                <Icon name='microphone' size={40}/>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => navigation.navigate('Library')}>
                <Icon name='folder' size={40}/>
            </TouchableOpacity>
        </View>
    )
}

const style = StyleSheet.create({
    view: {
        flexDirection: "row",
        justifyContent: "space-around",
        alignContent: "center",
        width: Dimensions.get("window").width - 30,
        padding: 5,
        marginTop: 5,
        marginBottom: -30,
        backgroundColor: 'white',
        borderRadius: 45,
        borderColor: 'black',
        borderWidth: 3
    },
})

export default NavButton