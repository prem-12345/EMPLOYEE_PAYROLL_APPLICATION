// UC7  Modify Employee Payroll Class with new Attributes and Getters and Setters

class EmployeePayrollData {

    get id (){
        return this._id;
    }
    
    set id (id){
        return this._id = id;
    }

     get name() {
        return this._name;
    }

    set name(name) {
        let pattern = RegExp('^[A-Z]{1}[a-zA-Z]{2,}$');
        if (pattern.test(name))
            this._name = name;
        else
            throw 'Incorrect Name';
    }

    get profilePic() {
        return this._profilePic;
    }

    set profilePic(profilePic) {
        this._profilePic = profilePic;
    }

    get gender() {
        return this._gender;
    }
    set gender(gender) {
        this._gender = gender;
    }

    get department() {
        return this._department;
    }
    set department(department) {
        this._department = department;
    }

    get salary() {
        return this._salary;
    }
    set salary(salary) {
        this._salary = salary;
    }

    get note() {
        return this._note;
    }
    set note(note) {
        this._note = note;
    }

    get startDate() {
        return this._startDate;
    }
    set startDate(startDate) {
        this._startDate = startDate;
    }

    toString() {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        const empDate = !this.startDate ? "undefined" : this.startDate.toLocaleDateString("en-us", options);
        return "id=" + this.id + ",name='" + this.name + ", gender='" +
            this.gender + ", profilePic='" + this.profilePic +
            ", deparment=" + this.deparment + ", salary=" +
            this.salary + ", startDate=" + empDate + ",note=" + this.note;
    }

}