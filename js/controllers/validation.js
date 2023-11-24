import { getEleById } from "./controller.js";


// TODO: Check if input is empty
const checkEmpty = (value, idErr) => {
    if (value == "" || value == null) {
        getEleById(idErr).style.display = "block";
        getEleById(idErr).innerText = "It must be filled!"; 
        return false;
    }
    getEleById(idErr).style.display = "none";
    return true; 
}

// TODO: Check if input contains only letters
const checkAllLetter = (value, idErr) => {
    const regex = /^[A-Z a-z]+$/;

    if (regex.test(value)) {
        getEleById(idErr).style.display = "none";
        return true;
    }
    getEleById(idErr).style.display = "block";
    getEleById(idErr).innerText = "It must be letters!";
    return false; 
}

// TODO: Check if email field is valid
const checkEmail = (value, idErr) => {
    const regexEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\ [[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (regexEmail.test(value)) {
        getEleById(idErr).style.display = "none";
        return true;
    }
    getEleById(idErr).style.display = "block";
    getEleById(idErr).innerText = "Invalid Email!";
    return false; 
}

// TODO: Check if input field is between [n1, n2]
const checkRange = (value, idErr, name, n1, n2) => {
    if (value >= n1 && value <= n2) {
        getEleById(idErr).style.display = "none";
        return true; 
    }
    getEleById(idErr).style.display = "block";
    getEleById(idErr).innerText = `${name} must be between [${n1}, ${n2}]`;
    return false; 
}

// TODO: Check if type person is valid 
const checkType = (value, idErr) => {
    if (value == "student" || value == "employee" || value == "customer") {
        getEleById(idErr).style.display = "none";
        return true; 
    }
    getEleById(idErr).style.display = "block";
    getEleById(idErr).innerText = "Please enter the correct type!";
    return false; 
}

// TODO: Check if ID existed 
const checkId = (value, idErr, personList) => {
    let index = personList.findIndex(item => item.id == value); 

    if (index != -1) {
        getEleById(idErr).style.display = "block";
        getEleById(idErr).innerText = "ID already existed! Please enter another ID!";
        return false;
    }
    getEleById(idErr).style.display = "none";
    return true; 
}

// TODO: Check if input field is all 
const checkNumber = (value, idErr) => {
    if (!isNaN(value)) {
        getEleById(idErr).style.display = "none";
        return true;
    }
    getEleById(idErr).style.display = "block";
    getEleById(idErr).innerText = "It must be number!";
    return false; 
}


export {
    checkEmpty, checkAllLetter, checkEmail, checkRange, checkType, checkId, checkNumber
}

