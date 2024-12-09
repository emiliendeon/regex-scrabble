import React, { forwardRef, useEffect, useMemo, useRef, useState } from "react";
import { Pressable, StyleSheet, Text, TextInput as RNTextInput, View } from "react-native";
import Button from "./Button";
import { isNumberInRange } from "../../utils/number";

type NumberInputProps = {
    label?: string;
    min?: number;
    max?: number;
    value: number;
    onChange: (value: number) => void;
    disabled?: boolean;
    style?: object;
};

const NumberInput = forwardRef<RNTextInput, NumberInputProps>(
    ({ label, min, max, value, onChange, disabled, style }: NumberInputProps, ref) => {
        const localRef = useRef<RNTextInput>(null);
        const textInputRef = (ref as React.RefObject<RNTextInput>) || localRef;

        const [localValue, setLocalValue] = useState<NumberInputProps["value"]>(value);

        useEffect(() => {
            setLocalValue(value);
        }, [value]);

        const onLocalBlur = () => {
            setLocalValue(value);
        };

        const handleTextChange = (text: string) => {
            if (!/^[0-9]*$/.test(text)) {
                return;
            }

            let parsed = parseInt(text) || 0;

            if (max !== undefined && parsed > max) {
                parsed %= 10;
            }

            if (isNumberInRange([min, max], parsed)) {
                onChange(parsed);
            }

            setLocalValue(parsed);
        };

        const isDecrementDisabled = useMemo(() => min !== undefined && value <= min, [min, value]);
        const isIncrementDisabled = useMemo(() => max !== undefined && value >= max, [max, value]);

        return (
            <Pressable disabled={disabled} style={{ ...styles.wrapper, ...style }}>
                {label ? (
                    <Text style={{ ...styles.label, ...(disabled ? styles.labelDisabled : {}) }}>
                        {label} :
                    </Text>
                ) : null}
                <View style={styles.inputWrapper}>
                    <Button
                        title="-"
                        onPress={() => onChange(value - 1)}
                        style={styles.button}
                        disabled={disabled || isDecrementDisabled}
                    />
                    <RNTextInput
                        ref={textInputRef}
                        value={String(localValue)}
                        onChangeText={handleTextChange}
						onBlur={onLocalBlur}
                        keyboardType="numeric"
                        blurOnSubmit={true}
                        aria-disabled={disabled}
                        style={{
                            ...styles.textInput,
                            ...(disabled ? styles.textInputDisabled : {}),
                        }}
                    />
                    <Button
                        title="+"
                        onPress={() => onChange(value + 1)}
                        style={styles.button}
                        disabled={disabled || isIncrementDisabled}
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
    labelDisabled: {
        color: "#bfbfbf",
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
    textInputDisabled: {
        opacity: 0.4,
    },
});
