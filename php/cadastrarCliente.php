<?php
require 'connection/connection.php';


$nome = $_POST['nome'];
$dataNasc = $_POST['dataNasc'];
$cpf = str_replace([".", "-"], "", $_POST['cpf']);

$rg = $_POST['rg'];
$telefone = $_POST['telefone'];

$telefoneComDDD = explode(") ", $telefone);
$telefone = str_replace("-", "", $telefoneComDDD[1]);
$ddd = str_replace("(", "", $telefoneComDDD[0]);
$idUser = $_POST['idUsuario'];
$id = $_POST["idCliente"];



if($id != null){
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

$query = $db->prepare("SELECT idEndereco FROM Enderecos WHERE idCliente = ?");
$query->bind_param("i", $id);
$query->execute();
$resultado = $query->get_result();
if($resultado->num_rows > 0){
    while($row = $resultado->fetch_assoc()){
        $idsAtuais[] = $row['idEndereco'];
    }
  
    $formEnderecos_id = array();

    foreach($_POST as $key => $valor){
        if(str_starts_with($key ,"id") && $key != "idCliente"){
            echo $key;
            array_push($formEnderecos_id, $valor);
        }
    }
    echo var_dump($formEnderecos_id);
    echo var_dump($idsAtuais);
    foreach($idsAtuais as $idAtual){
        if(!in_array($idAtual, $formEnderecos_id)){
            $query = $db->prepare("DELETE FROM Enderecos WHERE idEndereco = ?");
            $query->bind_param("i", $idAtual);
            $query->execute();
        }
    }
}


while($isNotNull){
    $logradouro = $_POST['logradouro'.$contadora];
    $numero = $_POST['numero'.$contadora];
    $bairro = $_POST['bairro'.$contadora];
    $cidade = $_POST['cidade'.$contadora];
    $idEndereco = $_POST['id'.$contadora];
    if($logradouro == null || $numero == null || $bairro == null || $cidade == null){
        $isNotNull = false;;
        break;
    }else{
        if($idEndereco != null){
            $query = $db->prepare("UPDATE Enderecos SET logradouro=?, bairro=?, cidade=?, numero=?, idCliente=? WHERE idEndereco=? ");
            $query->bind_param("sssiii", $logradouro, $bairro, $cidade, $numero, $id, $idEndereco);
            $query ->execute();
        }else{
            $query = $db->prepare("INSERT INTO Enderecos(logradouro, bairro, cidade, numero, idCliente) VALUES (?, ?, ?, ?, ?)");
            $query->bind_param("sssii", $logradouro, $bairro, $cidade, $numero, $id);
            $query ->execute();
        }
    }

    $contadora++;
}

$db->close();
?>