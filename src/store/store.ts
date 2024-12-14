import { configureStore } from '@reduxjs/toolkit';
import dogFormReducer from './dogFormSlice';
import dogsReducer from './dogsSlice'; 

const store = configureStore({
  reducer: {
    dogForm: dogFormReducer,
    dogs: dogsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
