<?php
	
	$status = session_status();
	$subscriibedToken;
	$addressTouse = NULL;
	$finalIp = NULL;
	$subscribedPrice = NULL;
	if($status == PHP_SESSION_NONE) {
	session_start();
	}
if ( !defined('ABSPATH') )
define('ABSPATH', dirname(__FILE__) . '/');

require_once (ABSPATH . 'models/table_class.php');
require_once (ABSPATH . 'models/admin-table.php');
require_once (ABSPATH . 'models/constants.php');
require_once (ABSPATH . 'include/password.php');
include_once (ABSPATH . 'include/fuNctions.php'); 
$heading = MyConstant::HEADING;
$mainsite = MyConstant::MAINSITE;
$enquire = MyConstant::ENQUIRE;
ob_start();

?>

<html>
	<head>
		<meta charset="utf-8">
	    <meta name="viewport" content="width=device-width, initial-scale=1.0">
	    
<meta name="title" content="Computer based test software">
<meta name="description" content="A computer based test software that is designed to make testing more efficient and accessible">
<meta name="keywords" content="iCBT, exam, quiz, test, usmle prep platform">
<meta name="robots" content="index, follow">
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<meta name="language" content="English">
<meta name="revisit-after" content="7 days">
<meta name="author" content="Rockling Anayo Einstein">
<link rel="apple-touch-icon" sizes="72x72" href="<?='data:image/' . 'png' . ';base64,' . base64_encode(file_get_contents('images/apple-icon-72X72.png')); ?>">
<link rel="apple-touch-icon" sizes="120X120" href="<?='data:image/' . 'png' . ';base64,' . base64_encode(file_get_contents('images/apple-icon-120X120.png')); ?>">
<link rel="icon" type="image/png" sizes="192x192" href="<?='data:image/' . 'png' . ';base64,' . base64_encode(file_get_contents('images/android-icon-192x192.png')); ?>">
<link rel="icon" type="image/png" sizes="32x32" href="<?='data:image/' . 'png' . ';base64,' . base64_encode(file_get_contents('images/favicon-32x32.png')); ?>">
<link rel="icon" type="image/png" sizes="96x96" href="<?='data:image/' . 'png' . ';base64,' . base64_encode(file_get_contents('images/favicon-96x96.png')); ?>">
<link rel="icon" type="image/png" sizes="16x16" href="<?='data:image/' . 'png' . ';base64,' . base64_encode(file_get_contents('images/favicon-16x16.png')); ?>">
<meta name="msapplication-TileColor" content="#ffffff">
<meta name="msapplication-TileImage" content="<?='data:image/' . 'png' . ';base64,' . base64_encode(file_get_contents('images/ms-icon-144x144.png')); ?>">
<meta name="theme-color" content="#ffffff">
	    <link rel="icon" type="image/png" href="admin/assets/img/favicon.png">
		<link rel="stylesheet" type="text/css" href="vendor/bootstrap/css/bootstrap.min.css">
		<link rel="stylesheet" type="text/css" href="css/header.css">
		<link rel="stylesheet" type="text/css" href="css/util.css">
		<link rel="stylesheet" type="text/css" href="css/main.css">
		<link rel="stylesheet" type="text/css" href="vendor/animate/animate.css">
		<link rel="stylesheet" type="text/css" href="vendor/css-hamburgers/hamburgers.min.css">
		<link rel="stylesheet" type="text/css" href="fonts/font-awesome-4.7.0/css/font-awesome.min.css">
		<link rel="stylesheet" type="text/css" href="vendor/select2/select2.min.css">
		

	</head>

	<body>

	<!-- Header -->
		<header class="header1">
			<!-- Header desktop -->
			<div class="container-menu-header">
				<div class="wrap_header">
					<!-- Logo -->
					<a href="#" class="logo">
						<!--<img src="images/icons/logo.png" alt="IMG-LOGO"> -->
					</a>
                    <span class="heading"><?=$heading; ?> cbt software</span>
					<!-- Header Icon -->

				</div>
			</div>
			<!-- Header Mobile -->
			<div class="wrap_header_mobile">
				<!-- Logo moblie -->
				<a href="index.php" class="logo-mobile">
					<!--<img src="images/icons/logo.png" alt="IMG-LOGO"> -->
					
				</a>
				 

				<!-- Button show menu -->
				<span class="heading"><?=$heading; ?> cbt software</span>
			</div>
			</div>
		</header>

		<section>
			<div class="limiter">
				<div class="container-login100">
					
					<div class="wrap-login100">
						
						<div class="login100-form validate-form">
						<div class="textUs">
						<p class="cbtintro">
					<p class="uniqueText" style="font-size:16px;">
						<?=MyConstant::TEXTFIRST; ?>
						<br />
						<?=MyConstant::TEXTFIRSTHALF; ?>
						<br />
						<?=MyConstant::TEXTSECOND; ?>
