import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { TrainingItem as TrainingItemType } from "../selectors/words";
import { TrainingState } from "../types/training";
import TextInput from "./forms/TextInput";

type TrainingItemProps = {
    item: TrainingItemType;
    trainingState: TrainingState;
    isMultipleMode: boolean;
    correctAnswers: string[];
    unvalidatedAnswers: undefined | string[];
    currentInputs: undefined | string[];
    onChangeInput: (index: number, x: string) => void;
    isOdd: boolean;
};

const TrainingItem = ({
    item,
    trainingState,
    isMultipleMode,
    correctAnswers,
    unvalidatedAnswers,
    currentInputs,
    onChangeInput,
    isOdd,
}: TrainingItemProps) => {
    if (!item) {
        return null;
    }

    if (isMultipleMode) {
        const filteredCorrectAnswers = correctAnswers.filter(
            x => !unvalidatedAnswers || !unvalidatedAnswers.includes(x)
        );

        const wrongAnswers = item.solutions.filter(x => !filteredCorrectAnswers.includes(x));

        return (
            <View style={{ ...styles.item, ...(isOdd ? styles.itemOdd : {}) }}>
                <View style={styles.instructionWrapper}>
                    <View style={styles.hintWrapper}>
                        <Text style={styles.hint}>{item.hint}</Text>
                        {item.hint.length >= 3 && (
                            <Text style={styles.solutionsCount}>({item.solutions.length})</Text>
                        )}
                    </View>
                </View>
                <View style={styles.solutionsWrapper}>
                    {trainingState === "TRYING" && (
                        <>
                            {item.solutions.map((_, index) => (
                                <TextInput
                                    key={index}
                                    value={currentInputs ? currentInputs[index] : ""}
                                    onChange={x => onChangeInput(index, x)}
                                    cleanPattern="[^A-Z]"
                                    style={styles.answerInput}
                                />
                            ))}
                        </>
                    )}
                    {["VALIDATED", "RETRYING"].includes(trainingState) && (
                        <>
                            {filteredCorrectAnswers.map((answer, index) => (
                                <Text
                                    key={index}
                                    style={{
                                        ...styles.solution,
                                        ...styles.solutionsRight,
                                    }}
                                >
                                    {answer}
                                </Text>
                            ))}
                        </>
                    )}
                    {trainingState === "VALIDATED" ? (
                        <>
                            {wrongAnswers.map((solution, index) => (
                                <Text
                                    key={filteredCorrectAnswers.length + index}
                                    style={{
                                        ...styles.solution,
                                        ...styles.solutionsWrong,
                                    }}
                                >
                                    {solution}
                                </Text>
                            ))}
                        </>
                    ) : trainingState === "RETRYING" ? (
                        <>
                            {wrongAnswers.map((_, index) => (
                                <TextInput
                                    key={filteredCorrectAnswers.length + index}
                                    value={
                                        currentInputs
                                            ? currentInputs[filteredCorrectAnswers.length + index]
                                            : ""
                                    }
                                    onChange={x =>
                                        onChangeInput(filteredCorrectAnswers.length + index, x)
                                    }
                                    cleanPattern="[^A-Z]"
                                    style={styles.answerInput}
                                />
                            ))}
                        </>
                    ) : null}
                </View>
            </View>
        );
    }

    const isAnswerCorrect =
        currentInputs &&
        correctAnswers.includes(currentInputs[0]) &&
        (!unvalidatedAnswers || !unvalidatedAnswers.includes(currentInputs[0]));

    return (
        <View style={{ ...styles.item, ...(isOdd ? styles.itemOdd : {}) }}>
            <View style={styles.instructionWrapper}>
                <View style={styles.hintWrapper}>
                    <Text style={styles.hint}>{item.hint}</Text>
                    {item.hint.length >= 3 && (
                        <Text style={styles.solutionsCount}>({item.solutions.length})</Text>
                    )}
                </View>
            </View>
            <View style={styles.solutionsWrapper}>
                {trainingState === "TRYING" ||
                (trainingState === "RETRYING" && !isAnswerCorrect) ? (
                    <TextInput
                        value={currentInputs ? currentInputs[0] : ""}
                        onChange={x => onChangeInput(0, x)}
                        cleanPattern="[^A-Z]"
                        style={styles.answerInput}
                    />
                ) : (
                    <>
                        {item.solutions.map((solution, index) => (
                            <Text
                                key={index}
                                style={{
                                    ...styles.solution,
                                    ...(isAnswerCorrect
                                        ? styles.solutionsRight
                                        : styles.solutionsWrong),
                                }}
                            >
                                {solution}
                            </Text>
                        ))}
                    </>
                )}
            </View>
        </View>
    );
};

export default TrainingItem;

const styles = StyleSheet.create({
    item: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 8,
        paddingRight: 2,
    },
    itemOdd: {
        backgroundColor: "#f7f7ff",
    },
    instructionWrapper: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        flex: 6,
    },
    hintWrapper: {
        display: "flex",
        flexDirection: "row",
    },
    hint: {
        fontSize: 20,
    },
    solutionsCount: {
        marginLeft: 6,
        fontSize: 20,
        color: "#afafaf",
    },
    answerInput: {
        flex: 4,
        marginLeft: 6,
        paddingVertical: 2,
    },
    solutionsWrapper: {
        flex: 4,
        display: "flex",
        flexDirection: "column",
    },
    solutions: {
        flex: 4,
        fontSize: 20,
        textAlign: "center",
    },
    solution: {
        fontSize: 20,
        textAlign: "center",
    },
    solutionsRight: {
        color: "#00af00",
    },
    solutionsWrong: {
        color: "#df0000",
    },
});
