<?php
use google\appengine\api\mail\Message;

try {    

require 'ConnectionMongo.php';
        $db = $Conn->selectDB("DTS_Info");
        $Coll_Mails = $db->Store_Mails_Password;
        $List_Mails = $Coll_Mails->find(array("Mail_Status" => "PEND"));
        foreach($List_Mails as $doc){   
            $mail = new Message();
            $mail->setSender('DTSTRACK@eflowv1.appspotmail.com');            
            $mail->addTo($doc['Mail']);//'kathy.f06114@gmail.com');
            $mail->setSubject('Cambio de contraseña del Sistema DTS');            
            $message = file_get_contents("Mail/Templates/Templates_Password_Mail.html");              
            $message = str_replace('%Company_Name%',$doc["Company_Name"], $message);               
            $message = str_replace('%Mail%',$doc["Mail"], $message);       
            $message = str_replace('%Url%', "https://eflowdts-dot-eflowv1.appspot.com/eflow/index.html#/User_Change_Password?ID_Case=".$doc["ID_Case"], $message);
            $mail->setHtmlBody($message);            
            $mail->send();
            $Coll_Mails->update(array("_id"=> new MongoId($doc['_id'])), array('$set' => array("Mail_Status"  => "SEND")));     
                                  
         }
} catch (InvalidArgumentException $e) {
    echo 'There was an error:<br>'.$e->getMessage();
}

?>
