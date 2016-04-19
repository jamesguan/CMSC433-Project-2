This readme file contains known issues, and how appearance, efficiency, organization, debugging, validation, and the database were implemented as well as a "how it works" section explaining how sections of code work and how everything comes together.

This project runs on the UMBC GL servers and uses the UMBC Maria database server

KNOWN ISSUES:
Does NOT work in Internet Explorer. This is due to IE not supporting the javascript String.startsWith() function. Lupoli says this is ok for the project as long as it is documented here.

APPEARANCE

Appearance is done with a combination of HTML, CSS, and JavaScript.
HTML:
 - used to create form
 - used to create tables
 - used to create div tags to separate form and tables
CSS:
 - used to set background colors
 - used to set input widths (fixed size)
 - used to set table widths (variable size with fixed min size)
 - used to set div widths and positions (forms div fixed size, fixed position. tables div variable size, absolute positon)
   - this prevents the form from scrolling but allows the tables to scroll if necessary
JavaScript:
 - used to color code the cells of the tables based on ability to take a class next semester
 - used to fill the "Courses" field in the form


EFFICIENCY

A minimum number of lines are used for this project. Code is reused for client side validations and for creating the submit.php page.
 
A boolean value is used in JavaScript validations that controls if the user is alerted or not if a prerequisite is missing for a course addition validation (useful for ColorFill.js).
 
index.html is included in submit.php to reuse the code on that page rather than unnecessarily writing more code


ORGANIZATION

HTML:
 - index.html is in the root directory for the project
 - the page is organized into two obvious sections: form and tables
 - code for the tables is grouped by table
CSS:
 - index.css is in the /assets folder of the project
 - code is organized into sections: tags, form classes, table classes
JavaScript:
 - ColorFiller.js, Course.js, FormFiller.js, init.js, Validator.js can all be found in the /assets folder of the project
 - JavaScript was done with an object oriented design in mind with each file representing a type of object
PHP:
 - submit.php is in the root directory for the project
 - DataProcess.php and Validator.php are in the /assets folder of the project
 - submit.php includes DataProcess.php and Validator.php to keep the code cleaner for each file

 
DEBUGGING

Some files have debugging statements commented out. Use ctrl+f to find them. Search for "DEBUG".


VALIDATION:

Client validation:
 - done with javascript
 - each time the user attempts to add a course, Course.js preforms validation to determine if the course can be added. A message will pop up informing the user of any prerequisites they are missing. If prerequisites are missing, the course will not be added.
 - each time the user attempts to remove a course, Course.js preforms validation to determine if the course can be remove. A message will pop up informing the user if the course they tried to remove is a prerequisite for any other added courses, and ask them to remove those courses first. If this course is a prerequisite for other added courses, this course will not be removed.
 - when the form is submitted, all text fields are validated. A message will appear for each field that is invalid and the form will not be submitted.
 
Server validation:
 - done with PHP
 - if the user somehow bypasses client validation (can be done by navigating directly to submit.php),
 server side validation will check for submitted data and preform validation on it before sending the data to the database. If null or invalid data is submitted, the user will get a message saying their submission failed and no data will be forwarded to the database

Valid form formats:
 - name: Can contain only letters and spaces 
 - phone: 10 numeric digits
 - email: at least 1 character followed by @ followed by at least 1 character followed by . followed by at least 1 character
 - id: 2 uppercase characters followed by 5 numbers
 - see assets/Validator.js or assets/Validator.php for regex's 
 
 
DATABASE

Two tables (* = primary key, ~ = forign key)
-------------------     -------------------
| student         |     | takes           |
|-----------------|     |-----------------|
| id* (char 7)    |     | ~id* (char 7)   |
| name (text)     |     | course (char 8) |
| email (text)    |     -------------------
| phone (char 10) |
-------------------

useful queries:
 - get list of courses for student: "select course from takes where id=(campus id here)"
 - get info for student: "select * from student where id=(campus id here)"
 - get list of student ids: "select id from student"
 - other SQL statements can be found in DataProcess.php with comments
 

HOW IT WORKS:

Page is loaded using index.html
index.html loads the CSS and javascript files into the server
in the body tag of index.html, init() is called using the onLoad event

