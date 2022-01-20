window.onload = function() {
    document.querySelector("#retrive_mail").onkeyup = function() {
        testField();
    };
};

function testField() {
    let input_mail = document.querySelector('#retrive_mail').value;
    if(input_mail)
        document.querySelector('#submit').disabled = false;
    else{
        document.querySelector('#submit').disabled = true;
    }
    return [input_mail];
}

document.querySelector('#submit').addEventListener('click', verif_form);
function verif_form(){

    fetch('./login_error.json')
    .then(r => r.json())
    .then(data => {
        if(data.statut == "success"){
            document.querySelector('#success').innerHTML = "Login en cours";
            document.querySelector('#submit').classList.add('loader');
            setInterval(()=>{
                document.querySelector('#submit').classList.remove('loader');
                location.replace('index.html');
            },4000);
        }
        else {

            // console.log(data.statut);
            // console.log(data.errors[4]);

            if(data.statut == "error" && data.errors[1] == 1){
                document.querySelector('#err_mail').innerHTML = "MISSING LOGIN";
                document.querySelector('#retrive_mail').classList.add('is-danger');
            } 
            if(data.statut == "error" && data.errors[2] == 1){
                document.querySelector('#err_mail').innerHTML = "INVALID LOGIN";
                document.querySelector('#retrive_mail').classList.add('is-danger');
            } 

            // Reset du btn

        }
        
    })
    .catch((error) => {
        console.log("ERR");

    })
}