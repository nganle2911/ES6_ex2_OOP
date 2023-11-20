import Customer from "../models/Customer.js";
import Employee from "../models/Employee.js";
import Person from "../models/Person.js";
import Student from "../models/Student.js";

// TODO: Get HTML element 
const getEle = (selector) => document.querySelector(selector);
const getEleById = (selectorId) => document.getElementById(selectorId);

// TODO: Get data from modal add 
const getDataModal = () => {
    let id = getEleById("id").value;
    let name = getEleById("userName").value;
    let email = getEleById("email").value;
    let address = getEleById("address").value;
    let type = getEleById("typePerson").value;

    if (type === "student") {
        let math = getEleById("math").value;
        let physics = getEleById("physics").value;
        let chemistry = getEleById("chemistry").value;

        let student = new Student(id, name, address, email, type, math, physics, chemistry);

        return student; 
    } else if (type === "employee") {
        let workingDay = getEleById("workingDay").value;
        let dailyWage = getEleById("dailyWage").value;

        let employee = new Employee(id, name, address, email, type, workingDay, dailyWage);
        
        return employee; 
    } else if (type === "customer") {
        let companyName = getEleById("companyName").value;
        let invoiceValue = getEleById("invoiceValue").value;
        let review = getEleById("review").value;

        let customer = new Customer(id, name, address, email, type, companyName, invoiceValue, review);

        return customer;
    } else {
        let person = new Person(id, name, address, email, type);
        return person; 
    }
}

// TODO: Render listPeople on UI
const renderListPeople = (personList) => {
    let contentHTML = ''; 

    personList.map((person) => {
        // Add content for <tr>
        contentHTML += `
            <tr>
                <td>${person.id}</td>
                <td>${person.name}</td>
                <td>${person.email}</td>
                <td>${person.address}</td>
                <td>${person.type}</td>
                <td>
                    <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#myDetail">
                        <i class="bi bi-eye-fill"></i>
                    </button>
                    <button class="btn btn-warning"><i class="bi bi-pencil-square"></i></button>
                    <button class="btn btn-danger"><i class="bi bi-trash"></i></button>
                </td>
            </tr>
        `;
    });

    // render contentHTML on table 
    getEleById("tbHumanMgmt").innerHTML = contentHTML; 
}


export {
    getEle, getEleById, getDataModal, renderListPeople
}