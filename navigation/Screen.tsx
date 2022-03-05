import { StatusBar } from "expo-status-bar";
import React from "react";
import { SafeAreaView, StyleSheet, View } from "react-native";

const Screen = ({ component }: { component: () => JSX.Element }) => {
    const ScreenComponent = component;
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <StatusBar style="auto" />
            <View style={styles.root}>
                <ScreenComponent />
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    root: {
        display: "flex",
        flexDirection: "column",
        flex: 1,
        backgroundColor: "#ffffff",
    },
});

export default Screen;
