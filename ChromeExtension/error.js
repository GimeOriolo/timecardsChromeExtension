function mandatoryFields(timeValues){   

    Object.entries(timeValues).forEach(element => {
        const key= element[0];
        const value= element[1]; 
        if (value == '') {
            resultState(key, "This field is required",'error','success');
            return true;
        }
        else{resultState(key, "",'success','error');}
    });

    //return Object.values(timeValues).entries(Boolean);
};

function resultState(element, message,result, removeClass) {
    const getElement = document.getElementById(element);
    const inputControl = getElement.parentElement;
    const errorDisplay = inputControl.querySelector('.error');

    errorDisplay.innerText = message;
    inputControl.classList.add(result);
    inputControl.classList.remove(removeClass);    
};