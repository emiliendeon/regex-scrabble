import React, { forwardRef, useRef } from "react";
import { Pressable, StyleSheet, Text, TextInput as RNTextInput } from "react-native";

type TextInputProps = {
    label?: string;
    placeholder?: string;
    value: string;
    onChange: (value: string) => void;
    onBlur?: () => void;
    onSubmitEditing?: () => void;
    cleanPattern?: string;
    style?: object;
};

const TextInput = forwardRef<RNTextInput, TextInputProps>(
    (
        {
            label,
            placeholder,
            value,
            onChange,
            onBlur,
            onSubmitEditing,
            cleanPattern,
            style,
        }: TextInputProps,
        ref
    ) => {
        const localRef = useRef<RNTextInput>(null);
        const textInputRef = (ref as React.RefObject<RNTextInput>) || localRef;

        const handleFocus = () => {
            textInputRef.current?.focus();
        };

        const handleTextChange = (text: string) => {
            if (cleanPattern) {
                const regex = new RegExp(cleanPattern, "gi");
                onChange(text.replace(regex, ""));
            } else {
                onChange(text);
            }
        };

        const handleBlur = () => {
            if (onBlur) {
                onBlur();
            }
            onChange(value ? value.replace(/\s+/g, "").toUpperCase() : "");
        };

        return (
            <Pressable style={{ ...styles.wrapper, ...style }} onPress={handleFocus}>
                {label ? <Text style={styles.label}>{label}</Text> : null}
                <RNTextInput
                    ref={textInputRef}
                    placeholder={placeholder}
                    value={value}
                    onChangeText={handleTextChange}
                    onBlur={handleBlur}
                    onSubmitEditing={onSubmitEditing}
                    blurOnSubmit={true}
                    autoCorrect={false}
                    autoCompleteType="off"
                    spellCheck={false}
                    style={styles.textInput}
                />
            </Pressable>
        );
    }
);

export default TextInput;

const styles = StyleSheet.create({
    wrapper: {
        display: "flex",
        flexDirection: "column",
    },
    label: {
        marginBottom: 2,
        fontSize: 16,
    },
    textInput: {
        padding: 4,
        fontSize: 20,
        color: "#0000df",
        borderStyle: "solid",
        borderWidth: 1,
        borderColor: "#000000",
        borderRadius: 4,
    },
});
