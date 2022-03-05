import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import Button from "../components/forms/Button";
import DictionarySlice from "../reducers/dictionary";
import { useDispatch, useSelector } from "../store";
import Regex from "../utils/regex";

const Word = () => {
    const dispatch = useDispatch();

    const navigation = useNavigation<NativeStackNavigationProp<any>>();

    const { currentWord } = useSelector(state => state.dictionary);

    const goToAnagrams = () => {
        if (currentWord) {
            dispatch(DictionarySlice.actions.setSearch(Regex.anagram(currentWord)));
            navigation.goBack();
        }
    };

    const goToAnagramsSub1 = () => {
        if (currentWord) {
            dispatch(DictionarySlice.actions.setSearch(Regex.anagramSub1(currentWord)));
            navigation.goBack();
        }
    };

    const goToAnagramsSup1 = () => {
        if (currentWord) {
            dispatch(DictionarySlice.actions.setSearch(Regex.anagramSup1(currentWord)));
            navigation.goBack();
        }
    };

    const goToPrefixes = () => {
        if (currentWord) {
            dispatch(DictionarySlice.actions.setSearch(Regex.prefix(currentWord)));
            navigation.goBack();
        }
    };

    const goToSuffixes = () => {
        if (currentWord) {
            dispatch(DictionarySlice.actions.setSearch(Regex.suffix(currentWord)));
            navigation.goBack();
        }
    };

    const goToInfixesOf = () => {
        if (currentWord) {
            dispatch(DictionarySlice.actions.setSearch(Regex.infixOf(currentWord)));
            navigation.goBack();
        }
    };

    const goToPrefixes1 = () => {
        if (currentWord) {
            dispatch(DictionarySlice.actions.setSearch(Regex.prefix1(currentWord)));
            navigation.goBack();
        }
    };

    const goToSuffixes1 = () => {
        if (currentWord) {
            dispatch(DictionarySlice.actions.setSearch(Regex.suffix1(currentWord)));
            navigation.goBack();
        }
    };

    const goToInfixes1Of = () => {
        if (currentWord) {
            dispatch(DictionarySlice.actions.setSearch(Regex.infix1Of(currentWord)));
            navigation.goBack();
        }
    };

    const goToLipograms = () => {
        if (currentWord) {
            dispatch(DictionarySlice.actions.setSearch(Regex.lipogram(currentWord)));
            navigation.goBack();
        }
    };

    const goToEpentheses = () => {
        if (currentWord) {
            dispatch(DictionarySlice.actions.setSearch(Regex.epenthesis(currentWord)));
            navigation.goBack();
        }
    };

    const goToReplacements = () => {
        if (currentWord) {
            dispatch(DictionarySlice.actions.setSearch(Regex.replacements(currentWord)));
            navigation.goBack();
        }
    };

    if (!currentWord) {
        return (
            <ScrollView style={styles.container}>
                <Text style={styles.wordLabel}>Aucun mot sélectionné</Text>
                <View style={styles.buttons}>
                    <Button
                        title="Retour"
                        onPress={() => navigation.goBack()}
                        style={styles.button}
                    />
                </View>
            </ScrollView>
        );
    }

    return (
        <ScrollView style={styles.container}>
            <Text style={styles.wordLabel}>{currentWord}</Text>
            <View style={styles.buttons}>
                <Button title="Anagrammes" onPress={goToAnagrams} style={styles.button} />
                <Button title="Anagrammes -1" onPress={goToAnagramsSub1} style={styles.button} />
                <Button title="Anagrammes +1" onPress={goToAnagramsSup1} style={styles.button} />
                <Button title="Préfixes (...MOT)" onPress={goToPrefixes} style={styles.button} />
                <Button title="Suffixes (MOT...)" onPress={goToSuffixes} style={styles.button} />
                <Button
                    title="Infixe de... (...MOT...)"
                    onPress={goToInfixesOf}
                    style={styles.button}
                />
                <Button title="1-Préfixes (aMOT)" onPress={goToPrefixes1} style={styles.button} />
                <Button title="1-Suffixes (MOTa)" onPress={goToSuffixes1} style={styles.button} />
                <Button
                    title="1-Infixe de... (aMOTa)"
                    onPress={goToInfixes1Of}
                    style={styles.button}
                />
                <Button
                    title="Lipogrammes (-1 lettre)"
                    onPress={goToLipograms}
                    style={styles.button}
                />
                <Button
                    title="Épenthèses (+1 lettre)"
                    onPress={goToEpentheses}
                    style={styles.button}
                />
                <Button
                    title="Remplacements (1 lettre)"
                    onPress={goToReplacements}
                    style={styles.button}
                />
                <Button title="Retour" onPress={() => navigation.goBack()} style={styles.button} />
            </View>
            <View style={{ height: 40 }} />
        </ScrollView>
    );
};

export default Word;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        display: "flex",
        flexDirection: "column",
        // padding: 4,
        paddingHorizontal: 4,
    },
    wordLabel: {
        alignSelf: "center",
        paddingVertical: 32,
        fontSize: 24,
        fontWeight: "bold",
    },
    buttons: {
        marginHorizontal: 2,
    },
    button: {
        marginVertical: 2,
    },
});
