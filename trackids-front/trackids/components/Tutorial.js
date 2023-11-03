import React, { useState, useRef } from "react";
import { View, StyleSheet, FlatList, Animated } from 'react-native';
import TutorialItem from "./TutorialItem";
import slides from "../assets/slides";

export default Tutorial = () => {
    return (
        <View style={styles.container}>
            <FlatList
                data={slides}
                renderItem={({ item }) => <TutorialItem item={item} />}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
    },
});