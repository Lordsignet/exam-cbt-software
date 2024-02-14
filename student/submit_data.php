<?php
$data = new stdClass;
$data->success = false;
$data->result = array();
$data->error = NULL; 
if ( !defined('ABSPATH') )
define('ABSPATH', dirname(__FILE__) . '/');
require_once(ABSPATH . 'student_session.php');
require_once(ABSPATH . '../models/table_class.php');
require_once(ABSPATH . '../models/admin-table.php');
require_once(ABSPATH . '../database/base.php');
require_once(ABSPATH . '../models/constants.php');
$quizClass = new User_table($db);
$html = NULL;
if(!empty($_POST['studentid'])) {

$studentid = $_POST['studentid'];
//$semester = (int) safe($_POST['semester']);


//list($v,$x,$y,$z) = $quizClass->getContributorId();
$submitArray = $quizClass->submitQuiz($studentid);
$enquire = MyConstant::ENQUIRE; 
if($submitArray) {
 $html.= '<h2 style="color:green">Congratulation!!</h2>';
 $html.= '<br />';
 $html.= '<h3 style="color:green">Your quiz was submitted successfully</h3>';
 $html.= '<br />';
$html.= '<h3 style="color:orange"><a href="https://contact.lordsignet.org/contact.php">Click to view result</a></h3>';
$html.=  '<br />';
 $html.= '<h3 style="color:green">You will be redirected shortly. Have a nice day!</h6>';
 echo $html;
} else {
echo "<h6 style='color:red'>Your quiz submission failed</h6>";
}
}



?>
