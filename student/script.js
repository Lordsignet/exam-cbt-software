"use strict";
function dataTouse(){
  // Functions
  function buildQuiz(){
    // variable to store the HTML output
    const output = [];
const start_btn = document.querySelector(".start_btn button");
const info_box = document.querySelector(".info_box");
const quiz_box = document.querySelector(".quiz_box");
const footer = document.querySelector(".showed");
const result_box = document.querySelector(".result_box");
const time = "1:30";
let timePart;
let hoursMinutes;

	quiz_box.classList.add("activeQuiz"); //show quiz box
	footer.style.display = "block";
    timePart = time.split(":");
   hoursMinutes = (+timePart[0] * (60 * 60)) + (+timePart[1] * 60);
  startTimer(hoursMinutes);
  
  
   

  }
  

 
       
	function startTimer(duration) {
		const timeCount = document.querySelector(".timer .timer_sec");
const quiz_box = document.querySelector(".quiz_box");
//const footer = document.querySelector(".showed");
const result_box = document.querySelector(".result_box");

	   timer();
	    counter = setInterval(timer, 1000);
	   var start = Date.now(),
	   diff,
	   hour,
	   minutes,
	   counter,
	   seconds;
	   function timer() {
		   diff = Math.round(duration - (((Date.now() - start) / 1000) | 0));
		   
		    hour =   diff / (60 * 60 ) | 0 ;
            minutes = (diff % ( 60 * 60)) / 60 | 0;
		   seconds = (diff % 60) | 0;
		   hour = hour < 10 ? "0" + hour : hour;
		   minutes = minutes < 10 ? "0" + minutes : minutes;
		   seconds = seconds < 10 ? "0" + seconds : seconds;
 
		   
		   timeCount.textContent = hour == "00" ? minutes + ':' + seconds : hour + ':' + minutes + ':' + seconds;
		   	if(duration < 0) {
			clearInterval(counter);
		   }			
		   if(diff <= 0) {
			   //start = Date.now() + 1000;
			   clearInterval(counter);
			   quiz_box.classList.remove("activeQuiz");
	result_box.classList.add("activeResult");
	showResults();
		   }
	   };
	  
}

  }
  

  

  // Variables
  const quizContainer = document.getElementById('quiz');
  const resultsContainer = document.getElementById('results');
  const submitButton = document.getElementById('submit');
 
  buildQuiz();


  
}
