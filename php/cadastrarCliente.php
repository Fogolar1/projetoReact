<?php
require 'connection/connection.php';

header('Access-Control-Allow-Origin: http://localhost:3000');


$nome = $_POST['nome'];
$dataNasc = $_POST['dataNasc'];
$cpf = $_POST['cpf'];
$rg = $_POST['rg'];
$telefone = $_POST['telefone'];
$ddd = 47;
$idUser = 1;

$query = $db->prepare("INSERT INTO Clientes(nomeCliente, dataNascimento, cpf, rg, ddd, telefone, idUsuario) VALUES (?, ?, ?, ?, ?, ?, ?)");
$query->bind_param("ssssiii", $nome, $dataNasc, $cpf, $rg, $ddd, $telefone, $idUser);

$query->execute();

$db->close();
?>