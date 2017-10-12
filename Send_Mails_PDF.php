<?php
use google\appengine\api\mail\Message;

try {
    
require 'ConnectionMongo.php';
        $DTS_Info = $Conn->selectDB("DTS_Info");
        $Coll_Mails = $DTS_Info->Store_Mails_PDF;
        $List_Mails = $Coll_Mails->find(array("Mail_Status" => "PEND"));
        foreach($List_Mails as $doc){            
            $mail = new Message();
            $mail->setSender('eflowDTS@eflowv1.appspotmail.com');  
            foreach($doc['Mail_List'] as $receiver){
                 $mail->addTo($receiver['Description']);            
            }            
            $mail->setSubject('Prueba Visita '.$doc['Local_Name']);    
            $body = " PRUEBA DE VISITA \n Local: ".$doc['Local_Name']. "\n Fecha: ".$doc['PDF_Date']."\n Chofer: ".$doc['User_Name']." (".$doc['ID_User'].")\n Vehículo: ".$doc['ID_Truck'];
            $mail->setTextBody($body);       
            
            $DB = $Conn->selectDB($doc['DB']);
            $Coll_PDF = $DB->Store_Jobs_Send;            
            $PDF = $Coll_PDF->findOne(array('_id' => new MongoId($doc["ID_PDF"])),array("Certificate" => true));
            $String_PDF = str_replace("data:application/pdf;base64,", "", $PDF["Certificate"]["PDF"]);
            $pdf_decoded = base64_decode($String_PDF);
            
            $mail->addAttachment($doc['Local_Name']."_".$doc['PDF_Date'].'.pdf', $pdf_decoded);
            $mail->send();
            
            $Coll_Mails->update(array("_id"=> new MongoId($doc['_id'])), array('$set' => array("Mail_Status"  => "SEND")));                                       
         }
         
} catch (InvalidArgumentException $e) {
    echo 'There was an error:<br>'.$e->getMessage();
}
?>
