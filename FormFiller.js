//default constructor
function FormFiller(){}

//refills the form on the submit.php page
//name = name of student (string)
//phone = student's phone number (string)
//email = student's email (string)
//id = student's campus id (string)
FormFiller.fill = function(name, phone, email, id){
  //get each text element in the form
  var nameField = document.form.elements["name"];
  var phoneField = document.form.elements["phone"];
  var emailField = document.form.elements["email"];
  var IDField = document.form.elements["id"];

  //set the value for each field
  nameField.value = name;
  phoneField.value = phone;
  emailField.value = email;
  IDField.value = id;
}