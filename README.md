# College Roadmap Project

### main libraries

    1. template engine: 

### How to Run

for development stage, run command below:

    DEBUG=express-locallibrary-tutorial:* npm run devstart   


add sample data via browser, then visit 

    http://127.0.0.1:3000/add_sample_data

then you will see json response

    {msg: "all sample data inserted!"}


### Rest API

    
    | Methods |          Urls          |              Actions |
    |:--------|:----------------------:|---------------------:|
    | GET     |      api/colleges      |     get all colleges |
    | GET     |    api/college/:id     |    get college by id |
    | DELETE  | api/college/:id/delete | delete college by id |
    | PATCH   | api/college/:id/update | update college by id |
    | POST    |   api/college/create   |       create college |
    | GET     |       api/majors       |       get all majors |
    | GET     |     api/major/:id      |      get major by id |
    | DELETE  |  api/major/:id/delete  |   delete major by id |
    | PATCH   |  api/major/:id/update  |   update major by id |
    | POST    |    api/major/create    |         create major |
    | GET     |      api/courses       |      get all courses |
    | GET     |     api/course/:id     |     get course by id |
    | DELETE  | api/course/:id/delete |  delete course by id |
    | PATCH   | api/course/:id/update |  update course by id |
    | POST    |   api/course/create   |         create major |