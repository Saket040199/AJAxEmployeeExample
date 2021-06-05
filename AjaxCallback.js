let XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

function showTime(){
    const date= new Date();
       return date.getHours()+ "Hrs" + date.getMinutes()+ "Minutes" + date.getSeconds() + "Seconds";
}

function makeAJAXCall(methodType, url, callback, async = true, data = null){
    let xhr= new XMLHttpRequest();
    xhr.onreadystatechange = function(){
       // console.log(methodType+" State Chanded Called at: "+showTime()+ " RS"+
       //            xhr.readyState + "Satus:"+xhr.status);
       if (xhr.readyState === 4){
           if(xhr.status === 200 || xhr.status === 201){
               callback(xhr.responseText);
           } else if (xhr.status >=400){
               console.log("HAndle Error at: "+showTime());
           }
       }
    }
    xhr.open(methodType, url, async);
    if (data){
        console.log(JSON.stringify(data));
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.send(JSON.stringify(data));
    } else xhr.send();
    console.log(methodType+ " request sent to the server");
}

const getURl = "http://localhost:3000/employee/1";
function getUserDetails(data){
     console.log("Get User Data at: "+showTime()+" data: "+data);
}
makeAJAXCall("GET", getURl, getUserDetails, true);
console.log("Made GET AJAX Call to server at "+showTime());

const deleteURl = "http://localhost:3000/employee/3";
function userDeleted(data){
    console.log("USer deleted "+data)
}
makeAJAXCall("DELETE", deleteURl, userDeleted, false);
console.log("Made Delete AJAX Call to server at "+showTime());

const postURl = "http://localhost:3000/employee";
const empData = {"name": "Harry","salary": "5000"};
function userAdded(data){
    console.log("User Added: "+data);
}
makeAJAXCall("POST", postURl, userAdded, true, empData);
console.log("Made Post AJAX Call to server at "+showTime());