import React, { useMemo, useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import Button, { RowButton } from "../components/forms/Button";
import CheckInput from "../components/forms/CheckInput";
import NumberInput from "../components/forms/NumberInput";
import TextInput from "../components/forms/TextInput";
import ContainingModal from "../components/modals/Containing";
import TrainingItem from "../components/TrainingItem";
import TrainingSlice from "../reducers/training";
import WordsSelectors, { TrainingItem as TrainingItemType } from "../selectors/words";
import { useDispatch, useSelector } from "../store";
import { TrainingState } from "../types/training";
import { atomize, setIndex } from "../utils/array";

type Answers = { [K: TrainingItemType["originalWord"]]: string[] };

const Training = () => {
    const dispatch = useDispatch();

    const trainingItems = useSelector(state => WordsSelectors.training(state));

    const options = useSelector(state => state.training.options);

    const [itemsCount, setItemsCount] = useState(options.itemsCount);
    const [minLetters, setMinLetters] = useState(options.minLetters);
    const [maxLetters, setMaxLetters] = useState(options.maxLetters);
    const [regex, setRegex] = useState(options.regex);

    const [isMultipleMode, setMultipleMode] = useState<boolean>(false);

    const initialAnswers = () =>
        trainingItems.reduce((acc, item) => ({ ...acc, [item.originalWord]: [] }), {});

    const [answers, setAnswers] = useState<Answers>(initialAnswers());
    const [retryingAnswers, setRetryingAnswers] = useState<Answers>({});

    const [trainingState, setTrainingState] = useState<TrainingState>("IDLE");

    const [showContainingModal, setShowContainingModal] = useState<boolean>(false);

    const rightAnswers: Answers = useMemo(
        () =>
            trainingItems.reduce(
                (acc, item) => ({
                    ...acc,
                    [item.originalWord]: answers[item.originalWord]
                        ? atomize(
                                answers[item.originalWord].filter(answer =>
                                    item.solutions.includes(answer.toUpperCase())
                                )
                          )
                        : [],
                }),
                {}
            ),
        [trainingItems, answers]
    );

    const result = useMemo(() => {
        const totalWordsCount = trainingItems.reduce(
            (acc, item) => acc + (isMultipleMode ? item.solutions.length : 1),
            0
        );
        const rightAnswersCount = Object.keys(rightAnswers).reduce(
            (acc, key) => acc + (rightAnswers ? rightAnswers[key].length : 0),
            0
        );
        const rawScore = (rightAnswersCount / (totalWordsCount || 1)) * 100;
        const score = Math.round(rawScore * 100 + Number.EPSILON) / 100;

        return { totalWordsCount, rightAnswersCount, score };
    }, [trainingItems, rightAnswers]);

    const reset = () => {
        setTrainingState("TRYING");
        setAnswers(initialAnswers());
        setRetryingAnswers({});
        dispatch(
            TrainingSlice.actions.setOptions({
                itemsCount,
                minLetters,
                maxLetters,
                regex,
            })
        );
    };

    const setAnswer = (originalWord: string, index: number, answer: string) => {
        setAnswers(prev => ({
            ...prev,
            [originalWord]:
                prev[originalWord] && prev[originalWord].includes(answer.toUpperCase())
                    ? prev[originalWord]
                    : setIndex(prev[originalWord] || [], index, answer),
        }));
    };

    const setRetryingAnswer = (originalWord: string, index: number, answer: string) => {
        setRetryingAnswers(prev => ({
            ...prev,
            [originalWord]: setIndex(prev[originalWord] || [], index, answer),
        }));
    };

    const validate = () => {
        setAnswers(rightAnswers);
        setRetryingAnswers({});
        setTrainingState("VALIDATED");
    };

    const retry = () => {
        setRetryingAnswers({});
        setTrainingState("RETRYING");
    };

    return (
        <ScrollView style={styles.container}>
            <NumberInput
                label={isMultipleMode ? "Nombre d'items" : "Nombre de mots"}
                min={1}
                max={50}
                value={itemsCount}
                onChange={x => setItemsCount(x)}
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
            <CheckInput
                label="Demander les anagrammes multiples"
                value={isMultipleMode}
                onChange={x => setMultipleMode(x)}
                disabled={
                    ["TRYING", "RETRYING"].includes(trainingState) && trainingItems.length >= 1
                }
                style={{ marginVertical: 4 }}
            />
            <Button title="Générer les mots" onPress={reset} style={styles.resetButton} />
            <View style={styles.items}>
                {trainingItems.map((item, itemIndex) => (
                    <TrainingItem
                        key={item.originalWord}
                        item={item}
                        trainingState={trainingState}
                        isMultipleMode={isMultipleMode}
                        correctAnswers={rightAnswers[item.originalWord]}
                        unvalidatedAnswers={retryingAnswers[item.originalWord]}
                        currentInputs={answers[item.originalWord]}
                        onChangeInput={(index, x) => {
                            setAnswer(item.originalWord, index, x);
                            if (trainingState === "RETRYING") {
                                setRetryingAnswer(item.originalWord, index, x);
                            }
                        }}
                        isOdd={itemIndex % 2 !== 0}
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
                        {result.rightAnswersCount}/{result.totalWordsCount} (
                        {result.score.toFixed(2)}%)
                    </Text>
                    {result.rightAnswersCount < result.totalWordsCount ? (
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
