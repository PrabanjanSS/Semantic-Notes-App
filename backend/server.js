// 1. ABSOLUTE PATH FIRST: Force environment variables to load before anything else runs
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '.env') });

// 2. NOW import modules and routes
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const noteRoutes = require('./routes/noteRoutes');

const app = express();

// Global Middleware
app.use(cors());
app.use(express.json());

// Establish Database Connection
connectDB();

// API Endpoints Route Binding
app.use('/api/notes', noteRoutes);

const PORT = process.env.PORT || 5003;
app.listen(PORT, () => console.log(`🚀 Server listening on port ${PORT}`));// 1. ABSOLUTE PATH FIRST: Force environment variables to load before anything else runs
require('dotenv').config({ path: path.resolve(__dirname, '.env') });

// 2. NOW import modules and routes
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const noteRoutes = require('./routes/noteRoutes');

const app = express();

// Global Middleware
app.use(cors({
    origin: process.env.FRONTEND_URL || '*'
}));
app.use(express.json());

// Establish Database Connection
connectDB();

// API Endpoints Route Binding
app.use('/api/notes', noteRoutes);

const PORT = process.env.PORT || 5003;
app.listen(PORT, () => console.log(`🚀 Server listening on port ${PORT}`));// 1. ABSOLUTE PATH FIRST: Force environment variables to load before anything else runs
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '.env') });

// 2. NOW import modules and routes
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const noteRoutes = require('./routes/noteRoutes');

const app = express();

// Global Middleware
app.use(cors());
app.use(express.json());

// Establish Database Connection
connectDB();

// API Endpoints Route Binding
app.use('/api/notes', noteRoutes);

const PORT = process.env.PORT || 5003;
app.listen(PORT, () => console.log(`🚀 Server listening on port ${PORT}`));