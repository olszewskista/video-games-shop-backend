require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const PORT = process.env.PORT;

mongoose.connect(process.env.MONGO_URL);

mongoose.connection.on('connected', () => console.log('Connected to db'));

const app = express();
app.use(cors());

app.get('/', (req, res) => {
    res.json({ message: 'ok' });
});

app.listen(PORT, () => {
    console.log('Server running on port', PORT);
});
