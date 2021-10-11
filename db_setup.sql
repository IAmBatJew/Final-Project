DROP TABLE IF EXISTS assignment;
DROP TABLE IF EXISTS referee;
DROP TABLE IF EXISTS games;

CREATE TABLE games(
    game_id int NOT NULL,
    field_num int,
    start_date date,
    start_time time,
    game_level int,
    PRIMARY KEY (game_id)
);
CREATE TABLE referee(
    referee_id int NOT NULL,
    fname varchar(50),
    lname varchar(50),
    age int,
    grade int,
    referee_skill int,
    PRIMARY KEY (referee_id)
);
CREATE TABLE assignment(
    assignment_id int,
    game_id int,
    referee_id int,
    current_status varchar(50),
    PRIMARY KEY (assignment_id),
    FOREIGN KEY (game_id) REFERENCES games(game_id),
    FOREIGN KEY (referee_id) REFERENCES referee(referee_id)
);

INSERT INTO referee(referee_id, fname, lname, age, grade, referee_skill) VALUES
(1, 'Dow', 'Jones', 34, 2, 70),
(2, 'Wayne', 'Newton', 21, 3, 85);

INSERT INTO games(game_id, field_num, start_date, start_time, game_level) VALUES
(1, 24, '2021/10/20','10:00:00', 1),
(2, 12, '2021/09/20','13:00:00', 3),
(3, 54, '2021/10/19','09:00:00', 1);

INSERT INTO assignment(assignment_id, game_id, referee_id, current_status) VALUES
(1, 1, 1, 'Waiting'),
(2, 2, 2, 'Complete'),
(3, 3, 2, 'Waiting');