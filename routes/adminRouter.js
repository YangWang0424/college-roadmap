var express = require('express');
const fs = require("fs");
const College = require("../models/college");
const Major = require("../models/major");
const Course = require("../models/course");
const Helper = require("../util/helper");
const router = express.Router();
const collegeController = require("../controllers/collegeController");
const User = require("../models/user");

/* GET home page. */
router.get('/', Helper.isAdmin, async function (req, res, next) {
    College.find({}, function (err, colleges) {
        if (err) {req.flash("error", err)}
        res.render('admin.html', {error: req.flash('error'), success: req.flash('success'), colleges:colleges});
    });
});

router.get("/delete_college/:instanceID", Helper.isAdmin,   function (req, res) {
    College.deleteOne({ _id: req.params.instanceID }, function (err) {
        if (err) {
            req.flash('error', "cant delete this item, something went wrong!")
        }
        console.log("...")

        req.flash('success', "deleted it succeed!")
        res.redirect("/admin")
    });
})

router.post('/add_college',  Helper.isAdmin,   function(req, res, next) {
    let name = req.body.name;
    let head = req.body.head;
    let tel = req.body.tel;
    let address = req.body.address;
    let desc = req.body.desc;

    College.create({ name:name, head:head, tel:tel, address:address, desc:desc}, function (err, doc) {
        if (err) {
            req.flash('error', "cant create this item, something went wrong!");
        }
        // saved!
        res.redirect('/admin');
    });

});


router.get('/majors/:collegeID', Helper.isAdmin,    function(req, res, next) {
    let collegeID = req.params.collegeID;
    College.findOne({_id:collegeID}, function (err, college) {
        if (err) {req.flash("error", err)}

        Major.find({college:collegeID}, function (err, majors) {
            if (err) {req.flash("error", err)}

            res.render('admin_add_major.html', {error:req.flash('error'), success:req.flash('success'), college:college, majors:majors});

        })
    });
});

router.post('/majors/:collegeID', Helper.isAdmin, function(req, res, next) {
    let name = req.body.name;
    let head = req.body.head;
    let tel = req.body.tel;
    let address = req.body.address;
    let desc = req.body.desc;

    let collegeID = req.params.collegeID;
    College.findOne({_id:collegeID}, function (err, college) {
        if (err) {req.flash("error", err)}
        Major.create({ name:name, head:head, tel:tel, address:address, desc:desc}, function (err, major) {
            if (err) {
                req.flash('error', "cant create this item, something went wrong!");
            }
            // saved!
            major.college = college;
            major.save(function (err) {
                if (err) {req.flash("error", err)};
                req.flash('success', "created succeed!")
                res.redirect('/admin/majors/'+collegeID);
            })
        });
    });

});



router.get('/delete_major/:collegeID/:instanceID', Helper.isAdmin,  function(req, res, next) {
    Major.deleteOne({ _id: req.params.instanceID }, function (err) {
        if (err) {
            req.flash('error', "cant delete this item, something went wrong!")
        }
        req.flash('success', "deleted it succeed!")
        res.redirect('/admin/majors/'+ req.params.collegeID);
    });
});


router.get('/courses/:collegeID/:majorID',  Helper.isAdmin,  function(req, res, next) {
    Major.findOne({_id: req.params.majorID}).populate("college").populate("courses").exec(function (err, major) {
        if (err) {
            req.flash('error', "cant find major, something went wrong!")
            res.redirect("/admin");
        }

        const college = major.college;
        const courses = major.courses;
        res.render('admin_add_course.html', {
            error: req.flash('error'), success: req.flash('success'),
            major: major, college: college, courses: courses});
    })
});



router.post('/courses/:collegeID/:majorID',   Helper.isAdmin, function(req, res, next) {
    let name = req.body.name;
    let desc = req.body.desc;
    let credit = req.body.credit;

    Major.findOne({_id: req.params.majorID}, function (err, major) {
        if (err) {
            req.flash('error', "cant find this major, something went wrong!");
            res.redirect("/admin");
        }

        Course.create({name: name, desc: desc, credit:credit}, function (err, course) {
            if (err) {
                req.flash('error', "cant create this item, something went wrong!");
            }
            // saved!
            major.courses.push(course.id);
            major.save(function (err) {
                if (err) {
                    req.flash("error", err)
                }
                req.flash('success', "created succeed!")
                res.redirect("/admin/courses/" + req.params.collegeID + "/" + req.params.majorID);
            })
        });

    });
})

