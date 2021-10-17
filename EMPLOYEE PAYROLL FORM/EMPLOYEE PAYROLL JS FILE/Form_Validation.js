// UC 8 Ability to set Event Listeners when Document is loaded so as to

window.addEventListener('DOMContentLoaded', (event) => {
        const name = document.querySelector('#name');
        const textError = document.querySelector('.text-error');
        name.addEventListener('input', function() {
            if (name.value.length == 0) {
                textError.textContent = "";
                return;
            }
            try {
                checkName(name.value);                   
                textError.textContent = "";
            } catch (e) {
                console.error(e);
                textError.textContent = e;
            }
        });
    
        const salary = document.querySelector('#salary');
        const output = document.querySelector('.salary-output');
        output.textContent = salary.value;
        salary.addEventListener('input', function() {
            output.textContent = salary.value;
        });
});

const checkName = (name) => {
    let nameRegex = RegExp('^[A-Z]{1}[a-zA-Z]{2,}$')
    if (!nameRegex.test(name))
        throw "Name Is Incorrect!"
}

// UC 9 Ability to create Employee Payroll Object On Save.

const save = () => {
    try{
        let employeePayrollData = createEmployeePayroll();
        createAndUpdateStorage(employeePayrollData);
    }catch(e){
        return;
    }
}


function createEmployeePayroll() {

    let employeePayrollData = new EmployeePayrollData();
    try {
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

// UC 10  Ability to save the Employee Payroll Object to Local Storage.

function createAndUpdateStorage(employeePayrollData){
    let employeePayrollList = JSON.parse(localStorage.getItem("EmployeePayrollList"));

    if(employeePayrollList != undefined){
        employeePayrollList.push(employeePayrollData);
    }else{
        employeePayrollList = [employeePayrollData];
    }
     alert (employeePayrollList.toString());
    localStorage.setItem("EmployeePayrollList",JSON.stringify(employeePayrollList))
}

// UC 11 Ability to reset the form on clicking reset

const resetForm = () => {
    setValue('#name', '');
    unsetSelectedValues('[name=profile]');
    unsetSelectedValues('[name=gender]');
    unsetSelectedValues('[name=department]');
    setValue('#salary', '');
    setTextValue('.salary-output', 400000);
    setValue('#notes', '');
    setValue('#day', '1');
    setValue('#month', 'Jan');
    setValue('#year', '2020');
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