import express from 'express';
import dotenv from 'dotenv';
dotenv.config();


const PORT = process.env.PORT || 4000;
import userRoutes from './routes/userRoutes.js';

const app = express();

app.get('/', (req, res) => {
    res.send('Welcome to user access app API')
});

app.use('/api/users', userRoutes);

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));