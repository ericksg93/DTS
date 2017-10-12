<?php
try{
require 'Mail/PHPMailerAutoload.php';

require 'ConnectionMongo.php';

$Coll_Mails = $db->Store_Mail_Status;

$Coll_Jobs = $db->Store_Jobs_Send;

$List_Mails = $Coll_Mails->find(array("PDF_Status" => "PEND"));

foreach($List_Mails as $doc){
   
	$PDF = $Coll_Jobs->findOne(array('_id' => new MongoId($doc["ID_PDF"])),array("Certificate" => true,"Name" => true,"Mail"=>true));
	
	$String_PDF = str_replace("data:application/pdf;base64,", "", $PDF["Certificate"]["PDF"]);
     
    $mail = new PHPMailer;
	
	$mail->isSMTP();
	
	$mail->SMTPDebug = 0;
	
	$mail->Debugoutput = 'html';
	
	$mail->Host = "smtpout.secureserver.net";
	
	$mail->Port = 25;
	
	$mail->SMTPAuth = true;
	
	$mail->Username = "info@eprac.com";

	$mail->Password = "wolFe224";
	
	$mail->setFrom('DTS_TRACK@eprac.com', 'DTS Track');	
  
	foreach($doc["Mail_List"] as $Contact){	
     
		$mail->addAddress($Contact["Description"],$Contact["Value"]);
     
   }
	
	$mail->Subject = $PDF["Name"] . ' ' . $doc["PDF_Date"];
	
	$mail->Body = "PDF";
	
	// $mail->AltBody = 'This is a plain-text message body';
	$pdf_decoded = base64_decode($String_PDF);
	
	$mail->AddStringAttachment($pdf_decoded, $PDF["Name"] . ' ' . $doc["PDF_Date"].'.pdf');
	
	if (!$mail->send()){
     
  			 $Coll_Mails->update(array("_id"=> new MongoId($doc['_id'])), array('$set' => array("PDF_Status"  => "ERROR","Error_Message"  => $mail->ErrorInfo)));
     
   }else{
     
			 $Coll_Mails->update(array("_id"=> new MongoId($doc['_id'])), array('$set' => array("PDF_Status"  => "SEND","PDF_Date_Send"  => date("Y-m-d"))));
     
    }
	
	}
  echo "Listo!";
}catch(Exception $e) {
  echo 'Message: ' .$e->getMessage();
}