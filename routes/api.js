var express = require('express');
var router = express.Router();
// Require controller modules.
var college_controller = require('../controllers/collegeController');
var major_controller = require('../controllers/majorController');
var course_controller = require('../controllers/courseController');
var user_controller = require('../controllers/userController');

/// college ROUTES ///
// POST request for creating college.
router.post('/college/create', college_controller.college_create_post);
// POST request to delete college.
router.delete('/college/:id/delete', college_controller.college_delete);
// patch request to update college.
router.patch('/college/:id/update', college_controller.college_update_patch);
// GET request for one college.
router.get('/college/:id', college_controller.college_detail);
// GET request for list of all colleges.
// get all the colleges (accessed at GET http://localhost:3000/api/colleges)
router.get('/colleges', college_controller.college_list);



/// major ROUTES ///
// POST request for creating major.
router.post('/major/create', major_controller.major_create_post);
// POST request to delete major.
router.delete('/major/:id/delete', major_controller.major_delete);
// patch request to update major.
router.patch('/major/:id/update', major_controller.major_update_patch);
// GET request for one major.
router.get('/major/:id', major_controller.major_detail);
// GET request for list of all majors.
// get all the majors (accessed at GET http://localhost:3000/api/majors)
router.get('/majors', major_controller.major_list);



/// course ROUTES ///
// POST request for creating course.
router.post('/course/create', course_controller.course_create_post);
// POST request to delete course.
router.delete('/course/:id/delete', course_controller.course_delete);
// patch request to update course.
router.patch('/course/:id/update', course_controller.course_update_patch);
// GET request for one course.
router.get('/course/:id', course_controller.course_detail);
// GET request for list of all majors.
// get all the courses (accessed at GET http://localhost:3000/api/courses)
router.get('/courses', course_controller.course_list);



/// user ROUTES ///
// POST request for creating user.
router.post('/user/create', user_controller.user_create_post);
// POST request to delete user.
router.delete('/user/:id/delete', user_controller.user_delete);
// patch request to update user.
router.patch('/user/:id/update', user_controller.user_update_patch);
// GET request for one user.
router.get('/user/:id', user_controller.user_detail);
// GET request for list of all users.
// get all the users (accessed at GET http://localhost:3000/api/courses)
router.get('/users', user_controller.user_list);




module.exports = router;
