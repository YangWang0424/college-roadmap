const fs = require('fs');
const College = require('./models/college');

let rawdata = fs.readFileSync('data.json');
let colleges = JSON.parse(rawdata);

for (let i=0; i < colleges.length; i++) {

    var c =  new College(colleges[i]["college"])
    c.save(function (err, cb) {
        if (err){
            console.log(err)
        }
    })

}