/*
-- Records the details of each course offered in college of engineering majors. This is not done yet.
CREATE TABLE Courses (
    courseID int AUTO_INCREMENT NOT NULL,
    subjectCode varchar(6) NOT NULL,
    courseNumber int NOT NULL,
    credits int NOT NULL,
    PRIMARY KEY (courseID)
);
--     displayName varchar(20),


-- Records the details for each major in the college of engineering. Not done yet.
CREATE TABLE Majors (
    majorID int AUTO_INCREMENT NOT NULL,
    majorCode int NOT NULL UNIQUE,
    name varchar(60) NOT NULL,
    PRIMARY KEY (courseID)
)

-- Records the details for options within majors. For example: the Applied Computer Science option within the Computer Science undergraduate major.
CREATE TABLE Options (
    optionID int AUTO_INCREMENT NOT NULL,
    optionCode int NOT NULL UNIQUE,
    name varchar(50) NOT NULL,
    majorID int NOT NULL,
    PRIMARY KEY (courseID),
    FOREIGN KEY (majorID) REFERENCES Majors(majorID)
)


-- This is temporary (probably). Records the details of multiple plan options. Later on these plans will be generated differently.
CREATE TABLE Plans (
    planID int AUTO_INCREMENT NOT NULL,
    majorID int NOT NULL,
    optionID int NOT NULL,
    years int NOT NULL,
    PRIMARY KEY (planID),
    FOREIGN KEY (majorID) REFERENCES Majors(majorID),
    FOREIGN KEY (optionID) REFERENCES Options(optionID)
)

-- This is temporary (probably). Connects plans and their courses. Later on these plans will be generated differently.
--CREATE TABLE PlanCourses (
--    planID int AUTO_INCREMENT NOT NULL,
--    courseID int NOT NULL,
--   FOREIGN KEY (planID) REFERENCES Plans(planID),
--    FOREIGN KEY (courseID) REFERENCES Courses(courseID)
--)

-- a plan has many terms but a term only has one plan
CREATE TABLE PlanTerms (
    termID int AUTO_INCREMENT NOT NULL,
    term varchar(4) NOT NULL,
    planID int NOT NULL,
    PRIMARY KEY (termID),
    FOREIGN KEY (planID) REFERENCES Plans(planID)
)

CREATE TABLE TermCourses (
    termID int AUTO_INCREMENT NOT NULL,
    courseID int NOT NULL,
    PRIMARY KEY (planID),
    FOREIGN KEY (termID) REFERENCES Terms(termID),
    FOREIGN KEY (courseID) REFERENCES Courses(courseID)
)
*/

