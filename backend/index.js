import mongoose from 'mongoose';

const _express = require('express');
const _mongoose = require('mongoose');
const _cors = require('cors');

mongoose.connect('mongodb://127.0.0.1:27017/SONIC-The music streaaming app')
.then(() => {
    console.log('Connected to MongoDB');
})
.catch(() => {
    console.error('Error connecting to MongoDB');
});

const app = _express();
app.use(_cors());

app.get('/', (_req, res) => {
    res.send('Welcome to SONIC');
});

app.listen(7000, () => {
    console.log('Server is running on port 7000');
});





