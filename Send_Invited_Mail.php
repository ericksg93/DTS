<?php
use google\appengine\api\mail\Message;

try {
    
$path = 'Mail/Templates/images/DTS.png';
$type = pathinfo($path, PATHINFO_EXTENSION);
$data = file_get_contents($path);
$logo64 = 'data:image/' . $type . ';base64,' . base64_encode($data);

require 'ConnectionMongo.php';
//if(Exist_DB($Conn , "DTS_Info") === 1){
        $db = $Conn->selectDB("DTS_Info");
        $Coll_Mails = $db->Store_Mails_Invitations;
        $List_Mails = $Coll_Mails->find(array("Mail_Status" => "PEND"));
        foreach($List_Mails as $doc){
            
            $path = 'Mail/Templates/images/'.$doc["Type"].'.png';
            $type = pathinfo($path, PATHINFO_EXTENSION);
            $data = file_get_contents($path);
            $icono64 = 'data:image/' . $type . ';base64,' . base64_encode($data);

            $mail = new Message();
            $mail->setSender('DTSTRACK@eflowv1.appspotmail.com');            
            $mail->addTo($doc['Mail']);//'kathy.f06114@gmail.com');
            $mail->setSubject('Invitacion al DTS');            
            $message = file_get_contents("Mail/Templates/Templates_Invitation_Mail.html");            
            $message = str_replace('%Invited_By_Name%',$doc["Invited_By_Name"], $message);            
            $message = str_replace('%Company_Name%',$doc["Company_Name"], $message);        
            $message = str_replace('%Type%',$doc["Type"], $message);   
            $message = str_replace('%logo%',$logo64, $message);  
            $message = str_replace('%icono%',$icono64, $message);    
            $message = str_replace('%Url%', "https://eflowdts-dot-eflowv1.appspot.com/eflow/index.html#/User_Registration?ID_Case=".$doc["ID_Case"], $message);
            $mail->setHtmlBody($message);
            
            $mail->send();
            $Coll_Mails->update(array("_id"=> new MongoId($doc['_id'])), array('$set' => array("Mail_Status"  => "SEND")));     
                                  
         }//for
//}//if    
} catch (InvalidArgumentException $e) {
    echo 'There was an error:<br>'.$e->getMessage();
}
// [END all]
?>
