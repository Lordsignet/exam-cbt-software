<?php
if ( !defined('ABSPATH') )
define('ABSPATH', dirname(__FILE__) . '/');
require_once(ABSPATH . 'student_session.php');
require_once(ABSPATH . '../models/table_class.php');
require_once(ABSPATH . '../models/admin-table.php');
require_once(ABSPATH . '../database/base.php');
$quizClass = new User_table($db);
$quizArray = [];
$questionArray = [];
$questionShuffledArray = [];
$optionsShuffledArray = [];
$questionShuffledValue = [];
$userPasswordArray = [];
$userPasswordValue = [];
$questionSql = [];
$questionRows = [];
$totalTime  = NULL;
$quizid = NULL;
$totalRows = NULL;
$optionsArrays = NULL;
$time = NULL;
$timestampTime = NULL;
$totalTimeS = NULL;
$totalTime = NULL;
$chosenAnswer = NULL;
list($v,$x,$y,$z) = $quizClass->getContributorId();
$studentid = $v;

$questionShuffledArray = $quizClass->getShuffledQuestionData($studentid);


if($questionShuffledArray->rowCount() === 0) {
$quizArray = $quizClass->getQuizDataStudent($y,$x,$z);
if($quizArray->rowCount() === 0) {
	$quizvalue = NULL;
}
$quizvalue = $quizArray->fetchAll(PDO::FETCH_ASSOC);
if(!$quizvalue) {
	/*echo "<p>Something went wrong, please try again later</p>"; */
	exit("<p>Something went wrong, please try again later</p>");
}
$quizid = $quizvalue[0]["quiz_id"];
$totalQuest = 12;//$quizvalue[0]["quiz_total"];
$time = $quizvalue[0]["quiz_time"];
$position = 0;
//$totalQuest = $totalQuest;
$questionSql = $db->prepare("SELECT * FROM question WHERE quiz_id = :quizID ORDER BY RAND() LIMIT :position1, :position2;");
$questionSql->bindParam(':quizID', $quizid);
$questionSql->bindParam(':position1', $position, PDO::PARAM_INT);
    $questionSql->bindParam(':position2', $totalQuest, PDO::PARAM_INT);

    $questionSql->execute();
//$questionArray = $quizClass->getQuestionData($quizid,$totalQuest);
if($questionSql->rowCount() === 0) {
	$questionRows = NULL;
}
$totalRows = $questionSql->rowCount();
$questionRows = $questionSql->fetchAll(PDO::FETCH_ASSOC);

$questionid = $questionRows[0]["question_id"];
$optionsArray = $quizClass->getOptions($questionid);
if($optionsArray->rowCount() === 0) {
	$optionRow = NULL;
}


foreach($questionRows as $key => $shuffledques) {
	$timeToinsert =  number_format(microtime(TRUE)*1000,0,'.','' );
	try {
		$data = $quizClass->insertShuffledQues($studentid,$shuffledques["question_id"],$shuffledques["question_cont"],$shuffledques["question_url"],$timeToinsert,$quizid);
		if($data->rowCount() === 0) {
					$lastInsertId = NULL;
				}
				$optionsArrays = $quizClass->getOptions($shuffledques["question_id"]);
				//$lastInsertId = $db->lastInsertId();
			foreach($optionsArrays as $optkey => $optionRow) {
				$quizClass->insertShuffledAns($studentid,$shuffledques["question_id"],$optionRow["options_id"],$optionRow["options_text"],$optionRow["opt_alphbet"]);
				
			} 
		
			
			
		
} catch(Exception $e) {
	
	
}
	}
	$questionShuffledArray = $quizClass->getShuffledQuestionData($studentid);
	$questionShuffledValue = $questionShuffledArray->fetchAll(PDO::FETCH_ASSOC);

$questionID = $questionShuffledValue[0]["question_id"];	
$timestampTime = $questionShuffledValue[0]["timestamp"];
$chosenAnswer = $questionShuffledValue[0]["chosen_ans"];
$optionsShuffledArray = $quizClass->getShuffledOptData($studentid,$questionID);
$quizArray = $quizClass->getQuizDataStudent($y,$x,$z);
if($quizArray->rowCount() === 0) {
	$quizvalue = NULL;
}
$quizvalue = $quizArray->fetchAll(PDO::FETCH_ASSOC);
$time = $quizvalue[0]["quiz_time"];
$userPasswordArray = $quizClass->getExtraTimeData($studentid);
if($userPasswordArray->rowCount() === 0) {
$userPasswordValue = NULL;	
}
$userPasswordValue = $userPasswordArray->fetchAll(PDO::FETCH_ASSOC);
$userExtraTime = ($userPasswordValue[0]["user_extra_time"] && is_numeric($userPasswordValue[0]["user_extra_time"])) ? $userPasswordValue[0]["user_extra_time"] : 0;
$timeSplit = explode(":", $time);
$totalTime = (int)$userExtraTime + (int)$timeSplit[1];
$totalTimeS = $timeSplit[0] . ":" . $totalTime;	
} else if($questionShuffledArray->rowCount() > 0)  {
	$totalRows = $questionShuffledArray->rowCount();
$questionShuffledValue = $questionShuffledArray->fetchAll(PDO::FETCH_ASSOC);
if($questionShuffledValue[0]["status"] === 'ongoing') {
$timestampTime = $questionShuffledValue[0]["timestamp"];
$questionID = $questionShuffledValue[0]["question_id"];	
$chosenAnswer = $questionShuffledValue[0]["chosen_ans"];
$optionsShuffledArray = $quizClass->getShuffledOptData($studentid,$questionID);
$optionsShuffledArray = $optionsShuffledArray->fetchAll(PDO::FETCH_ASSOC);
$quizArray = $quizClass->getQuizDataStudent($y,$x,$z);
if($quizArray->rowCount() === 0) {
	$quizvalue = NULL;
}
$quizvalue = $quizArray->fetchAll(PDO::FETCH_ASSOC);
$time = $quizvalue[0]["quiz_time"];
$userPasswordArray = $quizClass->getExtraTimeData($studentid);
if($userPasswordArray->rowCount() === 0) {
$userPasswordValue = NULL;	
}
$userPasswordValue = $userPasswordArray->fetchAll(PDO::FETCH_ASSOC);
$userExtraTime = ($userPasswordValue[0]["user_extra_time"] && is_numeric($userPasswordValue[0]["user_extra_time"])) ? $userPasswordValue[0]["user_extra_time"] : 0;
$timeSplit = explode(":", $time);

$totalTime = (int)$userExtraTime + (int)$timeSplit[1];
$totalTimeS = $timeSplit[0] . ":" . $totalTime;	
} else {
header('location:../index.php');	
	
}
} else {
	
}

