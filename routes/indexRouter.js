var express = require('express');
const fs = require("fs");
const College = require("../models/college");
const Major = require("../models/major");
const Course = require("../models/course");
const Helper = require("../util/helper");
const router = express.Router();
const User =  require("../models/user");
const { ObjectId } = require('mongodb');

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

router.get('/dashboard', Helper.isLoggedIn, (req, res) => {
  let user = req.user;
  // check if user has major
  if (user.major){
    User.findOne({ _id: user.id }).populate('major').populate('courses').exec(function (err, user) {

      res.render('dashboard', {error: req.flash('error'), success: req.flash('success'), user:user});
    });
  }else{
    req.flash('error', 'You dont have major yet, please choose your major first!')
    res.redirect("/choosemajor");
  }
});


router.get('/choosemajor',  Helper.isLoggedIn,(req, res) => {

  if (req.user.major){
    req.flash("success", "you already chosen a major!")
    res.redirect('dashboard');
  }

  Major.find({}, function (err, majors) {
    if (err){
      req.flash("err", err)
    }
    res.render('choosemajor', {error: req.flash('error'), success: req.flash('success'), majors:majors});
  })
});


router.get('/majordetail/:majorID',  Helper.isLoggedIn,(req, res) => {
  if (req.user.major){
    req.flash("success", "you already chosen a major!")
    res.redirect('dashboard');
  }

  Major.findOne({_id:req.params.majorID}, function (err, major){
    if (err){
      req.flash("err", err)
    }
    res.render('majordetail', {error: req.flash('error'), success: req.flash('success'), major:major});
  })
});


// user choose major
router.post('/majordetail/:majorID',  Helper.isLoggedIn,(req, res) => {
  if (req.user.major){
    req.flash("success", "you already chosen a major!")
    res.redirect('dashboard');
  }

  Major.findOne({_id:req.params.majorID}, function (err, major){
    if (err){
      req.flash("err", err)
    }
    req.user.major = major;
    req.user.save(function (err) {
      if (err){
        req.flash("err", err)
      }
      req.flash('success', 'Congratulations, You choose a major!');
      res.redirect("/selectedmajor");
    })
  })
});

router.get('/selectedmajor', Helper.isLoggedIn, (req, res) => {
  if (req.user.major){
    req.flash("success", "you already chosen a major!")
    res.redirect('dashboard');
  }


  Major.findOne({_id:req.user.major}, function (err, major) {
    if (err){
      req.flash("err", err)
    }
    res.render('selectedmajor', {error: req.flash('error'), success: req.flash('success'), major:major});
  });
});



router.get('/planner',  Helper.isLoggedIn,(req, res) => {
  if (!req.user.major){
    req.flash("error", "you have to choose a major first!")
    res.redirect('dashboard');
  }
  User.findOne({ _id: req.user.id }).populate('major').exec(function (err, user) {
    Major.findOne({ _id: user.major.id }).populate('courses').exec(function (err, major) {
      res.render('planner', {error: req.flash('error'), success: req.flash('success'), user:user, major:major});
    });
  });
});


router.get('/choosecourse',  Helper.isLoggedIn,(req, res) => {
  if (!req.user.major){
    req.flash("error", "you have to choose a major first!")
    res.redirect('dashboard');
  }
  Major.findOne({ _id: req.user.major }).populate('courses').exec(function (err, major) {
    res.render('choosecourse.html', {
      error: req.flash('error'),
      success: req.flash('success'),
      user:req.user, major:major
    });

  });

});


router.post('/choosecourse',  Helper.isLoggedIn,(req, res) => {
  if (!req.user.major){
    req.flash("error", "you have to choose a major first!")
    res.redirect('dashboard');
  }
  coursesID = req.body.courseInputID.split(" ");
  coursesID = coursesID.map( v => ObjectId(v));
  console.log(coursesID);

  if (coursesID){
    User.findOne({ _id: req.user.id }).populate('courses').exec(function (err, user) {
      coursesID.map(function (v) {
        user.courses.push(v);
      });

      user.save(function (error) {
        if (err){
          req.flash("error", error)
          res.redirect('/choosecourse');
        }
        req.flash("success", "choose course succeed!");
        res.redirect("/dashboard")
      })
    });
  }else{
    req.flash("error", "please choose a course!")
    res.redirect("/choosecourse")
  }

});





module.exports = router;