import axios from 'axios';

const API_URL = 'https://dogs.kobernyk.com/api/v1/dogs';

export const fetchDogs = async (page: number = 1, limit: number = 10) => {
  const response = await axios.get(API_URL, {
    params: {
      limit,
      page
    }
  });
  return response.data;
};

export const fetchDogById = async (dogId: string) => {
  const response = await axios.get(`${API_URL}/${dogId}`);
  return response.data;
};