?>

<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>iCBT</title>
  <link rel="stylesheet" href="./style.css" />

</head>
<body>

<div class="quiz_box">

 <header>
            <div class="title">iCBT&nbsp;&nbsp;&nbsp;<span class="userData"><span>Reg No: &nbsp;<?=$_SESSION["regno"]; ?></span><span>&nbsp;&nbsp;Session: &nbsp;<?=$_SESSION["year"]; ?></span><span>&nbsp;&nbsp;Semester: &nbsp;<?=$_SESSION["semester"]; ?></span><span>&nbsp;&nbsp;&nbsp;Level:&nbsp;<?=$_SESSION["class"]; ?></span></span></div>
			<input type="hidden" id="student" class="student" value="<?=$_SESSION["student"]; ?>">
			<input type="hidden" id="semester" class="semester" value="<?=$_SESSION["semester"]; ?>">
			
			<!--<span class="exit" id="exit"><a href="#">Quit</a></span> --->
			<span class="logouts"><a href="logout.php">Log out</a></span>
            <div class="timer">
			 
                <div class="time_left_txt">Time Left</div>
                <div class="timer_sec">15</div>
            </div>
            <div class="time_line"></div>
        </header>
<div class="quiz-container ">
  <div id="quiz">
  <div class="slide">
  <?php
