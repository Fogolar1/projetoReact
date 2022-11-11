<?php
require 'connection/connection.php';

$query = $db->prepare("SELECT * FROM Clientes ORDER BY idCliente DESC");

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
    "ddd" => $ddd,
    "telefone" => $telefone,
    "telefone" => $telefone,
    "idUsuario" => $idUsuario);

}

echo json_encode($return_arr);

$db->close();
?>