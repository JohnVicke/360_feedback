const express = require('express');
const morgan = require('morgan');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose')

const app = express();

const movieRouter = require('./routes/movie-router')

dotenv.config({ path: './config.env' });

if (process.env.NODE_ENV === 'development') app.use(morgan('dev'));

app.use(bodyParser.json());
app.use(cors());




mongoose
    .connect(process.env.CONNECTIONSTRING, { useNewUrlParser: true,
                                            useUnifiedTopology: true },
                                            ()=>{console.log("Connected! :)")})
    .catch(e => {
        console.error('Connection error', e.message)
    })

const port = process.env.PORT || 5000;

app.listen(port, () =>
    console.log(
        `Server running in ${process.env.NODE_ENV} mode, on port ${port}`
    )
);
app.use('/api', movieRouter)

//app.use('/api/posts/', postRoutes);