</p>
<br />
   


							<?=MyConstant::CBTINTRO; ?></p>
						    <br />
						<ul class="listcourse">
							<li class="listedcourse"><?=MyConstant::MEDICINE; ?></li>
							<li class="listedcourse"><?=MyConstant::RADIOLOGY; ?></li>
							<li class="listedcourse"><?=MyConstant::PHARMACY; ?></li>
							<li class="listedcourse"><?=MyConstant::SOFTWARE; ?></li>
							<li class="listedcourse"><?=MyConstant::ENGLISH; ?></li>
							<li class="listedcourse"><?=MyConstant::THEOLOGY; ?></li>
						</ul>
						 
						<?=MyConstant::TEXTFIVE; ?>
                                                		                  
						<br />
						    <div>
      <a class="donate-with-crypto"
        href="https://commerce.coinbase.com/checkout/16f797a4-c5ec-4b46-a26d-3e7e73ea5f3d">
        Donate with Crypto
      </a>
      <script src="https://commerce.coinbase.com/v1/checkout.js?version=201807">
      </script>
    </div>

<br />
						<p class="testprof"><?=MyConstant::EVALUATEQUEST; ?> </p>
						<!--<form method="post">
							
						<a href='<?=$enquire; ?>'> Click to send &nbsp;</a> </form>-->
						
</div>
  <br />
  <br />
						<span class="login100-form-title title-form">
							Log in
							
						</span>
						 <form id="login_form" method="POST">
						 <div class="wrap-input100 validate-input studentname">
							<input class="input100" id="studentname" type="text" name="studentname"
								placeholder="Full name">
							<span class="focus-input100"></span>
							<span class="symbol-input100">
								<i class="fa fa-user" aria-hidden="true"></i>
							</span>
							<span class="error text-danger" id="empty_roll_name_field"></span>
						</div>
						<div class="wrap-input100 validate-input">
						 <?php
$_SESSION['token'] = bin2hex(openssl_random_pseudo_bytes(32));
$token = $_SESSION['token'];
echo '<input type="hidden" name="token" value="'.$token .'">';
?>
<input type="hidden" name="deviceid" id="deviceid">
							<input class="input100" id="email" type="text" name="email"
								placeholder="E-mail">
							<span class="focus-input100"></span>
							<span class="symbol-input100">
								<i class="fa fa-user-o" aria-hidden="true"></i>
							</span>
							<span class="error text-danger" id="empty_roll_number_field"></span>
						</div>
					

						<div class="wrap-input100 validate-input">
							<input class="input100" id="studentPassword" type="password" name="password"
								placeholder="Password" required>
							<span class="focus-input100"></span>
							<span class="symbol-input100">
								<i class="fa fa-lock" aria-hidden="true"></i>
							</span>
							<span class="error text-danger" id="empty_roll_password_field"></span>
						</div>
						<div class="wrap-input100 validate-input departments">
						<?php 
						require_once (ABSPATH  . 'database/base.php');
						require_once (ABSPATH . 'models/table_class.php');
                                                require_once (ABSPATH . 'models/admin-table.php');
                                                $adminTable = new User_table($db);
						/*$session = $adminTable->getSessionId(); */
