const express = require('express');
const morgan = require('morgan');
const dotenv = require('dotenv');
const cors = require('cors');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const fs = require('fs');
const https = require('https');
const { auth } = require('express-openid-connect');

/*
                ---- HTTPS / Auth0 / Certificates ----
    Reading certificates for secure connection (HTTPS)
    Generate certificates via mkcert tool 

    ----- MKCERT INSTALL ----
    MacOS / Linux : https://github.com/FiloSottile/mkcert#installation
    Windows:        https://github.com/FiloSottile/mkcert/releases/tag/v1.1.2

    place mkcert in root folder of project and run --> 
        mkcert -install
        mkcert localhost
    
    Generate process.env.APP_SECRET --> 
        openssl rand -hex 32

    place output in process.env.APP_SECRET

    --- CODE ---
    const key = fs.readFileSync('./localhost-key.pem');
    const cert = fs.readFileSync('./localhost.pem');

    const config = {
    required: true,
    auth0Logout: true,
    baseUrl: 'https://localhost:8000',
    issuerBaseURL: 'https://360feedback.eu.auth0.com',
    clientID: '1l2F71ENkEdfdO5ZaM4HCF4cDsd11Ky2',
    appSessionSecret: process.env.APP_SECRET,
    };

    --- ROUTES --- 
    app.get('/', (req, res) =>
    res.send(res.isAuthenticated() ? 'logged in' : 'logged out')
    );

 */

dotenv.config({ path: './config.env' });

// Middleware
if (process.env.NODE_ENV === 'development') app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(cors());
app.use(auth(config));

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
