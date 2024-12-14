// src/store/dogSlice.ts
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  dogs: [],
};

const dogSlice = createSlice({
  name: 'dogs',
  initialState,
  reducers: {
    setDogs: (state, action) => {
      state.dogs = action.payload;
    },
  },
});

export const { setDogs } = dogSlice.actions;
export default dogSlice.reducer;