$departID = NULL;
$departName = NULL;
$departmentData = NULL;
$departmentDataValue = NULL;
$departmentData =  $adminTable->getAllDepartMent();
if($departmentData->rowCount() == 0) {
	$departmentDataValue = NULL;
}
$departmentDataValue = $departmentData->fetchAll(PDO::FETCH_ASSOC);
?>
							<select class="input100" id="departments" type="text" name="departments">
								 <option value="">Select Department</option>
								 <?php
                           foreach ($departmentDataValue as $departmentData) { ?>
                       <option value="<?=$departmentData['depart_id']; ?>"><?=$departmentData['depart_name']; ?></option>
                         <?php  
                         }
										?>
</select>
							<span class="focus-input100"></span>
							<span class="symbol-input100">
								<i class="fa fa-suitcase" aria-hidden="true"></i>
							</span>
							<span class="error text-danger" id="empty_roll_password_field"></span>
							
						</div>

						<div class="container-login100-form-btn switchsubmit">
							<button type="submit" id="submit" name="submit" class="login100-form-btn submit">
								Sign in
							</button>
							
							
						</div>
						<div class="newaccount"> <span class="text-raw">Don't have an account? </span><a href="#" class="signupaccount">Sign up</a></div>
						
</form>
						<div class="text-center p-t-136">
						</div>
