import React, { useEffect, useRef, useState } from "react";
import {
    ActivityIndicator,
    FlatList,
    StyleSheet,
    TextInput as RNTextInput,
    View,
} from "react-native";
import { RowButton } from "../components/forms/Button";
import TextInput from "../components/forms/TextInput";
import MatchedWordItem from "../components/MatchedWordItem";
import AnagramModal from "../components/modals/Anagram";
import ContainingModal from "../components/modals/Containing";
import PlacingModal from "../components/modals/Placing";
import WordCount from "../components/WordCount";
import DictionarySlice, { DictionaryStore } from "../reducers/dictionary";
import WordsSelectors from "../selectors/words";
import { useDispatch, useSelector } from "../store";
import { formatSearch } from "../utils/string";

const SortOptions: Array<DictionaryStore["sort"] & { label: string }> = [
    {
        label: "A-AAA",
        criterion: "LENGTH",
        mode: "ASC",
    },
    {
        label: "AAA-A",
        criterion: "LENGTH",
        mode: "DESC",
    },
    {
        label: "A-Z",
        criterion: "LABEL",
        mode: "ASC",
    },
    {
        label: "Z-A",
        criterion: "LABEL",
        mode: "DESC",
    },
    {
        label: "$-$$$",
        criterion: "VALUE",
        mode: "ASC",
    },
    {
        label: "$$$-$",
        criterion: "VALUE",
        mode: "DESC",
    },
];

export default function Home() {
    const dispatch = useDispatch();

    const { search, sort } = useSelector(state => state.dictionary);
    const matchedWords = useSelector(state => WordsSelectors.bySearch(state));

    const [regex, setRegex] = useState<string>("");

    const [computing, setComputing] = useState<boolean>(false);

    const [showAnagramModal, setShowAnagramModal] = useState<boolean>(false);
    const [showContainingModal, setShowContainingModal] = useState<boolean>(false);
    const [showPlacingModal, setShowPlacingModal] = useState<boolean>(false);

    const textInputRef = useRef<RNTextInput>(null);
    const matchedWordsListRef = useRef<FlatList>(null);

    const setSearch = (newSearch: string) => {
        dispatch(DictionarySlice.actions.setSearch(newSearch));
    };

    const setSort = (
        criterion: DictionaryStore["sort"]["criterion"],
        mode: DictionaryStore["sort"]["mode"]
    ) => {
        matchedWordsListRef.current?.scrollToOffset({ offset: 0 });
        dispatch(DictionarySlice.actions.setSort({ criterion, mode }));
    };

    const validate = () => {
        textInputRef.current?.blur();
        setSearch(formatSearch(regex));
    };

    const reset = () => {
        setRegex("");
        setSearch("");
    };

    useEffect(() => {
        matchedWordsListRef.current?.scrollToOffset({ offset: 0 });
        setRegex(search);
        setComputing(true);
    }, [search]);

    useEffect(() => {
        setComputing(false);
    }, [matchedWords]);

    return (
        <View style={styles.container}>
            <TextInput
                ref={textInputRef}
                placeholder="Saisir un mot ou une expression..."
                value={regex}
                onChange={text => setRegex(text)}
                style={styles.textInput}
            />
            <View style={styles.buttons}>
                <RowButton title="Valider" onPress={validate} disabled={!regex} />
                <RowButton title="Effacer" onPress={reset} disabled={!regex} />
            </View>
            <View style={styles.buttons}>
                <RowButton title="Anagrammes" onPress={() => setShowAnagramModal(true)} />
                <RowButton title="Avec lettres" onPress={() => setShowContainingModal(true)} />
                <RowButton title="Placements" onPress={() => setShowPlacingModal(true)} />
            </View>
            <View style={styles.buttons}>
                {SortOptions.map(sortOption => (
                    <RowButton
                        key={`${sortOption.criterion}_${sortOption.mode}`}
                        title={sortOption.label}
                        onPress={() => setSort(sortOption.criterion, sortOption.mode)}
                        disabled={
                            sort.criterion === sortOption.criterion && sort.mode === sortOption.mode
                        }
                    />
                ))}
            </View>
            {computing ? (
                <ActivityIndicator />
            ) : (
                <>
                    {matchedWords !== null ? <WordCount count={matchedWords.length} /> : null}
                    <FlatList
                        ref={matchedWordsListRef}
                        data={matchedWords}
                        renderItem={({ item }) => <MatchedWordItem item={item} />}
                        keyExtractor={item => item.label}
                        ListFooterComponent={<View style={{ height: 8 }} />}
                    />
                </>
            )}
            <AnagramModal visible={showAnagramModal} onClose={() => setShowAnagramModal(false)} />
            <ContainingModal
                visible={showContainingModal}
                onValidate={x => dispatch(DictionarySlice.actions.setSearch(x))}
                onClose={() => setShowContainingModal(false)}
            />
            <PlacingModal visible={showPlacingModal} onClose={() => setShowPlacingModal(false)} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        display: "flex",
        flexDirection: "column",
        paddingHorizontal: 4,
    },
    textInput: {
        marginHorizontal: 2,
    },
    buttons: {
        display: "flex",
        flexDirection: "row",
        marginTop: 4,
    },
});
