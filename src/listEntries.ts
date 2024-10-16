import mongoose from 'mongoose';
import User from './models/user';  // Assuming you are importing your User model

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/loanManager')
  .then(async () => {
    console.log('MongoDB connected');
    
    // Fetch all user documents
    const users = await User.find({});
    console.log('Entries in database:', users);

    // Close connection after fetching
    mongoose.connection.close();
  })
  .catch((err) => console.log(err));

