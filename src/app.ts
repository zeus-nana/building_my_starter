import AppError from './utils/appError';
import express, { NextFunction, Request, Response } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import morgan from 'morgan';
import globalErrorHandler from './controllers/errorController';
import userRoutes from './routes/userRoutes';

// Loading of the environment variables in config.env file.
dotenv.config({ path: './config.env' });

/*// Host address.
const host: any = process.env.API_HOST || '127.0.0.1';
// Port used by the API.
const port: any = process.env.API_PORT || 3333;*/

const app = express();

// MIDDLEWARES
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Specifies the API to use JSON to parse server responses.
app.use(express.json());

// Specifies the API to use CORS to prevent XSS attacks.
app.use(cors());

// Specifies the API to use methods from the routes file.
app.use('/api/v1/users', userRoutes);

app.all('*', (req: Request, res: Response, next: NextFunction) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);

export default app;
