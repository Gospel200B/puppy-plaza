const express = require ('express');
const app = express();
const bodyParser = require('body-parser');
const morgan = require('morgan');
const mongoose = require('mongoose');
app.use(bodyParser.json());
app.use(morgan('tiny'))
const cors = require('cors');
const router = require('./src/routes/index.route');
require('dotenv').config();

app.use('/api/v1', router)
app.use(cors());
app.options('*', cors())

mongoose.connect(process.env.db,{useUnifiedTopology: true, dbName: 'puppy-plaza'}).then(() => {
    console.log('Database connection ready....');
})
.catch((err) => {
    console.log(err);
} )

const port = process.env.PORT 
app.listen(port, ()=> {
    console.log(`listening on port ${port}`)
})