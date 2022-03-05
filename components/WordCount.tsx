import React from "react";
import { Text, View, StyleSheet } from "react-native";

const WordCount = ({ count }: { count: number }) => (
    <View>
        <Text style={styles.wordCount}>
            {count === 0
                ? "Aucun mot trouvé"
                : `${count} mot${count >= 2 ? "s" : ""} trouvé${count >= 2 ? "s" : ""}`}
        </Text>
    </View>
);

export default WordCount;

const styles = StyleSheet.create({
    wordCount: {
        paddingTop: 8,
        paddingBottom: 2,
        paddingHorizontal: 2,
        fontSize: 14,
        color: "#7f7f7f",
    },
});
