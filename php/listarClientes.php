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

    if($idCliente == null){
        $dataNascimento = date("d/m/Y", strtotime($dataNascimento));
    }
    
    $cpf = substr_replace($row["cpf"], ".", 3, 0);
    $cpf = substr_replace($cpf, ".", 7, 0);
    $cpf = substr_replace($cpf, "-", 11, 0);
    
    $rg = $row["rg"];
    $telefone =  "(". $row["ddd"] . ") " . substr_replace($row["telefone"], "-", 5, 0) ;
    $idUsuario = $row["idUsuario"];
    
    $query = $db->prepare("SELECT * FROM Enderecos where idCliente = ?");
    $query->bind_param("i", $id);
    $query->execute();
    $enderecos = $query->get_result();

    $enderecos_arr = array();

    while($endereco = $enderecos->fetch_assoc()){
        $idEndereco = $endereco["idEndereco"];
        $numero = $endereco["numero"];
        $logradouro = $endereco["logradouro"];
        $bairro = $endereco["bairro"];
        $cidade = $endereco["cidade"];
        $enderecos_arr[] = array( "id" => $idEndereco,
            "logradouro" => $logradouro,
            "bairro" => $bairro,
            "cidade" => $cidade,
            "numero" => $numero);
    }

    $return_arr[] = array("id" => $id,
    "nome" => $nomeCliente,
    "dataNascimento" => $dataNascimento,
    "cpf" => $cpf,
    "rg" => $rg,
    "telefone" => $telefone,
    "enderecos" => $enderecos_arr,
    "idUsuario" => $idUsuario);
}


echo json_encode($return_arr);

$db->close();
?>