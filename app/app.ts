/* eslint-disable @typescript-eslint/no-unused-vars */
import express, { Application, NextFunction, Request, Response } from 'express';
import SwaggerParser from '@apidevtools/swagger-parser';
import { connector } from 'swagger-routes-express';
import * as OpenApiValidator from 'express-openapi-validator';
import { StatusCodes } from 'http-status-codes';
import swaggerUI from 'swagger-ui-express';
import cors from 'cors';
import morgan from 'morgan';
import { routes } from './routes';

const Api = async (): Promise<Application> => {

  const apiDescription = await SwaggerParser.validate('app/swagger/swagger.yml');

  const app = express();
  const connect = connector(routes, apiDescription);

  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.use(morgan('tiny'));

  app.use(cors({
    origin: '*',
  }));

  app.use(OpenApiValidator.middleware({
    apiSpec: 'app/swagger/swagger.yml',
    validateRequests: true,
  }));

  app.use((err: {
    status: number;
    message: string;
    errors: unknown;
  }, _req: Request, res: Response, _next: NextFunction) => {

    res.status(err.status || StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: err.message,
      errors: err.errors
    });

  });

  app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(apiDescription));

  // default route
  app.get('/', (_req: Request, res: Response) => {

    res.status(StatusCodes.OK).json({ message: 'API is running' });

  });

  connect(app);

  return app;

};

export { Api };