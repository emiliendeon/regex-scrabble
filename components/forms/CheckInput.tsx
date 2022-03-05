import Checkbox from "expo-checkbox";
import React from "react";
import { Pressable, StyleSheet, Text } from "react-native";

const CheckInput = ({
    value,
    onChange,
    label,
}: {
    value: boolean;
    onChange: (value: boolean) => void;
    label: string;
}) => {
    return (
        <Pressable style={styles.wrapper} onPress={() => onChange(!value)}>
            <Checkbox value={value} onValueChange={onChange} />
            <Text style={styles.label}>{label}</Text>
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
});
