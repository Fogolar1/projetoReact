<?php
require 'connection/connection.php';

$id = $_POST['id'];

$query = $db->prepare("DELETE FROM Clientes where idCliente  = ?");
$query->bind_param('i', $id);

$query->execute();

echo var_dump($_POST);
?>