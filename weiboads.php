<?php
include('myclass.php');
$myads=new weiboad();
ini_set('memory_limit', '-1');

 
$fn=$argv[1];
switch($fn){
    case 'postcomment':
    $email=$argv[2];
    $pw=$argv[3];
    $keyword=$argv[4];
    $comment=$argv[5];
    $myads->postcomment($email,$pw,$keyword,$comment);
        break;
    default:
        echo "no function called \n";
}
    

?>