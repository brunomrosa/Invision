import '@testing-library/jest-dom';
import React from 'react';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { AuthProvider } from '../context/AuthContext';
const server = setupServer(
  rest.post('http://mock/sessions', (req, res, ctx) => {
    return res(ctx.json({ token: 'mocked_user_token', id: '123' }));
  }),
);

beforeAll(() => server.listen());

afterEach(() => server.resetHandlers());

afterAll(() => server.close());

test('user cannot try to login with empty email', async () => {
  const history = createMemoryHistory();
  render(
    <Router history={history}>
      <ToastContainer />
      <SignIn />
    </Router>,
  );
  userEvent.type(screen.getByRole('email'), '');
  userEvent.type(screen.getByRole('password'), '123456');

  userEvent.click(screen.getByRole('signin'));
  const alert = await screen.findByRole('alert');

  expect(alert).toHaveTextContent('E-mail não pode ser vazio');
});

test('user cannot try to login with invalid email', async () => {
  const history = createMemoryHistory();
  render(
    <Router history={history}>
      <ToastContainer />
      <SignIn />
    </Router>,
  );
  userEvent.type(screen.getByRole('email'), 'user.com');
  userEvent.type(screen.getByRole('password'), '123456');

  userEvent.click(screen.getByRole('signin'));
  const alert = await screen.findByRole('alert');
  expect(alert).toHaveTextContent('O e-mail está incorreto');
});
test('user cannot try to login with empty password', async () => {
  const history = createMemoryHistory();
  render(
    <Router history={history}>
      <ToastContainer />
      <SignIn />
    </Router>,
  );
  userEvent.type(screen.getByRole('email'), 'abc@gmail.com');
  userEvent.type(screen.getByRole('password'), '');

  userEvent.click(screen.getByRole('signin'));
  const alert = await screen.findByRole('alert');

  expect(alert).toHaveTextContent('Senha não pode ser vazia');
});

test('user cannot try to login with password too short', async () => {
  const history = createMemoryHistory();
  render(
    <Router history={history}>
      <ToastContainer />
      <SignIn />
    </Router>,
  );
  userEvent.type(screen.getByRole('email'), 'abc@gmail.com');
  userEvent.type(screen.getByRole('password'), '123');

  userEvent.click(screen.getByRole('signin'));
  const alert = await screen.findByRole('alert');

  expect(alert).toHaveTextContent('A senha não pode ter menos de 6 caracteres');
});

test('login should storage token', async () => {
  const history = createMemoryHistory();
  render(
    <AuthProvider>
      <Router history={history}>
        <ToastContainer />
        <SignIn />
      </Router>
    </AuthProvider>,
  );
  jest.spyOn(window.localStorage.__proto__, 'setItem');
  jest.spyOn(window.localStorage.__proto__, 'getItem');
  userEvent.type(screen.getByRole('email'), 'abcd@gmail.com');
  userEvent.type(screen.getByRole('password'), '123456789');

  userEvent.click(screen.getByRole('signin'));
  const alert = await screen.findByRole('alert');
  expect(alert).toHaveTextContent('Login feito com sucesso!');
  expect(window.localStorage.getItem('@Invision:token')).toEqual(
    'mocked_user_token',
  );
});
