<?php
require 'connection/connection.php';

$usuario = $_POST['usuario'];
$senha = $_POST['senha'];

$query = $db->prepare("SELECT * FROM Usuarios where nomeUsuario = ?");
$query->bind_param("s", $usuario);

$query->execute();
$resultado = $query->get_result();

if($resultado->num_rows > 0){
    while($row = $resultado->fetch_assoc()) {
        if($row["senhaUsuario"] == $senha){
            echo("login");
            $db->close();
            return;
        }
    }
}

echo("teste");
$db->close();
?>