<!DOCTYPE html>
<html>
<head></title>
</head>
<body>

<?php
    $nombre=$_REQUEST['nombre'];
	$str=$_REQUEST['email'];
	$mensaje=$_REQUEST['mensaje'];


	//validacion del mail ingresado.


/**

 * @param    string  $str la dirección a validar
 * @return   boolean
 
 */
global $result;

function is_valid_email($str)
{

  $result = (false !== filter_var($str, FILTER_VALIDATE_EMAIL));
  
  if ($result)
  {
    list($user, $domain) = split('@', $str);
    
    $result = checkdnsrr($domain, 'MX');


  }
  
  return $result;
}

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
$mail->Password = '*******'; //Su password
//Agregar destinatario
$mail->setFrom($str,$nombre);
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

  echo "<script type='text/javascript'>alert ('Mail enviado correctamente');</script>";
  echo '<meta http-equiv="Refresh" content="1;URL=inicio.html">';
}


?>




</body>
</html>