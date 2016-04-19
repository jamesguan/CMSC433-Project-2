<?php
//Processes the data submitted through the form and sends it to the database
function processData(){
  //Make connection with database
  $link = mysql_connect('studentdb-maria.gl.umbc.edu', 'XX', 'XX');
  if(!$link) {
    die('Could not connect: ' . mysql_error());
  }

  //get info from form and escape it
  $name = mysql_real_escape_string($_POST['name']);
  $phone = mysql_real_escape_string($_POST['phone']);
  $email = mysql_real_escape_string($_POST['email']);
  $id = mysql_real_escape_string($_POST['id']);

  //hidden field filled with a list of taken classes
  $courseList = $_POST['taken'];
  //get num courses for for loop
  $numCourses = count($courseList);


  //###CREATE OR UPDATE USER###
  $query = "SELECT id FROM XX.student WHERE id = '$id'";
  $result = mysql_query($query, $link) or die(mysql_error());

  //if user exists (num rows = 1), update the user
  if(mysql_num_rows($result) == 1){
    $query = "UPDATE XX.student SET name = '$name', phone = '$phone', email = '$email' WHERE id = '$id'";
    $result = mysql_query($query, $link) or die(mysql_error());
  }
  //else create the user
  else{
    $query = "INSERT INTO XX.student(id, name, phone, email) VALUES ('$id', '$name', '$phone', '$email')";
    $result = mysql_query($query, $link) or die(mysql_error());
  }


  //###ADD COURSES FOR USER###
  //delete all courses for user to prevent duplicates
  $query = "DELETE FROM XX.takes WHERE id = '$id'";
  $result = mysql_query($query, $link) or die(mysql_error());

  //escape each course and add it to the database
  for($i = 0; $i < $numCourses; $i++){
    $course = mysql_real_escape_string($courseList[$i]);
    $query = "INSERT INTO XX.takes(id, course) VALUES ('$id', '$course')";
    $result = mysql_query($query, $link) or die(mysql_error()); 
  }

  //echo("DEBUG SECTION:<br>");
  //
  ////form info
  //echo($name."<br>");
  //echo($phone."<br>");
  //echo($email."<br>");
  //echo($id."<br>");
  //
  ////taken courses
  //for($i = 0; $i < $numCourses; $i++){
  //  echo($courseList[$i]."<br>");
  //}
}

?>