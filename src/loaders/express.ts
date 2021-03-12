import express from 'express';
import cors from 'cors';
import morgan from 'morgan';

import routes from '../api';
import config from '../config';


export default ({ app }: { app: express.Application }) => {
  /**
   * Health Check endpoints
   * @TODO Look up how to add these
   */
  // app.get('/status', (req, res) => {
  //   res.status(200).end();
  // });
  // app.head('/status', (req, res) => {
  //   res.status(200).end();
  // });

  app.enable('trust proxy');

  app.use(cors());

  app.use(express.json());

  app.use(morgan('dev'));
  
  // Load API routes
  app.use(config.api.prefix, routes());

  // TODO: Look up error handling best practices
  /// catch 404 and forward to error handler
  app.use((req, res, next) => {
    const err = new Error('Not Found');
    err['status'] = 404;
    next(err);
  });

  // error handlers
  app.use((err, req, res, next) => {
    /**
     * Handle 401 thrown by express-jwt library
     */
    if (err.name === 'UnauthorizedError') {
      return res
        .status(err.status)
        .send({ message: err.message })
        .end();
    }
    return next(err);
  });

  app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.json({
      errors: {
        message: err.message,
      },
    });
  });
};
