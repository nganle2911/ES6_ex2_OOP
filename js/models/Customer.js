import Person from "./Person.js";

class Customer extends Person {
    constructor(_id, _name, _address, _email, _type, _companyName, _invoiceValue, _review) {
        super(_id, _name, _address, _email, _type);
        this.companyName = _companyName;
        this.invoiceValue = _invoiceValue;
        this.review = _review;
    }
}

export default Customer; 