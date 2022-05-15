var express = require('express');
const fs = require("fs");
const College = require("../models/college");
const Major = require("../models/major");
const Course = require("../models/course");
const Helper = require("../util/helper");
const router = express.Router();
const User =  require("../models/user");
const { ObjectId } = require('mongodb');
const majorController = require("../controllers/majorController");


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

router.get('/internships', (req, res) => {
  res.render('internships');
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

router.get('/quiz', (req, res) => {
  res.render('quiz');
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
    req.user.major = major.id;
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
  if (!req.user.major){
    req.flash("success", "you have to chosen a major first!")
    res.redirect('/dashboard');
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

router.get('/majors', async (req, res) => {

  const entries = await Major.find();
  res.render('majors', {majors: entries});
});

router.get('/q1', (req, res) => {
  res.render('question1');
});

router.get('/q2', (req, res) => {
  res.render('question2');
});

router.get('/q3', (req, res) => {
  res.render('question3');
});

router.get('/q4', (req, res) => {
  res.render('question4');
});

router.get('/q5', (req, res) => {
  res.render('question5');
});

router.get('/q6', (req, res) => {
  res.render('question6');
});

router.get('/q7', (req, res) => {
  res.render('question7');
});

router.get('/q8', (req, res) => {
  res.render('question8');
});

count1 = 0; // computer science
count2 = 0; // civil engineering
count3 = 0; // construction engineering management
count4 = 0; // mechanical engineering
count5 = 0; // environmental engineering
count6 = 0; // chemical engineering

// question 1
router.get('/q1a', (req, res) => {
  count2 ++;
  count3 ++;
  count4 ++;
  res.render('question2');
});

router.get('/q1b', (req, res) => {
  count6 ++;
  res.render('question2');
});

router.get('/q1c', (req, res) => {
  count1 ++;
  res.render('question2');
});

router.get('/q1d', (req, res) => {
  count5 ++;
  res.render('question2');
});


// question 2
router.get('/q2a', (req, res) => {
  count1 ++;
  count4 ++;
  res.render('question3');
});

router.get('/q2b', (req, res) => {
  count5 ++;
  count6 ++;
  res.render('question3');
});

router.get('/q2c', (req, res) => {
  count2 ++;
  count3 ++;
  res.render('question3');
});



// question 3
router.get('/q3a', (req, res) => {
  count1 ++;
  count2 ++;
  count4 ++;
  count6 ++;
  res.render('question4');
});

router.get('/q3b', (req, res) => {
  count3 ++;
  count5 ++;
  res.render('question4');
});


// question 4
router.get('/q4a', (req, res) => {
  count4 ++;
  count5 ++;
  count6 ++;
  res.render('question5');
});

router.get('/q4b', (req, res) => {
  count1 ++;
  count2 ++;
  count3 ++;
  res.render('question5');
});


// question 5
router.get('/q5a', (req, res) => {
  count1 ++;
  res.render('question6');
});

router.get('/q5b', (req, res) => {
  count2 ++;
  count3 ++;
  count5 ++;
  res.render('question6');
});

router.get('/q5c', (req, res) => {
  count4 ++;
  res.render('question6');
});

router.get('/q5d', (req, res) => {
  count6 ++;
  res.render('question6');
});


// question 6
router.get('/q6a', (req, res) => {
  count2 ++;
  count3 ++;
  res.render('question7');
});

router.get('/q6b', (req, res) => {
  count4 ++;
  res.render('question7');
});

router.get('/q6c', (req, res) => {
  count5 ++;
  count6 ++;
  res.render('question7');
});

router.get('/q6d', (req, res) => {
  count1 ++;
  res.render('question7');
});


router.get('/q7a', (req, res) => {
  count1 ++;
  count4 ++;
  count6 ++;
  if (count1 == 7){
    count1 = 0;
    count2 = 0;
    count3 = 0;
    count4 = 0;
    count5 = 0;
    count6 = 0;
    res.render('result1');
  }
  else if (count2 == 7) {
    count1 = 0;
    count2 = 0;
    count3 = 0;
    count4 = 0;
    count5 = 0;
    count6 = 0;
    res.render('result2')
  }
  else if (count3 == 7) {
    count1 = 0;
    count2 = 0;
    count3 = 0;
    count4 = 0;
    count5 = 0;
    count6 = 0;
    res.render('result3')
  }
  else if (count4 == 7) {
    count1 = 0;
    count2 = 0;
    count3 = 0;
    count4 = 0;
    count5 = 0;
    count6 = 0;
    res.render('result4')
  }
  else if (count5 == 7) {
    count1 = 0;
    count2 = 0;
    count3 = 0;
    count4 = 0;
    count5 = 0;
    count6 = 0;
    res.render('result5')
  }
  else if (count6 == 7) {
    count1 = 0;
    count2 = 0;
    count3 = 0;
    count4 = 0;
    count5 = 0;
    count6 = 0;
    res.render('result6')
  }
  else if (count1 == 6){
    count1 = 0;
    count2 = 0;
    count3 = 0;
    count4 = 0;
    count5 = 0;
    count6 = 0;
    res.render('result1');
  }
  else if (count2 == 6) {
    count1 = 0;
    count2 = 0;
    count3 = 0;
    count4 = 0;
    count5 = 0;
    count6 = 0;
    res.render('result2')
  }
  else if (count3 == 6) {
    count1 = 0;
    count2 = 0;
    count3 = 0;
    count4 = 0;
    count5 = 0;
    count6 = 0;
    res.render('result3')
  }
  else if (count4 == 6) {
    count1 = 0;
    count2 = 0;
    count3 = 0;
    count4 = 0;
    count5 = 0;
    count6 = 0;
    res.render('result4')
  }
  else if (count5 == 6) {
    count1 = 0;
    count2 = 0;
    count3 = 0;
    count4 = 0;
    count5 = 0;
    count6 = 0;
    res.render('result5')
  }
  else if (count6 == 6) {
    count1 = 0;
    count2 = 0;
    count3 = 0;
    count4 = 0;
    count5 = 0;
    count6 = 0;
    res.render('result6')
  }
  else if (count1 == 5){
    count1 = 0;
    count2 = 0;
    count3 = 0;
    count4 = 0;
    count5 = 0;
    count6 = 0;
    res.render('result1');
  }
  else if (count2 == 5) {
    count1 = 0;
    count2 = 0;
    count3 = 0;
    count4 = 0;
    count5 = 0;
    count6 = 0;
    res.render('result2')
  }
  else if (count3 == 5) {
    count1 = 0;
    count2 = 0;
    count3 = 0;
    count4 = 0;
    count5 = 0;
    count6 = 0;
    res.render('result3')
  }
  else if (count4 == 5) {
    count1 = 0;
    count2 = 0;
    count3 = 0;
    count4 = 0;
    count5 = 0;
    count6 = 0;
    res.render('result4')
  }
  else if (count5 == 5) {
    count1 = 0;
    count2 = 0;
    count3 = 0;
    count4 = 0;
    count5 = 0;
    count6 = 0;
    res.render('result5')
  }
  else if (count6 == 5) {
    count1 = 0;
    count2 = 0;
    count3 = 0;
    count4 = 0;
    count5 = 0;
    count6 = 0;
    res.render('result6')
  }
  else if (count1 == 4){
    count1 = 0;
    count2 = 0;
    count3 = 0;
    count4 = 0;
    count5 = 0;
    count6 = 0;
    res.render('result1');
  }
  else if (count2 == 4) {
    count1 = 0;
    count2 = 0;
    count3 = 0;
    count4 = 0;
    count5 = 0;
    count6 = 0;
    res.render('result2')
  }
  else if (count3 == 4) {
    count1 = 0;
    count2 = 0;
    count3 = 0;
    count4 = 0;
    count5 = 0;
    count6 = 0;
    res.render('result3')
  }
  else if (count4 == 4) {
    count1 = 0;
    count2 = 0;
    count3 = 0;
    count4 = 0;
    count5 = 0;
    count6 = 0;
    res.render('result4')
  }
  else if (count5 == 4) {
    count1 = 0;
    count2 = 0;
    count3 = 0;
    count4 = 0;
    count5 = 0;
    count6 = 0;
    res.render('result5')
  }
  else if (count6 == 4) {
    count1 = 0;
    count2 = 0;
    count3 = 0;
    count4 = 0;
    count5 = 0;
    count6 = 0;
    res.render('result6')
  }
});

router.get('/q7b', (req, res) => {
  count2 ++;
  count3 ++;
  count5 ++;
  if (count1 == 7){
    count1 = 0;
    count2 = 0;
    count3 = 0;
    count4 = 0;
    count5 = 0;
    count6 = 0;
    res.render('result1');
  }
  else if (count2 == 7) {
    count1 = 0;
    count2 = 0;
    count3 = 0;
    count4 = 0;
    count5 = 0;
    count6 = 0;
    res.render('result2')
  }
  else if (count3 == 7) {
    count1 = 0;
    count2 = 0;
    count3 = 0;
    count4 = 0;
    count5 = 0;
    count6 = 0;
    res.render('result3')
  }
  else if (count4 == 7) {
    count1 = 0;
    count2 = 0;
    count3 = 0;
    count4 = 0;
    count5 = 0;
    count6 = 0;
    res.render('result4')
  }
  else if (count5 == 7) {
    count1 = 0;
    count2 = 0;
    count3 = 0;
    count4 = 0;
    count5 = 0;
    count6 = 0;
    res.render('result5')
  }
  else if (count6 == 7) {
    count1 = 0;
    count2 = 0;
    count3 = 0;
    count4 = 0;
    count5 = 0;
    count6 = 0;
    res.render('result6')
  }
  else if (count1 == 6){
    count1 = 0;
    count2 = 0;
    count3 = 0;
    count4 = 0;
    count5 = 0;
    count6 = 0;
    res.render('result1');
  }
  else if (count2 == 6) {
    count1 = 0;
    count2 = 0;
    count3 = 0;
    count4 = 0;
    count5 = 0;
    count6 = 0;
    res.render('result2')
  }
  else if (count3 == 6) {
    count1 = 0;
    count2 = 0;
    count3 = 0;
    count4 = 0;
    count5 = 0;
    count6 = 0;
    res.render('result3')
  }
  else if (count4 == 6) {
    count1 = 0;
    count2 = 0;
    count3 = 0;
    count4 = 0;
    count5 = 0;
    count6 = 0;
    res.render('result4')
  }
  else if (count5 == 6) {
    count1 = 0;
    count2 = 0;
    count3 = 0;
    count4 = 0;
    count5 = 0;
    count6 = 0;
    res.render('result5')
  }
  else if (count6 == 6) {
    count1 = 0;
    count2 = 0;
    count3 = 0;
    count4 = 0;
    count5 = 0;
    count6 = 0;
    res.render('result6')
  }
  else if (count1 == 5){
    count1 = 0;
    count2 = 0;
    count3 = 0;
    count4 = 0;
    count5 = 0;
    count6 = 0;
    res.render('result1');
  }
  else if (count2 == 5) {
    count1 = 0;
    count2 = 0;
    count3 = 0;
    count4 = 0;
    count5 = 0;
    count6 = 0;
    res.render('result2')
  }
  else if (count3 == 5) {
    count1 = 0;
    count2 = 0;
    count3 = 0;
    count4 = 0;
    count5 = 0;
    count6 = 0;
    res.render('result3')
  }
  else if (count4 == 5) {
    count1 = 0;
    count2 = 0;
    count3 = 0;
    count4 = 0;
    count5 = 0;
    count6 = 0;
    res.render('result4')
  }
  else if (count5 == 5) {
    count1 = 0;
    count2 = 0;
    count3 = 0;
    count4 = 0;
    count5 = 0;
    count6 = 0;
    res.render('result5')
  }
  else if (count6 == 5) {
    count1 = 0;
    count2 = 0;
    count3 = 0;
    count4 = 0;
    count5 = 0;
    count6 = 0;
    res.render('result6')
  }
  else if (count1 == 4){
    count1 = 0;
    count2 = 0;
    count3 = 0;
    count4 = 0;
    count5 = 0;
    count6 = 0;
    res.render('result1');
  }
  else if (count2 == 4) {
    count1 = 0;
    count2 = 0;
    count3 = 0;
    count4 = 0;
    count5 = 0;
    count6 = 0;
    res.render('result2')
  }
  else if (count3 == 4) {
    count1 = 0;
    count2 = 0;
    count3 = 0;
    count4 = 0;
    count5 = 0;
    count6 = 0;
    res.render('result3')
  }
  else if (count4 == 4) {
    count1 = 0;
    count2 = 0;
    count3 = 0;
    count4 = 0;
    count5 = 0;
    count6 = 0;
    res.render('result4')
  }
  else if (count5 == 4) {
    count1 = 0;
    count2 = 0;
    count3 = 0;
    count4 = 0;
    count5 = 0;
    count6 = 0;
    res.render('result5')
  }
  else if (count6 == 4) {
    count1 = 0;
    count2 = 0;
    count3 = 0;
    count4 = 0;
    count5 = 0;
    count6 = 0;
    res.render('result6')
  }
});



module.exports = router;
