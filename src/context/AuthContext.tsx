import React, { createContext, useCallback, useState, useContext } from 'react';

import api from '../services/api';

interface AuthState {
  token: string;
  user: User;
}

interface SignInCredentials {
  email: string;
  password: string;
}
interface signUpCredentials {
  name: string;
  email: string;
  password: string;
}
interface User {
  id: string;
}

interface AuthContextData {
  user: User;
  signIn(credentials: SignInCredentials): Promise<void>;
  signUp(creationCredentials: signUpCredentials): Promise<void>;
  signOut(): void;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

const AuthProvider: React.FC = ({ children }) => {
  const [data, setData] = useState<AuthState>(() => {
    const token = localStorage.getItem('@Invision:token');
    const user = localStorage.getItem('@Invision:user');

    if (token && user) {
      return { token, user: JSON.parse(user) };
    }

    return {} as AuthState;
  });

  const signIn = useCallback(async ({ email, password }) => {
    // verificar se está rodando no browser ou node
    if (process.env.NODE_ENV === 'development') {
      await import('../__mock__/signin.js');
    }

    const response = await api.post('sessions', {
      email,
      password,
    });

    const { token, user } = response.data;

    localStorage.setItem('@Invision:token', token);
    localStorage.setItem('@Invision:user', JSON.stringify(user));

    setData({ token, user });
  }, []);

  const signUp = useCallback(async ({ name, email, password }) => {
    if (process.env.NODE_ENV === 'development') {
      await import('../__mock__/signup.js');
    }
    await api.post('users', {
      name,
      email,
      password,
    });
  }, []);

  const signOut = useCallback(() => {
    localStorage.removeItem('@Invision:token: token');
    localStorage.removeItem('@Invision:user: user');

    setData({} as AuthState);
  }, []);

  return (
    <AuthContext.Provider value={{ user: data.user, signUp, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

function useAuth(): AuthContextData {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an AutoProvider');
  }

  return context;
}

export { AuthProvider, useAuth };
