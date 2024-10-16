"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const body_parser_1 = __importDefault(require("body-parser"));
const path_1 = __importDefault(require("path")); // <-- Import the path module
const formRoutes_1 = __importDefault(require("./routes/formRoutes"));
// Create an Express app
const app = (0, express_1.default)();
// Middleware to parse incoming requests
app.use(body_parser_1.default.json());
// Serve static files (frontend)
app.use(express_1.default.static(path_1.default.join(__dirname, '../public'))); // <-- This serves files from 'public' folder
// Use the form routes for the backend API
app.use('/api', formRoutes_1.default);
// Connect to MongoDB
mongoose_1.default.connect('mongodb://localhost:27017/loanManager', {
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
