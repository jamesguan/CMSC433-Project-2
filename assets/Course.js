//NOTE: to find commented out debug statements, search for the word DEBUG

//map to store and retrieve course objects by course id
var coursemap = new Map();
//set to store taken courses
var taken = new Set();
//counter for number of CMSC4XX courses
var cntCMSC4xx = 0;

//Constructor for course
function Course(prereqs){
  this.prereqs = prereqs;
  this.unlocks = new Set();
  
  this.getPrereqs = function(){
    return this.prereqs;
  }

  this.getUnlocks = function(){
    return this.unlocks;
  }
}

//adds selected courses in the select course list to the list of taken courses.
//returns true if courses were added. false otherwise
Course.addCourse = function(courseNum){
  //get the list of courses from the courses from the webpage
  var courseList = document.form.elements["courses"];

  //initialize the return value to false
  var rtn = false;

  //loop through all options and attempt to add any selected courses
  //for(var i = 0; i < courseList.options.length; i++){
    //get the select option and courseID
   // var courseOption = courseList.options[i];
    var courseID = courseNum;
    
    //if the current course is selected and it is addable
    if(Course.validateAdd(courseNum, true)){
      //if the course is CMSC4xx, increment the counter
      if(courseID.startsWith("CMSC4") && courseID != "CMSC447"){
        cntCMSC4xx = cntCMSC4xx + 1;
      }
      
      //add the course to the list of taken courses
      taken.add(courseNum);
      //change the color of this course and any unlocked courses
      ColorFiller.update(courseNum);
      //set return to true
      rtn = true;
    }
  //}
  
  //alert("DEBUG (Course.addCourse): Added course? " + rtn);
  return rtn;
}

//validate that this course can be added. returns true if the course can be
//added. false otherwise
//courseID: the id (string) of the course being added
//warn: a boolean value. TRUE if the user should get a message if the course
//      cannot be added. FALSE suppresses messages to the user (useful for
//      other functions that do validations that may spam the user)
Course.validateAdd = function(courseID, warn){
  //check to make sure this course isn't already added
  if(Course.hasTakenCourse(courseID)){
    //alert("DEBUG (Course.validateAdd): Tried to add a course that is already added");
    return false;
  }

  //get the prereqs for this course
  var course = Course.getCourse(courseID)
  if(course == null){
    //alert("DEBUG (Course.validateAdd): Tried to get a non existant course");
    return false;
  }
  var prereqs = course.getPrereqs();
  
  //validate CMSC447 (requires any CMSC400+ course (cntCMSC4xx > 0))
  if(courseID == "CMSC447" && cntCMSC4xx == 0){
      //alert the user of missing prereq if warn is true
      if(warn){
        alertonce("CMSC447 requires taking any CMSC400+ course as a prerequisite.");
      }
      return false;
  }
  
  //check to make sure all prereqs have already been taken
  var flag = true;
  //initialize error message if missing prereq
  var err = "Missing prerequisite(s): "
  //loop through each prereq
  prereqs.forEach(function(value){
    //if a prereq is missing, append to the err string
    if(!Course.hasTakenCourse(value)){
      err = err + "\n" + value.replace("|", " or ");
      flag = false;
    }
  }, prereqs);
  
  //if a prereq was missing and the user should be warned, alert the user
  if(!flag && warn){
    alert(err);
  }
  
  //return if all the prerequisites are taken
  return flag;
}

//removes selected courses in the select course list from the list of taken
//courses. returns true if courses were removes. false otherwise
Course.removeCourse = function(courseNum){
  //get the list of courses from the courses from the webpage
  var courseList = document.form.elements["courses"];

  //initialize the return value to false
  var rtn = false;
  
  //loop through all options and attempt to remove any selected courses
  //for(var i = 0; i < courseList.options.length; i++){
    //get the select option and courseID
    //var courseOption = courseList.options[courseNum];
 //   var courseID = courseOption.value;
   // if(courseID == courseNum){
    //  courseOption.selected = true;
  //  }

    //if the current course is selected and it is removable
    if(Course.validateRemove(courseNum, true)){
      //if the course is CMSC4xx and is not 447, decrement the counter
      if(courseNum.startsWith("CMSC4") && courseNum != "CMSC447"){
        cntCMSC4xx = cntCMSC4xx - 1;
      }
      
      //remove the course from the list of taken classes
      taken.delete(courseNum);
      //change the color of this course and any unlocked courses
      ColorFiller.update(courseNum);
      //set return to true
      rtn = true;
      }
    
  //}
  //alert("DEBUG (Course.removeCourse): Removed course? " + rtn);
  return rtn;
}

