<?php

//return true if the name is contains only letters and spaces. false otherwise
function validateName($name){

  //return false if name is empty
  if(empty($name)){
    return false;
  }

  //return false if any character is not a letter or a space
  if(preg_match('/[^a-zA-Z ]/', $name)){
    return false;
  }

  return true;
}

//return true if the phone number is 10 numbers. false otherwise
function validatePhone($phone){

  //return false if phone is empty
  if(empty($phone)){
    return false;
  }

  //return false if phone is not 10 numbers
  if(!preg_match('/\d{10}/', $phone) || strlen($phone) != 10){
    return false;
  }

  return true;
}

//return true if valid email format (_____@_____._____)
function validateEmail($email){

  //return flase if email is empty
  if(empty($email)){
    return false;
  }

  //return false if not a valid email format
  if(!preg_match('/.+@.+\..+/', $email)){
    return false;
  }

  return true;
}

//return true if valid id (2 leters, 5 numbers)
function validateID($id){

  //return false if id is empty
  if(empty($id)){
    return false;
  }

  //return false if not a valid id
  if(!preg_match('/[A-Z]{2}\d{5}/', $id) || strlen($id) != 7){
    return false;
  }

  return true;
}

//return true if all validations return true, otherwise return false
function validate(){
  if(!validateName($_POST['name'])){
    return false;
  }

  if(!validatePhone($_POST['phone'])){
    return false;
  }

  if(!validateEmail($_POST['email'])){
    return false;
  }

  if(!validateID($_POST['id'])){
    return false;
  }

  return true;
}

validate();

?>