</div>
					</div>
				</div>
			</div>
			 <?php
			 /* Registration code */


			 if(isset($_POST['submits'])) {
			 
			
				if((!empty($_POST['email'])) && !empty($_POST['password']) && !empty($_POST['token']) && !empty($_POST['studentname'])  && !empty($_POST['departments']) && !empty($_POST['token'])) {
					
					$firstname = $_POST['studentname'];
	$lastname = $_POST['studentname'];
	 $departId = safe($_POST['departments']);
	  $email = safe($_POST['email']);
      $password = safe($_POST['password']);
	  $token = safe($_POST['token']);
	  $semester = "Ist";
	  $level = "B.sc";
	  $session = "2022-2023";
	
	  $regno = uniqid(substr($email, 0, strpos($email, "@")));
	  $ip = $_SERVER['REMOTE_ADDR'];
	
$country = "United State of America";
$state = "Washinghton";
$city = "Spokane";
$gender = "Al";
$lga = "Downtown";
$zipcode = "+1";
$phone = "4356789908";

	  
  
require_once (ABSPATH  . 'database/base.php'); 
require_once(ABSPATH . 'models/table_class.php');
require_once(ABSPATH . 'models/admin-table.php');
	  $adminTable = new User_table($db);
	  $datas = $adminTable->getOnlyDepartFromId($departId);

	  $data = $datas->fetchObject();
	  $departname = $data->depart_name;
	 
try {
	
	$result = $adminTable->insertUser($firstname, $lastname, $regno,$email, $phone, $country, $state, $city, $gender, $session, $lga, $level, $semester, $zipcode, $ip,$departId,$departname);
	$lastInsertId = $db->lastInsertId();
	$tokens = sha1(uniqid($regno, true));
	if($result) {
		$insertPassword = $adminTable->insertUserPasswordSelf($lastInsertId, $password);
		$datasd = $adminTable->checkEmailLinkFromPending($email);
	if($datasd->rowCount() === 0) {
	$adminTable->insertUserPending($tokens,$email,$regno,$_SERVER["REQUEST_TIME"]);
	} else {
		$adminTable->updatePendingUser($email,$tokens, $regno,$_SERVER["REQUEST_TIME"]);
	}
	?>
	<script type="text/javascript">
		var successful = <?php echo $firstname; ?>
		</script>

		<?php
	/*ob_end_clean(); */
var_dump($lastInsertId);

	echo '<p style="left:40%; position: absolute;font-size:20px; top:85%; color:green";>' . $firstname . " " . "registration was successful" . "<br />" . "<span>" . "Use this: " .  $regno . " in the email column for log in" . "</span>" . '</p>';
   /*echo "<span style='color:red'>". $_POST['studentname'] .  " " . "registration was successfull" . "</span>"; */
   }
	
			}catch (Exception $ex){
			echo '<p style="text-align:center; font-size:20px; top:85%; color:red";>' . $ex->getMessage() . '</p>';
			}
			}
				}
			?>
			
			<?php
		 /* Log in Code */ 
		  if(isset($_POST['submit'])) {
			 
          if((!empty($_POST['email'])) && !empty($_POST['password']) && !empty($_POST['token'])) {
$email = $_POST['email'];
$password = $_POST['password'];
require_once (ABSPATH  . 'database/base.php');
$adminTable = new User_table($db);
try{
$datas = $adminTable->getStudent($email);

$data = $datas->fetchObject();
$student = $data->user_id;
$useryear = $data->user_session;
$semester = $data->user_semester;
//$depart_id = $data->users_depart_id;
$pass = $data->user_pass;
$regno = $data->user_regno;
$class = $data->user_level;
 if ($password !== $pass) {
ob_end_clean();
 header('location:student/radlivequiz.php');
	 
	$_SESSION['student'] = (int)$student;
	$_SESSION['year'] = $useryear;
	$_SESSION['semester'] = $semester;
	$_SESSION['tokens'] = $token;
	$_SESSION['regno'] = $regno;
	$_SESSION['class'] = $class;
	//$_SESSION['depart_id'] = (int)$depart_id W;zg7`pE;

   
	   
 } 
	  $denied = "Invalid username or password";
	  $pass = "Forgot password";
	  echo '<p style="text-align: right; margin-left: 500px; color:red;font-size:16px">' . $denied .'<a style="color:blue;" href="../forgot_password.php">'.$pass .'<a/></p>';
 
	  }catch (Exception $ex){
	  echo '<p style="left:60%; position: absolute;font-size:20px; top:85%; color:red";>' . $ex->getMessage() . '</p>';
	  }
	  }
		  }
	  ?>
			<footer class="footer">
    <div class="container-fluid">
      <div class="copyright">
        &copy;2020 -
        <script>
          document.write(new Date().getFullYear())
        </script><br />
		<em> All rights reserved</em> <br />
		Powered by
        <a href="<?=$mainsite; ?>" target="_blank"><?=$heading; ?></a>.
      </div>
    </div>
  </footer>

		</section>
		<script src="vendor/jquery/jquery-3.2.1.min.js"></script>
		<script src="vendor/bootstrap/js/bootstrap.min.js"></script>
		<script src="vendor/uuid.js"></script>
		
		<script type="text/javascript">
			
			var uuid = new DeviceUUID().get();
			$(document).ready(function () {
            $("#deviceid").val(uuid);
			/*console.log(uuid);*/
			
			});
			$(".departments").hide();
			$(".submits").hide();
			$(".studentname").hide();
			$(".newaccount").on("click", ".signupaccount", function(event) {
             event.preventDefault();
			 $(this).text("login");
			 $(".departments").show();
			 $(".studentname").show();
			
			 $(".switchsubmit .submits").attr("name", "submit");
	
			$(".newaccount .text-raw").text("Already have an account? ");
			$(".newaccount .signupaccount").removeClass("signupaccount").addClass("loginaccount");
			$(".switchsubmit .submit").removeClass("submit").addClass("submits");
			$(".switchsubmit .submits").text("Sign Up");
			$("#submit").attr("name", "submits");
			
			/*$(".newaccount").html("Already have an account?" + " " + "<a href='#' class='loginaccount'>Log in</a>"); 
			$(".switchsubmit").html('<button type="submit" id="submits" name="submits" class="login100-form-btn submits">Register</button>'); */
			
			$(".title-form").text("Sign Up");

			});	
			$(".newaccount").on("click",".loginaccount", function(event) {
				console.log("I was clicked");
				event.preventDefault();
			 
			
			 $(".departments").hide();
			 $(".studentname").hide();
			
			
			$(this).text("Register");
			$(".newaccount .text-raw").text("Don't have an account? ");
			$(".newaccount .loginaccount").removeClass("loginaccount").addClass("signupaccount");
			$(".switchsubmit .submits").removeClass("submits").addClass("submit");
			$(".switchsubmit .submit").prop("name", "submit");
			$(".switchsubmit .submit").text("Sign In");
			$("#submit").attr("name", "submit");
			/*$(".newaccount").html("Already have an account?" + " " + "<a href='#' class='loginaccount'>Log in</a>"); 
			$(".switchsubmit").html('<button type="submit" id="submits" name="submits" class="login100-form-btn submits">Register</button>'); */
			
			$(".title-form").text("Log In");

			});	

			
		</script>
	</body>
</html>
