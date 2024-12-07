import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";

const ImageDetailScreen = ({ route }) => {
    const { image, title, description } = route.params;

    return (
        <View style={styles.container}>
            <Image source={{ uri: image }} style={styles.image} />
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.description}>{description}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: "#fff",
    },
    image: {
        width: "100%",
        height: 300,
        borderRadius: 8,
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        marginTop: 16,
    },
    description: {
        fontSize: 16,
        marginTop: 8,
    },
});

export default ImageDetailScreen;
