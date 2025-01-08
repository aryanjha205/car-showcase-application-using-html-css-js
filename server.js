const express = require('express');
const path = require('path');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '../client')));

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/car_showcase', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const carSchema = new mongoose.Schema({
    name: String,
    image: String,
    details: String,
});

const Car = mongoose.model('Car', carSchema);

// API Routes
app.get('/api/cars', async (req, res) => {
    try {
        const cars = await Car.find();
        res.json(cars);
    } catch (error) {
        res.status(500).send('Error fetching cars');
    }
});

app.post('/api/cars', async (req, res) => {
    try {
        const newCar = new Car(req.body);
        await newCar.save();
        res.status(201).json(newCar);
    } catch (error) {
        res.status(400).send('Error saving car');
    }
});

// Serve Frontend
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/index.html'));
});

// Start Server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
