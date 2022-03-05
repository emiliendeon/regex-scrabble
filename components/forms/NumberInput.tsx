import React, { forwardRef, useMemo, useRef } from "react";
import { Pressable, StyleSheet, Text, TextInput as RNTextInput, View } from "react-native";
import Button from "./Button";

type NumberInputProps = {
    label?: string;
    min?: number;
    max?: number;
    value: number;
    onChange: (value: number) => void;
    style?: object;
};

const NumberInput = forwardRef<RNTextInput, NumberInputProps>(
    ({ label, min, max, value, onChange, style }: NumberInputProps, ref) => {
        const localRef = useRef<RNTextInput>(null);
        const textInputRef = (ref as React.RefObject<RNTextInput>) || localRef;

        const handleFocus = () => {
            textInputRef.current?.focus();
        };

        const handleTextChange = (text: string) => {
            if (/^[0-9]*$/.test(text)) {
                let parsed = parseInt(text) || 0;
                parsed = min !== undefined ? Math.max(parsed, min) : parsed;
                parsed = max !== undefined ? Math.min(parsed, max) : parsed;
                onChange(parsed);
            }
        };

        const isDecrementDisabled = useMemo(() => min !== undefined && value <= min, [min, value]);
        const isIncrementDisabled = useMemo(() => max !== undefined && value >= max, [max, value]);

        return (
            <Pressable style={{ ...styles.wrapper, ...style }}>
                {label ? <Text style={styles.label}>{label} :</Text> : null}
                <View style={styles.inputWrapper}>
                    <Button
                        title="-"
                        onPress={() => onChange(value - 1)}
                        style={styles.button}
                        disabled={isDecrementDisabled}
                    />
                    <RNTextInput
                        ref={textInputRef}
                        value={String(value)}
                        onChangeText={handleTextChange}
                        keyboardType="numeric"
                        blurOnSubmit={true}
                        style={styles.textInput}
                    />
                    <Button
                        title="+"
                        onPress={() => onChange(value + 1)}
                        style={styles.button}
                        disabled={isIncrementDisabled}
                    />
                </View>
            </Pressable>
        );
    }
);

export default NumberInput;

const styles = StyleSheet.create({
    wrapper: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingVertical: 2,
    },
    label: {
        marginRight: 8,
        fontSize: 16,
    },
    inputWrapper: {
        display: "flex",
        flexDirection: "row",
    },
    button: {
        width: 40,
    },
    textInput: {
        width: 40,
        marginHorizontal: 4,
        padding: 4,
        fontSize: 20,
        textAlign: "center",
        color: "#0000df",
        borderStyle: "solid",
        borderWidth: 1,
        borderColor: "#000000",
        borderRadius: 4,
    },
});
