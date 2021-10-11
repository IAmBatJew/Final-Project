CREATE TABLE games(
    game_id int NOT NULL,
    field_num int,
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