$path = "../uploads/"; 
$question_url = NULL; 
	  $question_url = $questionShuffledValue[0]["question_urls"];
     	  
  ?>
  <div class="question">
  <?php  echo $questionShuffledValue[0]["question_content"] . "<br />"; ?>
  <?php if(isset( $question_url)) { ?>
  <?php echo $question_url; ?>
  
  
	 
	  
  <?php } else { } ?>
 
  
   
 
  </div>
  <?php 
  $chosenAnswer =  $questionShuffledValue[0]["chosen_ans"];
  $html = "";
 /* foreach($optionsShuffledArray as $key => $optionRow){
 $html .= '<label><input type="radio" name="question0" value="' . $optionRow["option_texts"] . '">' . chr(65 + $key)  . ':'  . ' ' .  $optionRow["option_texts"] . '</label>';
  } 
  */?>
  <div class="answers">
  
  
<?php 
foreach($optionsShuffledArray as $key => $optionRow):?>
<label><input type="radio" name="question0" id="answerUsed" value="<?=$optionRow['option_texts']; ?>" <?php echo (isset($chosenAnswer) && $chosenAnswer == $optionRow['option_texts']) ? "checked"  : "";?>> <?= chr(65 + $key); ?> <?= ':' . ' ' . $optionRow["option_texts"]; ?>
 </label> <?php endforeach; ?>
 
</div>
  </div></div>
</div>
<footer class="showed">
<button class="prev_btn" id="previous">Prev Que</button>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
<button class="next_btn" id="next">Next Que</button>
<button class="submit_btn" id="submit">Submit Quiz</button>
<span><ul id="pagein">
<?php 
 
 $i = 1; foreach($questionShuffledValue  as $key => $questionRowd): ?>
<li><a onclick="get_data(this);" id="<?=$questionRowd["question_id"]; ?>" href="#"> <?=$i; ?> </a></li>
 
 
<?php $i++; endforeach; ?>

</ul></span>
<div id="overlay"  style="display:none">
<img src="../images/LoaderIcon.gif"/>
</div>
  <br>
  <span><a class="circleiT" id="saveIt" href="#">Save</a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span id="returnedvALUE"></span></span>


 </footer>
 </div>
 <div class="result_box">
        <div class="icon">
            <i class="fas fa-crown"></i>
        </div> 
<div id="results"></div>
</div>

<!-- partial -->
<script  src="./jquery.min.js"></script>
 <!-- <script  src="./script.js"></script> -->
<script type="text/javascript">
 function showResults(){var m=document.querySelector(".quiz_box"),d=document.querySelector(".result_box");jQuery.ajax({type:"POST",url:"submit_data.php",data:{studentid:jQuery("#student").val()},beforeSend:function(){jQuery("#overlay").show()},success:function(a){-1!==a.indexOf("successfully")?(jQuery("#results").html(a),m.classList.remove("activeQuiz"),d.classList.add("activeResult"),jQuery("#overlay").hide(),setTimeout(function(){window.location="../index.php"},1E4)):(alert(a),jQuery("#overlay").hide())}})}
