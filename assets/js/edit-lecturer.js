jQuery(function($) {

    jQuery('input').on("keyup", function() {

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
    $("#editSubmit").click(function() {
        $('input, select').each(function() {
            var inputs = $(this);
            doValidation(inputs);
        });

        if ($('.error-data').length == 0) {



            $.ajax({
                type: 'POST',
                url: '../../exynghjkilopvbcdfghmijhgfdsertwawqsxcvbnmkliop/views/edit-lecturer.php',
                data: {
                    'lectid': $("#editwebForm #lectid").val(),
                    'firstname': $("#editwebForm #firstname").val(),
                    'lastname': $("#editwebForm #lastname").val(),
                    'email': $("#editwebForm #email").val(),
                    'phone': $("#editwebForm #phone").val(),
                    'gender': $("#editwebForm #gender").val(),
                    'hql': $("#editwebForm #hql").val(),
                },
                beforeSend: function() {


                    $("#overlay").css({ top: $(window).height() / 2, left: $(window).width() / 2 });
                    $("#overlay").show();
                    $("#editSubmit").hide();

                },
                success: function(data, status, xhr) {

                    $("#editwebForm #firstname").val("");
                    $("#editwebForm #lastname").val("");
                    $("#editwebForm #email").val("");
                    $("#editwebForm #phone").val("");
                    $("#editwebForm #gender").val("");
                    $("#editwebForm #level").val("");
                    console.log(data);
                    /* setInterval(function() {$("#overlay").hide(); },1000); */
                    $("#editwebForm #message").html(data);
                    setTimeout(function() {
                        $("#editStudent").fadeOut("slow", function() {
                            $(this).remove();
                        });
                        if (window.location.pathname != "/exynghjkilopvbcdfghmijhgfdsertwawqsxcvbnmkliop/all_lecturers.php") {
                            window.location = "all_hod.php";
                        } else {
                            window.location.reload(true);
                        }
                    }, 1500);



                    $("#overlay").hide();

                    $("#editsubmit").show();


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