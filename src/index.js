const express = require('express')
const mongoose = require('mongoose');
const routes = require('./routes')
const bodyParser = require('body-parser')

require('dotenv').config() // có cái này mới lấy được thằng bên env

const app = express()
const port = process.env.PORT || 3001
app.use(bodyParser.json())

// app.get('/', (req, res) => {
//     res.send('Hello')
// })

routes(app)

async function connect() {
    try {
        await mongoose.connect(`${process.env.MONGO_DB}`);
        console.log('Connect successfully!');
    } catch (error) {
        console.log('Connect failure!');
    }
}
connect()

// module.exports = { connect };

app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`);
});