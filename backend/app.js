const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const authRoutes = require('./routes/auth');
const wordRoutes = require('./routes/words');
const statsRoutes = require('./routes/stats');
const adminRoutes = require('./routes/admin');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/words', wordRoutes);
app.use('/api/stats', statsRoutes);
app.use('/api/admin', adminRoutes);

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(async () => {
    const User = require('./models/User');
    const userCount = await User.countDocuments();
    if (userCount === 0) {
      await User.create({
        username: 'testuser',
        email: 'test@example.com',
        password: '123456',
        role: 'user',
        stats: []
      });
      console.log('Test kullanıcısı eklendi: test@example.com / 123456');
    }
    app.listen(5000, () => console.log('Server started on port 5000'));
  })
  .catch(err => console.log(err));