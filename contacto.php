<!DOCTYPE html>
<html>
<head>
	<title>Contacto</title>
</head>
<body>
	<h2>Tu mensaje ha sido enviado con exito !!</h2>

	<?php
	$nombre=$_REQUEST['nombre'];
	$email=$_REQUEST['email'];
	$mensaje=$_REQUEST['mensaje'];

	echo $nombre.'<br>';
	echo $email.'<br>';
	echo $mensaje;



	?>

</body>
</html>