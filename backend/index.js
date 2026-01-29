require('dotenv').config();
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const authRoutes = require('./src/authRoutes');
const emailRoutes = require('./src/emailRoutes');
const pushRoutes = require('./src/pushRoutes');

const app = express();


require('./src/autoLabeler');

app.use(cors({
  origin: process.env.FRONTEND_URL,
  credentials: true
}));
app.use(express.json());
app.use(cookieParser());

app.get('/', (req, res) => {
  res.send('Backend is running');
});

app.use('/auth', authRoutes);
app.use('/api/emails', emailRoutes);
app.use('/gmail', pushRoutes); // Pub/Sub push endpoint


const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log('Backend listening on port', PORT);
});