CREATE TABLE games(
    game_id int AUTO_INCREMENT NOT NULL,
    field_num int,
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