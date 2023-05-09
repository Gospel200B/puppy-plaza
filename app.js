const express = require ('express');
const app = express();
const bodyParser = require('body-parser');
const morgan = require('morgan');
const mongoose = require('mongoose');

app.use(bodyParser.json());
app.use(morgan('tiny'))
require('dotenv').config();

mongoose.connect(process.env.db,{useUnifiedTopology: true, dbName: 'puppy-plaza'}).then(() => {
    console.log('database connected');
})
.catch((err) => {
    console.log(err);
} )

const port = process.env.PORT 
app.listen(port, ()=> {
    console.log(`listening on port ${port}`)
})