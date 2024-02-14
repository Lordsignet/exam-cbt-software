<?php
$data = new stdClass;
$data->success = false;
$data->result = NULL;
$data->error = NULL; 
if ( !defined('ABSPATH') )
define('ABSPATH', dirname(__FILE__) . '/');
require_once(ABSPATH . 'student_session.php');
require_once(ABSPATH . '../models/table_class.php');
require_once(ABSPATH . '../models/admin-table.php');
require_once(ABSPATH . '../database/base.php');
$quizClass = new User_table($db);
//if(!isset($_quizsession['token']) && $_quizsession['token'] !== $_POST['token'] && $_SERVER['HTTP_REFERER'] !== $_SERVER['HTTP_HOST'] && $_SERVER['REQUEST_METHOD'] !== 'POST' ) return;
if(!empty($_POST['currentQuestion']) &&is_numeric($_POST['studentid'])) {
    //$ipAddress = safe($_POST['ipAddress']);
$answerSelected = $_POST['answerSelected'];
$currentQuestion = $_POST['currentQuestion'];
$studentid = $_POST['studentid'];
//$semester = (int) safe($_POST['semester']);

$quizArray = [];
$questionArray = [];
$optionsArray = [];
$questionShuffledValue = [];
$quizid = NULL;
$answerArray = NULL;
//list($v,$x,$y,$z) = $quizClass->getContributorId();
if(empty($_POST['answerSelected'])) {
$answerArray = $quizClass->updateBlankAnswer($studentid,$currentQuestion,$answerSelected);
	
} else { 
$returnedArray = $quizClass->getStudentResult($studentid,$currentQuestion,$answerSelected);
if($returnedArray->rowCount() === 0) {
$answerArray = $quizClass->updateWrongAnswer($studentid,$currentQuestion,$answerSelected);
} else {
$answerArray = $quizClass->updateRightAnswer($studentid,$currentQuestion,$answerSelected);
}
}
if(!isset($answerArray)) {
	echo "Data went well";
$data->error = "something went wrong";
$data->success = false;	
}
$data->result = "answer updated successfully";
$data->success = true;
 
}
header("Content-Type: application/json; charset=UTF-8");
echo json_encode($data);



?>