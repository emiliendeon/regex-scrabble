import React, { PropsWithChildren } from "react";
import { GestureResponderEvent, Modal as RNModal, Pressable, StyleSheet } from "react-native";

const Modal = ({
    visible,
    onClose,
    style,
    children,
}: PropsWithChildren<{ visible: boolean; onClose: () => void; style?: object }>) => {
    const handleBackgroundPress = () => {
        onClose();
    };

    const handleModalPress = (event: GestureResponderEvent) => {
        event.preventDefault();
        event.stopPropagation();
    };

    return (
        <RNModal transparent={true} visible={visible} statusBarTranslucent={true}>
            <Pressable onPress={handleBackgroundPress} style={styles.wrapper}>
                <Pressable onPress={handleModalPress} style={{ ...styles.modal, ...style }}>
                    {children}
                </Pressable>
            </Pressable>
        </RNModal>
    );
};

export default Modal;

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 16,
        backgroundColor: "rgba(0, 0, 0, 0.5)",
    },
    modal: {
        display: "flex",
        flexDirection: "column",
        minWidth: "80%",
        padding: 16,
        shadowColor: "#000",
        shadowOpacity: 0.5,
        shadowOffset: {
            width: 2,
            height: 2,
        },
        elevation: 5,
        backgroundColor: "#ffffff",
    },
});
