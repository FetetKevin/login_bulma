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

    fetch('./login_success.json')
    .then(r => r.json())
    .then(data => {
        if(data.statut == "success"){
            document.querySelector('#success').innerHTML = "Login en cours";
            document.querySelector('#submit').classList.add('loader');
            setInterval(()=>{
                document.querySelector('#submit').classList.remove('loader');
                location.replace('home.html');
            },4000);
        }
        else {

            if(data.statut == "error" && data.errors[1] == 1){
                document.querySelector('#err_mail').innerHTML = "MISSING LOGIN";
                document.querySelector('#mail').classList.add('is-danger');
            } 
            if(data.statut == "error" && data.errors[2] == 1){
                document.querySelector('#err_mail').innerHTML = "INVALID LOGIN";
                document.querySelector('#mail').classList.add('is-danger');
            } 
            if(data.statut == "error" && data.errors[3] == 1){
                document.querySelector('#err_pass').innerHTML = "MISSING PASSWORD";
                document.querySelector('#pass').classList.add('is-danger');
            }
            if(data.statut == "error" && data.errors[4] == 1){
                document.querySelector('#err_pass').innerHTML = "INVALID PASSWORD";
                document.querySelector('#pass').classList.add('is-danger');
            }

            // Reset du btn

        }

        
    })
    .catch((error) => {
        console.log("ERR");

    })
}