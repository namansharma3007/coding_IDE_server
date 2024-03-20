const express = require('express');
const cors = require('cors');
require('dotenv');
const routes = require('./routes/routes');
const bodyParser = require('body-parser');

const PORT = process.env.PORT || 8000;

require('./database/db');

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use('/api', routes);

app.listen(PORT, () => {
    console.log(`Server is running on PORT: ${PORT}`);
});