import { configureStore } from "@reduxjs/toolkit";
import {
    TypedUseSelectorHook,
    useDispatch as useDispatchRR,
    useSelector as useSelectorRR,
} from "react-redux";
import DictionarySlice from "./reducers/dictionary";
import TrainingSlice from "./reducers/training";

const store = configureStore({
    reducer: {
        dictionary: DictionarySlice.reducer,
        training: TrainingSlice.reducer,
    },
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
});

export type Store = ReturnType<typeof store.getState>;
export const useDispatch = () => useDispatchRR<typeof store.dispatch>();
export const useSelector: TypedUseSelectorHook<Store> = useSelectorRR;

export default store;
