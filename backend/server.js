import express from 'express';
const PORT = 4000;

const app = express();

app.get('/', (req, res) => {
    res.send('Welcome to user access app API')
});

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));