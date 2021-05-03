import { rest, setupWorker } from 'msw';

const server = setupWorker(
  rest.post('http://mock/sessions', (req, res, ctx) => {
    return res(ctx.json({ token: 'mocked_user_token', user: { id: '123' } }));
  }),
);
server.start();

export default server;
