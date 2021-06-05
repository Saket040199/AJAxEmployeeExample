let XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

function showTime(){
    const date= new Date();
       return date.getHours()+ "Hrs" + date.getMinutes()+ "Minutes" + date.getSeconds() + "Seconds";
}

function makePromiseCall(methodType, url, async = true, data = null){
    return new Promise(function (resolve, reject) {
    let xhr= new XMLHttpRequest();
    xhr.onreadystatechange = function(){
       // console.log(methodType+" State Chanded Called at: "+showTime()+ " RS"+
       //            xhr.readyState + "Satus:"+xhr.status);
       if (xhr.readyState === 4){
           if(xhr.status === 200 || xhr.status === 201){
               resolve(xhr.responseText);
           } else if (xhr.status >=400){
               reject({
                   status: xhr.status,
                   statusText: xhr.statusText
               });
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
});
}

const getURl = "http://localhost:3000/employee/1";
makePromiseCall("GET", getURl, true)
   .then(responseText =>{
       console.log("Get user data:  "+responseText)
   })
   .catch(error => console.log("GEt Error: "+JSON.stringify(error)));


   const deleteURl = "http://localhost:3000/employee/3";
   makePromiseCall("DELETE", deleteURl, true)
      .then(responseText =>{
          console.log("Get user data:  "+responseText)
      })
      .catch(error => console.log("DELETE Error: "+JSON.stringify(error)));
   

      const postURl = "http://localhost:3000/employee/";
      const empData = {"name": "HArry","salary": "5000"};
      makePromiseCall("POST", postURl, true, empData)
         .then(responseText =>{
             console.log("Get user data:  "+responseText)
         })
         .catch(error => console.log("POST Error: "+JSON.stringify(error)));
      
