<?php
$servername = "localhost";
$username = "root";
$password = "";
$database = "projetoKabum";

$db = mysqli_connect($servername, $username, $password, $database);

if($db->connect_error){
    die("Erro de conexão: " . $db->connect_error);
}
?>