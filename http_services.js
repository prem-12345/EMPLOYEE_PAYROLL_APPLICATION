
// AJAX DEMO AND METHOD CALLBACK

let XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

function makeAJAXCall (methodType,URL,callback,async=true,data=null){
        let xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function() {
            console.log("State change called. Ready State : "+xhr.readyState+ " status : "+xhr.status);
            if(xhr.readyState === 4){
                if(xhr.status === 200 || xhr.status ===201){
                    callback(xhr.responseText);
                }else if(xhr.status >= 400){
                    console.log("Hamdle 400 client error or 500 server error");
                }
            }
        }

    xhr.open(methodType,URL,async);
    if(data){
        xhr.setRequestHeader("Content-Type","application/json");
        xhr.send(JSON.stringify(data));
    }else xhr.send();
    console.log(methodType +"Request sent to the server");

};

const getURL = "http://localhost:3000/employee/1";
function getUserDetails(data){
    console.log("Get user data : "+data);
}
makeAJAXCall("GET",getURL,getUserDetails);

const deleteURL = "http://localhost:3000/employee/4";
function userDeletedData(data){
    console.log("User Deleted :"+data)
}
makeAJAXCall("DELETE",deleteURL,userDeletedData,false);

const postURL = "http://localhost:3000/employee";
const employeeData = {
    "id" : "5",
    "name" : "Prem",
    "salary" : "25000"
};
function userAdded (data){
    console.log("User Added : "+data)
}
makeAJAXCall("POST",postURL,true,userAdded,employeeData);



// AJAX DEMO AND PROMISE


let XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

function makePromiseCall (methodType,URL,async=true,data=null){
    return new Promise(function(resolve,reject) {
        let xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function() {
            console.log("State change called. Ready State : "+xhr.readyState+ " status : "+xhr.status);
            if(xhr.status.toString().match("^[2][0-9]{2}$")){
                resolve(xhr.responseText);
            }else if(xhr.status.toString().match("[4,5][0-9]{2}$")){
                reject({
                    status : xhr.status,
                    statusText : xhr.statusText
                });
                console.log("XHR FAILED");
            }
        }
        xhr.open(methodType,URL,async);
        if(data){
            console.log(JSON.stringify(data));
            xhr.setRequestHeader("Content-Type","application/json");
            xhr.send(JSON.stringify(data));
        }else xhr.send();
            console.log(methodType +" request send to the server");
 }

)};


const getURL = "http://localhost:3000/employee/1";
makePromiseCall("GET",getURL,true)
.then(responseText =>{
    console.log("Get User Data : "+responseText)
})
.catch(error => {
    console.log("Get error status : "+(JSON.stringify(error)));
})

const deleteURL = "http://localhost:3000/employee/4";
makePromiseCall("DELETE",deleteURL,false)
.then(responseText =>{
    console.log("User deleted : "+responseText)
})
.catch(error => {
    console.log("Delete error status : "+(JSON.stringify(error)));
})


const postURL ="http://localhost:3000/employee" ;
const employeeData = {
    "id" : "6",
    "name" : "Rahul",
    "salary" : "25000"
}

makePromiseCall("POST",postURL,true,employeeData)
.then(responseText => {
    console.log("User added :"+responseText);
})
.catch(error => {
    console.log("Post error status : "+(JSON.stringify(error)));
})
