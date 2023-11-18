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
// ! try to find another way to be more simple and shorter 
document.getElementById("typePerson").onchange = () => {
    let type = document.getElementById("typePerson").value;

    if (type === "1") {
        document.getElementById("inputMath").style.display = "block";
        document.getElementById("inputPhysics").style.display = "block";
        document.getElementById("inputChemistry").style.display = "block";

        document.getElementById("inputWorkingDay").style.display = "none";
        document.getElementById("inputWage").style.display = "none";
        document.getElementById("inputCompany").style.display = "none";
        document.getElementById("inputInvoice").style.display = "none";
        document.getElementById("inputReview").style.display = "none";
    } else if (type === "2") {
        document.getElementById("inputMath").style.display = "none";
        document.getElementById("inputPhysics").style.display = "none";
        document.getElementById("inputChemistry").style.display = "none";
        document.getElementById("inputCompany").style.display = "none";
        document.getElementById("inputInvoice").style.display = "none";
        document.getElementById("inputReview").style.display = "none";

        document.getElementById("inputWorkingDay").style.display = "block";
        document.getElementById("inputWage").style.display = "block";
    } else if (type === "3") {
        document.getElementById("inputCompany").style.display = "block";
        document.getElementById("inputInvoice").style.display = "block";
        document.getElementById("inputReview").style.display = "block";
        
        document.getElementById("inputMath").style.display = "none";
        document.getElementById("inputPhysics").style.display = "none";
        document.getElementById("inputChemistry").style.display = "none";
        document.getElementById("inputWorkingDay").style.display = "none";
        document.getElementById("inputWage").style.display = "none";
    } else {
        document.getElementById("inputCompany").style.display = "none";
        document.getElementById("inputInvoice").style.display = "none";
        document.getElementById("inputReview").style.display = "none";
        document.getElementById("inputMath").style.display = "none";
        document.getElementById("inputPhysics").style.display = "none";
        document.getElementById("inputChemistry").style.display = "none";
        document.getElementById("inputWorkingDay").style.display = "none";
        document.getElementById("inputWage").style.display = "none";
    }
}