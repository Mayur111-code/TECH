const express = require('express');
const dotenv = require('dotenv');
const colors = require('colors');
const cors = require('cors');
const passport = require('passport');
const cookieSession = require('cookie-session');

const connectDB = require('./config/db');


dotenv.config();


connectDB();

const app = express();


app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use(
  cors({
    origin: "https://infina-tech.vercel.app",
    credentials: true, 
  })
);



// app.use(
//   cors({
//     origin: "http://localhost:5173/",
//     credentials: true, 
//   })
// );

app.use(
  cookieSession({
    name: 'session',
    keys: [process.env.COOKIE_SECRET || 'infina_key'],
    maxAge: 24 * 60 * 60 * 1000, 
  })
);


require('./config/passport')(passport);
app.use(passport.initialize());
app.use(passport.session());


app.use('/api/user', require('./routes/userRoutes')); 


app.use('/api/admin', require('./routes/adminRoutes')); 


app.use('/api/services', require('./routes/serviceRoutes'));
app.use('/api/projects', require('./routes/projectRoutes'));
app.use('/api/inquiries', require('./routes/inquiryRoutes'));
app.use('/api/blogs', require('./routes/blogRoutes'));

app.use('/api/ai', require('./routes/aiRoutes'))


app.get('/', (req, res) => {
  res.send('Infina Tech API is running...');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(
    `Server running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`
      .yellow.bold
  );
});