var express = require('express');
const fs = require("fs");
const College = require("../models/college");
const Major = require("../models/major");
const Course = require("../models/course");
const Helper = require("../util/helper");
const router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index.html', { title: 'Express' });
});


router.get("/add_sample_data",  function (req,res) {

  let rawdata = fs.readFileSync('./data.json');
  let colleges = JSON.parse(rawdata);
  for (let i=0; i < colleges.length; i++) {
    let college = colleges[i]
    college = Helper.filterObject(college,'majors');
    console.log(college);
    let c =  new College(college)
    console.log(c);
    let majors = colleges[i]["majors"];
    // add college
    c.save(function (err, new_c) {
      if (err){res.json(err)}

      for (let i=0; i < majors.length; i++) {
        let major = Helper.filterObject(majors[i],'courses');
        major["college"] = new_c._id

        let courses = majors[i]["courses"];
        // add major
        let m =  new Major(major);
        m.save(function (err, new_m) {
          if (err){res.json(err)}

            for (let i=0; i < courses.length; i++) {
              let course = courses[i];
              course["major"] = new_m._id
              let course_ =  new Course(course);
              course_.save(function (err, new_c) {
                  if (err){res.json(err)}
                });
              }
          })
      }

    })
  }
  res.json({msg:"all sample data inserted!"})
})


module.exports = router;
