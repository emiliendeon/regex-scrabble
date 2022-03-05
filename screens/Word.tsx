import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React, { useEffect, useRef } from "react";
import { ScrollView, StyleSheet, Text, TouchableWithoutFeedback, View } from "react-native";
import Button from "../components/forms/Button";
import DictionarySlice from "../reducers/dictionary";
import WordSelectors from "../selectors/word";
import { useDispatch, useSelector } from "../store";
import Regex from "../utils/regex";

const Word = () => {
    const dispatch = useDispatch();

    const navigation = useNavigation<NativeStackNavigationProp<any>>();

    const { currentWord } = useSelector(state => state.dictionary);
    const currentWordData = useSelector(state => WordSelectors.currentWordData(state));

    const scrollViewRef = useRef<ScrollView>(null);

    useEffect(() => {
        scrollViewRef.current?.scrollTo({ y: 0 });
    }, [currentWord]);

    const goToWord = (newWord: string) => {
        dispatch(DictionarySlice.actions.setCurrentWord(newWord));
    };

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

    const goToAnagramsSub2 = () => {
        if (currentWord) {
            dispatch(DictionarySlice.actions.setSearch(Regex.anagramSub2(currentWord)));
            navigation.goBack();
        }
    };

    const goToAnagramsSup1 = () => {
        if (currentWord) {
            dispatch(DictionarySlice.actions.setSearch(Regex.anagramSup1(currentWord)));
            navigation.goBack();
        }
    };

    const goToAnagramsSup2 = () => {
        if (currentWord) {
            dispatch(DictionarySlice.actions.setSearch(Regex.anagramSup2(currentWord)));
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

    const goToPrefixes2 = () => {
        if (currentWord) {
            dispatch(DictionarySlice.actions.setSearch(Regex.prefix2(currentWord)));
            navigation.goBack();
        }
    };

    const goToPrefixes3 = () => {
        if (currentWord) {
            dispatch(DictionarySlice.actions.setSearch(Regex.prefix3(currentWord)));
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
        <ScrollView ref={scrollViewRef} style={styles.container}>
            <Text style={styles.wordLabel}>{currentWord}</Text>
            {currentWordData &&
                (currentWordData.prefixes1.length >= 1 ||
                    currentWordData.suffixes1.length >= 1) && (
                    <View style={styles.data}>
                        <View style={{ ...styles.dataItem, ...styles.prefixes }}>
                            <Text style={styles.dataItemTitle}>1-Préfixes</Text>
                            <View style={styles.dataItemContent}>
                                {currentWordData?.prefixes1.map(prefix => (
                                    <TouchableWithoutFeedback
                                        onPress={() => goToWord(`${prefix}${currentWord}`)}
                                    >
                                        <Text key={prefix} style={styles.dataWordLabel}>
                                            <Text style={styles.prefix}>{prefix}</Text>
                                            {currentWord}
                                        </Text>
                                    </TouchableWithoutFeedback>
                                ))}
                            </View>
                        </View>
                        <View style={{ ...styles.dataItem, ...styles.suffixes }}>
                            <Text style={styles.dataItemTitle}>1-Suffixes</Text>
                            <View style={styles.dataItemContent}>
                                {currentWordData?.suffixes1.map(suffix => (
                                    <TouchableWithoutFeedback
                                        onPress={() => goToWord(`${currentWord}${suffix}`)}
                                    >
                                        <Text key={suffix} style={styles.dataWordLabel}>
                                            {currentWord}
                                            <Text style={styles.suffix}>{suffix}</Text>
                                        </Text>
                                    </TouchableWithoutFeedback>
                                ))}
                            </View>
                        </View>
                    </View>
                )}
            <View style={styles.buttons}>
                <Button title="Anagrammes" onPress={goToAnagrams} style={styles.button} />
                <Button title="Anagrammes -1" onPress={goToAnagramsSub1} style={styles.button} />
                <Button title="Anagrammes -2" onPress={goToAnagramsSub2} style={styles.button} />
                <Button title="Anagrammes +1" onPress={goToAnagramsSup1} style={styles.button} />
                <Button title="Anagrammes +2" onPress={goToAnagramsSup2} style={styles.button} />
                <Button title="Préfixes (...MOT)" onPress={goToPrefixes} style={styles.button} />
                <Button title="Suffixes (MOT...)" onPress={goToSuffixes} style={styles.button} />
                <Button
                    title="Infixe de... (...MOT...)"
                    onPress={goToInfixesOf}
                    style={styles.button}
                />
                <Button title="1-Préfixes (aMOT)" onPress={goToPrefixes1} style={styles.button} />
                <Button title="2-Préfixes (aaMOT)" onPress={goToPrefixes2} style={styles.button} />
                <Button title="3-Préfixes (aaaMOT)" onPress={goToPrefixes3} style={styles.button} />
                <Button title="1-Suffixes (MOTa)" onPress={goToSuffixes1} style={styles.button} />
                <Button
                    title="1-Infixe-1 de... (aMOTa)"
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
    data: {
        flex: 1,
        display: "flex",
        flexDirection: "row",
        marginTop: -4,
        marginHorizontal: -4,
        marginBottom: 20,
        paddingHorizontal: 4,
    },
    dataItem: {
        flex: 1,
        margin: 4,
        padding: 8,
    },
    prefixes: {
        backgroundColor: "#eeeeff",
    },
    suffixes: {
        backgroundColor: "#eeffee",
    },
    dataItemTitle: {
        alignSelf: "center",
        fontSize: 18,
        fontWeight: "bold",
    },
    dataItemContent: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        marginTop: 12,
    },
    dataWordLabel: {
        fontSize: 20,
    },
    prefix: {
        color: "#0000af",
    },
    suffix: {
        color: "#00af00",
    },
    buttons: {
        marginHorizontal: 2,
    },
    button: {
        marginVertical: 2,
    },
});
