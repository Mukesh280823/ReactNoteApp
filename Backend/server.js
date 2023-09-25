const express = require("express");
const app = express();
const mongoose = require("./model/database");
const RegisterUser = require("./Controllers/register");
const port=8000;
const cors = require('cors');
const jwt = require("jsonwebtoken");
const JWT_Key = "fyr74647y7v65656783456789fghtrh{}tr66vbyf7fbv7vb";
// npm install bcrypt
const bcrypt = require('bcrypt');
const bodyParser = require("body-parser");
app.use(cors()); // Enable CORS for your app
app.use(bodyParser.json()); // Use JSON body parser
app.use(express.urlencoded({ extended: true })); // Use URL-encoded body parser
app.use(express.json());


//  Post method for Register User
app.post('/register', async (req, res) => {

    let {name, email, password } = req.body;
    email = email.toLowerCase();
    const encryptedPassword = await bcrypt.hash(password, 10);

    // Server-side validation
    if (!name || !email || !password) {
      return res.status(400).json({ message: 'All fields are required' });
    }
    try {
      // Check if the email already exists
      const existingUser = await RegisterUser.findOne({ email });
      if (existingUser) {
        return res.status(200).json({ message: 'Email is already registered' });
      }
      // Create a new user
      const newRegisterUser = new RegisterUser({ name, email, password: encryptedPassword });
      // Save the user to the database
      await newRegisterUser.save();
      res.json({ message: 'User registered successfully' });
    } catch (error) {
      console.error('Registration error:', error);
      res.status(500).json({ message: 'Error registering user' });
    }
  });

  app.post("/Login", async (req, res) => {

    let { email, password } = req.body;
    email = email.toLowerCase();
    try {
      // Find the user by email in your User model
      const user = await RegisterUser.findOne({ email });
      // Check if the user exists
      if (!user) {
        return res.status(200).json({ message: "User does not exist", success: false });
      }
      // Compare the provided password with the stored hashed password
      const passwordMatch = await bcrypt.compare(password, user.password);
      if (!passwordMatch) {
        return res.status(401).json({ error: "Invalid password", success: false });
      }
      // Generate a JWT token
      const token = jwt.sign({ userId: user._id }, JWT_Key, { expiresIn: '1h' });
  
      res.status(200).json({ status: "ok", data: token, success: true });
    } catch (error) {
      console.error('Login error:', error);
      res.status(500).json({ error: 'Server error' });
    }
  });




app.listen(port, ()=>{
    console.log(`Backend is running on ${port}`)
})