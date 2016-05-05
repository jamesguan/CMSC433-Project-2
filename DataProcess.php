<?php
//Processes the data submitted through the form and sends it to the database
function processData(){
	//Make connection with database
	$link = mysql_connect('studentdb-maria.gl.umbc.edu', "justus2", "yfgA3FkSBGtiO4Mc") or die("Could not connect to MySQL");
	mysql_select_db("justus2") or die("No such database");	//connect to the database

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
	$query = "SELECT id FROM student WHERE id = '$id'";
	$result = mysql_query($query, $link) or die(mysql_error());
	$exists = mysql_num_rows($result);
	//if user exists (num rows = 1), update the user
	if($exists == 1){
		$query = "UPDATE student SET name = '$name', phone = '$phone', email = '$email' WHERE id = '$id'";
		$result = mysql_query($query, $link) or die(mysql_error());
	}
	//else create the user
	else{
		$query = "INSERT INTO student(id, name, phone, email) VALUES ('$id', '$name', '$phone', '$email')";
		$result = mysql_query($query, $link) or die(mysql_error());
	}

	$old = array();
	//escape each course and add it to the database
	if ($numCourses > 0) {
		//###ADD COURSES FOR USER###
		//delete all courses for user to prevent duplicates
		$query = "DELETE FROM takes WHERE id = '$id'";
		$result = mysql_query($query, $link) or die(mysql_error());
		
		for($i = 0; $i < $numCourses; $i++){
			$course = mysql_real_escape_string($courseList[$i]);
			$query = "INSERT INTO takes(id, course) VALUES ('$id', '$course')";
			$result = mysql_query($query, $link) or die(mysql_error());
			array_push($old,"0");
		}
	}
	elseif ($exists == 1 && $numCourses == 0) {
		$query = "SELECT * FROM takes WHERE id = '$id'";
		$result = mysql_query($query, $link) or die(mysql_error());
		if (mysql_num_rows($result) > 0) {
			while ($row = mysql_fetch_assoc($result)) {
				array_push($old,$row["course"]);
			}
		}
		else {
			array_push($old,"0");
		}
	}
	
	return $old;
	/*
echo("DEBUG SECTION:<br>");

//form info
echo($name."<br>");
echo($phone."<br>");
echo($email."<br>");
echo($id."<br>");

//taken courses
for($i = 0; $i < $numCourses; $i++){
echo($courseList[$i]."<br>");
} */
}?>