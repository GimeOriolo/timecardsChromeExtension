const form = document.getElementById('form');
document.getElementById("value").addEventListener("click", showFields);

form.addEventListener('submit', e =>{
    e.preventDefault();
    getDataEntries();
});

function showFields(){
    if (document.getElementById("value").value == 'yes') {
        forDisplayStyle("input-control","flex");     
    }
    else {forDisplayStyle("input-control","none");} 
};

function forDisplayStyle(className, style){
    var elems = document.getElementsByClassName(className);
     for (var i=0;i<elems.length;i+=1){
     elems[i].style.display = style;
     }
};

function getDataEntries(){ 
    const timeValues = {projectCode,taskDetails,timeType,location,country,dateStart,dateEnd,startTime,endTime,quantity};
    if (document.getElementById("value").value == 'yes') {
        
        timeValues.projectCode= document.getElementById("projectCode").value.trim();
        timeValues.taskDetails= document.getElementById("taskDetails").value.trim();
        timeValues.timeType= document.getElementById("timeType").value.trim();
        timeValues.location= document.getElementById("location").value.trim();
        timeValues.country= document.getElementById("country").value.trim();
        timeValues.dateStart= document.getElementById("dateStart").value.trim();
        timeValues.dateEnd= document.getElementById("dateEnd").value.trim();
        timeValues.startTime= document.getElementById("startTime").value.trim();
        timeValues.endTime= document.getElementById("endTime").value.trim();
        timeValues.quantity= document.getElementById("quantity").value.trim();    

        if(!mandatoryFields(timeValues)){
       
                localStorage.setItem("timeValues", JSON.stringify(timeValues));
                alert("your time card has added"); 

                navigateToOracle();
           } 
           else{
                 alert("complete mandatory fields, madafaca"); 
           }
    }
    else{       
          if (localStorage.getItem("timeValues")) {
              
            console.log(JSON.parse(localStorage.getItem("timeValues")));
            navigateToOracle();
          }
          else{
            alert("The project code is empty, please complete your Project Data switching NO option to YES in New value? field");
          }
    }   
};


