import React from "react";
import { View, Text, StyleSheet } from "react-native";

const ProgressBar = ({ progress }) => {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>{`${progress}%`}</Text>
            <View style={styles.barBackground}>
                <View style={[styles.barFill, { width: `${progress}%` }]} />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        margin: 16,
        alignItems: "center",
    },
    text: {
        marginBottom: 8,
        fontSize: 16,
        fontWeight: "bold",
    },
    barBackground: {
        width: "100%",
        height: 10,
        backgroundColor: "#e0e0e0",
        borderRadius: 5,
        overflow: "hidden",
    },
    barFill: {
        height: "100%",
        backgroundColor: "#76c7c0",
    },
});

export default ProgressBar;
