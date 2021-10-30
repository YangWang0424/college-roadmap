/************************************************************************************************* 
  
  Includes and Dependencies
  
*************************************************************************************************/
// Main depencies
const parser = require('body-parser');
const express = require('express');
const hb = require('express-handlebars');
//const session = require('express-session');         // Not sure if we will use this?

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

// Set app to use the Handlebars engine
app.set('view engine', 'handlebars');
app.engine('handlebars', hb({
    layoutsDir: __dirname + '/views/layouts',
    partialsDir: __dirname + '/views/partials'
}));
app.set('view options', {
    layout: 'main'
});

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


// Listen to port 8080
const PORT = 8080;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}...`);
});