init() sudocode:
 add all courses to a map (key=course id, value=course object(prerequisites[]))
 call initUnlocks{
   for each course{
     initialize the list of courses this course is a prerequisite for (call these "unlocks")
   }
 }
 
 use each course to create a select option and add the option to the "courses" select field in index.html
 
 call ColorFiller.init(){
   for each course{
     color green if the course is taken
     color yellow if all the prerequisites are met
     color red if at least one prerequisite is not met
   }
 }

The page is now loaded with all table cells colored appropriately
When a user adds a course, call Course.addCourse

Course.addCourse sudocode:
 get the "courses" element (a select form element with the list of courses)
 loop through each option{
   if the option is selected and Course.validateAdd == true, add the course and increment CMSC4xx counter if necessary. update the colors on the page with ColorFiller.update
     call Course.validateAdd{
       if the course is taken, return false
       if the course is cmsc447 and no other cmsc4xx courses are taken, return false
       if any prereqs are missing, return false
       return true
     }
     
     call ColorFiller.update{
       if course is taken, set color to green, else set color to red
       for each unlock{
         if unlock taken, set color to green
         if unlock meets has all prereqs taken, set color to yellow
         if unlock missing prereqs set color to red
       }
     }
 }
 
 When a user removes a course, call Course.removeCourse
 
 Course.removeCourse sudocode:
 get the "courses" element (a select form element with the list of courses)
 loop through each option{
   if the option is selected and Course.validateRemove == true, add the course and decrement CMSC4xx counter if necessary. update the colors on the page with ColorFiller.update
     call Course.validateRemove{
       if the course is not taken, return false
       if the course is cmsc4xx and cmsc447 is taken and this is the only other cmsc4xx course, return false (must have at least 1 other cmsc4xx course to keep the cmsc447 prereq)
       if any unlocks are added, return false
       return true
     }
     
     call ColorFiller.update{
       if course is taken, set color to green, else set color to red
       for each unlock{
         if unlock taken, set color to green
         if unlock meets has all prereqs taken, set color to yellow
         if unlock missing prereqs set color to red
       }
     }
 }
 
 When a user clicks the submit button, call Course.compileTakenCourses() and return Validator.validate(). Returning Validator.validate() will cancel the submit if it returns false.
 
 Course.compileTakenCourses() will add the list of taken courses to a hidden html select field and select all the items in the field to submit through POST. This can be obtained as an array using $_POST["taken"]
 
 Validator.validate() will do client side validation of all the text fields and warn the user of any invalid input. If any input is invalid, the submission will be stopped.
 
 On a successful submit, the user will be taken to submit.php.
 index.html is included to copy over the webpage
 assets/Validator.php is included so that the server side validate function may be called
 assets/DataProcess.php is included so that the process data function may be called
 the script to include assets/FormFiller.js is echoed to include the function that places text back into the fields on the submit.php page
 
 in submit.php, validate() is called from assets/Validator.php. This function looks at the information submitted in the four submitted text boxes and checks that their data is valid. This server side validation is necessary incase the user navigates directly to submit.php or disables javascript in index.html. If validate returns false, a script to alert the user is echoed and the rest of the php page does not execute.
 
 If validate returned true, processData() is called from assets/DataProcess.php.
 
 processData() sudocode:
  connect to the database
  escape the submitted fields (to prevent sql injection)
  run "SELECT id FROM student WHERE id = '$id'"
  if the query has a single row (the user exists)
    run query to update the user
  else (the user doesn't exist)
    run query to insert the user
  
  run query to delete any courses the user previously had added (prevents duplicate entries for a user)
  for each course in the hidden taken field (initialized on submit)
    escape the course name (to prevent sql injection)
    run query to insert the course for the user
    
After the data is processed, submit.php loops through each course in the hidden taken field and calls Course.setTaken() to add the course to the javascript held taken list. When the page loads, ColorFiller.init will see this list and color the courses in this list green and color any courses will all prerequisites completed yellow.

Finally a script with a successful submit message is echoed and FormFiller.fill() is called to copy the values submitted through the text boxes in index html back to the text boxes in submit.php