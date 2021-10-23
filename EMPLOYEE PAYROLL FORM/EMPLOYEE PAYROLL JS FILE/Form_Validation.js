// UC 8 Ability to set Event Listeners when Document is loaded so as to

let isUpdate = false;
let employeePayrollObject = {};

window.addEventListener('DOMContentLoaded', (event) => {
        const name = document.querySelector('#name');
        name.addEventListener('input', function() {
            if (name.value.length == 0) {
                setTextValue('.text-error', "");
                return;
            }
            try {
                checkName(name.value);                   
                setTextValue('.text-error', "");
            } catch (e) {
                setTextValue('.text-error', e);
            }
        });
    
        validateDate();

        const salary = document.querySelector('#salary');
        setTextValue('.salary-output',salary.value);
        salary.addEventListener('input', function() {
            setTextValue('.salary-output',salary.value);
            
        });     

        checkForUpdate();
});

function validateDate() {
    const day = document.querySelector('#day');
    const month = document.querySelector('#month');
    const year = document.querySelector('#year');
    day.addEventListener('input', checkDate);
    month.addEventListener('input', checkDate);
    year.addEventListener('input', checkDate);
}

function checkDate() {
    const dateError = document.querySelector('.date-error');
    try {
        let date = day.value + " " + month.value + " " + year.value;
        checkStartDate(new Date(Date.parse(date)));
        dateError.textContent = "";
    } catch (e) {
        dateError.textContent = e;
    }
}

const checkStartDate = (startDate) => {
    let currentDate = new Date();
    if (startDate > currentDate)
        throw "Start Date is a future date";
    const diff = Math.abs(currentDate.getTime() - startDate.getTime());
    if (diff / (1000 * 60 * 60 * 24) > 30) {
        throw "Start Date is a beyond 30 days";
    }
}

const checkForUpdate = () => {
    const jsonData = localStorage.getItem('editEmp');
    isUpdate = jsonData ? true : false;
    if (!isUpdate) return;
    employeePayrollObject = JSON.parse(jsonData);
    setForm();
}

const setForm = () => {
    setValue('#name', employeePayrollObject._name);
    setSelectedValue('[name = profile]', employeePayrollObject._profilePic);
    setSelectedValue('[name = gender]', employeePayrollObject._gender);
    setSelectedValue('[name = department]', employeePayrollObject._department);
    setValue('#salary', employeePayrollObject._salary);
    setTextValue('.salary-output', employeePayrollObject._salary);
    let date = stringifyDate(employeePayrollObject._startDate).split(" ");
    setValue('#day', date[0]);
    setValue('#month', date[1]);
    setValue('#year', date[2]);
    setValue('#notes', employeePayrollObject._note);
}

const setSelectedValue = (propertyValue, value) => {
    let allItem = document.querySelectorAll(propertyValue);
    allItem.forEach(item => {
        if (Array.isArray(value)) {
            if (value.includes(item.value)) {
                item.checked = true;
            }
        } else if (item.value === value) {
            item.checked = true;
        }
    });
}

const checkName = (name) => {
    let nameRegex = RegExp('^[A-Z]{1}[a-zA-Z]{2,}$')
    if (!nameRegex.test(name))
        throw "Name Is Incorrect!"
}

// UC 9 Ability to create Employee Payroll Object On Save.

// const save = () => {
//     try{
//         let employeePayrollData = createEmployeePayroll();
//         createAndUpdateStorage(employeePayrollData);
//     } catch (e) {
//         return;
//     }
// }

const save = (event) => {
    event.preventDefault();
    event.stopPropagation();
    try{
        setEmployeePayrollObject();
        createAndUpdateStorage();
        resetForm();
        window.location.replace(site_properties.home_page)
    } catch (e) {
        return;
    }
}

const setEmployeePayrollObject = () => {
    employeePayrollObject._name = getInputValueById('#name');
    employeePayrollObject._profilePic = getSelectedValue('[name=profile]').pop();
    employeePayrollObject._gender = getSelectedValue('[name=gender]').pop();
    employeePayrollObject._department = getSelectedValue('[name=department]');
    employeePayrollObject._salary = getInputValueById('#salary');
    employeePayrollObject._note = getInputValueById('#notes');
    let date = getInputValueById('#day') + " " + getInputValueById('#month') + " " + getInputValueById('#year');
    employeePayrollObject._startDate = (date);
}

// UC 10  Ability to save the Employee Payroll Object to Local Storage.

