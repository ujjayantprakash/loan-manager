"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const user_1 = __importDefault(require("./models/user")); // Assuming you are importing your User model
// Connect to MongoDB
mongoose_1.default.connect('mongodb://localhost:27017/loanManager')
    .then(async () => {
    console.log('MongoDB connected');
    // Fetch all user documents
    const users = await user_1.default.find({});
    console.log('Entries in database:', users);
    // Close connection after fetching
    mongoose_1.default.connection.close();
})
    .catch((err) => console.log(err));
