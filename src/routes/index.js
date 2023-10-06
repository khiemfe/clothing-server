const UserRouter = require('./UserRouter')
const ProductRouter = require('./ProductRouter')
const fs = require('fs')
const base64ToImage = require('base64-to-image')
let { PythonShell } = require('python-shell')

const routes = (app) => {
    app.use('/api/user', UserRouter)
    app.use('/api/product', ProductRouter)
    const arr = ['']
    app.post("/save", (req, res) => {
        // Nhận dữ liệu từ ReactJS
        const text = req.body.imageBase64 
        arr.push(req.body.imageBase64)
        console.log(arr)
        if(text === arr[0]) {
            console.log('banggggggggggggggggggg')
            fs.writeFile('../Clothing_Store/src/components/isLoading.txt',
                'false', function(err) {
                if (err) {
                    console.log(err)
                } else {
                    console.log('File written false successfully!')
                }
            })
            if(arr.length > 1) {
                arr.shift()
            }
        } else {
            console.log('khongggggggggggggggggggg')
            base64ToImage(text.toString(), 'my_images/')

            const imagee = 'my_images/img.jpeg'
            let options = {
                pythonPath: 'python3',
                args:[imagee],
            }

            fs.writeFile('../Clothing_Store/src/components/isLoading.txt', 
                'true', function(err) {
                if (err) {
                    console.log(err)
                } else {
                    console.log('File written true successfully!')
                }
            })

            PythonShell.run("src/routes/age.py", options, function(err, results) {
                if (err) {
                    console.log(err)
                } else {
                    console.log(results[0])
                    fs.writeFile('../Clothing_Store/src/components/age.txt', 
                        results[0], function(err) {
                        if (err) {
                            console.log(err)
                        } else {
                            console.log('File written age successfully!')
                        }
                    })
                }
            })

            PythonShell.run("src/routes/gender.py", options, function(err, results) {
                if (err) {
                    console.log(err)
                } else {
                    console.log(results[0])
                    fs.writeFile('../Clothing_Store/src/components/gender.txt', 
                        results[0], function(err) {
                        if (err) {
                            console.log(err)
                        } else {
                            console.log('File written gender successfully!')
                        }
                    })
                }
            })

            PythonShell.run("src/routes/functions.py", options, function(err, results) {
                if (err) {
                    console.log(err)
                } else {
                    console.log(results[0])
                    fs.writeFile('../Clothing_Store/src/components/bmi.txt', 
                        results[0], function(err) {
                        if (err) {
                            console.log(err)
                        } else {
                            console.log('File written bmi successfully!')
                            fs.writeFile('../Clothing_Store/src/components/isLoading.txt', 
                                'false', function(err) {
                                if (err) {
                                    console.log(err)
                                } else {
                                    console.log('File written false successfully!')
                                }
                            })
                        }
                    })
                }
            })
            
            arr.shift()
        }

        // const promise_Age = new Promise((resolve, reject) => {
        //     PythonShell.run("src/routes/age.py", options, function(err, results) {
        //         if (err) {
        //             reject(err)
        //         } else {
        //             resolve(results)
        //         }
        //     })
        // })
            
        // promise_Age
        // .then((results) => {
        //     console.log(results[0])
        //     fs.writeFile('../Clothing_Store/src/components/age.txt', results[0], function(err) {
        //         if (err) {
        //             console.log(err)
        //         } else {
        //             console.log('File written age successfully!')
        //         }
        //     })
        // })
        // .catch((err) => {
        //     console.log(err)
        // })

    //     const promise_BMI = new Promise((resolve, reject) => {
    //       PythonShell.run("src/routes/functions.py", options, function(err, results) {
    //           if (err) {
    //               reject(err)
    //           } else {
    //               resolve(results)
    //           }
    //       })
    //   })
          
    //   promise_BMI
    //   .then((results) => {
    //       console.log(results[0])
    //       fs.writeFile('../Clothing_Store/src/components/bmi.txt', results[0], function(err) {
    //           if (err) {
    //               console.log(err)
    //           } else {
    //               console.log('File written bmi successfully!')
    //           }
    //       })
    //   })
    //   .catch((err) => {
    //       console.log(err)
    //   })
      
    //   const promise_Gender = new Promise((resolve, reject) => {
    //       PythonShell.run("src/routes/gender.py", options, function(err, results) {
    //           if (err) {
    //               reject(err)
    //           } else {
    //               resolve(results)
    //           }
    //       })
    //   })
          
    //   promise_Gender
    //   .then((results) => {
    //       console.log(results[0])
    //       fs.writeFile('../Clothing_Store/src/components/gender.txt', results[0], function(err) {
    //           if (err) {
    //               console.log(err)
    //           } else {
    //               console.log('File written gender successfully!')
    //           }
    //       })
    //   })
    //   .catch((err) => {
    //       console.log(err)
    //   })
  })
}

module.exports = routes