router.get('/delete_course/:majorID/:courseID',  Helper.isAdmin, function(req, res, next) {

    Major.findOne({_id: req.params.majorID}, function (err, major) {
        if (err) {
            req.flash('error', err);
            res.redirect("/admin");
        }

        Course.deleteOne({ _id: req.params.courseID }, function (err) {
            if (err) {
                req.flash('error', err)
            }
            major.courses.pull({ _id:  req.params.courseID});
            major.save(function (err, m) {
                if (err) {req.flash('error', err)};
                req.flash('success', "deleted it succeed!")
                res.redirect('/admin/courses/' + m.college + "/" + m.id);
            })
        });
    })

});


router.get("/edit_college/:instanceID",  Helper.isAdmin, function (req,res) {
    College.findOne({_id: req.params.instanceID}, function (err, college){
        if (err) {
            req.flash('error', "cant find this college, something went wrong!");
        }
        res.render('admin_edit_college.html', {error:req.flash('error'), success:req.flash('success'), college:college});
    })
})

router.post("/edit_college/:instanceID",  Helper.isAdmin, function (req,res) {
    let name = req.body.name;
    let head = req.body.head;
    let tel = req.body.tel;
    let address = req.body.address;
    let desc = req.body.desc;

    College.findOneAndUpdate({_id: req.params.instanceID},{ name:name, head:head, tel:tel, address:address, desc:desc}, function (err, college){
        if (err) {
            req.flash('error', err);
        }
        req.flash('success', "updated succeed");
        res.redirect('/admin');
    })
})


router.get("/edit_major/:collegeID/:majorID",  Helper.isAdmin, function (req,res) {
    Major.findOne({_id: req.params.majorID}, function (err, major){
        if (err) {
            req.flash('error', "cant find this major, something went wrong!");
        }
        res.render('admin_edit_major.html', {error:req.flash('error'), success:req.flash('success'), major:major});
    })
})

router.post("/edit_major/:collegeID/:majorID",  Helper.isAdmin, function (req,res) {
    let name = req.body.name;
    let head = req.body.head;
    let tel = req.body.tel;
    let address = req.body.address;
    let desc = req.body.desc;

    Major.findOneAndUpdate({_id: req.params.majorID},{ name:name, head:head, tel:tel, address:address, desc:desc}, function (err, major){
        if (err) {
            req.flash('error', err);
        }
        req.flash('success', "updated succeed");
        res.redirect('/admin/majors/'+ req.params.collegeID);
    })
})


router.get("/edit_course/:collegeID/:majorID/:courseID", Helper.isAdmin,  function (req,res) {
    Course.findOne({_id: req.params.courseID}, function (err, course){
        if (err) {
            req.flash('error', "cant find this major, something went wrong!");
        }
        res.render('admin_edit_course.html', {error:req.flash('error'), success:req.flash('success'), course:course});
    })
})

router.post("/edit_course/:collegeID/:majorID/:courseID", Helper.isAdmin,  function (req,res) {
    let name = req.body.name;
    let desc = req.body.desc;
    let credit = req.body.credit;

    Course.findOneAndUpdate({_id: req.params.courseID},{ name:name, desc:desc, credit:credit}, function (err, course){
        if (err) {
            req.flash('error', err);
        }
        req.flash('success', "updated succeed");
        res.redirect('/admin/courses/' + req.params.collegeID + '/'+ req.params.majorID);
    })
})



/* GET users listing. */
router.get('/users', Helper.isAdmin,  async function (req, res, next) {
    User.find({}).populate("major").populate("courses").exec(function (err, users) {

        res.render("admin_user.html", {error:req.flash('error'),success:req.flash('success'),users:users})
    });

});



module.exports = router;
