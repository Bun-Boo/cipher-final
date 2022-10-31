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
    let plain_text = document.getElementById('input_plain_text').value.toUpperCase();
    let key = Number.parseInt(document.getElementById('key_encrypt').value);
    let cipher_text = document.getElementById('cipher_text');
    let alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let result = "";
    if(key!=="")
    {
        while(key<0)  
            key+=26;
        while(key>26)
            key%=26;
        for (const ch of plain_text) {
            if(alphabet.includes(ch))
            {
                temp = char2int(ch)+key;
                result+=int2char(temp);
            }
            else
                result+=ch;
        }     
        cipher_text.innerHTML = result;
    }
    // if(result!=="")
    //     handleSaveFile(result,"ciphertext.txt");
}

const saveFileEncrypt = () => {
    result = document.getElementById("cipher_text").innerHTML;
    handleSaveFile(result,"ciphertext.txt");
}



function decrypt(){
    let cipher_text = document.getElementById('input_cipher_text').value.toUpperCase();
    let key = Number.parseInt(document.getElementById('key_decrypt').value);
    let plain_text = document.getElementById('plain_text');
    let alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let result = "";

    if(key!=="")
    {
        while(key<0)  
            key+=26;
        while(key>26)
            key%=26;
        for (const ch of cipher_text) {
            if(alphabet.includes(ch))
            {
                temp = char2int(ch)-key;
                if(temp<0) temp+=26;
                result+=int2char(temp);
            }
            else
                result+=ch;
        }     
        plain_text.innerHTML = result;
    }
    // if(result!=="")
    //     handleSaveFile(result,"plaintext.txt");
}

const saveFileDecrypt = () => {
    result = document.getElementById("plain_text").innerHTML;
    if(result!=="")
        handleSaveFile(result,"plaintext.txt");
}

async function handleSaveFile(result,fileName){
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

