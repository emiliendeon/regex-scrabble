import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type TrainingStore = {
    options: {
        wordCount: number;
        minLetters: number;
        maxLetters: number;
        regex: string;
    };
    lastGenerationTimestamp: number;
};

const initialState: TrainingStore = {
    options: {
        wordCount: 5,
        minLetters: 2,
        maxLetters: 7,
        regex: "",
    },
    lastGenerationTimestamp: 0,
};

const TrainingSlice = createSlice({
    name: "training",
    initialState,
    reducers: {
        setOptions: (state, { payload }: PayloadAction<Partial<TrainingStore["options"]>>) => {
            state.options = { ...state.options, ...payload };
            state.lastGenerationTimestamp = Date.now();
        },
        setLastGenerationTimestampToNow: state => {
            state.lastGenerationTimestamp = Date.now();
        },
    },
});

export default TrainingSlice;
