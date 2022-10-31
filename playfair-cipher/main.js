let array;
   

function findPos(letter){
    for (let index = 0; index < array.length; index++) {
        if(array[index].includes(letter))
            return [index,array[index].indexOf(letter)];
    }
}

function encryptCouple(letter1, letter2){
    let x = findPos(letter1);
    let y = findPos(letter2);
    if(x[0]===y[0]){
        let ch1 = x[1]===4?array[x[0]][0]:array[x[0]][x[1]+1];
        let ch2 = y[1]===4?array[y[0]][0]:array[y[0]][y[1]+1];
        return {
            let1:ch1,
            let2:ch2,
            case:1
        };
    }
    if(x[1]===y[1]){
        let ch1 = x[0]===4?array[0][x[1]]:array[x[0]+1][x[1]];
        let ch2 = y[0]===4?array[0][y[1]]:array[y[0]+1][y[1]];
        return {
            let1:ch1,
            let2:ch2,
            case:2
        };
    }
    let ch1 = array[x[0]][y[1]];
    let ch2 = array[y[0]][x[1]];
    return {
        let1:ch1,
        let2:ch2,
        case:3
    };
}

function decryptCouple(letter1, letter2){
    let x = findPos(letter1);
    let y = findPos(letter2);
    if(x[0]===y[0]){
        let ch1 = x[1]===0?array[x[0]][4]:array[x[0]][x[1]-1];
        let ch2 = y[1]===0?array[y[0]][4]:array[y[0]][y[1]-1];
        return {
            let1:ch1,
            let2:ch2,
            case:1
        };
    }
    if(x[1]===y[1]){
        let ch1 = x[0]===0?array[4][x[1]]:array[x[0]-1][x[1]];
        let ch2 = y[0]===0?array[4][y[1]]:array[y[0]-1][y[1]];
        return {
            let1:ch1,
            let2:ch2,
            case:2
        };
    }
    let ch1 = array[x[0]][y[1]];
    let ch2 = array[y[0]][x[1]];
    return {
        let1:ch1,
        let2:ch2,
        case:3
    };
}

function createMatrix(key){
    let alphabet = "ABCDEFGHIKLMNOPQRSTUVWXYZ".split("");
    let setKeyword = Array.from(new Set(key.replace("J","I")));

    for (const row of array) {
        while(row.length<5){
            if(setKeyword.length>0)
                row.push(setKeyword.shift());
            else{
                let letter = alphabet.shift();
                if(!key.includes(letter))
                    row.push(letter);
            }
        }
    }

}

function cleanText(string){
    string = string.toUpperCase();
    while(string.includes("J"))
        string = string.replace("J","I");
    let string_array = Array.from(string).filter(function(letter){
        return letter.match(/[a-zA-Z]/i);
    });
    let i = 0;
    while (i<string_array.length) {
        if(string_array[i]===string_array[i+1])
            string_array.splice(i+1,0,"X");
        i+=2;
    }

    if(string_array.length%2>0)
        string_array.push("X");
    return string_array;
}

function encrypt(){
    array = Array.from({
        length: 5
    }, () => new Array());
    let plain_text = document.getElementById('input_plain_text').value;
    let key = document.getElementById('key_encrypt').value.toUpperCase();
    key = Array.from(key).filter(function(letter){
        return letter.match(/[A-Z]/i);
    }).join("");
    let cipher_text = document.getElementById('cipher_text');
    let result = "";
    let res = /^[a-zA-Z]+$/.test(key);
    if(!res) {
        showSnakeBar();
        return;
    }

    createMatrix(key);


    createMatrixDisplay("matrixEncrypt")

    
    let plain_text_array = cleanText(plain_text);

    let cipher_text_array = [];
    for (let i = 0; i < plain_text_array.length; i+=2) {
        let obj = encryptCouple(plain_text_array[i],plain_text_array[i+1]);
        cipher_text_array = cipher_text_array.concat(obj["let1"],obj["let2"]);
    }

    createTableResult("doubleLetterEncrypt",plain_text_array,cipher_text_array);
    
    result = cipher_text_array.join("")

    cipher_text.innerHTML = result;

}

