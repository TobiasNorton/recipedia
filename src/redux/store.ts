import rootReducer from './root-reducer';
import { configureStore } from '@reduxjs/toolkit';

const store = configureStore({ reducer: rootReducer });

// https://redux-toolkit.js.org/tutorials/typescript#define-root-state-and-dispatch-types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
