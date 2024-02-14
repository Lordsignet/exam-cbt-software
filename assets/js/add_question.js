
$(function(){

$(document).on("keyup", "#appendIt input", function(){

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
if ($(input).hasClass('regno') &&!validateNumber($(input).val())) {
addErrorData($(input), "only numbers are needed here");
}
if ($(input).hasClass('phone') &&!validateNumber($(input).val())) {
addErrorData($(input), "only numbers are needed here");
}
if ($(input).hasClass('password') &&!validatePassword($($(input)).val())) {
addErrorData($(input), "minimum of 8 mixed case characters needed.");
}
if($(input).hasClass('noSpaces') && !isSpaced($($(input)).val())) {
addErrorData($(input), "Spaces are not needed here.");
}
if ($(input).hasClass('confirm-password')) {
var result = validatePasswords($(input).val());
if (result != true) {
addErrorData($(input), result);
}
}
}
$("#submit").click(function(){
$('#appendIt input, #appendIt textarea').each(function() {
var inputs = $(this);
doValidation(inputs);
});

if ($('.error-data').length == 0) {

//No errors, submit the form
console.log( $("#webForm #session").val(),  $("#webForm #semester").val()); 
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
url: '../../exynghjkilopvbcdfghmijhgfdsertwawqsxcvbnmkliop/views/add-new-user.php',
data: {
'firstname': $("#webForm #firstname").val(),
'lastname': $("#webForm #lastname").val(),  
'country': $("#webForm #country").val(),
'state': $("#webForm #state").val(),
'city': $("#webForm #city").val(),
'zipcode': $("#webForm #zipcode").val(),     
'email': $("#webForm #email").val(),
'regno': $("#webForm #regno").val(),
'phone': $("#webForm #phone").val(),
'lga': $("#webForm #lga").val(),
'session': $("#webForm #session").val(),
'gender': $("#webForm #gender").val(),
'semester': $("#webForm #semester").val(),
'level': $("#webForm #level").val(),
},
beforeSend: function() {
                
				
				$("#overlay").css({ top: $(window).height() / 2, left: $(window).width() / 2 });
				$("#overlay").show();
				$("#submit").hide();
				
            },
success: function(data,status,xhr) {
	
 $("#webForm #firstname").val("");
$("#webForm #lastname").val("");  
 $("#webForm #country").val("");
 $("#webForm #state").val("");
 $("#webForm #city").val("");
 $("#webForm #zipcode").val("");     
 $("#webForm #email").val("");
 $("#webForm #regno").val("");
 $("#webForm #phone").val("");
 $("#webForm #lga").val("");
 $("#webForm #session").val("");
 $("#webForm #gender").val("");
 $("#webForm #semester").val("");
 $("#webForm #level").val("");
 console.log(data);

 $("#webForm #message").html(data);
  setTimeout(function(){
              if(window.location.pathname != "/exynghjkilopvbcdfghmijhgfdsertwawqsxcvbnmkliop/all_students.php") {
	window.location = "all_students.php";
} else {
	window.location.reload(true);
}
            },1500);
			
$("#submit").show();
$("#overlay").hide();



/*if(data) {
setTimeout(function() {
window.location.href = "register.php"; }, 5000);
}
*/
 }
 
});

}
});
$(document).on("click","a#uploadNow", function(event) {
	event.preventDefault();
	var $this = $(this).closest("li");
	var li = $this.index();
	var returnedId,returnedUrl;
	var upload = $("#myupload");
	upload.show();
	
	
	$(".close").on("click", function() {
  upload.hide();
});
	//var imagefiled = document.querySelector("input[name='imagefile']");
	var imagefiled = $("input[name='imagefile']");
console.log(imagefiled);
/*imagefiled.onchange = function() {
	showPreview(this);
};
*/
/*
$(imagefiled).change(function() {
	showPreview(this);
});
*/
$("#uploadform").on('submit', function(e) {
	e.preventDefault();
	$.ajax({
		url: '../../exynghjkilopvbcdfghmijhgfdsertwawqsxcvbnmkliop/views/mediaupload.php',
		type: 'POST',
		data: new FormData(this),
		contentType: false,
		processData: false,
		cache: false,
		async: false,
		beforeSend: function() {
			$("#myupload #message").show();
		},
		success: function(dataReturned) {
			if(dataReturned.success) {
				returnedId = dataReturned.result;
				returnedUrl = dataReturned.url;
				$("#uploadform")[0].reset();
				
				$(".crop_preview_box_big").empty();
				 $("#myupload").hide();
				//console.log("you clicked on item", (li.index()));
				$this.attr("id", returnedId);
				$this.find("#imageUrl").text(returnedUrl);
				//$this.eq(li).append(returnedUrl);
   
   //;
  //alert(dataReturned.success);
   
				//$("#errorMessag").html("invalid File !").fadeIn();
				//alert(dataReturned);
			} else {
				//var result = dataReturned.result;
				//alert(dataReturned.);
			$this.attr("id", dataReturned.result);
  
   
			}
	
		}
});
});

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

function showPreview(objFileInput) {
	var val,fileExt;
	var imageArray = ["jpg", "png", "gif"];
	var videoArray = ["mp4", "ogg"];
	var audioArray = ["wav", "mp3"];
    if (objFileInput.files[0]) {
        var fileReader = new FileReader();
        fileReader.onload = function (e) {
			var filename = objFileInput.files[0].name;
			var filesize = objFileInput.files[0].size / 1024 / 1024;
			if(filesize > 0 && filesize <= 5) {
			
			var a = filename.split(".");
			if(a.length === 1 || ( a[0] === "" && a.length === 2)) {
				fileExt = "";
			} else {
				fileExt = a.pop();
			}
			
			if(jQuery.inArray(fileExt, imageArray) !== -1) {
				val = $("#viewimage").html('<img src="'+e.target.result+'" width="400px" height="300px" class="preview" id="thumbnail" />');
			} else if(jQuery.inArray(fileExt, videoArray) !== -1) {
				val = $("#viewimage").html('<video src="'+e.target.result+'" width=300 height=200 class="preview" type="video/' + fileExt + '" controls/>');
			} else if(jQuery.inArray(fileExt, audioArray) !== -1) {
				val = $("#viewimage").html('<audio src="'+e.target.result+'" width=300 height=200 class="preview" type="audio/' + fileExt + '" controls/>');
			} else {
				return false;
			}
            } else {
				alert("The file size should not be more than 5MB");
				return false;
			}
			//$('#thumbnail').imgAreaSelect({  aspectRatio: '1:1', handles: true  , onSelectChange: preview });
			
			//$("#viewimage").css('opacity','0.7');
			//$(".icon-choose-image").css('opacity','0.5');
        }
		fileReader.readAsDataURL(objFileInput.files[0]);
    }
}
var imagefiled = document.querySelector("input[name='imagefile']");
console.log(imagefiled);
imagefiled.onchange = function() {
	showPreview(this);
};
