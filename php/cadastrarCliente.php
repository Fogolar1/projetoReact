<?php
require 'connection/connection.php';

echo var_dump($_POST);

$nome = $_POST['nome'];
$dataNasc = $_POST['dataNasc'];
$cpf = $_POST['cpf'];
$rg = $_POST['rg'];
$telefone = $_POST['telefone'];
$ddd = 47;
$idUser = 1;
$id = $_POST["id"];


if($id != null && $id != ""){
    $query = $db->prepare("UPDATE Clientes SET nomeCliente=?, dataNascimento=?, cpf=?, rg=?, ddd=?, telefone=? where idCliente=?");
    $query->bind_param("ssssiii", $nome, $dataNasc, $cpf, $rg, $ddd, $telefone, $id);
}else{
    $query = $db->prepare("INSERT INTO Clientes(nomeCliente, dataNascimento, cpf, rg, ddd, telefone, idUsuario) VALUES (?, ?, ?, ?, ?, ?, ?)");
    $query->bind_param("ssssiii", $nome, $dataNasc, $cpf, $rg, $ddd, $telefone, $idUser);
}

$query->execute();

if($id == null){
    $id = $query->insert_id;
}

$isNotNull = true;
$contadora = 0;

while($isNotNull){
    $logradouro = $_POST['logradouro'.$contadora];
    $numero = $_POST['numero'.$contadora];
    $bairro = $_POST['bairro'.$contadora];
    $cidade = $_POST['cidade'.$contadora];
    if($logradouro == null || $numero == null || $bairro == null || $cidade == null){
        $isNotNull = false;;
        break;
    }else{
        $query = $db->prepare("INSERT INTO Enderecos(logradouro, bairro, cidade, numero, idCliente) VALUES (?, ?, ?, ?, ?)");
        $query->bind_param("sssii", $logradouro, $bairro, $cidade, $numero, $id);
        $query ->execute();
    }

    $contadora++;
}



$db->close();
?>