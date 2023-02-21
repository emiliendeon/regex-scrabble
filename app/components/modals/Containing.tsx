import React, { useState } from "react";
import { StyleSheet } from "react-native";
import Button from "../forms/Button";
import TextInput from "../forms/TextInput";
import Modal from "../Modal";

const ContainingModal = ({
    visible,
    onValidate,
    onClose,
}: {
    visible: boolean;
    onValidate: (regex: string) => void;
    onClose: () => void;
}) => {
    const [letters, setLetters] = useState("");

    const onValidateInternal = () => {
        const lettersU = letters.toUpperCase();
        const letterCounts: Record<string, number> = {};
        let regex = "";

        for (const letter of lettersU) {
            letterCounts[letter] = letterCounts[letter] ? letterCounts[letter] + 1 : 1;
        }

        for (const [letter, count] of Object.entries(letterCounts)) {
            regex += `(?=(.*${letter}){${count}})`;
        }

        regex += ".*";

        onValidate(regex);

        onClose();
        setLetters("");
    };

    return (
        <Modal visible={visible} onClose={onClose}>
            <TextInput
                placeholder="Lettres obligatoires"
                value={letters}
                onChange={text => setLetters(text)}
                cleanPattern="[^A-Z]"
                style={styles.textInput}
            />
            <Button
                title="Valider"
                onPress={onValidateInternal}
                disabled={!letters}
                style={styles.button}
            />
        </Modal>
    );
};

export default ContainingModal;

const styles = StyleSheet.create({
    textInput: {},
    button: {
        marginTop: 16,
    },
});
