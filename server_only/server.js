const express = require('express');
const morgan = require('morgan');
const dotenv = require('dotenv');
const cors = require('cors');
const app = express();

dotenv.config({ path: './config.env' });

if (process.env.NODE_ENV === 'development') app.use(morgan('dev'));

const port = process.env.PORT || 5000;

app.listen(port, () =>
    console.log(
        `Server running in ${process.env.NODE_ENV} mode, on port ${port}`
    )
);
