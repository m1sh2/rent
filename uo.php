<?php
//Put your basic server info here
//$server		= 'datsko.mysql.ukraine.com.ua';
//$db_user	= 'datsko_rent';
//$db_pass	= 'zu3ygall';
//$database	= 'datsko_rent';
$server		= 'localhost';
$db_user	= 'root';
$db_pass	= '1';
$database	= 'rent';
$timeoutseconds = 300;

//this is where PHP gets the time
$timestamp = time();
$timeout = $timestamp - $timeoutseconds;

//connect to database
//$server = localhost probably
//$db_user = your MySQL database username
//$db_pass = //your MySQL database password
$mysqli = new mysqli($server, $db_user, $db_pass, $database);

//insert the values
$insert = "INSERT INTO useronline VALUES (?, ?, ?)";
$stmt = $mysqli->prepare( $insert );
$stmt->bind_param( 'iss', $timestamp, $_SERVER['REMOTE_ADDR'],$_SERVER['PHP_SELF'] );

if(!$stmt->execute()) {
    print "Useronline Insert Failed > ";
}

//delete values when they leave
$delete = "DELETE FROM useronline WHERE timestamp < ?";
$stmt = $mysqli->prepare( $delete );
$stmt->bind_param( 'i', $timeout );

if(!$stmt->execute()) {
    print "Useronline Delete Failed > ";
}

//grab the results
//$result = "SELECT ip FROM useronline";
//$stmt = $mysqli->prepare( $result );
////$stmt->bind_param( 's', $_SERVER['PHP_SELF'] );
//
//
//if(!$stmt->execute()) {
//    print "Useronline Select Error > ";
//}

$res = $mysqli->query("SELECT DISTINCT ip FROM useronline");
$rows = $res->num_rows;

//echo '<pre>';print_r($rows);echo '</pre>';
//number of rows = the number of people online
//$user = $stmt->num_rows;


//spit out the results
$mysqli->close();

echo JSON_encode($rows);

//if($user == 1) {
//    print("$user user online\n");
//} else {
//    print("$user users online\n");
//}
?>