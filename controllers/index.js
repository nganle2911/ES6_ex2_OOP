import Customer from "../models/Customer.js";
import Employee from "../models/Employee.js";
import Person from "../models/Person.js";
import Student from "../models/Student.js";
import { getDataModal, getEleById, hideAll, renderListPeople } from "./controller.js";
import { checkAllLetter, checkEmail, checkEmpty, checkId, checkNumber, checkRange, checkType } from "./validation.js";


// list IDs of all html elements that need to be changed for different type of person
const htmlElements = ["inputMath", "inputPhysics", "inputChemistry", "inputWorkingDay", "inputWage", "inputCompany", "inputInvoice", "inputReview"];

let listPerson = []; 


/**
 * TODO: Create a function which changes the UI of modal when choosing the different types of person
 * *3-BLOCK MODEL
 * Input: type 
 * Logical execution: 
 *  - get value from input field of type
 *  - If type == 1 => student => display 3 more inputs of math, physics, chemistry
 *  - If type == 2 => employee => display 2 more inputs of workingDay and dailyWage
 *  - If type == 3 => customer => display 3 more inputs of companyName, invoiceValue, review
 * Output: display more input elements according to the type of person
 */
getEleById("typePerson").onchange = () => {
    let type = getEleById("typePerson").value;

    hideAll(htmlElements);

    // create 3 arrays - student, employee, customer from array elements 
    const students = htmlElements.slice(0, 3);
    const employees = htmlElements.slice(3, 5);
    const customers = htmlElements.slice(5, 8);

    switch (type) {
        case "student":
            hideAll(htmlElements);
            students.forEach((student) => {
                document.getElementById(student).style.display = "block";
            })
            break;
        case "employee":
            hideAll(htmlElements);
            employees.forEach((employee) => {
                document.getElementById(employee).style.display = "block";
            })
            break;
        case "customer":
            hideAll(htmlElements);
            customers.forEach((customer) => {
                document.getElementById(customer).style.display = "block";
            })
            break;
        default:
            hideAll(htmlElements);
            break;
    }
}

/**
 * TODO: Add new person 
 * *3-BLOCK MODEL
 * Input: data entered by user
 * Logical Execution: 
 *  - get data entered by user & create a new object from data
 *  - check validation 
 *  - push this object to listPeople
 *  - save to localStorage 
 *  - render this object on UI 
 * Output: this object rendered on UI 
 */
window.addPerson = () => {
    // get data entered by user & create a new object from data
    let person = getDataModal(); 

    // check validation  
    let isValid; 
    // id field
    isValid = checkEmpty(person.id, "notiId") && checkNumber(person.id, "notiId") && checkId(person.id, "notiId", listPerson);
    // name field  
    isValid &= checkEmpty(person.name, "notiName") && checkAllLetter(person.name, "notiName"); 
    // email field 
    isValid &= checkEmpty(person.email, "notiEmail") && checkEmail(person.email, "notiEmail");
    // address field
    isValid &= checkEmpty(person.address, "notiAddress");
    // type field 
    isValid &= checkType(person.type, "notiType");
    if (person.type == "student") {
        isValid &= checkEmpty(person.math, "notiMath") && checkRange(person.math, "notiMath", "Math", 0, 10);
        isValid &= checkEmpty(person.physics, "notiPhysics") && checkRange(person.physics, "notiPhysics", "Physics", 0, 10);
        isValid &= checkEmpty(person.chemistry, "notiChemistry") && checkRange(person.chemistry, "notiChemistry", "Chemistry", 0, 10);
    } else if (person.type == "employee") {
        isValid &= checkEmpty(person.workingDay, "notiWorkingDay") && checkRange(person.workingDay, "notiWorkingDay", "Working days", 0, 31);
        isValid &= checkEmpty(person.dailyWage, "notiDailyWage") && checkRange(person.dailyWage, "notiDailyWage", "Daily wage", 20, 500);
    } else {
        isValid &= checkEmpty(person.companyName, "notiCompanyName");
        isValid &= checkEmpty(person.invoiceValue, "notiInvoice") && checkRange(person.invoiceValue, "notiInvoice", "Invoice value", 100, 2500); 
        isValid &= checkEmpty(person.review, "notiReview");
    } 
    
    if (isValid) {
        // push this object to listPeople
        listPerson = [...listPerson, person];

        // reset modal
        getEleById("myForm").reset(); 

        // save to localStorage 
        saveLocalStorage();

        // render listPerson on UI
        renderListPeople(listPerson);
    }

}
    
