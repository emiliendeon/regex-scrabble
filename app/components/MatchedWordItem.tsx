import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React from "react";
import { StyleSheet, Text, TouchableWithoutFeedback, View } from "react-native";
import DictionarySlice from "../reducers/dictionary";
import { WordItem } from "../selectors/words";
import { useDispatch } from "../store";

const MatchedWordItem = ({ item }: { item: WordItem }) => {
    const dispatch = useDispatch();

    const navigation = useNavigation<NativeStackNavigationProp<any>>();

    const goToWordScreen = () => {
        dispatch(DictionarySlice.actions.setCurrentWord(item.label));
        navigation.navigate("Word");
    };

    return (
        <TouchableWithoutFeedback onPress={goToWordScreen} style={styles.itemWrapper}>
            <View style={styles.itemWrapper}>
                <Text style={styles.itemLength}>{item.length}</Text>
                <Text style={styles.itemLabel}>{item.label}</Text>
                <Text style={styles.itemValue}>{item.value}</Text>
                {item.valueUnrestricted ? (
                    <Text style={styles.itemValueUnrestricted}>{item.valueUnrestricted}</Text>
                ) : null}
                {item.jokerCount ? (
                    <Text style={styles.itemJokerCount}>({item.jokerCount})</Text>
                ) : null}
            </View>
        </TouchableWithoutFeedback>
    );
};

export default MatchedWordItem;

const styles = StyleSheet.create({
    itemWrapper: {
        display: "flex",
        flexDirection: "row",
        paddingHorizontal: 2,
    },
    itemLength: {
        width: 24,
        fontSize: 20,
        textAlign: "right",
        color: "#afafaf",
    },
    itemLabel: {
        marginLeft: 8,
        fontSize: 20,
    },
    itemValue: {
        marginLeft: 8,
        fontSize: 20,
        color: "#0000df",
    },
    itemValueUnrestricted: {
        marginLeft: 6,
        fontSize: 20,
        color: "#df0000",
    },
    itemJokerCount: {
        marginLeft: 6,
        fontSize: 20,
        color: "#afafaf",
    },
});
