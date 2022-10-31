function changeHandler(evt) {
    evt.stopPropagation();
    evt.preventDefault();

    // FileList object.
    let files = evt.target.files;

    let file = files[0];

    let fileReader = new FileReader();

    let plain_text = document.getElementById('input_plain_text')
    fileReader.onload = function() {

        let stringData = fileReader.result;

        plain_text.innerHTML = stringData
        
    }
    fileReader.readAsText(file, "UTF-8"); // fileReader.result -> String.
}

