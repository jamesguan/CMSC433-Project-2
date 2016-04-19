//default constructor
function Validator(){}

//return true if the name contains only letters and spaces. false otherwise
Validator.validName = function(){
  var name = document.form.elements["name"].value;

  //return false if name is empty
  if(!name){
    alert("Name is required.");
    return false;
  }

  //return false if any character is not a letter or a space
  if(name.match(/[^a-zA-Z ]/)){
    alert("Name can only contain letters and spaces");
    return false;
  }

  return true;
}

//return true if the phone number is 10 numbers. false otherwise
Validator.validPhone = function(){
  var phone = document.form.elements["phone"].value;

  //return false if phone is empty
  if(!phone){
    alert("Phone is required.");
    return false;
  }

  //return false if phone is not 10 numbers
  if(!phone.match(/\d{10}/) || phone.length != 10){
    alert("Invalid phone number. Must be in format XXXXXXXXXX");
    return false;
  }

  return true;
}

//return true if valid email format (_____@_____._____)
Validator.validEmail = function(){
  var email = document.form.elements["email"].value;

  //return false if email is empty
  if(!email){
    alert("Email is required.");
    return false;
  }

  //return false if not a valid email format
  if(!email.match(/.+@.+\..+/)){
    alert("Invalid email.");
    return false;
  }

  return true;
}

//return true if valid id (2 letters, 5 numbers)
Validator.validID = function(){
  var id= document.form.elements["id"].value;

  //return false if id is empty
  if(!id){
    alert("Campus ID is required.");
    return false;
  }

  //return false if not a valid id
  if(!id.match(/[A-Z]{2}\d{5}/) || id.length != 7){
    alert("Invalid campus ID. Must be 2 upper case letters followed by 5 numbers");
    return false;
  }

  return true;
}

//return true if all validations return true, otherwise return false
//don't return early so all error messges are sent
Validator.validate = function(){
  var flag = true;

  //check name
  if(!Validator.validName()){
    flag = false;
  }

  //check phone
  if(!Validator.validPhone()){
    flag = false;
  }

  //check email
  if(!Validator.validEmail()){
    flag = false;
  }

  //check id
  if(!Validator.validID()){
    flag = false;
  }

  return flag;
}