import { Router } from 'express';

export const apiRouter = Router();

apiRouter.get('/hello', (req, res) => {
  res.json({ message: 'hello' });
});
