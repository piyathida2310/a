const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const { readdirSync } = require('fs');
const db = require('./connectDatabase/DatabaseSql')
const port = 3001;


const app = express();

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

readdirSync('./Routers')
    .map((prefix) => app.use('/', require('./Routers/' + prefix)))

app.listen(port, () => {
    try {
        console.log('Server Started Successfully ✅');
    } catch (error) {
        console.log(error);
    }
})