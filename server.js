const express = require('express');
const morgan = require('morgan');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const fs = require('fs');
const https = require('https');
const { auth, requiresAuth } = require('express-openid-connect');

const config = {
    required: false,
    auth0Logout: true,
    baseURL: 'https://localhost:8000',
    issuerBaseURL: 'https://360feedback.eu.auth0.com',
    clientID: 'VzDzHt6dHUG3WiAitRcuYZd9fFQHdqwY',
    appSessionSecret:
        '6fc20ed91c00b449ffcb1d9293f6182fea1fea6ff1a4145e9c59bcce39f97e93'
};

const app = express();

// import routes
const postRoutes = require('./routes/posts');

dotenv.config({ path: './config.env' });

// Middlewares

if (process.env.NODE_ENV === 'development') app.use(morgan('dev'));

app.use(bodyParser.json());
app.use(cors());
app.use(auth(config));

// Connecting to database

mongoose.connect(
    process.env.CONNECTIONSTRING,
    { useNewUrlParser: true, useUnifiedTopology: true },
    () => {
        console.log('Connected to Database...');
    }
);

const port = process.env.PORT || 5000;
/*
https
    .createServer(
        {
            key: fs.readFileSync('./rootCA.key'),
            cert: fs.readFileSync('./rootCA.pem'),
            passphrase: process.env.PASS_PHRASE
        },
        app
    )
    .listen(port, () => {
        console.log(
            `Server running in ${process.env.NODE_ENV} mode, on port ${port}`
        );
    });
*/

app.listen(port, () => {
    console.log(
        `Server running in ${process.env.NODE_ENV} mode, on port ${port}`
    );
});
app.use('/api/posts/', postRoutes);

app.get('/', (req, res) => {
    res.send(req.isAuthenticated() ? 'logged in ' : 'logged out');
});

app.get('/profile', requiresAuth(), (req, res) => {
    res.send(JSON.stringify(req.openid.user));
});
