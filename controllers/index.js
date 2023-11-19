import { getEleById } from "./controller.js";


let listPerson = []; 

/**
 * TODO: Create a function which changes the UI of modal when choosing the different types of person 
 * 3-BLOCK MODEL
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


