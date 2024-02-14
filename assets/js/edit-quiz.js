jQuery(function($){
	
jQuery('#editquizForm input').on("keyup", function(){

doValidation($(this));
});
/*$('input').on('keydown', function(e){
var inputs = $(this);
inputs.parent().removeClass('error');
inputs.next('.error-data').remove();
    if(inputs.hasClass('required') && e.keyCode == 32 && inputs.val().indexOf(' ') >= 0){
	 addErrorData(inputs, "Spaces not needed");
	return false;
     
	   
    }
	return true;
});
*/
function doValidation(input) {
//Remove old errors
$(input).parent().removeClass('error');
$(input).next('.error-data').remove();
if ($(input).hasClass('required') &&!validateRequired($(input).val())) {
addErrorData($(input), "This is a required field");
}

if ($(input).hasClass('email') &&!validateEmail($($(input)).val())) {
addErrorData($(input), "Invalid email address provided");
}
if ($(input).hasClass('totalquest') &&!validateNumber($(input).val())) {
addErrorData($(input), "only numbers are needed here");
}
if ($(input).hasClass('questno') &&!validateNumber($(input).val())) {
addErrorData($(input), "only numbers are needed here");
}
if ($(input).hasClass('answopt') &&!validateNumber($(input).val())) {
addErrorData($(input), "only numbers are needed here");
}
if ($(input).hasClass('answeit') &&!validateNumber($(input).val())) {
addErrorData($(input), "only numbers are needed here");
}
if ($(input).hasClass('wrong') &&!validateNumber($(input).val())) {
addErrorData($(input), "only numbers are needed here");
}
if ($(input).hasClass('password') &&!validatePassword($($(input)).val())) {
addErrorData($(input), "minimum of 8 mixed case characters needed.");
}
if($(input).hasClass('noSpaces') && !isSpaced($($(input)).val())) {
addErrorData($(input), "Spaces are not needed here.");
}
if($(input).hasClass('quizsession') && !validateSession($($(input)).val())) {
addErrorData($(input), "session should be in this format: yyyy-yyyy.");
}
if($(input).hasClass('timeleng') && !validateTime($($(input)).val())) {
addErrorData($(input), "time should be in this format: h:m. e.g: 1:30");
}
if ($(input).hasClass('confirm-password')) {
var result = validatePasswords($(input).val());
if (result != true) {
addErrorData($(input), result);
}
}
}
$("#updateTemplate").click(function(){
	
$('#editquizForm input, #editquizForm select').each(function() {
var inputs = $(this);
doValidation(inputs);
});

if ($('.error-data').length == 0) {

//No errors, submit the form

//console.log(data);
/*if(data.subscribe == 'No') {
alert("Please do well and agree before submitting the order");
return false;
} else if (data.subscribe.length == 0) {
alert("Please do well and agree before continuing");
return false;
}
*/

$.ajax({
type: 'POST',
url: '../../exynghjkilopvbcdfghmijhgfdsertwawqsxcvbnmkliop/views/edit-quiz.php',
data: {
'quizid': $("#editquizForm #quizid").val(),
'quiztitle': $("#editquizForm #quiztitle").val(),
'totalquest': $("#editquizForm #totalquest").val(),
'answopt': $("#editquizForm #answopt").val(),       
'timeleng': $("#editquizForm #timeleng").val(),
'cousecode': $("#editquizForm #cousecode").val(),
'answeit': $("#editquizForm #answeit").val(),
'wrong': $("#editquizForm #wrong").val(),
'quizsession': $("#editquizForm #quizsession").val(),
'shuffleq': $("#editquizForm #shuffleq").val(),
'shuffleans': $("#editquizForm #shuffleans").val(),
'level': $("#editquizForm #level").val(),
'semester': $("#editquizForm #semester").val(),
},
beforeSend: function() {
                
				
				$("#overlay").css({ top: $(window).height() / 6, left: $(window).width() / 6 });
				$("#overlay").show();
				$("#updateTemplate").hide();
				
            },
success: function(data,status,xhr) {
	
 $("#editquizForm #quiztitle").val("");
$("#editquizForm #totalquest").val("");       
 $("#editquizForm #answopt").val("");
 $("#editquizForm #timeleng").val("");
 $("#editquizForm #cousecode").val("");
 $("#editquizForm #answeit").val("");
 $("#editquizForm #wrong").val("");
  $("#editquizForm #quizsession").val(""),
  $("#editquizForm #shuffleq").val(""),
  $("#editquizForm #shuffleans").val(""),
 $("#editquizForm #level").val("");
 console.log(data);
 /* setInterval(function() {$("#overlay").hide(); },1000); */
 
 $("#editquizForm #semester").val("");
 if(data.indexOf("updated") > -1) {
	 
	 $("#editquizForm #message").html(data);
 setTimeout(function(){
	           $("#editquizTemplate").fadeOut("slow", function() {
$(this).remove();
});
              if(window.location.pathname != "/exynghjkilopvbcdfghmijhgfdsertwawqsxcvbnmkliop/quiz.php") {
	window.location = "quiz.php";
} else {
	window.location.reload(true);
}
            },1500);
 
 } else {
	 //var dataFailure = data.failure;
	 $("#editquizForm #message").html("<span style='color:red;'>" + data + "</span>");
	 //$("#editquizForm #message").text(dataFailure);
 }

 
$("#updateTemplate").show();
$("#overlay").hide();


 }
 
});

}
});
});
/*var Checkbox = document.getElementById('checkMeOut');
var submitBtn = document.getElementById('submit');
Checkbox.onclick = function() {
 submitBtn.style.display = this.checked ? "inline" : "none";
}
*/

function addErrorData(element, error) {
element.parent().addClass("error");
element.after("<span class='error-data text-danger'>" + error + "</span>");
}
function validateRequired(value) {
if (value == "" ) return false;
return true;
}
function typeCorrectString(e) {
 if(e.keyCode == 32 && $(this).val().indexOf(' ') > 0) return false;
 return true;
 }
function validateEmail(value) {
if (value != "") {
return /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/i.test(value);
}
return true;
}
function validatePassword(value) {
if (value != "") {
/*return /^(\w*(?=\w*\d)(?=\w*[a-z])(?=\w*[A-Z])\w*){6,}/g.test(value); */
return /^(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/.test(value);
}
return true;
}
function validateSession(value) {
	if (value != "") {
/*return /^(\w*(?=\w*\d)(?=\w*[a-z])(?=\w*[A-Z])\w*){6,}/g.test(value); */
return /^(\d{4})-(\d{4})$/.test(value);
}
return true;
}
function validateTime(value) {
	if (value != "") {
/*return /^(\w*(?=\w*\d)(?=\w*[a-z])(?=\w*[A-Z])\w*){6,}/g.test(value); */
return /^(\d{1}):(\d{1,2})$/.test(value);
}
return true;
}
function isSpaced(value) {
if(value != "") { 
return /^\S+$/.test(value); 

}
return true;
}
function validateNumber(value) {
if (value != "") {
return !isNaN(parseInt(value, 10)) && isFinite(value);
//isFinite, in case letter is on the end
}
return true;
}

/* */
function validatePasswords(value) {
var password = $('.password').val();

if (value == "") {
return "Both passwords are required";
}else if (value != password) {
return "Passwords do not match";
}
return true;
}