//  function createAndUpdateStorage(employeePayrollData){
//     let employeePayrollList = JSON.parse(localStorage.getItem("EmployeePayrollList"));

//     if(employeePayrollList != undefined){
//         employeePayrollList.push(employeePayrollData);
//     }else{
//         employeePayrollList = [employeePayrollData];
//     }
//      alert (employeePayrollList.toString());
//     localStorage.setItem("EmployeePayrollList",JSON.stringify(employeePayrollList))
// } 

function createAndUpdateStorage(){
    let dataList = JSON.parse(localStorage.getItem("EmployeePayrollList"));

    if (dataList) {
        let existingEmpData = dataList.find(empData => empData._id == employeePayrollObject._id);
        if (!existingEmpData) {
            dataList.push(createEmployeePayrollData());
        } else {
            const index = dataList
                .map(empData => empData._id)
                .indexOf(existingEmpData._id);
            dataList.splice(index, 1, createEmployeePayrollData(existingEmpData._id));
        }
    } else {
        dataList = [createEmployeePayrollData];
    }
    localStorage.setItem("EmployeePayrollList", JSON.stringify(dataList));
}

const createEmployeePayrollData = (id) => {
    let employeePayrollData = new EmployeePayrollData();
    if(!id) employeePayrollData.id = createNewEmployeeId();
    else employeePayrollData.id = id;
    setEmployeePayrollData(employeePayrollData);
    return employeePayrollData;
}

const setEmployeePayrollData = (employeePayrollData) => {
    try{
        employeePayrollData.name = employeePayrollObject._name;
    }catch(e){
        setTextValue('.text-error', e);
        throw e;
    }

    employeePayrollData.profilePic = employeePayrollObject._profilePic;
    employeePayrollData.gender = employeePayrollObject._gender;
    employeePayrollData.department = employeePayrollObject._department;
    employeePayrollData.salary = employeePayrollObject._salary;
    employeePayrollData.note = employeePayrollObject._note;
    try{
        employeePayrollData.startDate = 
                new Date(Date.parse(employeePayrollObject._startDate));
    }catch(e){
        setTextValue('.text-error', e);
        throw e;
    }
    alert(employeePayrollData.toString());
}

function createEmployeePayroll(id) {

    let employeePayrollData = new EmployeePayrollData();
  
    try {
        if(!id) employeePayrollData.id = createNewEmployeeId();
        else employeePayrollData.id = id;
        employeePayrollData.name = getInputValueById('#name');
        let date = getInputValueById('#day') + " " + getInputValueById('#month') + " " + getInputValueById('#year');
        employeePayrollData.startDate = new Date(Date.parse(date));
    } catch (e) {
        if ('Incorrect Name' == e) {
            setTextValue('.text-error', e);
        } else {
            setTextValue('.date-error', e);
        }
        throw e;
    }
    employeePayrollData.profilePic = getSelectedValue('[name=profile]').pop();
    employeePayrollData.gender = getSelectedValue('[name=gender]').pop();
    employeePayrollData.department = getSelectedValue('[name=department]');
    employeePayrollData.salary = getInputValueById('#salary');
    employeePayrollData.note = getInputValueById('#notes');
    return employeePayrollData;
}

const createNewEmployeeId = () => {
    let empId = localStorage.getItem('EmpId');
    empId = !empId ? 1 : (parseInt(empId) + 1).toString();
    localStorage.setItem('EmpId', empId);
    return empId;

}

const getInputValueById = (id) => {
    let value = document.querySelector(id).value;
    return value;
}


const getSelectedValue = (propertyValue) => {
    let allItem = document.querySelectorAll(propertyValue);
    let setItem = [];
    allItem.forEach(item => {
        if (item.checked) {
            setItem.push(item.value);
        }
    });
    return setItem;
}

// UC 11 Ability to reset the form on clicking reset

const resetForm = () => {
    setValue('#name', '');
    unsetSelectedValues('[name=profile]');
    unsetSelectedValues('[name=gender]');
    unsetSelectedValues('[name=department]');
    setValue('#salary', '');
    setValue('#notes', '');
    setValue('#day','1');
    setValue('#month','January');
    setValue('#year','2020');
}

const unsetSelectedValues = (propertyValue) => {
    let allItems = document.querySelectorAll(propertyValue);
    allItems.forEach(item => {
        item.checked = false;
    });
}

const setTextValue = (id, value) => {
    let textError = document.querySelector(id);
    textError.textContent = value;
}

const setValue = (id, value) => {
    const element = document.querySelector(id);
    element.value = value;
}



