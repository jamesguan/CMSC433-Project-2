function init(){
  //initialize the class map for validation and drawing
  //preqreqs requiring class A or class B are put in the same array item separated by a pipe
  //e.x.1 A or B = "A|B"
  //e.x.2 A or B or C = "A|B|C"
  //e.x.3 (A or B) and C = "A|B", "C"
  //e.x.4 (A and B) or C = "A|C", "B|C"
  //e.x.5 (A and B) or (C and D) = "A|C", "A|D", "B|C", "B|D"
  //NOTE: per lupoli, only validate prereqs if the prereq is a CMSC course
  //      or counts towards the CMSC major
  coursemap.set("BIOL100", new Course([]));
  coursemap.set("BIOL100L", new Course(["BIOL100|BIOL141|BIOL142"]));
  coursemap.set("BIOL141", new Course(["MATH151"]));
  coursemap.set("BIOL142", new Course(["BIOL141","MATH151"]));
  coursemap.set("BIOL251", new Course(["BIOL141","CHEM102"]));
  coursemap.set("BIOL251L", new Course(["BIOL251|CHEM102L"]));
  coursemap.set("BIOL252", new Course(["BIOL251"]));
  coursemap.set("BIOL252L", new Course(["BIOL251L","BIOL252"]));
  coursemap.set("BIOL275", new Course(["BIOL100|BIOL141"]));
  coursemap.set("BIOL275L", new Course(["BIOL275"]));
  coursemap.set("BIOL301", new Course(["BIOL100|BIOL141"]));
  coursemap.set("BIOL302", new Course(["BIOL100|BIOL141","MATH151","CHEM102"]));
  coursemap.set("BIOL302L", new Course(["BIOL302"]));
  coursemap.set("BIOL303", new Course(["BIOL302","CHEM102","MATH151"]));
  coursemap.set("BIOL303L", new Course(["BIOL302","BIOL303"]));
  coursemap.set("BIOL304", new Course(["BIOL304"]));
  coursemap.set("BIOL304L", new Course(["BIOL303L","BIOL304"]));
  coursemap.set("BIOL305", new Course(["BIOL303","PHYS122"]));
  coursemap.set("BIOL305L", new Course(["BIOL305"]));
  coursemap.set("CHEM101", new Course(["MATH151"]));
  coursemap.set("CHEM102", new Course(["CHEM101"]));
  coursemap.set("CHEM102L", new Course(["CHEM101","CHEM102"]));
  coursemap.set("CMSC100", new Course([]));
  coursemap.set("CMSC103", new Course([]));
  coursemap.set("CMSC104", new Course([]));
  coursemap.set("CMSC106", new Course([]));
  coursemap.set("CMSC109", new Course(["CMSC103|CMSC201"]));
  coursemap.set("CMSC121", new Course([]));
  coursemap.set("CMSC201", new Course([]));
  coursemap.set("CMSC202", new Course(["CMSC201"]));
  coursemap.set("CMSC203", new Course([]));
  coursemap.set("CMSC232", new Course(["CMSC202"]));
  coursemap.set("CMSC291", new Course([]));
  coursemap.set("CMSC299", new Course([]));
  coursemap.set("CMSC304", new Course(["CMSC202"]));
  coursemap.set("CMSC313", new Course(["CMSC202","CMSC203"]));
  coursemap.set("CMSC331", new Course(["CMSC202","CMSC203"]));
  coursemap.set("CMSC341", new Course(["CMSC202","CMSC203"]));
  coursemap.set("CMSC345", new Course(["CMSC341"]));
  coursemap.set("CMSC352", new Course([]));
  coursemap.set("CMSC391", new Course([]));
  coursemap.set("CMSC404", new Course([]));
  coursemap.set("CMSC411", new Course(["CMSC313"]));
  coursemap.set("CMSC421", new Course(["CMSC313","CMSC341"]));
  coursemap.set("CMSC426", new Course(["CMSC421"]));
  coursemap.set("CMSC427", new Course([]));
  coursemap.set("CMSC431", new Course(["CMSC313", "CMSC331", "CMSC341"]));
  coursemap.set("CMSC432", new Course(["CMSC331", "CMSC341"]));
  coursemap.set("CMSC433", new Course(["CMSC331"]));
  coursemap.set("CMSC435", new Course(["CMSC313","CMSC341"]));
  coursemap.set("CMSC436", new Course(["CMSC341"]));
  coursemap.set("CMSC437", new Course(["CMSC341"]));
  coursemap.set("CMSC441", new Course(["CMSC341"]));
  coursemap.set("CMSC442", new Course(["CMSC203"]));
  coursemap.set("CMSC443", new Course(["CMSC341"]));
  coursemap.set("CMSC444", new Course(["CMSC421", "CMSC481"]));
  coursemap.set("CMSC446", new Course(["CMSC331", "CMSC341"]));
  coursemap.set("CMSC447", new Course(["CMSC341"])); //SPECIAL CASE. also requires any 4xx class
  coursemap.set("CMSC448", new Course(["CMSC345", "CMSC447"]));
  coursemap.set("CMSC451", new Course(["CMSC202", "CMSC203"]));
  coursemap.set("CMSC452", new Course(["CMSC203"]));
  coursemap.set("CMSC453", new Course(["CMSC341"]));
  coursemap.set("CMSC455", new Course(["CMSC341"]));
  coursemap.set("CMSC456", new Course(["CMSC341"]));
  coursemap.set("CMSC457", new Course(["CMSC203"]));
  coursemap.set("CMSC461", new Course(["CMSC341"]));
  coursemap.set("CMSC465", new Course(["CMSC461","CMSC481"]));
  coursemap.set("CMSC466", new Course(["CMSC461","CMSC481"]));
  coursemap.set("CMSC471", new Course(["CMSC341"]));
  coursemap.set("CMSC473", new Course(["CMSC331"]));
  coursemap.set("CMSC475", new Course(["CMSC341"]));
  coursemap.set("CMSC476", new Course(["CMSC341"]));
  coursemap.set("CMSC477", new Course(["CMSC471"]));
  coursemap.set("CMSC478", new Course(["CMSC471"]));
  coursemap.set("CMSC479", new Course(["CMSC471"]));
  coursemap.set("CMSC481", new Course(["CMSC341"]));
  coursemap.set("CMSC483", new Course(["CMSC421"]));
  coursemap.set("CMSC484", new Course(["CMSC202"]));
  coursemap.set("CMSC486", new Course([]));
  coursemap.set("CMSC487", new Course(["CMSC421","CMSC481"]));
  coursemap.set("CMSC491", new Course([]));
  coursemap.set("CMSC493", new Course(["CMSC435","CMSC471"]));
  coursemap.set("CMSC495", new Course([]));
  coursemap.set("CMSC498", new Course([]));
  coursemap.set("CMSC499", new Course([]));
  coursemap.set("GES110", new Course([]));
  coursemap.set("GES111", new Course([]));
  coursemap.set("GES120", new Course([]));
  coursemap.set("MATH151", new Course([]));
  coursemap.set("MATH152", new Course(["MATH151"]));
  coursemap.set("MATH221", new Course(["MATH151"]));
  coursemap.set("MATH225", new Course(["MATH152"]));
  coursemap.set("MATH251", new Course(["MATH152"]));
  coursemap.set("MATH301", new Course(["MATH152","MATH221"]));
  coursemap.set("MATH430", new Course(["MATH251","MATH301"]));
  coursemap.set("MATH441", new Course(["CMSC201","MATH225","MATH251","MATH301"]));
  coursemap.set("MATH452", new Course(["STAT355"]));
  coursemap.set("MATH475", new Course(["MATH301"]));
  coursemap.set("MATH481", new Course(["MATH221","MATH225","MATH251"]));
  coursemap.set("MATH483", new Course([]));
  coursemap.set("PHYS121", new Course(["MATH151"]));
  coursemap.set("PHYS122", new Course(["PHYS121", "MATH152"]));
  coursemap.set("PHYS122L", new Course(["PHYS122"]));
  coursemap.set("PHYS224", new Course(["PHYS122"]));
  coursemap.set("PHYS304", new Course(["PHYS122"]));
  coursemap.set("STAT355", new Course(["MATH152|MATH225|MATH251"]));
  
  //initialize unlocks
  initUnlocks();
  
  //get the list of courses from the web page
  var courseList = document.form.elements["courses"];

  //initialize the list of courses
  coursemap.forEach(function(value, key){
    courseList.add(new Option(key, key));
  }, coursemap);
  
  //initialize the colors based on prereqs
  ColorFiller.init();
}

//initialize for each course the list of courses that can be taken after the
//current course is taken
function initUnlocks(){
  //loop through each course
  coursemap.forEach(function(value, key){
    //get the list of prereqs
    var prereqs = value.getPrereqs();
    //for each prereq (can't use real foreach due to visibility of coursemap)
    for(var i = 0; i < prereqs.length; i++){
      //split any OR'd prereqs
      var split = prereqs[i].split("|");
      //for each part of the split
      for(var j = 0; j < split.length; j++){
        //add this course as an unlock for the split part course
        coursemap.get(split[j]).unlocks.add(key);
      }
    }
  }, coursemap);
}