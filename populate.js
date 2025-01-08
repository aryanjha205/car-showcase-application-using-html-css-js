const mongoose = require('mongoose');

// Connect to the MongoDB database
mongoose.connect('mongodb://localhost:27017/carshowcase', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

// Define the structure of a car (schema)
const carSchema = new mongoose.Schema({
    make: String,
    model: String,
    year: Number,
    price: Number,
});

// Create a model based on the schema
const Car = mongoose.model('Car', carSchema);

// Create an array of car objects to add to the database
const cars = [
    { make: 'Toyota', model: 'Camry', year: 2020, price: 24000 },
    { make: 'Honda', model: 'Accord', year: 2019, price: 22000 },
    { make: 'Ford', model: 'Mustang', year: 2021, price: 30000 },
];

// Function to add cars to the database
async function addCars() {
    await Car.insertMany(cars); // Insert the car data
    console.log('Cars added to the database!'); // Confirmation message
    mongoose.connection.close(); // Close the database connection
}

// Call the function to execute it
addCars();