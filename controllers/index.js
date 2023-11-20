import Customer from "../models/Customer.js";
import Employee from "../models/Employee.js";
import Person from "../models/Person.js";
import { getDataModal, getEleById, renderListPeople } from "./controller.js";

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

    // list IDs of all html elements that need to be changed 
    const elements = ["inputMath", "inputPhysics", "inputChemistry", "inputWorkingDay", "inputWage", "inputCompany", "inputInvoice", "inputReview"];

    // function to hide all html elements 
    const hideAll = () => {
        elements.forEach((element) => {
            getEleById(element).style.display = "none";
        })
    };

    // create 3 arrays - student, employee, customer from array elements 
    const students = elements.slice(0, 3);
    const employees = elements.slice(3, 5);
    const customers = elements.slice(5, 8);

    switch (type) {
        case "1":
            hideAll();
            students.forEach((student) => {
                document.getElementById(student).style.display = "block";
            })
            break;
        case "2":
            hideAll();
            employees.forEach((employee) => {
                document.getElementById(employee).style.display = "block";
            })
            break;
        case "3":
            hideAll();
            customers.forEach((customer) => {
                document.getElementById(customer).style.display = "block";
            })
            break;
        default:
            hideAll();
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
    console.log("person", person);

    // check validation  

    // push this object to listPeople
    listPerson.push(person);
    console.log("listPeople", listPerson);

    // save to localStorage 
    saveLocalStorage(); 

    // render listPerson on UI
    renderListPeople(listPerson);
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
            if (item.type === "student") {
                return new Student(item.id, item.name, item.address, item.email, item.type, item.math, item.physics, item.chemistry); 
            } else if (item.type === "employee") {
                return new Employee(item.id, item.name, item.address, item.email, item.type, item.workingDay, item.dailyWage);
            } else if (item.type === "customer") {
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

