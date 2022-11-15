<?php
$servername = "localhost";
$username = "root";
$password = "root@123";
$database = "projetoReact";

$db = mysqli_connect($servername, $username, $password, $database);

if($db->connect_error){
    die("Erro de conexão: " . $db->connect_error);
}
header('Access-Control-Allow-Origin: http://localhost:3000');
?>