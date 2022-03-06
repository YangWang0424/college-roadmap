var express = require('express');
const fs = require("fs");
const College = require("../models/college");
const Major = require("../models/major");
const Course = require("../models/course");
const Helper = require("../util/helper");
const {isAdmin} = require("../util/helper");
const router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index.html', {error:req.flash('error'), success:req.flash('success') });
});


router.get("/add_sample_data", Helper.isAdmin, function (req,res) {

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

router.get('/signin', (req, res) => {
  res.render('signin');
});

router.get('/dashboard', (req, res) => {
  res.render('dashboard');
});


router.get('/planner', (req, res) => {
  res.render('planner.html');
});


router.get('/choosecourse', (req, res) => {
  res.render('choosecourse.html');
});



router.get('/choosemajor', (req, res) => {
  res.render('choosemajor');
});


router.get('/majordetail', (req, res) => {
  res.render('majordetail', {major:req.query.major});

});

router.get('/selectedmajor', (req, res) => {
  if (app.locals.selectedcourses.indexOf(req.query.course) === -1 ){
    app.locals.selectedcourses.push(req.query.course)
  }
  res.render('selectedmajor', {courses: app.locals.selectedcourses});

});


module.exports = router;
