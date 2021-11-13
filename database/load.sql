/*
-- Sample values 
INSERT INTO Courses (subjectCode, courseNumber, credits)
VALUES
('AA', 111, 4),
('AA', 112, 4),
('AA', 113, 4),
('AA', 114, 4),

('AA', 121, 4),
('AA', 122, 4),
('AA', 123, 4),
('AA', 124, 4),

('AA', 131, 4),
('AA', 132, 4),
('AA', 133, 4),
('AA', 134, 4),

('AA', 141, 4),
('AA', 142, 4),
('AA', 143, 4),
('AA', 144, 4);
-- finish later...
-- This will need to be changed so that there can be placeholder courses (bacc core, cs elective, etc.)

INSERT INTO Majors (majorCode, name)
VALUES
(307, 'Computer Science Undergraduate Major (BA, BS, HBA, HBS)' );


INSERT INTO Options (optionCode, name, majorID)
VALUES
(334, 'Computer Systems Option', (SELECT majorID FROM Majors WHERE majorCode=307));


INSERT INTO Plans (majorID, optionID, years)
VALUES
((SELECT majorID FROM Majors WHERE majorCode=307), (SELECT optionID FROM Options WHERE optionCode=334), 4);


INSERT INTO PlanTerms (planID, term)
VALUES
('F1', (SELECT planID FROM Plans WHERE years=4 AND optionID=(SELECT optionID FROM Options WHERE optionCode=334))),
('W1', (SELECT planID FROM Plans WHERE years=4 AND optionID=(SELECT optionID FROM Options WHERE optionCode=334))),
('Sp1', (SELECT planID FROM Plans WHERE years=4 AND optionID=(SELECT optionID FROM Options WHERE optionCode=334))),
('Su1', (SELECT planID FROM Plans WHERE years=4 AND optionID=(SELECT optionID FROM Options WHERE optionCode=334))),
('F2', (SELECT planID FROM Plans WHERE years=4 AND optionID=(SELECT optionID FROM Options WHERE optionCode=334))),
('W2', (SELECT planID FROM Plans WHERE years=4 AND optionID=(SELECT optionID FROM Options WHERE optionCode=334))),
('Sp2', (SELECT planID FROM Plans WHERE years=4 AND optionID=(SELECT optionID FROM Options WHERE optionCode=334))),
('Su2', (SELECT planID FROM Plans WHERE years=4 AND optionID=(SELECT optionID FROM Options WHERE optionCode=334))),
('F3', (SELECT planID FROM Plans WHERE years=4 AND optionID=(SELECT optionID FROM Options WHERE optionCode=334))),
('W3', (SELECT planID FROM Plans WHERE years=4 AND optionID=(SELECT optionID FROM Options WHERE optionCode=334))),
('Sp3', (SELECT planID FROM Plans WHERE years=4 AND optionID=(SELECT optionID FROM Options WHERE optionCode=334))),
('Su3', (SELECT planID FROM Plans WHERE years=4 AND optionID=(SELECT optionID FROM Options WHERE optionCode=334))),
('F4', (SELECT planID FROM Plans WHERE years=4 AND optionID=(SELECT optionID FROM Options WHERE optionCode=334))),
('W4', (SELECT planID FROM Plans WHERE years=4 AND optionID=(SELECT optionID FROM Options WHERE optionCode=334))),
('Sp4', (SELECT planID FROM Plans WHERE years=4 AND optionID=(SELECT optionID FROM Options WHERE optionCode=334))),
('Su4', (SELECT planID FROM Plans WHERE years=4 AND optionID=(SELECT optionID FROM Options WHERE optionCode=334)));


INSERT INTO TermCourses (termID, courseID)
VALUES
((SELECT termID FROM PlanTerms WHERE term='F1'), (SELECT courseID FROM Courses WHERE courseNumber=111)),
((SELECT termID FROM PlanTerms WHERE term='F1'), (SELECT courseID FROM Courses WHERE courseNumber=112)),
((SELECT termID FROM PlanTerms WHERE term='F1'), (SELECT courseID FROM Courses WHERE courseNumber=113)),
((SELECT termID FROM PlanTerms WHERE term='F1'), (SELECT courseID FROM Courses WHERE courseNumber=114));
*/