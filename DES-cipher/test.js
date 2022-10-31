function changeHandlerEncrypt(evt){
    evt.stopPropagation();
    evt.preventDefault();

    let files = evt.target.files;

    let file = files[0];

    let fileReader = new FileReader();

    fileReader.onload = function(){
        let plain_text = document.getElementById('input_plain_text')
        let stringData = fileReader.result;
        plain_text.innerHTML = stringData;
    }

    fileReader.readAsText(file,"UTF-8");
}

function changeHandlerDecrypt(evt){
    evt.stopPropagation();
    evt.preventDefault();

    let files = evt.target.files;

    let file = files[0];

    let fileReader = new FileReader();

    fileReader.onload = function(){
        let cipher_text = document.getElementById('input_cipher_text')
        let stringData = fileReader.result;
        cipher_text.innerHTML = stringData;
    }

    fileReader.readAsText(file,"UTF-8");
}