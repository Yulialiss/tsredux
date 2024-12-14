import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { setDogFormData, clearDogFormData, setFormSubmitted } from '../store/dogFormSlice';
import axios from 'axios';

const DogForm: React.FC = () => {
  const dispatch = useDispatch();
  const { name, breed, age, submitted } = useSelector((state: RootState) => state.dogForm);

  // Оновлення стану форми при введенні даних
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    dispatch(setDogFormData({ ...state.dogForm, [name]: value }));
  };

  // Відправка форми для створення собаки
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await axios.post('https://dogs.kobernyk.com/api/v1/dogs', { name, breed, age });
      dispatch(setFormSubmitted()); // Позначити, що форма надіслана
      dispatch(clearDogFormData()); // Очищаємо форму після успішного створення
    } catch (error) {
      console.error('Error creating dog:', error);
    }
  };

  useEffect(() => {
    if (submitted) {
    }
  }, [submitted]);

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Name</label>
        <input type="text" name="name" value={name} onChange={handleInputChange} />
      </div>
      <div>
        <label>Breed</label>
        <input type="text" name="breed" value={breed} onChange={handleInputChange} />
      </div>
      <div>
        <label>Age</label>
        <input type="number" name="age" value={age} onChange={handleInputChange} />
      </div>
      <button type="submit">Create Dog</button>
    </form>
  );
};

export default DogForm;
