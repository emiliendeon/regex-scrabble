import React, { useMemo, useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import Button, { RowButton } from "../components/forms/Button";
import NumberInput from "../components/forms/NumberInput";
import TextInput from "../components/forms/TextInput";
import ContainingModal from "../components/modals/Containing";
import TrainingSlice from "../reducers/training";
import WordsSelectors, { TrainingItem } from "../selectors/words";
import { useDispatch, useSelector } from "../store";

const Training = () => {
    const dispatch = useDispatch();

    const trainingItems = useSelector(state => WordsSelectors.training(state));

    const options = useSelector(state => state.training.options);

    const [wordCount, setWordCount] = useState(options.wordCount);
    const [minLetters, setMinLetters] = useState(options.minLetters);
    const [maxLetters, setMaxLetters] = useState(options.maxLetters);
    const [regex, setRegex] = useState(options.regex);

    const [answers, setAnswers] = useState<{ [K: TrainingItem["originalWord"]]: string }>({});

    const [validated, setValidated] = useState(false);

    const [showContainingModal, setShowContainingModal] = useState<boolean>(false);

    const rightAnswerKeys: TrainingItem["originalWord"][] = useMemo(
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
        setValidated(false);
        setAnswers({});
        dispatch(TrainingSlice.actions.setOptions({ wordCount, minLetters, maxLetters, regex }));
        // dispatch(TrainingSlice.actions.setLastGenerationTimestampToNow());
    };

    const setAnswer = (originalWord: string, answer: string) => {
        setAnswers(prev => ({ ...prev, [originalWord]: answer }));
    };

    // const answersInputsRefs = useRef<React.RefObject<RNTextInput>[]>([]);

    // answersInputsRefs.current = trainingItems.map(
    //     (_, i) => (answersInputsRefs.current && answersInputsRefs.current[i]) ?? createRef()
    // );

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
                    <View key={item.originalWord} style={styles.item}>
                        <View style={styles.hintWrapper}>
                            <Text style={styles.hint}>{item.hint}</Text>
                        </View>
                        {validated ? (
                            <Text
                                style={{
                                    ...styles.solutions,
                                    ...(rightAnswerKeys.includes(item.originalWord)
                                        ? styles.solutionsRight
                                        : styles.solutionsWrong),
                                }}
                            >
                                {item.solutions.join("\n")}
                            </Text>
                        ) : (
                            <TextInput
                                // ref={answersInputsRefs.current[index]}
                                value={answers[item.originalWord]}
                                onChange={x => setAnswer(item.originalWord, x)}
                                // onSubmitEditing={() => {
                                //     answersInputsRefs.current[index + 1]?.current?.focus();
                                // }}
                                cleanPattern="[^A-Z]"
                                style={styles.answerInput}
                            />
                        )}
                    </View>
                ))}
            </View>
            {trainingItems.length >= 1 ? (
                <Button title="Valider" onPress={() => setValidated(true)} />
            ) : null}
            {validated && (
                <Text style={styles.result}>
                    {rightAnswerKeys.length}/{trainingItems.length}
                </Text>
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
        // paddingBottom: 10,
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
    item: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 4,
        paddingRight: 2,
    },
    hintWrapper: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        flex: 1,
    },
    hint: {
        fontSize: 20,
        textAlign: "center",
    },
    answerInput: {
        flex: 1,
        marginLeft: 6,
    },
    solutions: {
        flex: 1,
        fontSize: 20,
        textAlign: "center",
    },
    solutionsRight: {
        color: "#00af00",
    },
    solutionsWrong: {
        color: "#df0000",
    },
    result: {
        paddingVertical: 8,
        fontSize: 24,
        fontWeight: "bold",
        textAlign: "center",
    },
});
