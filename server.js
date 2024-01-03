require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser')
const PORT = process.env.PORT || 3000;
const authRouter = require('./routes/auth');

mongoose.connect(process.env.MONGO_URL);

mongoose.connection.on('connected', () => console.log('Connected to db'));

const app = express();
app.use(cors());
app.use(express.json());
app.use(cookieParser())
app.use('/auth', authRouter);

app.get('/', (req, res) => {
    res.json({ message: 'ok' });
});

app.listen(PORT, () => {
    console.log('Server running on port', PORT);
});
