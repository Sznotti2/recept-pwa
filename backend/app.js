require('dotenv').config();
const express = require('express');
const cors = require('cors');
const cookieSession = require("cookie-session");
const cookieParser = require('cookie-parser');
const userRoutes = require('./routes/user.routes');

const app = express();
app.use(cors());
app.use(express.json()); // parse requests of content-type - application/json
app.use(express.urlencoded({ extended: true })); // parse requests of content-type - application/x-www-form-urlencoded
app.use(cookieParser());

// Cookie Session
app.use(cookieSession({
  name: 'session',
  keys: [process.env.COOKIE_KEY],
  httpOnly: true,
  maxAge: 24 * 60 * 60 * 1000 // 24 hours
}));

// Routes
app.use('/api/user', userRoutes);
// app.use('/api/recipe', recipeRoutes);
// app.use('/api/blog', blogRoutes);

// Connect to Database
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));


