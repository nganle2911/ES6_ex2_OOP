import Person from "./Person.js";

class Student extends Person {
    constructor(_id, _name, _address, _email, _type, _math, _physics, _chemistry, _averageScore) {
        super(_id, _name, _address, _email, _type, _averageScore); 
        this.math = _math;
        this.physics = _physics;
        this.chemistry = _chemistry; 
        this.averageScore = _averageScore;
    }

    // todo: method of calculating the average score
    calculateAverageScore() {
        this.averageScore = ((this.math + this.physics + this.chemistry) / 3).toFixed(2); 
    }
}

export default Student; 