const pressEnterEncrypt = (e, flag)=>{
    if(e.key === "Enter"){
        flag ? encrypt() : decrypt();
    }

}

function showSnakeBar() {
    var x = document.getElementById("snackbar");
    x.className = "show";
    setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
  }

const saveFileEncrypt = () => {
    result = document.getElementById("cipher_text").innerHTML;
    handleSaveFile(result,"ciphertext.txt");
}

function decrypt(){
    array = Array.from({
        length: 5
    }, () => new Array());
    let cipher_text = document.getElementById('input_cipher_text').value;
    let key = document.getElementById('key_decrypt').value.toUpperCase();
    key = Array.from(key).filter(function(letter){
        return letter.match(/[A-Z]/i);
    }).join("");
    let plain_text = document.getElementById('plain_text');
    let plain_text_array = [];
    let result = "";
    let res = /^[a-zA-Z]+$/.test(key);
    if(!res) {
        showSnakeBar();
        return;
    }

    createMatrix(key);
    createMatrixDisplay("matrixDecrypt")
    let cipher_text_array = cleanText(cipher_text);
    for (let i = 0; i < cipher_text_array.length; i+=2) {
        let obj = decryptCouple(cipher_text_array[i],cipher_text_array[i+1]);
        plain_text_array = plain_text_array.concat(obj["let1"],obj["let2"]);
    }

    createTableResult("doubleLetterDecrypt",cipher_text_array,plain_text_array);
    
    let plain_text_origin = document.getElementById('input_plain_text').value;

    result = plain_text_array.join("");
    if(document.getElementById("checkbox").checked && plain_text_origin!=="" ){
        result = plain_text_origin;
    }
    plain_text.innerHTML = result;

}

const saveFileDecrypt = () => {
    result = document.getElementById("plain_text").innerHTML;
    // if(result!=="")
    handleSaveFile(result,"plaintext.txt");
}

async function handleSaveFile(result,fileName){
    if(result==="") return;
    if( window.showSaveFilePicker ) {
        const handle = await showSaveFilePicker({
            suggestedName: fileName,
        types: [{
          description: 'txt',
          accept: {
            'text/markdown': ['.txt'],
          },    
        }],
      });
      const writable = await handle.createWritable();
      await writable.write( result );
      writable.close();
    }
    else {
      const SaveFile = document.createElement( "a" );
      SaveFile.href = URL.createObjectURL( result );
      SaveFile.download= fileName;
      SaveFile.click();
      setTimeout(() => URL.revokeObjectURL( SaveFile.href ), 60000 );
    }
  }

function createMatrixDisplay(id){
    
    const matrix = document.getElementById(id)
    while(matrix.firstChild){
        matrix.removeChild(matrix.lastChild)
    }

    const table = document.createElement("table")
  
    for (let i = 0; i < 5; i++) {
      const trEle = document.createElement("tr")
      for (let j = 0; j < 5; j++) {
          const tdEle = document.createElement('td')
        //   tdEle.id = 'cell-'+i+'-'+j;
        tdEle.innerHTML= array[i][j]
          trEle.appendChild(tdEle)
      }
      table.appendChild(trEle);
      matrix.appendChild(table)
    }
}


function createTableResult(id,arr1, arr2){
    
    const element = document.getElementById(id)
    element.style.display = "block"
    while(element.firstChild){
        element.removeChild(element.lastChild)
    }

    const table = document.createElement("table")
  
    for (let i = 0; i < arr1.length; i+=2) {
      const trEle = document.createElement("tr");
      const td1 = document.createElement("td");  
      const td2 = document.createElement("td");  
      const td3 = document.createElement("td");  
      const td4 = document.createElement("td");
      td1.innerHTML = arr1[i]+  arr1[i+1];
      td2.innerHTML = "&rarr;";
      td3.innerHTML = arr2[i]+  arr2[i+1];
      td4.innerHTML = `( TH${encryptCouple(arr1[i],arr1[i+1])["case"]})` ;
      trEle.appendChild(td1);
      trEle.appendChild(td2);
      trEle.appendChild(td3);
      trEle.appendChild(td4);
      table.appendChild(trEle);
      element.appendChild(table)
    }
}
