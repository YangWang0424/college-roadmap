/************************************************************************************************* 
  
  Includes and Dependencies
  
*************************************************************************************************/
// Main depencies
const parser = require('body-parser');
const express = require('express');
//const session = require('express-session');         // Not sure if we will use this?
const nunjucks = require('nunjucks')

// Handlers for database entities
/* What this might look like later:
const Course = require('./handlers/course');
const Degree = require('./handlers/degree');
Where these are .js files in the handlers folder (ex: course.js)
*/

/************************************************************************************************* 
  
  Configure the Server
  
*************************************************************************************************/
// Initialize the express server
const app = express();

// Set app to use the nunjucks engine
nunjucks.configure('views', {
    autoescape: true,
    express: app
})
app.set('view engine', 'html')

// Pull all style files from the public directory
app.use(express.static('public'));

// Configure body parser to handle request body params
app.use(parser.json());
app.use(parser.urlencoded({
    extended: true
}));


/************************************************************************************************* 
  
  Routes
  
*************************************************************************************************/

// Index Page
app.get('/', (req, res) => {
  res.render('index');
});

app.get('/signin', (req, res) => {
    res.render('signin');
});

app.get('/dashboard', (req, res) => {
    res.render('dashboard');
});


app.get('/planner', (req, res) => {
  res.render('planner.html');
});


app.get('/choosecourse', (req, res) => {
    res.render('choosecourse.html');
});



app.get('/choosemajor', (req, res) => {
    res.render('choosemajor');
});


app.get('/majordetail', (req, res) => {
    res.render('majordetail', {major:req.query.major});

});

app.locals.selectedcourses = []
app.get('/selectedmajor', (req, res) => {
    if (app.locals.selectedcourses.indexOf(req.query.course) === -1 ){
        app.locals.selectedcourses.push(req.query.course)
    }
    res.render('selectedmajor', {courses: app.locals.selectedcourses});

});


// Listen to port 8080
const PORT = 8080;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}...`);
});