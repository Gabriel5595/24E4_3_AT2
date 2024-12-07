import React, { useState, useEffect } from "react";
import { Platform, View, TextInput, ScrollView, FlatList, StyleSheet, ActivityIndicator } from "react-native";
import { fetchImages } from "../../api/nasaApi";
import ImageCard from "../../components/ImageCard";
import ProgressBar from "../../components/ProgressBar";

const GalleryScreen = ({ navigation }) => {
    const [astro, setAstro] = useState("earth");
    const [images, setImages] = useState([]);
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1);
    const [totalHits, setTotalHits] = useState(0);
    const [refreshing, setRefreshing] = useState(false);

    const loadImages = async (newPage = 1, isRefresh = false) => {
        if (loading) return;

        setLoading(true);
        try {
            const { items, totalHits } = await fetchImages(astro, newPage);
            setTotalHits(totalHits);

            if (isRefresh) {
                setImages(items);
            } else {
                setImages((prevImages) => [...prevImages, ...items]);
            }
            setPage(newPage);
        } catch (error) {
            console.error("Erro ao buscar imagens:", error);
        } finally {
            setLoading(false);
            if (isRefresh) {
                setRefreshing(false);
            }
        }
    };

    useEffect(() => {
        loadImages();
    }, [astro]);

    const handleAstroChange = (text) => setAstro(text);

    const handleLoadMore = () => {
        if (images.length >= totalHits) return;
        loadImages(page + 1);
    };

    const handleRefresh = () => {
        setRefreshing(true);
        setImages([]);
        loadImages(1, true);
    };

    const renderImageCard = ({ item }) => {
        return <ImageCard item={item} navigation={navigation} />;
    };

    const progress = totalHits ? Math.min((images.length / totalHits) * 100, 100) : 0;

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                placeholder="Digite o nome do astro (earth, moon, sun...)"
                value={astro}
                onChangeText={handleAstroChange}
                onSubmitEditing={() => {
                    setImages([]);
                    setPage(1);
                    loadImages(1);
                }}
            />

            <ProgressBar progress={Math.round(progress)} />

            {loading && page === 1 ? (
                <View style={styles.loaderContainer}>
                    <ActivityIndicator size="large" color="#0000ff" />
                </View>
            ) : (
                <>
                    {Platform.OS === "web" ? (
                        <ScrollView
                            contentContainerStyle={styles.scrollContainer}
                            onScroll={({ nativeEvent }) => {
                                const { layoutMeasurement, contentOffset, contentSize } = nativeEvent;
                                const isEndReached =
                                    layoutMeasurement.height + contentOffset.y >= contentSize.height - 20;
                                if (isEndReached && images.length < totalHits && !loading) {
                                    handleLoadMore();
                                }
                            }}
                            scrollEventThrottle={400}
                        >
                            {images.map((item, index) => (
                                <ImageCard key={index} item={item} navigation={navigation} />
                            ))}
                            {loading && <ActivityIndicator size="large" color="#0000ff" style={styles.loader} />}
                        </ScrollView>
                    ) : (
                        <FlatList
                            data={images}
                            keyExtractor={(item, index) => index.toString()}
                            renderItem={renderImageCard}
                            contentContainerStyle={styles.flatListContent}
                            onEndReached={handleLoadMore}
                            onEndReachedThreshold={0.5}
                            ListFooterComponent={loading && <ActivityIndicator size="large" color="#0000ff" />}
                            refreshing={refreshing}
                            onRefresh={handleRefresh}
                        />
                    )}
                </>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: '100vh',
        backgroundColor: "#fff",
    },
    loaderContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    input: {
        height: 40,
        borderColor: "#ccc",
        borderWidth: 1,
        margin: 16,
        paddingHorizontal: 8,
        borderRadius: 8,
    },
    scrollContainer: {
        paddingHorizontal: 16,
        paddingBottom: 16,
    },
    flatListContent: {
        paddingHorizontal: 16,
        paddingBottom: 16,
    },
    loader: {
        marginVertical: 16,
    },
});

export default GalleryScreen;
