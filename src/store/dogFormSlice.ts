import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface DogFormState {
  name: string;
  breed: string;
  age: number;
  submitted: boolean;
}

const initialState: DogFormState = {
  name: '',
  breed: '',
  age: 0,
  submitted: false, 
};

const dogFormSlice = createSlice({
  name: 'dogForm',
  initialState,
  reducers: {
    setDogFormData: (state, action: PayloadAction<DogFormState>) => {
      state.name = action.payload.name;
      state.breed = action.payload.breed;
      state.age = action.payload.age;
    },
    clearDogFormData: (state) => {
      state.name = '';
      state.breed = '';
      state.age = 0;
      state.submitted = false;
    },
    setFormSubmitted: (state) => {
      state.submitted = true;
    },
  },
});

export const { setDogFormData, clearDogFormData, setFormSubmitted } = dogFormSlice.actions;

export default dogFormSlice.reducer;
