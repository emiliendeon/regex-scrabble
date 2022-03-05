import React from "react";
import { StyleSheet, Text, TouchableOpacity, TouchableOpacityProps } from "react-native";

type ButtonProps = Pick<TouchableOpacityProps, "onPress" | "disabled"> & {
    title: string;
    style?: object;
};

const Button = ({ title, onPress, disabled, style }: ButtonProps) => {
    const buttonStyle = { ...styles.button, ...style };

    return (
        <TouchableOpacity
            onPress={onPress}
            disabled={disabled}
            style={disabled ? { ...buttonStyle, ...styles.buttonDisabled } : buttonStyle}
        >
            <Text
                style={
                    disabled
                        ? { ...styles.buttonLabel, ...styles.buttonLabelDisabled }
                        : styles.buttonLabel
                }
            >
                {title}
            </Text>
        </TouchableOpacity>
    );
};

export const RowButton = (props: ButtonProps) => (
    <Button {...props} style={{ ...props.style, flex: 1, marginHorizontal: 2 }} />
);

export default Button;

const styles = StyleSheet.create({
    button: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        height: 40,
        backgroundColor: "#dfdfdf",
    },
    buttonLabel: {
        fontSize: 16,
        textAlign: "center",
        color: "#000000",
    },
    buttonDisabled: {
        backgroundColor: "#efefef",
    },
    buttonLabelDisabled: {
        color: "#bfbfbf",
    },
});
