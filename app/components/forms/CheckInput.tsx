import Checkbox from "expo-checkbox";
import React from "react";
import { Pressable, StyleSheet, Text } from "react-native";

const CheckInput = ({
    value,
    onChange,
    label,
    disabled,
    style,
}: {
    value: boolean;
    onChange: (value: boolean) => void;
    label: string;
    disabled?: boolean;
    style?: object;
}) => {
    return (
        <Pressable style={{ ...styles.wrapper, ...style }} onPress={() => onChange(!value)}>
            <Checkbox value={value} onValueChange={onChange} disabled={disabled} />
            <Text style={{ ...styles.label, ...(disabled ? styles.labelDisabled : {}) }}>
                {label}
            </Text>
        </Pressable>
    );
};

export default CheckInput;

const styles = StyleSheet.create({
    wrapper: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        height: 40,
    },
    label: {
        marginLeft: 8,
    },
    labelDisabled: {
        color: "#bfbfbf",
    },
});
