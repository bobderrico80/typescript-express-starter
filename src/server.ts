import { json } from 'body-parser';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import express, { NextFunction, Request, Response } from 'express';
import morgan from 'morgan';
import { configure } from 'nunjucks';
import { resolve } from 'path';
import { apiRouter } from './routers/api.router';
import { mainRouter } from './routers/main.router';
import { logger } from './services/logger.service';

dotenv.config();

const port = process.env.PORT || 8080;

const server = express();

(async () => {
  try {
    // Middleware
    server.use(morgan('dev'));
    server.use(cookieParser());
    server.use(json());

    // Static files
    server.use('/static', express.static(resolve(__dirname, 'static')));
    server.use('/static/bootstrap', express.static(resolve(__dirname, '../node_modules/bootstrap')));

    // Configure Nunjucks
    configure(resolve(__dirname, 'views'), { autoescape: true, express: server });

    // Routes
    server.use('/', mainRouter);
    server.use('/api', apiRouter);

    // 404 route catch-all handler
    server.use((req, res) => {
      res.status(404).send();
    });

    // Global error handler
    // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars
    server.use((error: any, req: Request, res: Response, next: NextFunction) => {
      logger.error(error);
      res.status(500).send();
    });

    server.listen(port, () => {
      logger.info(`🎉 Application listening on port ${port}!`)
    });

  } catch (error) {
    logger.error('Error initializing application', error);
    process.exit(1);
  }
})();
