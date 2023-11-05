import React from "react";
import { View, StyleSheet, Image, Text, useWindowDimensions } from 'react-native';

const TutorialItem = ({ item }) => {

    const { width } = useWindowDimensions();

    return (
        <View style={[styles.container, { width }]}>
            <Image source={item.image} style={[styles.image, { width, resizeMode: 'contain' }]} />
            <View style={{ flex: 0.3 }}>
                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.description}>{item.description}</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        flex: 0.7,
        justifyContent: 'center',
    },
    title: {
        fontWeight: 'bold',
        fontSize: 36,
        marginBottom: 10,
        color: '#493D8A',
        textAlign: 'center',
    },
    description: {
        fontSize: 20,
        color: '#62656B',
        textAlign: 'center',
        paddingHorizontal: 64,
    },
});

export default TutorialItem; // Exporta el componente de esta manera
