const express = require('express');
const morgan = require('morgan');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

// import routes
const postRoutes = require('./routes/posts');

dotenv.config({ path: './config.env' });

// Middlewares

if (process.env.NODE_ENV === 'development') app.use(morgan('dev'));

app.use(bodyParser.json());
app.use(cors());

// Connecting to database

mongoose.connect(
    process.env.CONNECTIONSTRING,
    { useNewUrlParser: true, useUnifiedTopology: true },
    () => {
        console.log('Connected to Database...');
    }
);

const port = process.env.PORT || 5000;

app.listen(port, () =>
    console.log(
        `Server running in ${process.env.NODE_ENV} mode, on port ${port}`
    )
);

app.use('/api/posts/', postRoutes);
