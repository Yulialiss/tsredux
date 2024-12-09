import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Dog {
  _id: string;
  name: string;
  breed: string;
  color: string;
  image: string;
}

interface DogsState {
  dogs: Dog[];
  loading: boolean;
  error: string | null;
}

const initialState: DogsState = {
  dogs: [],
  loading: false,
  error: null,
};

const dogsSlice = createSlice({
  name: 'dogs',
  initialState,
  reducers: {
    setDogs: (state, action: PayloadAction<Dog[]>) => {
      state.dogs = action.payload;
      state.loading = false;
    },
    addDog: (state, action: PayloadAction<Dog>) => {
      const exists = state.dogs.find(dog => dog._id === action.payload._id);
      if (!exists) {
        state.dogs.push(action.payload);
      }
      state.loading = false;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const { setDogs, addDog, setLoading, setError } = dogsSlice.actions;
export default dogsSlice.reducer;
