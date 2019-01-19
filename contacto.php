<!DOCTYPE html>
<html>
<head>
	<title>Contacto</title>
</head>
<body>
<?php
    $nombre=$_REQUEST['nombre'];
	$email=$_REQUEST['email'];
	$mensaje=$_REQUEST['mensaje'];


require_once('PHPMailer_5.2.4/class.PHPMailer.php'); 

$mail = new PHPMailer(true); 
$mail->SMTPOptions = array(
    'ssl' => array(
        'verify_peer' => false,
        'verify_peer_name' => false,
        'allow_self_signed' => true
    )
);
//$mail->SMTPDebug = 2; 
$mail->IsSMTP();
$mail->SMTPAuth = true;
$mail->SMTPSecure = 'tls';
$mail->Host = 'smtp.gmail.com';
$mail->Port = 587;// TCP port to connect to
$mail->CharSet = 'UTF-8';
$mail->Username ='gustavodevaler@gmail.com'; //Email para enviar
$mail->Password = 'daiana26?'; //Su password
//Agregar destinatario
$mail->setFrom($email,$nombre);
$mail->AddAddress('gustavodevaler@gmail.com');//A quien mandar email
$mail->SMTPKeepAlive = true;  
$mail->Mailer = "smtp"; 


    //Content
$mail->isHTML(true); // Set email format to HTML


$mail->Subject = 'Desde tu web';
$mail->Body    = $mensaje;
$mail->AltBody = 'This is the body in plain text for non-HTML mail clients';

if(!$mail->send()) {
  echo 'Error al enviar email';
  echo 'Mailer error: ' . $mail->ErrorInfo;
} else {
  echo 'Mail enviado correctamente';
}
?>




</body>
</html>