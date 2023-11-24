import Customer from "../models/Customer.js";
import Person from "../models/Person.js";
import Student from "../models/Student.js";
import Employee from "../models/Employee.js";

// TODO: Get HTML element by ID 
const getEleById = (selectorId) => document.getElementById(selectorId);

// TODO: Hide all html elements of different type person
const hideAll = (htmlElements) => {
    htmlElements.forEach((element) => {
        getEleById(element).style.display = "none";
    });
}

// TODO: Get data from modal add 
const getDataModal = () => {
    let id = getEleById("id").value;
    let name = getEleById("userName").value;
    let email = getEleById("email").value;
    let address = getEleById("address").value;
    let type = getEleById("typePerson").value;

    if (type === "student") {
        let math = getEleById("math").value * 1;
        let physics = getEleById("physics").value * 1;
        let chemistry = getEleById("chemistry").value * 1;
        let averageScore = 0; 

        let student = new Student(id, name, address, email, type, math, physics, chemistry, averageScore);
        student.calculateAverageScore();

        return student; 
    } else if (type === "employee") {
        let workingDay = getEleById("workingDay").value;
        let dailyWage = getEleById("dailyWage").value;
        let salary = 0;

        let employee = new Employee(id, name, address, email, type, workingDay, dailyWage, salary);
        employee.calculateSalary();
        
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
        let contentModalDetail = displayModalDetail(person);

        // Add content for <tr>
        contentHTML += `
            <tr>
                <td>${person.id}</td>
                <td>${person.name}</td>
                <td>${person.email}</td>
                <td>${person.address}</td>
                <td>${person.type}</td>
                <td>
                    <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#myDetail_${person.id}">
                        <i class="bi bi-eye-fill"></i>
                    </button>
                    <!-- Add Modal Content Here -->
                    ${contentModalDetail}
                    <button onclick="editPerson(${person.id})" class="btn btn-secondary"><i class="bi bi-pencil-square"></i></button>
                    <button onclick="deletePerson(${person.id})" class="btn btn-danger"><i class="bi bi-trash"></i></button>
                </td>
            </tr>
        `;
    }); 

    // render contentHTML on table 
    getEleById("tbHumanMgmt").innerHTML = contentHTML; 
}

// TODO: Display modal detail on UI 
const displayModalDetail = (personObject) => {
    let contentModalDetail = "";
    let contentDetailInfo = displayDetailInfo(personObject); 

    contentModalDetail = `
        <div class="modal fade modalDetail" id="myDetail_${personObject.id}" tabindex="-1" data-bs-backdrop="static" data-bs-keyboard="false" aria-hidden="true" role="dialog">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h1 class="modal-title">Detail</h1>
                    </div>
                    <div class="modal-body">
                        <div class="detailDiv detailAbout">
                            <p>About</p> 
                            <p>${personObject.name}</p>
                        </div>
                        <div class="detailDiv detailContact">
                            <p>Contact</p>
                            <div class="detailContent row">
                                <div class="detailEmail col-6">
                                    <p>Email</p>
                                    <p>${personObject.email}</p>
                                </div>
                                <div class="detailAddress col-6">
                                    <p>Address</p>
                                    <p>${personObject.address}</p>
                                </div>
                            </div>
                        </div>
                        <div class="detailDiv detailType">
                            <p>Type</p>
                            <button class="btn btn-info">${personObject.type}</button>
                        </div>
                        <div class="row detailDiv detailInfo">
                            <p>Additional Information</p>
                            ${contentDetailInfo}
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    </div>
                </div>
            </div>
        </div>
    `;

    return contentModalDetail;
}

// TODO: Display detailInfo for different types of person
const displayDetailInfo = (personObject) => {
    let contentDetailItem = ""; 

    switch (personObject.type) {
        case "student":
            contentDetailItem += `
                <div class="col-4 detailItem">
                    <p>Math</p>
                    <p>${personObject.math}</p>
                </div>
                <div class="col-4 detailItem">
                    <p>Physics</p>
                    <p>${personObject.physics}</p>
                </div>
                <div class="col-4 detailItem">
                    <p>Chemistry</p>
                    <p>${personObject.chemistry}</p>
                </div>
                <div class="col-4 detailItem">
                    <p>Average Score</p>
                    <p>${personObject.averageScore}</p>
                </div>
            `;
            break;  

        case "employee":
            contentDetailItem += `
                <div class="col-4 detailItem">
                    <p>Working Days</p>
                    <p>${personObject.workingDay}</p>
                </div>
                <div class="col-4 detailItem">
                    <p>Daily Wage</p>
                    <p>$${personObject.dailyWage}</p>
                </div>
                <div class="col-4 detailItem">
                    <p>Salary</p>
                    <p>$${personObject.salary}</p>
                </div>
            `;
            break;
        
        case "customer":
            contentDetailItem += `
                <div class="col-4 detailItem">
                    <p>Company Name</p>
                    <p>${personObject.companyName}</p>
                </div>
                <div class="col-4 detailItem">
                    <p>Invoice Value</p>
                    <p>${personObject.invoiceValue}</p>
                </div>
                <div class="col-4 detailItem">
                    <p>Review</p>
                    <p>${personObject.review}</p>
                </div>
            `;
            break;
    
        default:
            break;
    }

    return contentDetailItem; 
}

// TODO: Sort list by type 
const sortListByType = (typeValue, personList) => {
    let newList = [];
    personList.map((item) => {
        if (item.type == typeValue) {
            newList.push(item);
        }
    });

    return newList;
}

// TODO: Sort list by name
const sortListByName = (personList) => {
    personList.sort((firstEl, secondEl) => {
        if (firstEl.name.toLowerCase() < secondEl.name.toLowerCase()) {
            return -1;
        }
        if (firstEl.name > secondEl.name) {
            return 1;
        }
        return 0; 
    });
    return personList; 
}

export {
    getEleById, hideAll, getDataModal, renderListPeople, displayModalDetail, displayDetailInfo, sortListByType, sortListByName
}