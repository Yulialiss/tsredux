import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import DogForm from './components/DogForm';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/dog-form" element={<DogForm />} />
      </Routes>
    </Router>
  );
}

export default App;
