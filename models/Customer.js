import Person from "./Person.js";

class Customer extends Person {
    constructor(_id, _name, _address, _email, _companyName, _invoiceValue, _review) {
        super(_id, _name, _address, _email);
        this.companyName = _companyName;
        this.invoiceValue = _invoiceValue;
        this.review = _review;
    }
}