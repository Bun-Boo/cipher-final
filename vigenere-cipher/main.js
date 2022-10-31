function char2int(char){
    let arr = {'A':0,'B':1,'C':2,'D':3,'E':4,'F':5,'G':6,'H':7,'I':8,'J':9,'K':10,
           'L':11,'M':12,'N':13,'O':14,'P':15,'Q':16,'R':17,'S':18,'T':19,'U':20,
           'V':21,'W':22,'X':23,'Y':24,'Z':25}

    return arr[char];
}

function int2char(i){
    i %= 26
    let arr = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z']
    return arr[i]
}

function inputValid(e) {
    let invalidChars = ["-","+","e","E"];
    if(invalidChars.includes(e.key)) {
        e.preventDefault();
    }
}




function encrypt(){
    let plain_text = document.getElementById('input_plain_text').value;
    let key = document.getElementById('key_encrypt').value.toUpperCase();
    let cipher_text = document.getElementById('cipher_text');
    let alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let result = "";
    let kpos = []
    let res = /^[a-zA-Z]+$/.test(key);
    if(!res) {
        showSnakeBar();
        return;
    }
    for (const x of key) {
        kpos.push(alphabet.indexOf(x));
    }
    let i = 0;
    for (const x of plain_text) {
        if(alphabet.includes(x.toUpperCase())){
            if(i==kpos.length)
                i=0;
            let pos = alphabet.indexOf(x.toUpperCase())+kpos[i++];
            if(pos>25) pos-=26;
 
            result+= x === x.toUpperCase() ? alphabet[pos] : alphabet[pos].toLowerCase();

        }
        else
            result+=x;
    }
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
    let cipher_text = document.getElementById('input_cipher_text').value;
    let key = document.getElementById('key_decrypt').value.toUpperCase();
    let plain_text = document.getElementById('plain_text');
    let alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let result = "";
    let res = /^[a-zA-Z]+$/.test(key);
    if(!res) {
        showSnakeBar();
        return;
    }
    let kpos = []
    for (const x of key) {
        kpos.push(alphabet.indexOf(x.toUpperCase()));
    }
    let i = 0;
    for (const x of cipher_text) {
        if(alphabet.includes(x.toUpperCase())){
            if(i==kpos.length)
                i=0;
            let pos = alphabet.indexOf(x.toUpperCase())-kpos[i++];
            if(pos<0) pos+=26;
            result+= x === x.toUpperCase() ? alphabet[pos] : alphabet[pos].toLowerCase();
        }
        else
            result+=x;
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

