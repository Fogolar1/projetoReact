<?php
$servername = "localhost";
$username = "root";
$password = "neo@123";
$database = "projetoreact";

$db = mysqli_connect($servername, $username, $password, $database);

if($db->connect_error){
    die("Erro de conexão: " . $db->connect_error);
}
?>