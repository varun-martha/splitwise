import React from 'react';
import WelcomePage from './pages/welcome/WelcomePage.tsx';
import { Route, Routes } from 'react-router-dom';
import LoginPage from './pages/login/LoginPage.tsx';
import RegisterPage from './pages/register/RegisterPage.tsx';
import HomePage from './pages/home/HomePage.tsx';

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<WelcomePage />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/register' element={<RegisterPage />} />
        <Route path='/home' element={<HomePage />} />
      </Routes>
    </>
  );
}

export default App;
