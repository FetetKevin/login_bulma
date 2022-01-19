window.onload = function() {
    document.querySelector("#mail").onkeyup = function() {
        testFields();
    };
    document.querySelector("#pass").onkeyup = function() {
        testFields();
    };
};

function testFields() {
    let input_mail = document.querySelector('#mail').value;
    let input_pass = document.querySelector('#pass').value;
    if(input_mail && input_pass)
        document.querySelector('#submit').disabled = false;
    else{
        document.querySelector('#submit').disabled = true;
    }
    return [input_mail, input_pass];
}


document.querySelector('#submit').addEventListener('click', verif_form);
function verif_form(){

    fetch('./login_error.json')
    .then(r => r.json())
    .then(data => {
        if(data.statut == "success"){
            document.querySelector('#success').innerHTML = "Login en cours";
        }
        else {

            // console.log(data.statut);
            // console.log(data.errors[4]);

            if(data.statut == "error" && data.errors[1] == 1){
                document.querySelector('#err_mail').innerHTML = "MISSING LOGIN";
            } 
            if(data.statut == "error" && data.errors[2] == 1){
                document.querySelector('#err_mail').innerHTML = "INVALID LOGIN";
            } 
            if(data.statut == "error" && data.errors[3] == 1){
                document.querySelector('#err_pass').innerHTML = "MISSING PASSWORD";
            }
            if(data.statut == "error" && data.errors[4] == 1){
                document.querySelector('#err_pass').innerHTML = "INVALID PASSWORD";
            }

            // Reset du btn

        }

        
    })
    .catch((error) => {
        console.log("ERR");

    })
}