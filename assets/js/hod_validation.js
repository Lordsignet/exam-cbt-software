$(function() {
    $('input').on("keyup", function() {

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
        if ($(input).hasClass('required') && !validateRequired($(input).val())) {
            addErrorData($(input), "This is a required field");
        }

        if ($(input).hasClass('email') && !validateEmail($($(input)).val())) {
            addErrorData($(input), "Invalid email address provided");
        }
        if ($(input).hasClass('regno') && !validateNumber($(input).val())) {
            addErrorData($(input), "only numbers are needed here");
        }
        if ($(input).hasClass('phone') && !validateNumber($(input).val())) {
            addErrorData($(input), "only numbers are needed here");
        }
        if ($(input).hasClass('password') && !validatePassword($($(input)).val())) {
            addErrorData($(input), "minimum of 8 mixed case characters needed.");
        }
        if ($(input).hasClass('noSpaces') && !isSpaced($($(input)).val())) {
            addErrorData($(input), "Spaces are not needed here.");
        }
        if ($(input).hasClass('confirm-password')) {
            var result = validatePasswords($(input).val());
            if (result != true) {
                addErrorData($(input), result);
            }
        }
    }
    $("#submit").click(function() {
        $('input, select').each(function() {
            var inputs = $(this);
            doValidation(inputs);
        });

        if ($('.error-data').length == 0) {



            $.ajax({
                type: 'POST',
                url: '../../exynghjkilopvbcdfghmijhgfdsertwawqsxcvbnmkliop/views/add-new-hod.php',
                data: {
                    'accessStages': $("#webForm #accessStages").val(),
                    'firstname': $("#webForm #firstname").val(),
                    'lastname': $("#webForm #lastname").val(),
                    'country': $("#webForm #country").val(),
                    'state': $("#webForm #state").val(),
                    'city': $("#webForm #city").val(),
                    'zipcode': $("#webForm #zipcode").val(),
                    'email': $("#webForm #email").val(),
                    'phone': $("#webForm #phone").val(),
                    'lga': $("#webForm #lga").val(),
                    'gender': $("#webForm #gender").val(),
                    'hql': $("#webForm #hql").val(),
                    'depart': $("#webForm #depart option:selected").text(),
                    'departid': $("#webForm #depart").val(),
                },
                beforeSend: function() {

                    //alert("emeka");
                    //alert("me");
                    $("#overlay").css({ top: $(window).height() / 2, left: $(window).width() / 6 });
                    $("#overlay").show();
                    $("#submit").hide();

                },
                success: function(data, status, xhr) {
                    console.log(data);
                    var textInner, returnedUserData;
                    if (data.success) {
                        $("#webForm #accessStages").val(""),
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
                        $("#webForm #gender").val("");
                        $("#webForm #hql").val("");
                        //$("#webForm #depart").text("");
                        $("#webForm #depart").val("");
                        var returnedUserId = data.result;
                        returnedUserData = data.userData;
                        var password = data.password;
                        /* textInner = "<span style='color:green'>" + returnedUserData + " " + "was successfully registered and password is:" + " " + password + "</span>"; */
                        document.getElementById("message").innerHTML = "password is:" + " " + password;
                        setTimeout(function() {
                            if (window.location.pathname != "/exynghjkilopvbcdfghmijhgfdsertwawqsxcvbnmkliop/all_hod.php") {
                                window.location = "all_hod.php";
                            } else {
                                window.location.reload(true);
                            }
                        }, 5000);
                        /* var imagefiled = document.querySelector("input[name='imagefile']");
                        console.log(imagefiled);
                        imagefiled.onchange = function() {
                        	showPreview(this);
                        };
                         */
                        /*$("#uploadModal").modal().fadeIn(2000); */



                        console.log(password);
                        $("#submit").show();
                        $("#overlay").hide();



                        /*if(data) {
                        setTimeout(function() {
                        window.location.href = "register.php"; }, 5000);
                        }
                        */
                    } else {

                        $("#submit").show();
                        $("#overlay").hide();
                        returnedUserData = data.except;
                        textInner = "<span style='color:green'>" + returnedUserData + "</span>";
                        document.getElementById("message").innerHTML = textInner;
                    }
                }

            });

        } else {

            alert("I am not equal to zero");
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
    if (value == "") return false;
    return true;
}

function typeCorrectString(e) {
    if (e.keyCode == 32 && $(this).val().indexOf(' ') > 0) return false;
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
    if (value != "") {
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


function showPreview(objFileInput) {
    if (objFileInput.files[0]) {
        var fileReader = new FileReader();
        fileReader.onload = function(e) {
            $("#viewimage").html('<img src="' + e.target.result + '" width="400px" height="300px" class="preview" id="thumbnail" />');
            //$('#thumbnail').imgAreaSelect({  aspectRatio: '1:1', handles: true  , onSelectChange: preview });

            //$("#viewimage").css('opacity','0.7');
            //$(".icon-choose-image").css('opacity','0.5');
        }
        fileReader.readAsDataURL(objFileInput.files[0]);
    }
}


/* */
function validatePasswords(value) {
    var password = $('.password').val();

    if (value == "") {
        return "Both passwords are required";
    } else if (value != password) {
        return "Passwords do not match";
    }
    return true;
}