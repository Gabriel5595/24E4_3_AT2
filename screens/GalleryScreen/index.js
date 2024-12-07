import React, { useState, useEffect } from "react";
import {View,Text,TextInput,FlatList,StyleSheet,ActivityIndicator,} from "react-native";
import { fetchImages } from "../../api/nasaApi";
import ImageCard from "../../components/ImageCard";

const GalleryScreen = ({ navigation }) => {
    const [astro, setAstro] = useState("earth");
    const [images, setImages] = useState([]);
    const [loading, setLoading] = useState(false);

    const loadImages = async () => {
        setLoading(true);
        const fetchedImages = await fetchImages(astro);
        setImages(fetchedImages);
        setLoading(false);
    };

    useEffect(() => {
        loadImages();
    }, [astro]);

    const handleAstroChange = (text) => setAstro(text);

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                placeholder="Digite o nome do astro (earth, moon, sun...)"
                value={astro}
                onChangeText={handleAstroChange}
                onSubmitEditing={loadImages}
            />
            {loading ? (
                <ActivityIndicator size="large" color="#0000ff" />
            ) : (
                <FlatList
                    data={images}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item }) => (
                        <ImageCard item={item} navigation={navigation} />
                    )}
                    contentContainerStyle={styles.flatListContent}
                />
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        height: "100vh",
        backgroundColor: "#fff",
    },
    input: {
        height: 40,
        borderColor: "#ccc",
        borderWidth: 1,
        margin: 16,
        paddingHorizontal: 8,
        borderRadius: 8,
    },
    flatListContent: {
        paddingHorizontal: 16,
        paddingBottom: 16,
    },
});

export default GalleryScreen;
