import React, { useState } from "react";
import { StyleSheet } from "react-native";
import DictionarySlice from "../../reducers/dictionary";
import { useDispatch } from "../../store";
import Button from "../forms/Button";
import TextInput from "../forms/TextInput";
import Modal from "../Modal";

const PlacingModal = ({ visible, onClose }: { visible: boolean; onClose: () => void }) => {
    const dispatch = useDispatch();

    const [configuration, setConfiguration] = useState("");
    const [letters, setLetters] = useState("");

    const onValidate = () => {
        const configurationU = configuration.toUpperCase();
        const lettersU = letters.toUpperCase();
        const configurationLettersU = configurationU.match(/[A-Z]/g) || [];
        const letterCounts: Record<string, number> = {};
        let regex = "";

        for (const letter of lettersU) {
            letterCounts[letter] = letterCounts[letter] ? letterCounts[letter] + 1 : 1;
        }

        const uniqueLetters = Object.keys(letterCounts).join("");

        for (const letter of configurationLettersU) {
            letterCounts[letter] = letterCounts[letter] ? letterCounts[letter] + 1 : 1;
        }

        for (const [letter, count] of Object.entries(letterCounts)) {
            regex += `(?!(.*${letter}){${count + 1},})`;
        }

        const configurationPlaceholders = configurationU.match(/\.+/g) || [];
        let configurationRegex = configurationU;
        for (const configurationPlaceholder of configurationPlaceholders) {
            configurationRegex = configurationRegex.replace(
                configurationPlaceholder,
                `[${uniqueLetters}]{${configurationPlaceholder.length}}`
            );
        }
        regex += configurationRegex;

        dispatch(DictionarySlice.actions.setSearch(regex));

        onClose();
        setConfiguration("");
        setLetters("");
    };

    return (
        <Modal visible={visible} onClose={onClose}>
            <TextInput
                label="Configuration"
                placeholder='A-Z, "." = case vide'
                value={configuration}
                onChange={text => setConfiguration(text)}
                cleanPattern="[^A-Z.]"
                style={styles.textInput}
            />
            <TextInput
                label="Tirage"
                placeholder="Lettres du chevalet"
                value={letters}
                onChange={text => setLetters(text)}
                cleanPattern="[^A-Z]"
                style={styles.textInput}
            />
            <Button
                title="Valider"
                onPress={onValidate}
                disabled={!letters}
                style={{ marginTop: 12 }}
            />
        </Modal>
    );
};

export default PlacingModal;

const styles = StyleSheet.create({
    textInput: {
        marginBottom: 8,
    },
});
