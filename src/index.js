const express = require('express')
const mongoose = require('mongoose');
const routes = require('./routes')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const cors = require('cors') // bảo mật và tránh lỗi khi dùng các gmail giống nhau

require('dotenv').config() // có cái này mới lấy được thằng bên env
let { PythonShell } = require('python-shell')
const fs = require('fs')


const app = express()
const port = process.env.PORT || 3001



// const imagee = 'my_images/img.jpeg'
// let options = {
//     pythonPath: 'python',
//     args:[imagee]
// }

// const promise_Age = new Promise((resolve, reject) => {
//     PythonShell.run("src/age.py", options, function(err, results) {
//         if (err) {
//             reject(err);
//         } else {
//             resolve(results);
//         }
//     });
// });
    
// promise_Age
// .then((results) => {
//     console.log(results[0]);
//     fs.writeFile('../Clothing_Store/src/components/age.txt', results[0], function(err) {
//         if (err) {
//             console.log(err);
//         } else {
//             console.log('File written successfully!');
//         }
//     });
// })
// .catch((err) => {
//     console.log(err);
// });

// const promise_BMI = new Promise((resolve, reject) => {
//     PythonShell.run("src/functions.py", options, function(err, results) {
//         if (err) {
//             reject(err);
//         } else {
//             resolve(results);
//         }
//     });
// });
    
// promise_BMI
// .then((results) => {
//     console.log(results[0]);
//     fs.writeFile('../Clothing_Store/src/components/bmi.txt', results[0], function(err) {
//         if (err) {
//             console.log(err);
//         } else {
//             console.log('File written successfully!');
//         }
//     });
// })
// .catch((err) => {
//     console.log(err);
// });

// const promise_Gender = new Promise((resolve, reject) => {
//     PythonShell.run("src/gender.py", options, function(err, results) {
//         if (err) {
//             reject(err);
//         } else {
//             resolve(results);
//         }
//     });
// });
    
// promise_Gender
// .then((results) => {
//     console.log(results[0]);
//     fs.writeFile('../Clothing_Store/src/components/gender.txt', results[0], function(err) {
//         if (err) {
//             console.log(err);
//         } else {
//             console.log('File written successfully!');
//         }
//     });
// })
// .catch((err) => {
//     console.log(err);
// });

    



app.use(cors())
app.use(bodyParser.json())
app.use(cookieParser())
app.use(express.json({limit: '50mb'}))
app.use(express.urlencoded({limit: '50mb'}))

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