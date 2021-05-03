import React from 'react';

import { BrowserRouter as Router } from 'react-router-dom';

import { ToastContainer } from 'react-toastify';
import Routes from './routes/index';

import { AuthProvider } from './context/AuthContext';
import 'react-toastify/dist/ReactToastify.css';
import GlobalStyle from './global/styles';

const App: React.FC = () => {
  return (
    <Router>
      <ToastContainer />
      <AuthProvider>
        <Routes />
      </AuthProvider>
      <GlobalStyle />
    </Router>
  );
};

export default App;
