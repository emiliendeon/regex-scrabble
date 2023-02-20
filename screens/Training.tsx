import React, { useMemo, useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import Button, { RowButton } from "../components/forms/Button";
import NumberInput from "../components/forms/NumberInput";
import TextInput from "../components/forms/TextInput";
import ContainingModal from "../components/modals/Containing";
import TrainingItem from "../components/TrainingItem";
import TrainingSlice from "../reducers/training";
import WordsSelectors, { TrainingItem as TrainingItemType } from "../selectors/words";
import { useDispatch, useSelector } from "../store";
import { TrainingState } from "../types/training";

const Training = () => {
    const dispatch = useDispatch();

    const trainingItems = useSelector(state => WordsSelectors.training(state));

    const options = useSelector(state => state.training.options);

    const [wordCount, setWordCount] = useState(options.wordCount);
    const [minLetters, setMinLetters] = useState(options.minLetters);
    const [maxLetters, setMaxLetters] = useState(options.maxLetters);
    const [regex, setRegex] = useState(options.regex);

    const [answers, setAnswers] = useState<{ [K: TrainingItemType["originalWord"]]: string }>({});
    const [retryingAnswers, setRetryingAnswers] = useState<{
        [K: TrainingItemType["originalWord"]]: string;
    }>({});

    const [trainingState, setTrainingState] = useState<TrainingState>("TRYING");

    const [showContainingModal, setShowContainingModal] = useState<boolean>(false);

    const rightAnswerKeys: TrainingItemType["originalWord"][] = useMemo(
        () =>
            trainingItems
                .filter(
                    item =>
                        answers[item.originalWord] &&
                        item.solutions.includes(answers[item.originalWord].toUpperCase())
                )
                .map(item => item.originalWord),
        [trainingItems, answers]
    );

    const reset = () => {
        setTrainingState("TRYING");
        setAnswers({});
        setRetryingAnswers({});
        dispatch(TrainingSlice.actions.setOptions({ wordCount, minLetters, maxLetters, regex }));
    };

    const setAnswer = (originalWord: string, answer: string) => {
        setAnswers(prev => ({ ...prev, [originalWord]: answer }));
    };

    const setRetryingAnswer = (originalWord: string, answer: string) => {
        setRetryingAnswers(prev => ({ ...prev, [originalWord]: answer }));
    };

    const validate = () => {
        if (trainingState === "RETRYING") {
            setAnswers(prev => ({ ...prev, ...retryingAnswers }));
        }
        setTrainingState("VALIDATED");
    };

    const retry = () => {
        setRetryingAnswers({});
        setTrainingState("RETRYING");
    };

    return (
        <ScrollView style={styles.container}>
            <NumberInput
                label="Nombre de mots"
                min={1}
                max={50}
                value={wordCount}
                onChange={x => setWordCount(x)}
            />
            <NumberInput
                label="Nombre de lettres minimum"
                min={2}
                max={21}
                value={minLetters}
                onChange={x => {
                    setMinLetters(x);
                    if (x > maxLetters) {
                        setMaxLetters(x);
                    }
                }}
            />
            <NumberInput
                label="Nombre de lettres maximum"
                min={2}
                max={21}
                value={maxLetters}
                onChange={x => {
                    setMaxLetters(x);
                    if (x < minLetters) {
                        setMinLetters(x);
                    }
                }}
            />
            <TextInput
                label="Filtre"
                placeholder="Saisir une expression"
                value={regex}
                onChange={x => setRegex(x)}
                style={styles.regexInput}
            />
            <View style={styles.buttons}>
                <RowButton title="Avec lettres" onPress={() => setShowContainingModal(true)} />
                <RowButton title="Effacer" onPress={() => setRegex("")} disabled={!regex} />
            </View>
            <Button title="Générer les mots" onPress={reset} style={styles.resetButton} />
            <View style={styles.items}>
                {trainingItems.map(item => (
                    <TrainingItem
                        key={item.originalWord}
                        item={item}
                        trainingState={trainingState}
                        isAnswerCorrect={rightAnswerKeys.includes(item.originalWord)}
                        currentInput={
                            trainingState === "RETRYING"
                                ? retryingAnswers[item.originalWord]
                                : answers[item.originalWord]
                        }
                        onChangeInput={x =>
                            trainingState === "RETRYING"
                                ? setRetryingAnswer(item.originalWord, x)
                                : setAnswer(item.originalWord, x)
                        }
                    />
                ))}
            </View>
            {trainingItems.length >= 1 ? (
                <Button
                    title="Valider"
                    onPress={validate}
                    disabled={trainingState === "VALIDATED"}
                />
            ) : null}
            {trainingState === "VALIDATED" && (
                <>
                    <Text style={styles.result}>
                        {rightAnswerKeys.length}/{trainingItems.length}
                    </Text>
                    {rightAnswerKeys.length < trainingItems.length ? (
                        <Button title="Recommencer avec ces mots" onPress={retry} />
                    ) : null}
                </>
            )}
            <View style={{ height: 20 }} />
            <ContainingModal
                visible={showContainingModal}
                onValidate={x => setRegex(x)}
                onClose={() => setShowContainingModal(false)}
            />
        </ScrollView>
    );
};

export default Training;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 4,
        paddingHorizontal: 4,
    },
    regexInput: {
        marginTop: 10,
    },
    buttons: {
        display: "flex",
        flexDirection: "row",
        marginTop: 4,
        marginHorizontal: -2,
    },
    resetButton: {
        marginTop: 4,
    },
    items: {
        paddingVertical: 10,
    },
    result: {
        paddingVertical: 8,
        fontSize: 24,
        fontWeight: "bold",
        textAlign: "center",
    },
});
