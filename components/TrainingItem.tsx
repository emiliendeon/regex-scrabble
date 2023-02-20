import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { TrainingItem as TrainingItemType } from "../selectors/words";
import TextInput from "./forms/TextInput";

type TrainingItemProps = {
    item: TrainingItemType;
    isValidated: boolean;
    isAnswerCorrect?: boolean;
    currentInput: string;
    onChangeInput: (x: string) => void;
};

const TrainingItem = ({
    item,
    isValidated,
    isAnswerCorrect,
    currentInput,
    onChangeInput,
}: TrainingItemProps) => {
    if (!item) {
        return null;
    }

    return (
        <View style={styles.item}>
            <View style={styles.instructionWrapper}>
                <View style={styles.hintWrapper}>
                    <Text style={styles.hint}>{item.hint}</Text>
                    {item.hint.length >= 3 && (
                        <Text style={styles.solutionsCount}>({item.solutions.length})</Text>
                    )}
                </View>
            </View>
            {isValidated ? (
                <Text
                    style={{
                        ...styles.solutions,
                        ...(isAnswerCorrect ? styles.solutionsRight : styles.solutionsWrong),
                    }}
                >
                    {item.solutions.join("\n")}
                </Text>
            ) : (
                <TextInput
                    value={currentInput}
                    onChange={onChangeInput}
                    cleanPattern="[^A-Z]"
                    style={styles.answerInput}
                />
            )}
        </View>
    );
};

export default TrainingItem;

const styles = StyleSheet.create({
    item: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 4,
        paddingRight: 2,
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
    },
    solutions: {
        flex: 4,
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
