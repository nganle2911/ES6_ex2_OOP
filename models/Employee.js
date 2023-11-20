import Person from "./Person.js";

class Employee extends Person {
    constructor(_id, _name, _address, _email, _type, _workingDay, _dailyWage) {
        super(_id, _name, _address, _email, _type);
        this.workingDay = _workingDay;
        this.dailyWage = _dailyWage;
        this.salary = 0;
    }

    // todo: method of calculating total of salary 
    calculateSalary() {
        this.salary = (this.workingDay * this.dailyWage).toFixed(2); 
    }
}

export default Employee; 