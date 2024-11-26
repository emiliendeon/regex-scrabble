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
    disabled?: boolean;
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
            disabled,
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
            <Pressable
                onPress={handleFocus}
                disabled={disabled}
                style={{ ...styles.wrapper, ...style }}
            >
                {label ? (
                    <Text style={{ ...styles.label, ...(disabled ? styles.labelDisabled : {}) }}>
                        {label}
                    </Text>
                ) : null}
                <RNTextInput
                    ref={textInputRef}
                    placeholder={placeholder}
                    value={value}
                    onChangeText={handleTextChange}
                    onBlur={handleBlur}
                    onSubmitEditing={onSubmitEditing}
                    blurOnSubmit={true}
                    autoCorrect={false}
                    autoComplete="off"
                    spellCheck={false}
                    autoCapitalize="characters"
                    aria-disabled={disabled}
                    style={{
                        ...styles.textInput,
                        ...(disabled ? styles.textInputDisabled : {}),
                    }}
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
    labelDisabled: {
        color: "#bfbfbf",
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
    textInputDisabled: {
        opacity: 0.4,
    },
});
