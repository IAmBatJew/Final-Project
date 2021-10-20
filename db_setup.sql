DROP TABLE IF EXISTS assignment;
DROP TABLE IF EXISTS referee;
DROP TABLE IF EXISTS games;

CREATE TABLE games(
    game_id int AUTO_INCREMENT NOT NULL,
    field_num int,
    start_date date,
    start_time time,
    game_level int,
    num_of_refs int,
    PRIMARY KEY (game_id)
);
CREATE TABLE referee(
    referee_id int AUTO_INCREMENT NOT NULL,
    fname varchar(50),
    lname varchar(50),
    age int,
    grade int,
    referee_skill int,
    PRIMARY KEY (referee_id)
);
CREATE TABLE assignment(
    assignment_id int AUTO_INCREMENT NOT NULL,
    game_id int NOT NULL,
    referee_id int,
    position varchar(9) NOT NULL,
    current_status enum('unassigned','notified','accepted','declined'),
    PRIMARY KEY (assignment_id),
    FOREIGN KEY (game_id) REFERENCES games(game_id),
    FOREIGN KEY (referee_id) REFERENCES referee(referee_id)
);

INSERT INTO referee(referee_id, fname, lname, age, grade, referee_skill) VALUES
(1, 'Dow', 'Jones', 34, 2, 70),
(2, 'Wayne', 'Newton', 21, 3, 85),
(3, 'Satchmo', 'Armstrong', 57, 6, 99);

INSERT INTO games(game_id, field_num, start_date, start_time, game_level, num_of_refs) VALUES
(1, 24, '2021/10/20','10:00:00', 1, 2),
(2, 12, '2021/09/20','13:00:00', 3, 3),
(3, 54, '2021/10/19','09:00:00', 1, 3),
(4, 54, '2021/10/22','09:00:00', 1, 2);

INSERT INTO assignment(assignment_id, game_id, referee_id, position, current_status) VALUES
(1, 1, 1, 'R', 'Notified'),
(2, 1, 3, 'AR1', 'Accepted'),
(3, 2, 3, 'R', 'Accepted'),
(4, 2, NULL, 'AR1', 'Unassigned'),
(5, 2, 2, 'AR2', 'Accepted'),
(6, 3, 2, 'R', 'Declined'),
(7, 3, 1, 'AR1', 'Accepted'),
(8, 3, 3, 'AR2', 'Accepted'),
(9, 4, 3, 'R', 'Notified'),
(10, 4, 2, 'AR1', 'Notified');