
/* UC 15 – Display Employee Details in Tabular Format using Template Literals

window.addEventListener('DOMContentLoaded', (event) => {
    createInnnerHtml();
});

const createInnnerHtml = () => {
    const innerHtml = `
    <tr>
    <th></th>
    <th>Name</th>
    <th>Gender</th>
    <th>Department</th>
    <th>Salary</th>
    <th>Start Date</th>
    <th>Actions</th>
</tr>
<tr>
    <td><img class="profile" alt="" src="../profile-images/Ellipse -10.png"></td>
    <td>Narayan Mahadevan</td>
    <td>Male</td>
    <td>
        <div class="dept-label">HR</div>
        <div class="dept-label">Finance</div>
    </td >
    <td>300000</td>
    <td>1 Nov 2020</td>
    <td>
        <img id="1" onclick="remove(this)" alt="delete" src="../icons/delete-black-18dp.svg" >
        <img id="1" onclick="update(this)" alt="Edit" src="../icons/create-black-18dp.svg">
    </td>
</tr>
`;
document.getElementById('display').innerHTML = innerHtml;

} */


/* UC 16 Display Employee Details in Tabular Format using Template Literals(ES6 FEATURE)

window.addEventListener('DOMContentLoaded', (event) => {
    createInnnerHtml();
});


const createInnnerHtml = () => {
    const headerHtml = "<th></th> <th>Name</th> <th>Gender</th> <th>Department</th> <th>Salary</th> <th>Start Date</th> <th>Actions</th>";
    const innerHtml = `${headerHtml}
    <tr>
    <td><img class="profile" alt="" src="../profile-images/Ellipse -10.png"></td>
    <td>Narayan Mahadevan</td>
    <td>Male</td>
    <td>
        <div class="dept-label">HR</div>
        <div class="dept-label">Admin</div>
    </td >
    <td>300000</td>
    <td>1 Nov 2020</td>
    <td>
        <img id="1" onclick="remove(this)" alt="delete" src="../icons/delete-black-18dp.svg" >
        <img id="1" onclick="update(this)" alt="Edit" src="../icons/create-black-18dp.svg">
    </td>
</tr>
`;
document.getElementById('display').innerHTML = innerHtml;

}    */


// UC 17 – Display Employee Details from JSON Object

/* const createEmployeePayrollJson = () => {
    let empPayrollListLocal = [{
            "_name": "prem patil",
            "_gender": "male",
            "_department": [
                "HR",
                "Fianance"
            ],
            "_salary": "30000",
            "_startDate": '29 OCT 2021',
            "_notes": "",
            "_id": new Date().getTime(),
            "_profilePic": "../profile-images/Ellipse -1.png"
        },
        {
            "_name": "mohit kumar",
            "_gender": "male",
            "_department": [
                "HR"
            ],
            "_salary": "30000",
            "_startDate": '30 oct 2021',
            "_notes": "",
            "_id": new Date().getTime(),
            "_profilePic": "../profile-images/Ellipse -5.png"
        }
    ]
    return empPayrollListLocal;
}

window.addEventListener('DOMContentLoaded', (event) => {
    createInnnerHtml();
});  */


/* const createInnnerHtml = () => {
    const headerHtml = "<th></th> <th>Name</th> <th>Gender</th> <th>Department</th> <th>Salary</th> <th>Start Date</th> <th>Actions</th>";
    let employeePayrollData = createEmployeePayrollJson () [0];
    const innerHtml = `${headerHtml}
    <tr>
    <td><img class="profile"  src="${employeePayrollData._profilePic}" alt=""></td>
    <td>${employeePayrollData._name}</td>
    <td>${employeePayrollData._gender}</td>
    <td>
        <div class="dept-label">${employeePayrollData._department[0]}</div>
        <div class="dept-label">${employeePayrollData._department[1]}</div>
    </td >
    <td>${employeePayrollData._salary}</td>
    <td>${employeePayrollData._startDate}</td>
    <td>
        <img name="${employeePayrollData._id}" onclick="remove(this)" alt="delete" src="../icons/delete-black-18dp.svg" >
        <img name="${employeePayrollData._id}" onclick="update(this)" alt="Edit" src="../icons/create-black-18dp.svg">
    </td>
</tr>
`;
document.getElementById('display').innerHTML = innerHtml;
}  */

// UC18 – Display Employee Details from JSON Object including the Department

