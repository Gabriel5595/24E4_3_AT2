import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";

const ImageCard = ({ item, navigation }) => {
    const imageLink = item.links && item.links[0] ? item.links[0].href : null;

    if (!imageLink) {
        return null;
    }

    return (
        <TouchableOpacity
            onPress={() =>
                navigation.navigate("ImageDetailScreen", {
                    image: imageLink,
                    title: item.data[0]?.title || "Título não disponível",
                    description: item.data[0]?.description || "Descrição não disponível",
                })
            }
        >
            <View style={styles.card}>
                <Image source={{ uri: imageLink }} style={styles.image} />
                <Text style={styles.title}>{item.data[0]?.title || "Sem título"}</Text>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    card: {
        marginBottom: 16,
    },
    image: {
        width: "100%",
        height: 200,
        borderRadius: 8,
    },
    title: {
        marginTop: 8,
        fontSize: 16,
        fontWeight: "bold",
    },
});

export default ImageCard;
