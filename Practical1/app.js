function validateName(){
    const lenMsg ="Name must be 8 letters";
    var name = document.querySelector("#username").value;
    var nameError=document.getElementById("nameError");
    const len = 8;
    if(name.length==0){
        nameError.style.color = "red";
        nameError.innerHTML = "Name is Required";
        return false;
    }
    if( name[0]!=' '){
        if(name.length<=len){
            nameError.innerHTML = lenMsg;
            return false;
        }
        else{
            nameError.innerHTML = "Name is Valid";
            nameError.style.color = "greenyellow";
            return true;
        }
    }else{
        nameError.style.color = "red";
        nameError.innerHTML = "Name Must be Start with letters";
        return false;
    }
    
}

function validateContact(){
    const lenMsg ="Contact must be 10 Number";
    var contact = document.querySelector("#contact").value;
    var contactError = document.getElementById("contactError");
    const len = 10;
    if(contact.length==0){
        contactError.style.color = "red";
        contactError.innerHTML = "Contact is Required";
        return false;
    }
    if(contact.length==len){
        contactError.style.color = "greenyellow";
        contactError.innerHTML = "Contact is Valid"
        return true;
    }
    else{
        contactError.style.color = "red";
        contactError.innerHTML = lenMsg;
        return false;
    }
}

function validateMessage(){
    const lenMsg ="Message must be 30 letters";
    var msg = document.querySelector("#message").value;
    var msgError = document.getElementById("msgError");
    if(msg.length==0){
        msgError.style.color = "red";
        msgError.innerHTML = "Message is Required";
        return false;
    }

    if(msg.length >= 30){
        msgError.style.color = "greenyellow";
        msgError.innerHTML = "Message is Valid"
        return true;
    }
    else{
        msgError.style.color = "red";
        msgError.innerHTML = lenMsg;
        return false;
    }

}

function validateEmail(){
    var emailError = document.getElementById("emailError");
    var email = document.getElementById('email').value;

    if(email.length==0){
        emailError.style.color = "red";
        emailError.innerHTML = "Email is Required";
        return false;
    }
    if(!email.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)){
        emailError.style.color="red";
        emailError.innerHTML="Enter valid email address";
        return false;
    }
    else{
        emailError.style.color="greenyellow";
        emailError.innerHTML='Email is Valid';
        return true;
    }
   
}

function validate(){
    var formError = document.getElementById("formError");
    let uname = validateName();
    let ucontact =validateContact() ;
    let umsg = validateMessage();
    let uemail = validateEmail();
    if(uname && ucontact && umsg && uemail){
        setTimeout(function() {
            window.location.href = "success.html";
        }, 1000);
    }
    else{
        formError.innerHTML="Please Fill All the Fields!"
        return false;
    }
}
