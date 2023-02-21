import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type DictionaryStore = {
    search: string;
    sort: {
        criterion: "LABEL" | "LENGTH" | "VALUE";
        mode: "ASC" | "DESC";
    };
    currentWord: string | null;
};

const initialState: DictionaryStore = {
    search: "",
    sort: {
        criterion: "LENGTH",
        mode: "ASC",
    },
    currentWord: null,
};

const DictionarySlice = createSlice({
    name: "dictionary",
    initialState,
    reducers: {
        setSearch: (state, { payload }: PayloadAction<DictionaryStore["search"]>) => {
            state.search = payload;
        },
        setSort: (state, { payload }: PayloadAction<DictionaryStore["sort"]>) => {
            state.sort = payload;
        },
        setCurrentWord: (state, { payload }: PayloadAction<DictionaryStore["currentWord"]>) => {
            state.currentWord = payload;
        },
    },
});

export default DictionarySlice;