/* const createInnnerHtml = () => {
    const headerHtml = "<th></th> <th>Name</th> <th>Gender</th> <th>Department</th> <th>Salary</th> <th>Start Date</th> <th>Actions</th>";
    let employeePayrollData = createEmployeePayrollJson () [0];
    const innerHtml = `${headerHtml}
    <tr>
    <td><img class="profile" src="${employeePayrollData._profilePic}" alt=""></td>
    <td>${employeePayrollData._name}</td>
    <td>${employeePayrollData._gender}</td>
    <td>${getDeptHtml(employeePayrollData._department)}</td >
    <td>${employeePayrollData._salary}</td>
    <td>${employeePayrollData._startDate}</td>
    <td>
        <img name="${employeePayrollData._id}" onclick="remove(this)" alt="delete" src="../icons/delete-black-18dp.svg" >
        <img name="${employeePayrollData._id}" onclick="update(this)" alt="Edit" src="../icons/create-black-18dp.svg">
    </td>
</tr>
`;
document.getElementById('display').innerHTML = innerHtml;
} 

const getDeptHtml = (deptList) => {
    let deptHtml = '';
    for (const dept of deptList){
        deptHtml = `${deptHtml} <div class='dept-label'>${dept}</div>`
    }
    return deptHtml;
} */

// UC19 Display All Employee Payroll Details from JSON Object

/* const createInnnerHtml = () => {
    const headerHtml = "<th></th> <th>Name</th> <th>Gender</th> <th>Department</th> <th>Salary</th> <th>Start Date</th> <th>Actions</th>";
    let innerHtml = `${headerHtml}`;
    let empPayrollList = createEmpPayrollJSON();
    for (const employeePayrollData of empPayrollList){
        innerHtml = `${innerHtml}
        <tr>
        <td><img class="profile" src="${employeePayrollData._profilePic}" alt=""></td>
        <td>${employeePayrollData._name}</td>
        <td>${employeePayrollData._gender}</td>
        <td>${getDeptHtml(employeePayrollData._department)}</td >
        <td>${employeePayrollData._salary}</td>
        <td>${employeePayrollData._startDate}</td>
        <td>
            <img name="${employeePayrollData._id}" onclick="remove(this)" alt="delete" src="../icons/delete-black-18dp.svg" >
            <img name="${employeePayrollData._id}" onclick="update(this)" alt="Edit" src="../icons/create-black-18dp.svg">
        </td>
    </tr>
    `;
    }
   
document.getElementById('display').innerHTML = innerHtml;
} 

const getDeptHtml = (deptList) => {
    let deptHtml = '';
    for (const dept of deptList){
        deptHtml = `${deptHtml} <div class='dept-label'>${dept}</div>`
    }
    return deptHtml;
}  */

// UC 20- Display Employee Details from Local Storage

let empPayrollList;
window.addEventListener('DOMContentLoaded', (event) => {
    empPayrollList = getEmployeePayrollDataFromStorage();
     document.querySelector('.emp-count').textContent = empPayrollList.length;
     createInnnerHtml();
     localStorage.removeItem("editEmp");
});

const getEmployeePayrollDataFromStorage = () => {
    return localStorage.getItem('EmployeePayrollList')?
                            JSON.parse(localStorage.getItem('EmployeePayrollList')) : [] ;
}

const createInnnerHtml = () => {
    const headerHtml = "<th></th> <th>Name</th> <th>Gender</th> <th>Department</th> <th>Salary</th> <th>Start Date</th> <th>Actions</th>";
    if (empPayrollList.length == 0) return;
    let innerHtml = `${headerHtml}`;
    for (const employeePayrollData of empPayrollList){
        innerHtml = `${innerHtml}
        <tr>
        <td><img class="profile" src="${employeePayrollData._profilePic}" alt=""></td>
        <td>${employeePayrollData._name}</td>
        <td>${employeePayrollData._gender}</td>
        <td>${getDeptHtml(employeePayrollData._department)}</td >
        <td>${employeePayrollData._salary}</td>
        <td>${employeePayrollData._startDate}</td>
        <td>
            <img name="${employeePayrollData._id}" onclick="remove(this)" alt="delete" src="../icons/delete-black-18dp.svg" >
            <img name="${employeePayrollData._id}" onclick="update(this)" alt="Edit" src="../icons/create-black-18dp.svg">
        </td>
    </tr>
    `;
    }
   
document.getElementById('display').innerHTML = innerHtml;
} 

const getDeptHtml = (deptList) => {
    let deptHtml = '';
    for (const dept of deptList){
        deptHtml = `${deptHtml} <div class='dept-label'>${dept}</div>`
    }
    return deptHtml;
} 