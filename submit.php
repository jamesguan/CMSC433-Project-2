<?php

//include index.html to recreate the page
include 'index.html';
//include Validator.php to validate the submitted data
include 'assets/Validator.php';
//include DataProcess.php to submit the data to the database
include 'assets/DataProcess.php';
//include FormFiller.js to refill the form
echo('<script src="assets/FormFiller.js"></script>');

//validate data
if(!validate()){
  echo('<script>alert("Submission Failed! Please make sure the entire form is filled out.");</script>');
  return;
}

//send the data to the database
processData();

//get data from form
$name = $_POST['name'];
$phone = $_POST['phone'];
$email = $_POST['email'];
$id = $_POST['id'];

//hidden field filled with a list of taken classes
$courseList = $_POST['taken'];
//get num courses for for loop
$numCourses = count($courseList);

//loop through each course and add it to the list of taken courses for display
for($i = 0; $i < $numCourses; $i++){
  $course = mysql_real_escape_string($courseList[$i]);
  echo('<script>Course.setTaken("$course");</script>');
}

//tell the user their submission was successful
echo('<script>alert("Submission Successful! Please use this page to review.");</script>');

//refill the form with submitted data
echo('<script>FormFiller.fill("$name","$phone","$email","$id");</script>');

?>