<?php
// require 'common.php';
require 'class/DbConnection.php';


// Step 1: Get a datase connection from our helper class
$db = DbConnection::getConnection();

// Step 2: Create & run the query
$sql = 'SELECT * FROM assignment
JOIN games ON assignment.game_id = games.game_id
JOIN referee ON assignment.referee_id = referee.referee_id
WHERE assignment.referee_id = ?
ORDER BY games.start_date DESC';
$vars = [$_GET['referee_id']];

$stmt = $db->prepare($sql);
$stmt->execute($vars);

$results = $stmt->fetchAll();

if (isset($_GET['format']) && $_GET['format'] == 'csv') {
    header('Content-Type: text/csv');

    echo "GameID,RefereeID,RefereeLast,RefereeFirst,GameLevel,Position,Status,StartDate,StartTime,Field#\r\n";

    foreach ($results as $o) {
        echo "\"" . $o['game_id'] . "\","
            . $o['referee_id'] . ','
            . $o['lname'] . ','
            . $o['fname'] . ','
            . $o['game_level'] . ','
            . $o['position'] . ','
            . $o['current_status'] . ','
            . $o['start_date'] . ','
            . $o['start_time'] . ','
            . $o['field_num']. "\r\n";
    }
} else { // Step 3: Convert to JSON
    $json = json_encode($results, JSON_PRETTY_PRINT);

    // Step 4: Output
    header('Content-Type: application/json');
    echo $json;
}
