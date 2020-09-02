import express, { Request, Response, NextFunction } from 'express';
import 'express-async-errors';
import 'reflect-metadata';
import './database';
import router from './routes';
import AppError from './errors/AppError';

const app = express();

app.use(express.json());
app.use(router);

app.use(
    (err: Error, request: Request, response: Response, next: NextFunction) => {
        if (err instanceof AppError) {
            return response
                .status(err.statusCode)
                .json({ message: err.message });
        }

        console.log(err);

        return response.status(500).json({
            message: 'Internal server error',
        });
    },
);

app.listen(3000, () => {
    console.log('🚀️ Server listening on port 3000');
});
