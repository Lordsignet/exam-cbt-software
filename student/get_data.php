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
$quizClass = new User_table($db);
//if(!isset($_quizsession['token']) && $_quizsession['token'] !== $_POST['token'] && $_SERVER['HTTP_REFERER'] !== $_SERVER['HTTP_HOST'] && $_SERVER['REQUEST_METHOD'] !== 'POST' ) return;
if(!empty($_POST['row_no']) &&!empty($_POST['studentid']) &&is_numeric($_POST['row_no'])) {
    //$ipAddress = safe($_POST['ipAddress']);
$rowno = $_POST['row_no'];
$studentid = $_POST['studentid'];
//$semester = (int) safe($_POST['semester']);

$quizArray = [];
$questionArray = [];
$optionsArray = [];
$questionShuffledValue = [];
$quizid = NULL;
//list($v,$x,$y,$z) = $quizClass->getContributorId();
$questionArray = $quizClass->getStudShuffqData($rowno,$studentid);
if($questionArray->rowCount() === 0) {
	$questionvalue = NULL;
}
$questionvalue = $questionArray->fetchAll(PDO::FETCH_ASSOC);
$questionId = $questionvalue[0]["question_id"];
$questionstid = $questionvalue[0]["shuffled_std_id"];
$chosenans = $questionvalue[0]["chosen_ans"];

$optionsArray = $quizClass->getStudShuffaData($questionId,$questionstid);
if($optionsArray->rowCount() === 0) {
	$optionRows = NULL;
	$data->success = false;
}
$data->result[] = array(
'questionid' => $questionId,
'question_content' => $questionvalue[0]["question_content"],
'question_urls' => $questionvalue[0]["question_urls"],
'chosen_ans' => $questionvalue[0]["chosen_ans"]
);
//$totalRows = $questionArray->rowCount();
$optionsArray = $optionsArray->fetchAll(PDO::FETCH_ASSOC);
foreach($optionsArray as $key => $optionRows) {
$data->result[] = array(
'shuffled_ans_stdid	' => $optionRows["shuffled_ans_stdid"],
'option_texts' => $optionRows["option_texts"],
'option_alpha' => chr(65 + $key)
);
	
	
}
$data->success = true;
} else {
	echo $_POST['row_no'] . $_POST['studentid'] . $_POST['row_no'];
}
header("Content-Type: application/json; charset=UTF-8");
echo json_encode($data);



?>