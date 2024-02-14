jQuery(function($){
	
jQuery('#questionUpload input').on("keyup", function(){

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
$("#selectSubmit").click(function(){
	
$('#questionUpload input, #questionUpload select').each(function() {
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
url: '../../exynghjkilopvbcdfghmijhgfdsertwawqsxcvbnmkliop/views/add-new-quiz.php',
data: {
'quiztitle': $("#quizForm #quiztitle").val(),
'totalquest': $("#quizForm #totalquest").val(),
'answopt': $("#quizForm #answopt").val(),       
'timeleng': $("#quizForm #timeleng").val(),
'cousecode': $("#quizForm #cousecode").val(),
'answeit': $("#quizForm #answeit").val(),
'wrong': $("#quizForm #wrong").val(),
'quizsession': $("#quizForm #quizsession").val(),
'shuffleq': $("#quizForm #shuffleq").val(),
'shuffleans': $("#quizForm #shuffleans").val(),
'level': $("#quizForm #level").val(),
'semester': $("#quizForm #semester").val(),
},
beforeSend: function() {
                
				
				/*$("#overlay").css({ top: $(window).height() / 6, left: $(window).width() / 6 });
				$("#overlay").show(); */
				$("#selectSubmit").hide();
				
            },
success: function(data,status,xhr) {
	
 /*$("#quizForm #quiztitle").val("");
$("#quizForm #totalquest").val("");       
 $("#quizForm #answopt").val("");
 $("#quizForm #timeleng").val("");
 $("#quizForm #cousecode").val("");
 $("#quizForm #answeit").val("");
 $("#quizForm #wrong").val("");
  $("#quizForm #quizsession").val(""),
  $("#quizForm #shuffleq").val(""),
  $("#quizForm #shuffleans").val(""),
 $("#quizForm #level").val("");
 console.log(data);
 /* setInterval(function() {$("#overlay").hide(); },1000); 
 
 $("#quizForm #semester").val("");
 */
 if(data.success) {
	 
	 $("#questionUpload #message").html(data);
 setTimeout(function(){
	           $("#selectQuiz").fadeOut("slow", function() {
$(this).modal('dispose');
});
              $("#questionUpload").modal();
            },1500);
 
 } else {
	 //var dataFailure = data.failure;
	 $("#questionUpload #message").html("<span style='color:red;'>" + dataFailure + "</span>");
	 //$("#quizForm #message").text(dataFailure);
 }

 
$("#createTemplate").show();
//$("#overlay").hide();


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


