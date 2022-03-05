import { createSelector } from "@reduxjs/toolkit";
import ods8 from "../assets/ods8";
import { computeWordValues } from "../computers/word";
import { Store } from "../store";
import { randomElementsFromArray, shuffleArray } from "../utils/array";
import Regex from "../utils/regex";
import { shuffleString } from "../utils/string";

const getSearch = (state: Store) => state.dictionary.search;
const getSort = (state: Store) => state.dictionary.sort;

const getTrainingOptions = (state: Store) => state.training.options;
const getLastTrainingGenerationTimestamp = (state: Store) => state.training.lastGenerationTimestamp;

const words: string[] = ods8;

export type WordItem = {
    label: string;
    length: number;
    value: number;
    valueUnrestricted?: number;
    jokerCount: number;
};

export type TrainingItem = {
    originalWord: string;
    hint: string;
    solutions: string[];
};

const computeWordItemData = (word: string): WordItem => {
    const { value, valueUnrestricted, jokerCount } = computeWordValues(word);
    return {
        label: word,
        length: word.length,
        value,
        valueUnrestricted: valueUnrestricted !== value ? valueUnrestricted : undefined,
        jokerCount,
    };
};

const WordsSelectors = {
    bySearch: createSelector(getSearch, getSort, (search, sort) => {
        try {
            if (/^[A-Z]+$/i.test(search)) {
                return words.includes(search) ? [computeWordItemData(search)] : [];
            }

            const regexObject = new RegExp(`^${search}$`, "i");
            return words
                .filter(word => regexObject.test(word))
                .map(word => computeWordItemData(word))
                .sort((a, b) => {
                    if (sort.criterion === "VALUE") {
                        const valueCmp = a.value - b.value;
                        if (valueCmp !== 0) {
                            return sort.mode === "ASC" ? valueCmp : -valueCmp;
                        }
                    }

                    if (sort.criterion === "VALUE" || sort.criterion === "LENGTH") {
                        const lengthCmp = a.length - b.length;
                        if (lengthCmp !== 0) {
                            return sort.mode === "ASC" ? lengthCmp : -lengthCmp;
                        }
                    }

                    if (sort.criterion !== "LABEL" || sort.mode === "ASC") {
                        return a.label > b.label ? 1 : -1;
                    } else {
                        return a.label > b.label ? -1 : 1;
                    }
                });
        } catch (e) {
            console.warn(e);
            return [];
        }
    }),

    training: createSelector(
        getTrainingOptions,
        getLastTrainingGenerationTimestamp,
        (options, lastTrainingGenerationTimestamp) => {
            if (!lastTrainingGenerationTimestamp) return [];

            try {
                const trainingRegex = options.regex ? new RegExp(`^${options.regex}$`) : null;

                const filteredWords = words.filter(
                    word =>
                        word.length >= options.minLetters &&
                        word.length <= options.maxLetters &&
                        (!trainingRegex || trainingRegex.test(word))
                );

                const trainingWords: TrainingItem[] = shuffleArray<string>(
                    randomElementsFromArray(filteredWords, options.wordCount)
                ).map(word => {
                    const regex = new RegExp(`^${Regex.anagram(word)}$`);
                    return {
                        originalWord: word,
                        hint: shuffleString(word),
                        solutions: filteredWords.filter(word => regex.test(word)),
                    };
                });

                return trainingWords;
            } catch (e) {
                console.warn(e);
                return [];
            }
        }
    ),
};

export default WordsSelectors;