//validate that this course can be removed. returns true if the course can be
//removed. false otherwise
//courseID: the id (string) of the course being removed
//warn: a boolean value. TRUE if the user should get a message if the course
//      cannot be added. FALSE suppresses messages to the user (useful for
//      other functions that do validations that may spam the user)
Course.validateRemove = function(courseID, warn){
  //check to make sure this course was actually added
  if(!Course.hasTakenCourse(courseID)){
    //alert("DEBUG (Course.validateRemove): Tried to remove a course that is not added");
    return false;
  }
  
  //get the courses this course unlocks
  var course = Course.getCourse(courseID)
  if(course == null){
    //alert("DEBUG (Course.validateRemove): Tried to get a non existant course");
  }
  var unlocks = course.getUnlocks();
  
  //validate this course can be removed without affecting CMSC447
  if(Course.hasTakenCourse("CMSC447") && courseID.startsWith("CMSC4") 
     && courseID != "CMSC447" && cntCMSC4xx == 1){
    if(warn){
      alert("This course is being used as the CMSC400+ course required for " + 
            "CMSC447. Please remove CMSC447 or add another CMSC400+ " + 
            "course first.");
    }
    return false;
  }
  
  //check to make sure this course isn't a prereq for any other taken courses
  var flag = true;
  //initialize error message if this is a prereq for another taken class
  var err = "This course is a prerequisite for:";
  //loop through each unlock
  unlocks.forEach(function(value){
    //if this course is taken, append to the err string
    if(Course.hasTakenCourse(value)){
      err = err + "\n" + value;
      flag = false;
    }
  }, unlocks);
  
  //if a unlock was taken and the user should be warned, alert the user
  if(!flag && warn){
    alert(err + "\n" + "Please remove these courses first.");
  }
  
  //return if no unlocks are taken
  return flag;
}

//returns the course with the given id
//courseID: the id (string) of the course
Course.getCourse = function(courseID){
  return coursemap.get(courseID);
}

//return true if any course in a OR'd set of courses has been taken.
//returns false if none of the courses have been taken
//courseID: a single id (string) of a course or an OR'd set of courses (string)
//          example: "A|B|C" = A or B or C
Course.hasTakenCourse = function(courseID){
  var split = courseID.split("|");
  for(var i = 0; i < split.length; i++){
    if(taken.has(split[i])){
      return true;
    }
  }
  return false;
}

//puts all taken courses into a hidden element that can pass all
//taken courses into php
Course.compileTakenCourses = function(){
  //get the hidden element from the webpage
  var takenList = document.form.elements["taken[]"];

  //remove anything that may already be in the list
  //(if back button is used, list is not auto cleared)
  while(takenList.options.length > 0){
    takenList.remove(takenList.options[0]);
  }

  //add each taken course to the list
  taken.forEach(function(value){
    //create a new option
    var option = new Option(value, value);
    //set the option as selected so PHP sees it
    option.selected = true;
    //add the new option to the list
    takenList.add(option);
  }, taken);
  
  //return true so the event doesn't cancel
  return true;
}

//sets the course as taken without validation (allows adding courses from
//database or submitted form without any kind of order)
//CourseID = id (string) of the course to add
Course.setTaken = function(courseID){
  taken.add(courseID);
}

Course.selectClass = function(courseNum){
  var box = document.getElementById(courseNum);

 // alert(box.style.backgroundColor);
  if(box.style.backgroundColor == 'darkgreen'){
    Course.removeCourse(courseNum);
    
  }
  else{
    Course.addCourse(courseNum);
  
  }
}
