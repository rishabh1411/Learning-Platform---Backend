const express = require('express');
const usersLib = require('./lib/routes/users')
const authLib = require('./lib/routes/auth')
const app = express();

app.get('/', (req, res) => res.send('API Running'))

app.use(express.json({ extended: false }));

// define routes
app.use('/users', usersLib)
app.use('/auth', authLib)
// console.log(app)
const PORT = process.env.PORT || 5000

app.listen(PORT, () => console.log(`Server started on port ${PORT}`))