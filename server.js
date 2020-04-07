const express = require('express');
const morgan = require('morgan');
const dotenv = require('dotenv');
const cors = require('cors');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

dotenv.config({ path: './config.env' });

if (process.env.NODE_ENV === 'development') app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(cors());

mongoose.connect(
    process.env.CONNECTION_STRING,
    { useNewUrlParser: true, useUnifiedTopology: true },
    () => console.log('Connected to database :)')
);

const port = process.env.PORT || 5000;

app.listen(port, () =>
    console.log(
        `Server running in ${process.env.NODE_ENV} mode, on port ${port}`
    )
);

// Import Routers
const userRoutes = require('./routes/UserRoutes');

// Setup API endpoints
app.use('/api/users/', userRoutes);
