const express = require('express');
const bodyParser = require('body-parser');
const sequelize = require('./config/database');
const expenseRoutes = require('./routes/expenseRoutes');

const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.json());
app.use(express.static('public'));

// Routes
app.use('/api', expenseRoutes);

// Sync with database
sequelize.sync()
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server is running on http://localhost:${PORT}`);
        });
    })
    .catch(err => console.log('Error: ' + err));