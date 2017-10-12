<?php
try{


// Create the PDO object for CloudSQL MySQL.
$dsn = getenv('MYSQL_DSN');
$user = getenv('MYSQL_USER');
$password = getenv('MYSQL_PASSWORD');
$pdo = new PDO($dsn, $user, $password);
/*
   foreach($pdo->query('SELECT * from Store_Company') as $fila) {
        print_r($fila);
    }
    $pdo = null;*/
} catch (PDOException $e) {
    print "¡Error!: " . $e->getMessage() . "<br/>";
    die();
}
?>


