// server.js

// Import necessary modules
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

// Create an instance of Express
const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Connect to MongoDB
mongoose.connect('mongodb://0.0.0.0:27017/your-database-name', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => console.log('Connected to MongoDB'));

// Define a schema for your data
const teamSchema = new mongoose.Schema({
  team_name: String,
  team_member_1_name: String,
  team_member_1_department: String,
  team_member_1_phone: String,
  team_member_1_email: String,
  team_member_1_register_number: String,
  transaction_id: String,
  payment_screenshot: String
});

// Define a model based on the schema
const Team = mongoose.model('Team', teamSchema);

const credentials = [
  { email: 'swetha@gmail.com', password: 'Swetha123' },
  { email: 'example@example.com', password: 'Example123' },
  // Add more email-password combinations as needed
];

// POST route to handle form submission
app.post('/submit-form', async (req, res) => {
  try {
    // Create a new instance of the Team model with the data from the request body
    const newTeam = new Team(req.body);
    // Save the newTeam instance to the database
    await newTeam.save();
    res.status(201).json({ message: 'Data saved successfully' });
  } catch (error) {
    console.error('Error saving data:', error);
    res.status(500).json({ error: 'An error occurred while saving data' });
  }
});

// GET route to fetch data from MongoDB
// GET route to fetch data from MongoDB
// GET route to fetch all data from MongoDB
app.get('/teams', async (req, res) => {
    try {
      // Retrieve all teams from the database
      const teams = await Team.find();
      res.json(teams);
    } catch (error) {
      console.error('Error fetching data:', error);
      res.status(500).json({ error: 'An error occurred while fetching data' });
    }
  });

 
  
  // Middleware to parse JSON bodies
  app.use(bodyParser.json());
  
  // Endpoint to handle login requests
  app.post('/login', (req, res) => {
    // Retrieve email and password from request body
    const { email, password } = req.body;
  
    // Check if any of the email-password combinations match
    const matchedCredentials = credentials.find(cred => cred.email === email && cred.password === password);
  
    if (matchedCredentials) {
      // Redirect to the data page upon successful login
      res.status(200).json({ message: 'Succesfully' });
      res.redirect('/teams');
    } else {
      res.status(401).json({ message: 'Incorrect email or password' });
    }
  });
  

  
  

// Start the server
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
