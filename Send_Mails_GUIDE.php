<?php
use google\appengine\api\mail\Message;

try {
    
require 'ConnectionMongo.php';
        $DTS_Info = $Conn->selectDB("DTS_Info");
        $Coll_Mails = $DTS_Info->Store_Mails_GUIDE;
        $List_Mails = $Coll_Mails->find(array("Mail_Status" => "PEND"));
        foreach($List_Mails as $doc){            
            $mail = new Message();
            $mail->setSender('eflowDTS@eflowv1.appspotmail.com');  
            foreach($doc['Mail_List'] as $receiver){
                 $mail->addTo($receiver['Description']);            
            }            
            $mail->setSubject('Número Guía '.$doc['Local_Name']);    
             $body = " PRUEBA DE VISITA \n Local: ".$doc['Local_Name']. "\n Fecha: ".$doc['PDF_Date']."\n Chofer: ".$doc['User_Name']." (".$doc['ID_User'].")\n Vehículo: ".$doc['ID_Truck']."\n Número de Guía: ".$doc['Number_Guide'];
            $mail->setTextBody($body); 
            $mail->send();            
            $Coll_Mails->update(array("_id"=> new MongoId($doc['_id'])), array('$set' => array("Mail_Status"  => "SEND")));                                       
         }
         
} catch (InvalidArgumentException $e) {
    echo 'There was an error:<br>'.$e->getMessage();
}
?>
