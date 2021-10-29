<?php
// require 'common.php';
require 'class/DbConnection.php';


// Step 1: Get a datase connection from our helper class
$db = DbConnection::getConnection();

// Step 2: Create & run the query
$sql = 'SELECT * FROM games WHERE num_of_refs > (SELECT COUNT(*) FROM assignment WHERE games.game_id = assignment.game_id) ';
$vars = [];

$stmt = $db->prepare($sql);
$stmt->execute($vars);

$patients = $stmt->fetchAll();

if(isset($_GET['format']) && $_GET['format']=='csv') {
    header('Content-Type: text/csv');

    echo "FieldNumber,StartTime,GameLevel,NumberOfReferees\r\n";

    foreach($patients as $o) {
        echo "\"".$o['field_num']."\","
            .$o['start_time'].','
            .$o['game_level'].','
            .$o['num_of_refs']."\r\n";
    }
}
else{// Step 3: Convert to JSON
$json = json_encode($patients, JSON_PRETTY_PRINT);

// Step 4: Output
header('Content-Type: application/json');
echo $json;}
