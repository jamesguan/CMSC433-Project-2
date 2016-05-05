//NOTE: to find commented out debug statements, search for the word DEBUG

//COLORS
var red = "lightgrey";
var yellow = "GoldenRod";
var green = 'green';

//default constructor for ColorFiller
function ColorFiller(){}

//called on page load. initializes each table cell to yellow or red based on
//if the course can be added or not
ColorFiller.init = function(){
  //loop through each course in the course map
  coursemap.forEach(function(value, key){
    if(Course.hasTakenCourse(key)){
      document.getElementById(key).style.backgroundColor = green;
    }
    //if the course can be added, set its background to yellow
    else if(Course.validateAdd(key, false)){
      document.getElementById(key).style.backgroundColor = yellow;
    //else set its background to red
    } else {
      document.getElementById(key).style.backgroundColor = red;
    }
    //alert("DEBUG (ColorFiller.init): can add " + key + "? " + canAdd);
  }, coursemap);
}

//called when a course is added or removed. changes the background color of the
//course specified as well as any courses affected by the addition or removal
//of this course
//courseID: The id (string) of the course to be updated
ColorFiller.update = function(courseID){
  //set the background of the specified course to green if added. else yellow
  if(Course.hasTakenCourse(courseID)){
    document.getElementById(courseID).style.backgroundColor = green;
  } else {
    document.getElementById(courseID).style.backgroundColor = yellow;
  }
  
  //get the list of courses this course can unlock
  var unlocks = Course.getCourse(courseID).getUnlocks();
  
  //color CMSC447 based on its prereqs (special case: requires 1 CMSC4xx course)
  if(courseID.startsWith("CMSC4")){
    //if already added, set green
    if(Course.hasTakenCourse("CMSC447")){
      document.getElementById("CMSC447").style.backgroundColor = green;
    }
    //if can add, set yellow
    else if(Course.validateAdd("CMSC447", false)){
      document.getElementById("CMSC447").style.backgroundColor = yellow;
    //if cannot add, set red
    } else {
      document.getElementById("CMSC447").style.backgroundColor = red;
    }
  }
  
  //check each course this course unlocks to see if it can now be added
  //and updates the background accordingly
  unlocks.forEach(function(value){
    //if already added, set green
    if(Course.hasTakenCourse(value)){
      document.getElementById(value).style.backgroundColor = green;
    }
    //if can add, set yellow
    else if(Course.validateAdd(value, false)){
      document.getElementById(value).style.backgroundColor = yellow;
    //if cannot add, set red
    } else {
      document.getElementById(value).style.backgroundColor = red;
    }
  }, unlocks);
  
  //alert("DEBUG (ColorFiller.update): updated " + courseID);
}