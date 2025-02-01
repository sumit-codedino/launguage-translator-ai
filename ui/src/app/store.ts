import { configureStore } from '@reduxjs/toolkit';
import translationReducer from '../features/translationSlice';

export const store = configureStore({
  reducer: {
    translation: translationReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;