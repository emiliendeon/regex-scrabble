import { createSelector } from "@reduxjs/toolkit";
import ods8 from "../assets/ods8";
import { Store } from "../store";
import Regex from "../utils/regex";

const getCurrentWord = (state: Store) => state.dictionary.currentWord;

const words: string[] = ods8;

const WordSelectors = {
    currentWordData: createSelector(getCurrentWord, currentWord => {
        if (!currentWord) {
            return null;
        }

        const prefixes1Regex = new RegExp(`^${Regex.prefix1(currentWord)}$`);
        const suffixes1Regex = new RegExp(`^${Regex.suffix1(currentWord)}$`);

        return {
            prefixes1: words
                .filter(word => prefixes1Regex.test(word))
                .map(word => word.slice(0, 1)),

            suffixes1: words.filter(word => suffixes1Regex.test(word)).map(word => word.slice(-1)),
        };
    }),
};

export default WordSelectors;
