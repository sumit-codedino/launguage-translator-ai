import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface TranslationState {
    text: string;
    translatedText: string;
    isTranslating: boolean;
    isTranslated: boolean;
    translationLanguage: string;
    }


const initialState: TranslationState = {
    text: '',
    translatedText: '',
    isTranslating: false,
    isTranslated: false,
    translationLanguage: '',
};

const translationSlice = createSlice({
    name: 'translation',
    initialState,
    reducers: {
        setText(state, action: PayloadAction<string>) {
            state.text = action.payload;
        },
        setTranslatedText(state, action: PayloadAction<string>) {
            state.translatedText = action.payload;
        },
        setIsTranslating(state, action: PayloadAction<boolean>) {
            state.isTranslating = action.payload;
        },
        setIsTranslated(state, action: PayloadAction<boolean>) {
            state.isTranslated = action.payload;
        },
        setTranslationLanguage(state, action: PayloadAction<string>) {
            state.translationLanguage = action.payload;
        }
    },
});

export const { setText, setTranslatedText, setIsTranslating, setIsTranslated, setTranslationLanguage } = translationSlice.actions;

export default translationSlice.reducer;