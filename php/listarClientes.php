<?php
require 'connection/connection.php';

$idCliente = $_GET['id'];

if($idCliente !=null){
    $query = $db->prepare("SELECT * FROM Clientes where idCliente = ?");
    $query->bind_param("i", $idCliente);
}else{
    $query = $db->prepare("SELECT * FROM Clientes ORDER BY idCliente DESC");
}


$query->execute();
$resultado = $query->get_result();
$return_arr = array();

while($row = $resultado->fetch_assoc()) {
    $id = $row["idCliente"];
    $nomeCliente = $row["nomeCliente"];
    $dataNascimento = $row["dataNascimento"];
    $cpf = $row["cpf"];
    $rg = $row["rg"];
    $ddd = $row["ddd"];
    $telefone = $row["telefone"];
    $idUsuario = $row["idUsuario"];

    $return_arr[] = array("id" => $id,
    "nome" => $nomeCliente,
    "dataNascimento" => $dataNascimento,
    "cpf" => $cpf,
    "rg" => $rg,
    "telefone" => $telefone,
    "idUsuario" => $idUsuario);
}


echo json_encode($return_arr);

$db->close();
?>