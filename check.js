let {PythonShell} = require('python-shell')

// let options = {
//     pythonPath: 'python',
//     args:["haha", "huhu"],
// }
// ps.PythonShell.run("check.py", options, function(err, results){
//     if(err) {
//             console.log(err)
//         }
//     else {
//         console.log('kq',results)
//         console.log('ok')
//     }
// })

const imagee = 'src/routes/img.jpeg'
let options = {
    pythonPath: 'python3',
    args:[imagee]
}
const promise = new Promise((resolve, reject) => {
    PythonShell.run("check.py", options, function(err, results) {
      if (err) {
        reject(err);
      } else {
        resolve(results);
      }
    });
  });
  
  promise
  .then((results) => {
    console.log(results);
  })
  .catch((err) => {
    console.log(err);
  });
