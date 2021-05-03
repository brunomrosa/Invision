import { rest, setupWorker } from 'msw';

const server = setupWorker(
  rest.post('http://mock/users', (req, res, ctx) => {
    return res(ctx.json({ name: req.body.name, email: req.body.email }));
  }),
);
server.start();

export default server;
