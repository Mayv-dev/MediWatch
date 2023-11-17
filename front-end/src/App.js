import logo from './logo.svg';
import './input.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import CalendarPage from './pages/CalendarPage';
import PageNotFound from './pages/PageNotFound';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage/>} />
          <Route path="login" element={<LoginPage/>} />
          <Route path="home" element={<HomePage/>} />
          <Route path="calendar" element={<CalendarPage/>} />
          <Route path="*" element={<PageNotFound/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
