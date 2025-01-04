import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
const PORT = process.env.PORT || 4000;
const app = express();

app.get('/', (req, res) => {
    res.send('Welcome to user access app API')
});

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));