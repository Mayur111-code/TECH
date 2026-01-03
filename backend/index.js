const express = require('express');
const dotenv = require('dotenv');
const colors = require('colors');
const cors = require('cors');
const passport = require('passport');
const cookieSession = require('cookie-session');

const connectDB = require('./config/db');

// 1️⃣ Load environment variables FIRST
dotenv.config();

// 2️⃣ Connect Database
connectDB();

const app = express();

// 3️⃣ Body parsers
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 4️⃣ CORS configuration
app.use(
  cors({
    origin: "http://localhost:5173", // Tuza frontend port
    credentials: true, 
  })
);

// 5️⃣ Cookie session
app.use(
  cookieSession({
    name: 'session',
    keys: [process.env.COOKIE_SECRET || 'infina_key'],
    maxAge: 24 * 60 * 60 * 1000, 
  })
);

// 6️⃣ Passport config
require('./config/passport')(passport);
app.use(passport.initialize());
app.use(passport.session());

// 7️⃣ ROUTES (Check files exist in routes folder)
// USER Routes (Register, Login, Google Auth)
app.use('/api/user', require('./routes/userRoutes')); 

// ADMIN Routes (Admin Login)
app.use('/api/admin', require('./routes/adminRoutes')); 

// Business Logic Routes
app.use('/api/services', require('./routes/serviceRoutes'));
app.use('/api/projects', require('./routes/projectRoutes'));
app.use('/api/inquiries', require('./routes/inquiryRoutes'));
app.use('/api/blogs', require('./routes/blogRoutes'));

// 8️⃣ Test route
app.get('/', (req, res) => {
  res.send('Infina Tech API is running...');
});

// 9️⃣ Server listen
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(
    `Server running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`
      .yellow.bold
  );
});