function get_data(m){var d,a;jQuery.ajax({type:"POST",url:"get_data.php",data:{row_no:jQuery(m).attr("id"),studentid:jQuery("#student").val()},beforeSend:function(){jQuery("#overlay").show()},success:function(c){if(1==c.success)if(0<c.result.length){var p="",l=c.result[0].chosen_ans,b=c.result[0].question_content,h=c.result[0].question_urls&&4<c.result[0].question_urls.length?c.result[0].question_urls:"";jQuery("#overlay").hide();jQuery(".question").empty().html(b+"<br />"+h);for(b=1;b<c.result.length;b++)capturedData=
c.result[b].option_texts,p+='<label><input type="radio" name="question0" value="'+c.result[b].option_texts+'">'+c.result[b].option_alpha+": "+c.result[b].option_texts+"</label>";jQuery(".answers").empty();document.querySelector(".answers").innerHTML=p;$(".slide").show();d=jQuery('input[type="radio"]').map(function(){return this.value}).get();jQuery.each(d,function(k,f){f===l&&(a=document.querySelectorAll(".answers label input")[k],a.checked=!0)})}else alert(c.error),jQuery("#overlay").hide()}})}
var pageSize=1,currentPage=1,maxPage=10,incremSlide=10,startPage=0,numberPage=0,totalRows=<?=$totalRows; ?>,lastindex=0,finalIndex=0;
function dataTouse(){function m(d){function a(){k=Math.round(d-((Date.now()-(h+100))/1E3|0));f=k/3600|0;e=k%3600/60|0;g=k%60|0;f=10>f?"0"+f:f;e=10>e?"0"+e:e;g=10>g?"0"+g:g;c.textContent="00"==f?e+":"+g:f+":"+e+":"+g;0>d&&clearInterval(b);0>=k&&(clearInterval(b),p.classList.remove("activeQuiz"),showResults(),l.classList.add("activeResult"),setTimeout(function(){window.location="../index.php"},1E4))}var c=document.querySelector(".timer .timer_sec"),p=document.querySelector(".quiz_box"),l=document.querySelector(".result_box");
a();var b=setInterval(a,1E3);var h=<?=$timestampTime; ?>,k,f,e,g}document.getElementById("quiz");document.getElementById("results");document.getElementById("submit");(function(){document.querySelector(".start_btn button");document.querySelector(".info_box");var d=document.querySelector(".quiz_box"),a=document.querySelector(".showed");document.querySelector(".result_box");d.classList.add("activeQuiz");a.style.display="block";const timeoT = "<?=$totalTimeS; ?>"; d=(timeoT).split(":");m(3600*+d[0]+60*+d[1])})()}
jQuery(function(){dataTouse();jQuery(".submit_btn").click(function(){showResults()});jQuery("#saveIt").click(function(e){e.preventDefault();e=jQuery(".answers").find(":checked")&&jQuery(".answers").find(":checked").val()?jQuery(".answers").find(":checked").val():"";var g=jQuery("#pagein").find(".current").attr("id");jQuery.ajax({url:"answer_data.php",type:"POST",data:{answerSelected:e,currentQuestion:g,studentid:$("#student").val()},beforeSend:function(){jQuery("#overlay").show()},success:function(n){1==
n.success?(jQuery("#overlay").hide(),n=n.result,$("#returnedvALUE").html('<strong style="color:green">'+n+"</span>").fadeIn().fadeOut(3E3)):(n=n.error,jQuery("#overlay").hide(),alert(n))}})});for(var m=totalRows,d=Math.ceil(m/pageSize),a=startPage;a<d;a++)if(a>maxPage-1){jQuery("#pagein li").eq(a).hide();var c=jQuery("#pagein li").eq(a).hide();jQuery("#pagein li").index(c);lastindex=maxPage}else jQuery("#pagein li").eq(a).show(),lastindex=0;var p=document.querySelectorAll("#pagein li")[m-1],l=jQuery(".prev_btn").click(function(){startPage-=
10;incremSlide-=10;numberPage--;k()});l.hide();var b=jQuery(".submit_btn").click(function(){});b.hide();var h=jQuery(".next_btn").click(function(){startPage+=10;incremSlide+=10;numberPage++;k()});d==maxPage||d<maxPage?(h.hide(),b.show()):h.show();jQuery("#pagein li").first().find("a").addClass("current");var k=function(){jQuery("#pagein li").hide();lastindex==startPage?(--startPage,-1==startPage&&(startPage=0)):startPage+=0;for(t=startPage;t<incremSlide;t++)jQuery("#pagein li").eq(t+1).show();0==
startPage?(h.show(),l.hide(),b.hide()):-1==startPage?(h.show(),l.hide(),b.hide()):"none"!==p.style.display?(h.hide(),l.show(),b.show()):(h.show(),l.show(),b.hide())},f=function(e){jQuery(".slide").hide();jQuery(".slide").each(function(g){g>=pageSize*(e-1)&&g<pageSize*e&&jQuery(this).show()})};f(1);jQuery("#pagein li a").eq(0).addClass("current");jQuery("#pagein li a").click(function(){jQuery("#pagein li a").removeClass("current");jQuery(this).addClass("current");f(parseInt($(this).text()))})});


</script>
</body>
</html>
