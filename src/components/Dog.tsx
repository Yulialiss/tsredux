import axios from "axios";
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { RootState } from "../store/store"; 
import { addDog, setError, setLoading } from "../store/dogsSlice";

const Dog = () => {
  const { dogId } = useParams<{ dogId: string }>();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const dog = useSelector((state: RootState) =>
    state.dogs.dogs.find(d => d._id === dogId)
  );
  const loading = useSelector((state: RootState) => state.dogs.loading);
  const error = useSelector((state: RootState) => state.dogs.error);

  const logout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  const fetchDog = async (dogId: string) => {
    try {
      dispatch(setLoading(true));
      const response = await axios.get(
        `https://dogs.kobernyk.com/api/v1/dogs/${dogId}`,
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );
      dispatch(addDog(response.data)); 
    } catch (err) {
      dispatch(setError("Не вдалося завантажити дані собаки."));
    } finally {
      dispatch(setLoading(false));
    }
  };

  useEffect(() => {
    if (!dog && dogId) {
      fetchDog(dogId); 
    }
  }, [dog, dogId]);

  if (!token) {
    return (
      <>
        <Link to="/login">Авторизуватися</Link>
      </>
    );
  }

  if (loading) {
    return <p>Завантаження...</p>;
  }

  if (error) {
    return <p>Помилка: {error}</p>;
  }

  return (
    <>
      <p>Ви авторизовані</p>
      <button onClick={logout}>Вийти</button>
      <br />
      <Link to="/">На головну</Link>
      {dog && (
        <Card sx={{ maxWidth: 345 }}>
          <CardMedia
            sx={{ height: 140 }}
            image={dog.image}
            title={dog.name}
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {dog.name}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Колір: {dog.color}<br />
              Порода: {dog.breed}
            </Typography>
          </CardContent>
          <CardActions>
            <Button size="small">Деталі</Button>
          </CardActions>
        </Card>
      )}
    </>
  );
};

export default Dog;
