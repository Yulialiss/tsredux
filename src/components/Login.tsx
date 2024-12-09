
import { SyntheticEvent, useState } from "react";
import LabelWithInput from "./LabelWithInput";
import axios from "axios";
import useLocalStorage from "../effects/useLocalStorage";
import { useNavigate } from "react-router-dom"; 

const Login = () => {
  let [username, setUsername] = useState('');
  let [password, setPassword] = useState('');
  let [token, setToken] = useLocalStorage('token', '');
  const navigate = useNavigate(); 

  function onSubmit(e: SyntheticEvent): void {
    e.preventDefault();
    const response = axios.post(`https://dogs.kobernyk.com/login`, {
      username,
      password
    }).then(response => {
      setToken(response.data.token);
      setTimeout(() => navigate('/'), 10);
    });
  }

  return <>
    <h1>Сторінка авторизації</h1>
    <form onSubmit={onSubmit}>
      <LabelWithInput
        labelName="Імʼя користувача"
        name="username"
        type="text"
        value={username}
        onChange={(value: string) => { 
          setUsername(value);
        }} />
      <LabelWithInput
        labelName="Пароль"
        name="password"
        type="password"
        value={password}
        onChange={(value: string) => setPassword(value)} />
      <button>Авторизуватися</button>
    </form>
  </>
}

export default Login;