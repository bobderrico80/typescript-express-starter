import { Router } from 'express';

export const mainRouter = Router();

mainRouter.get('/', (req, res) => {
  res.render('main/main.njk');
});
