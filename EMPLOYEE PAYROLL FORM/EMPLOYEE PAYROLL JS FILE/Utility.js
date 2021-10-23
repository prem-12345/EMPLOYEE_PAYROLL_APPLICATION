const stringifyDate = (date) => {
    const options = { day: 'numeric', month: 'short', year: 'numeric'};
    const newDate = !date ? "undefined" : 
                            new Date(Date.parse(date)).toLocaleDateString('en-GB', options);
    return newDate;
}

// const update = (node) => {
//     console.log(empPayrollList);
//     let employeePayrollData = empPayrollList.find(empData => empData._id == node._id);
//     if(!employeePayrollData) return;
//     localStorage.setItem('editEmp',JSON.stringify(employeePayrollData))
//     window.location.replace(site_properties.add_employee_page);
// }
