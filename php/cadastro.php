<?php 
require 'connection/connection.php';

$usuario = $_POST['usuario'];
$senha = $_POST['senha'];

$query = $db->prepare("SELECT * FROM Usuarios where nomeUsuario = ?");
$query->bind_param("s", $usuario);

$query->execute();
$resultado = $query->get_result();

if($resultado->num_rows > 0){
    $db->close();
   echo("Usuário já existe!");
   return;
}

$query = $db->prepare("INSERT INTO Usuarios(nomeUsuario, senhaUsuario) VALUES(?, ?)");
$query->bind_param("ss", $usuario, $senha);
$query->execute();

echo ($query->insert_id);

$db->close();
?>