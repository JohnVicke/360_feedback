const express = require('express');
const morgan = require('morgan');
const dotenv = require('dotenv');
const cors = require('cors');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

dotenv.config({ path: './config.env' });

if (process.env.NODE_ENV === 'development') app.use(morgan('dev'));

app.use(bodyParser.json());
app.use(cors());

mongoose.connect(
    process.env.CONNECTIONSTRING,
    { useNewUrlParser: true, useUnifiedTopology: true },
    () => {
        console.log('connected to db... :)');
    }
);

const port = process.env.PORT || 5000;

app.listen(port, () =>
    console.log(
        `Server running in ${process.env.NODE_ENV} mode, on port ${port} from server only :)`
    )
);

const companyRoutes = require('./routes/companyRoutes');
const subscriberRoutes = require('./routes/subscriberRoutes');
app.use('/api/advertisers/companies', companyRoutes);
app.use('/api/advertisers/subscribers', subscriberRoutes);
