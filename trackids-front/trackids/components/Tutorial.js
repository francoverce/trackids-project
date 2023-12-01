import React, { useState, useRef } from "react";
import { View, StyleSheet, FlatList, TouchableOpacity, Text } from 'react-native';
import TutorialItem from "./TutorialItem";
import slides from "../assets/slides";
import { Dimensions } from "react-native";

const Tutorial = ({ navigation }) => {
    const renderItem = ({ item }) => <TutorialItem item={item} />;

    const renderFooter = () => (
        <View style={styles.container}>
            <TouchableOpacity style={styles.button} onPress={() => navigation.goBack()}>
                <Text style={styles.buttonText}>OK, VAMOS!</Text>
            </TouchableOpacity>
        </View>
    );

    return (
        <View style={styles.container}>
            <FlatList
                data={slides}
                renderItem={renderItem}
                ListFooterComponent={renderFooter}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    button: {
        backgroundColor: '#FFB633',
        borderRadius: 30,
        padding: 10,
        margin: 20,
        width: Dimensions.get("window").width - 100,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 10,
        borderWidth: 3,
        borderColor: '#22668D',
    },
    buttonText: {
        fontFamily: "FugazOne",
        fontSize: 18,
        color: 'black',
        textAlign: 'center',
    },
});

export default Tutorial; // Exporta el componente de esta manera
