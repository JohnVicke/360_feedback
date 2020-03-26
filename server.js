const express = require('express');
const morgan = require('morgan');
const dotenv = require('dotenv');
const cors = require('cors');
const app = express();

dotenv.config({ path: './config.env' });

if (process.env.NODE_ENV === 'development') app.use(morgan('dev'));

app.get('/api/test', (req, res) => {
    const testing = [
        { id: 1, firstName: 'Viktor', lastName: 'Malmedal' },
        { id: 2, firstName: 'Pontus', lastName: 'Sundgren' },
        { id: 3, firstName: 'Vidar', lastName: 'Häggström' },
        { id: 4, firstName: 'Staffan', lastName: 'Westerlund' },
        { id: 5, firstName: 'Isak', lastName: 'Larsson' }
    ];

    res.json(testing);
});

const port = process.env.PORT || 5000;

app.listen(port, () =>
    console.log(
        `Server running in ${process.env.NODE_ENV} mode, on port ${port}`
    )
);