/**
 * TODO: Delete person
 * *3-BLOCK MODEL
 * Input:
 *  - id of item you want to delete 
 * Logical Execution:
 *  - find index of item you want to delete 
 *  - using splice to delete that item at the position of index 
 *  - render listPerson 
 *  - save to localStorage 
 * Output: 
 *  - new array (without item deleted) 
 */
window.deletePerson = (idClicked) => {
    // find index 
    let indexDelete = listPerson.findIndex(value => value.id == idClicked);
    
    // using splice to delete 
    listPerson.splice(indexDelete, 1); 
    
    // render listPerson
    renderListPeople(listPerson);

    saveLocalStorage();
}

// TODO: Edit person
window.editPerson = (idClicked) => {
    // open modal when pressing on Edit button
    let myModal = new bootstrap.Modal(getEleById("myModal"));
    myModal.show();

    // hide "add" button, show "update" button when edit person
    getEleById("btnAdd").style.display = "none";
    getEleById("btnUpdate").style.display = "block";

    // find index of person need to edit
    let index = listPerson.findIndex(item => item.id == idClicked);
    
    let editPerson = listPerson[index]; 

    // get data from modal
    getEleById("id").value = editPerson.id; 
    getEleById("userName").value = editPerson.name; 
    getEleById("email").value = editPerson.email; 
    getEleById("address").value = editPerson.address; 
    getEleById("typePerson").value = editPerson.type;
    if (editPerson.type == "student") {
        hideAll(htmlElements);
        getEleById("inputMath").style.display = "block";
        getEleById("inputPhysics").style.display = "block";
        getEleById("inputChemistry").style.display = "block";

        getEleById("math").value = editPerson.math;
        getEleById("physics").value = editPerson.physics;
        getEleById("chemistry").value = editPerson.chemistry;
    } else if (editPerson.type == "employee") {
        hideAll(htmlElements);
        getEleById("inputWorkingDay").style.display = "block";
        getEleById("inputWage").style.display = "block";

        getEleById("workingDay").value = editPerson.workingDay;
        getEleById("dailyWage").value = editPerson.dailyWage;
    } else {
        hideAll(htmlElements);
        getEleById("inputCompany").style.display = "block";
        getEleById("inputInvoice").style.display = "block";
        getEleById("inputReview").style.display = "block";

        getEleById("companyName").value = editPerson.companyName;
        getEleById("invoiceValue").value = editPerson.invoiceValue;
        getEleById("review").value = editPerson.review;
    }
    getEleById("id").disabled = true; 
}

// TODO: Save data to localStorage 
const saveLocalStorage = () => {
    // convert personList to json format
    let dataJson = JSON.stringify(listPerson);
    // save to localStorage
    localStorage.setItem("LIST_PERSON", dataJson);
}

// TODO: Get data from localStorage
const getLocalStorage = () => {
    // get json data saved from localStorage
    let dataJson = localStorage.getItem("LIST_PERSON", listPerson);

    if (dataJson != null) {
        // convert dataJson to listPerson
        let dataArr = JSON.parse(dataJson);
        console.log("dataArr", dataArr);

        listPerson = dataArr.map((item) => {
            if (item.type == "student") {
                return new Student(item.id, item.name, item.address, item.email, item.type, item.math, item.physics, item.chemistry, item.averageScore); 
            } else if (item.type == "employee") {
                return new Employee(item.id, item.name, item.address, item.email, item.type, item.workingDay, item.dailyWage, item.salary);
            } else if (item.type == "customer") {
                return new Customer(item.id, item.name, item.address, item.email, item.type, item.companyName, item.invoiceValue, item.review); 
            } else {
                return new Person(item.id, item.name, item.address, item.email, item.type); 
            }
        });

        // Render items on UI
        renderListPeople(listPerson);
    }
}

getLocalStorage();