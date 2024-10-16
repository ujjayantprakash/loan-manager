import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import path from 'path';  // <-- Import the path module
import formRoutes from './routes/formRoutes';

// Create an Express app
const app = express();

// Middleware to parse incoming requests
app.use(bodyParser.json());

// Serve static files (frontend)
app.use(express.static(path.join(__dirname, '../public')));  // <-- This serves files from 'public' folder

// Use the form routes for the backend API
app.use('/api', formRoutes);

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/loanManager', {
  //useNewUrlParser: true,
  //useUnifiedTopology: true
})
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.log(err));

// Start the server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

