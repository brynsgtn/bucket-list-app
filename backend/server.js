import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import cookieParser from 'cookie-parser';
import { notFound, errorHandler } from './middlewares/errorMiddleware.js';
import connectDB from './config/db.js';
const PORT = process.env.PORT || 4000;
import userRoutes from './routes/userRoutes.js';

connectDB();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());

app.use('/api/users', userRoutes);

app.get('/', (req, res) => {
    res.send('Welcome to user access app API')
});

app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));