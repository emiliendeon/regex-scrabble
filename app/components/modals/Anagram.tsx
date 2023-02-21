import React, { useState } from "react";
import { StyleSheet } from "react-native";
import DictionarySlice from "../../reducers/dictionary";
import { useDispatch } from "../../store";
import Button from "../forms/Button";
import CheckInput from "../forms/CheckInput";
import TextInput from "../forms/TextInput";
import Modal from "../Modal";

const AnagramModal = ({ visible, onClose }: { visible: boolean; onClose: () => void }) => {
    const dispatch = useDispatch();

    const [letters, setLetters] = useState("");

    const [includeSubAnagrams, setIncludeSubAnagrams] = useState(false);
    const [includeSup1Anagrams, setIncludeSup1Anagrams] = useState(false);

    const onValidate = () => {
        const lettersU = letters.toUpperCase();
        const letterCounts: Record<string, number> = {};
        let regex = "";

        for (const letter of lettersU) {
            letterCounts[letter] = letterCounts[letter] ? letterCounts[letter] + 1 : 1;
        }

        const uniqueLetters = Object.keys(letterCounts).join("");

        if (includeSubAnagrams) {
            let regexSup1 = "";

            if (includeSup1Anagrams) {
                regex += `(?!.{${lettersU.length + 2},})((`;
            }

            for (const [letter, count] of Object.entries(letterCounts)) {
                regex += `(?!(.*${letter}){${count + 1},})`;

                if (includeSup1Anagrams) {
                    regexSup1 += `(?=(.*${letter}){${count}})`;
                }
            }

            if (includeSup1Anagrams) {
                regex += `[${uniqueLetters}]{2,${lettersU.length}})|(${regexSup1}.{${
                    lettersU.length + 1
                }}))`;
            } else {
                regex += `[${uniqueLetters}]{2,${lettersU.length}}`;
            }
        } else {
            for (const [letter, count] of Object.entries(letterCounts)) {
                regex += `(?=(.*${letter}){${count}})`;
            }

            if (includeSup1Anagrams) {
                regex += `.{${lettersU.length},${lettersU.length + 1}}`;
            } else {
                regex += `[${uniqueLetters}]{${lettersU.length}}`;
            }
        }

        dispatch(DictionarySlice.actions.setSearch(regex));

        onClose();
        setLetters("");
    };

    return (
        <Modal visible={visible} onClose={onClose}>
            <TextInput
                placeholder="Saisir les lettres souhaitées"
                value={letters}
                onChange={text => setLetters(text)}
                cleanPattern="[^A-Z]"
                style={styles.textInput}
            />
            <CheckInput
                value={includeSubAnagrams}
                onChange={x => setIncludeSubAnagrams(x)}
                label="Inclure les sous-anagrammes"
            />
            <CheckInput
                value={includeSup1Anagrams}
                onChange={x => setIncludeSup1Anagrams(x)}
                label="Inclure les anagrammes +1"
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

export default AnagramModal;

const styles = StyleSheet.create({
    textInput: {
        marginBottom: 8,
    },
});
