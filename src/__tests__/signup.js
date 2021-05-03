import '@testing-library/jest-dom';
import React from 'react';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import SignUp from '../pages/SignUp';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { AuthProvider } from '../context/AuthContext';
const server = setupServer(
  rest.post('http://mock/users', (req, res, ctx) => {
    return res(ctx.json({ name: req.body.name, email: req.body.email }));
  }),
);

beforeAll(() => server.listen());

afterEach(() => server.resetHandlers());

afterAll(() => server.close());

test('user cannot create account with empty name', async () => {
  const history = createMemoryHistory();
  render(
    <Router history={history}>
      <ToastContainer />
      <SignUp />
    </Router>,
  );
  userEvent.type(screen.getByRole('email'), 'user@gmail.com');
  userEvent.type(screen.getByRole('password'), '123456');

  userEvent.click(screen.getByRole('signup'));
  const alert = await screen.findByRole('alert');

  expect(alert).toHaveTextContent('Nome não pode ser vazio');
});

test('user cannot create account with empty email', async () => {
  const history = createMemoryHistory();
  render(
    <Router history={history}>
      <ToastContainer />
      <SignUp />
    </Router>,
  );
  userEvent.type(screen.getByRole('name'), 'user dev');
  userEvent.type(screen.getByRole('password'), '123456');

  userEvent.click(screen.getByRole('signup'));
  const alert = await screen.findByRole('alert');

  expect(alert).toHaveTextContent('E-mail não pode ser vazio');
});

test('user cannot create account with empty password', async () => {
  const history = createMemoryHistory();
  render(
    <Router history={history}>
      <ToastContainer />
      <SignUp />
    </Router>,
  );
  userEvent.type(screen.getByRole('name'), 'user dev');
  userEvent.type(screen.getByRole('email'), 'user@gmail.com');

  userEvent.click(screen.getByRole('signup'));
  const alert = await screen.findByRole('alert');

  expect(alert).toHaveTextContent('Senha não pode ser vazia');
});

test('user cannot create account with a short password', async () => {
  const history = createMemoryHistory();
  render(
    <Router history={history}>
      <ToastContainer />
      <SignUp />
    </Router>,
  );
  userEvent.type(screen.getByRole('name'), 'user dev');
  userEvent.type(screen.getByRole('email'), 'user@gmail.com');
  userEvent.type(screen.getByRole('password'), '12345');

  userEvent.click(screen.getByRole('signup'));
  const alert = await screen.findByRole('alert');

  expect(alert).toHaveTextContent('A senha não pode ter menos de 6 caracteres');
});

test('user should see sucess alert after create account', async () => {
  const history = createMemoryHistory();
  render(
    <AuthProvider>
      <Router history={history}>
        <ToastContainer />
        <SignUp />
      </Router>
    </AuthProvider>,
  );
  userEvent.type(screen.getByRole('name'), 'user dev');
  userEvent.type(screen.getByRole('password'), 'user@deviscool');
  userEvent.type(screen.getByRole('email'), 'user@gmail.com');

  userEvent.click(screen.getByRole('signup'));
  const alert = await screen.findByRole('alert');

  expect(alert).toHaveTextContent('Conta criada com sucesso!');
});
