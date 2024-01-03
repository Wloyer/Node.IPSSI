const express = require('express')
const app = express()
const db = require('./database.js')
const cors = require('cors')
const userRoutes = require('./routes');
const bodyParser = require('body-parser');


//middleware
app.use(express.json())
app.use(cors())
app.use(bodyParser.json());                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             

app.use('/users', userRoutes);

app.listen(8000, function(){
    console.log(`Server ouvert sur 8000`);
})