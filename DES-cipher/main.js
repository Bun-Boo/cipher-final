let inputPlainTextMode=1; //1-text; 2-binary; 3-heximal
let inputCipherTextMode=1; //1-text; 2-binary; 3-heximal
let outputPlainTextMode=1; //1-base64; 2-binary; 3-heximal
let outputCipherTextMode=1; //1-base64; 2-binary; 3-heximal

//----------------------------------------------------------------//

const openInputEncrypt = (evt, input, className, div) => {
  let inputEle = document.getElementsByClassName(className);
  for (let i = 0; i < inputEle.length; i++) {
    inputEle[i].style.display = "none";
  }

  let divELe = document.getElementsByClassName(div);
  for (let i = 0; i < inputEle.length; i++) {
    divELe[i].className = divELe[i].className.replace(" active", "");
    divELe[i].style.borderBottom = "none";
  }
  document.getElementById(input).style.display = "block";
  evt.currentTarget.className += " active";
  if(input.includes("binary")){
    if(input.includes("plain_text"))
      inputPlainTextMode = 2;
    else inputCipherTextMode = 2;
  }
  else if(input.includes("hex")){
    if(input.includes("plain_text"))
      inputPlainTextMode = 3;
    else inputCipherTextMode = 3;
  }
  else{
    if(input.includes("plain_text"))
      inputPlainTextMode = 1;
    else inputCipherTextMode = 1;
  }
  if(className.includes("input-encrypt"))
    encrypt();
  else
    decrypt();
};

const resultInputEncrypt = (evt, p, className, div) => {
  let pEle = document.getElementsByClassName(className);
  for (let i = 0; i < pEle.length; i++) {
    pEle[i].style.display = "none";
  }
  let divRs = document.getElementsByClassName(div);
  for (let i = 0; i < pEle.length; i++) {
    divRs[i].className = divRs[i].className.replace(" active", "");
  }
  document.getElementById(p).style.display = "block";
  evt.currentTarget.className += " active";
  if(p.includes("binary")){
    if(p.includes("plain_text"))
      outputPlainTextMode = 2;
    else outputCipherTextMode = 2;
  }
  else if(p.includes("hex")){
    if(p.includes("plain_text"))
      outputPlainTextMode = 3;
    else outputCipherTextMode = 3;
  }
  else{
    if(p.includes("plain_text"))
      outputPlainTextMode = 1;
    else outputCipherTextMode = 1;
  }
  if(p.includes("plain_text"))
    decrypt();
  else
    encrypt();
};

//----------------------------------------------------------------//

let array;
function inputValidBin(e) {
  let invalidChars = ["0","1"];
  if (!invalidChars.includes(e.key)) {
    e.preventDefault();
  }
}

function inputValidHex(e) {
  let invalidChars = ["0","1","2","3","4","5","6","7","8","9","A","B","C","D","E","F","a","b","c","d","e","f"];
  if (!invalidChars.includes(e.key)) {
    e.preventDefault();
  }
}

function inputValidBase64(e) {
  let invalidChars = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z","a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z","0","1","2","3","4","5","6","7","8","9","+","/"];
  if (!invalidChars.includes(e.key)) {
    e.preventDefault();
  }
}

function unicode2bin(s) {
  while (s.length % 4 != 0) {
    s += " ";
  }
  list = [];
  for (let index = 0; index < s.length; index += 4) {
    let block = "";
    for (let j = 0; j < 4; j++) {
      let bin = s.charCodeAt(index + j).toString(2);
      while (bin.length < 16) {
        bin = "0" + bin;
      }
      console.log(bin, index, j, s.charCodeAt(index + j));
      block += bin;
    }
    list.push(block);
  }
  console.log(list);
  return list;
}

function bin2unicode(s) {
  let list = [];
  let str = "";
  for (let i = 0; i < s.length; i += 16) {
    list.push(s.substr(i, 16));
  }
  for (const item of list) {
    console.log(
      item,
      parseInt(item, 2),
      String.fromCharCode(parseInt(item, 2))
    );
    str += String.fromCharCode(parseInt(item, 2));
  }

  return str;
}

function base64toBin(s) {
  // while (s.length % 8 != 0) {
  //   s += " ";
  // }
  let mp = {
    "A": "000000",
    "B": "000001",
    "C": "000010",
    "D": "000011",
    "E": "000100",
    "F": "000101",
    "G": "000110",
    "H": "000111",
    "I": "001000",
    "J": "001001",
    "K": "001010",
    "L": "001011",
    "M": "001100",
    "N": "001101",
    "O": "001110",
    "P": "001111",
    "Q": "010000",
    "R": "010001",
    "S": "010010",
    "T": "010011",
    "U": "010100",
    "V": "010101",
    "W": "010110",
    "X": "010111",
    "Y": "011000",
    "Z": "011001",
    "a": "011010",
    "b": "011011",
    "c": "011100",
    "d": "011101",
    "e": "011110",
    "f": "011111",
    "g": "100000",
    "h": "100001",
    "i": "100010",
    "j": "100011",
    "k": "100100",
    "l": "100101",
    "m": "100110",
    "n": "100111",
    "o": "101000",
    "p": "101001",
    "q": "101010",
    "r": "101011",
    "s": "101100",
    "t": "101101",
    "u": "101110",
    "v": "101111",
    "w": "110000",
    "x": "110001",
    "y": "110010",
    "z": "110011",
    "0": "110100",
    "1": "110101",
    "2": "110110",
    "3": "110111",
    "4": "111000",
    "5": "111001",
    "6": "111010",
    "7": "111011",
    "8": "111100",
    "9": "111101",
    "+": "111110",
    "/": "111111",
  };
  list = [];
  let block = "";
  for (const item of s) {
    block += mp[item];
  }
  while (block.length % 64 != 0) {
    block = block.slice(0, block.length - 1);
  }
  for (let index = 0; index < block.length; index += 64) {
    list.push(block.substr(index, 64));
  }

  console.log(list);
  return list;
}

function bin2base64(s) {
  let mp = {
    "000000": "A",
    "000001": "B",
    "000010": "C",
    "000011": "D",
    "000100": "E",
    "000101": "F",
    "000110": "G",
    "000111": "H",
    "001000": "I",
    "001001": "J",
    "001010": "K",
    "001011": "L",
    "001100": "M",
    "001101": "N",
    "001110": "O",
    "001111": "P",
    "010000": "Q",
    "010001": "R",
    "010010": "S",
    "010011": "T",
    "010100": "U",
    "010101": "V",
    "010110": "W",
    "010111": "X",
    "011000": "Y",
    "011001": "Z",
    "011010": "a",
    "011011": "b",
    "011100": "c",
    "011101": "d",
    "011110": "e",
    "011111": "f",
    "100000": "g",
    "100001": "h",
    "100010": "i",
    "100011": "j",
    "100100": "k",
    "100101": "l",
    "100110": "m",
    "100111": "n",
    "101000": "o",
    "101001": "p",
    "101010": "q",
    "101011": "r",
    "101100": "s",
    "101101": "t",
    "101110": "u",
    "101111": "v",
    "110000": "w",
    "110001": "x",
    "110010": "y",
    "110011": "z",
    "110100": "0",
    "110101": "1",
    "110110": "2",
    "110111": "3",
    "111000": "4",
    "111001": "5",
    "111010": "6",
    "111011": "7",
    "111100": "8",
    "111101": "9",
    "111110": "+",
    "111111": "/",
  };
  let step = 6;
  let list = [];
  let str = "";
  for (let i = 0; i < s.length; i += step) {
    list.push(s.substr(i, step));
  }
  for (const item of list) {
    str += mp[item];
  }
  return str;
}

function hex2bin(s) {
  let mp = {
    "0": "0000",
    "1": "0001",
    "2": "0010",
    "3": "0011",
    "4": "0100",
    "5": "0101",
    "6": "0110",
    "7": "0111",
    "8": "1000",
    "9": "1001",
    "A": "1010",
    "B": "1011",
    "C": "1100",
    "D": "1101",
    "E": "1110",
    "F": "1111",
  };
  let bin = "";
  for (let index = 0; index < s.length; index++) {
    bin = bin + mp[s[index]];
  }
  return bin;
}

function bin2hex(s) {
  let mp = {
    "0000": "0",
    "0001": "1",
    "0010": "2",
    "0011": "3",
    "0100": "4",
    "0101": "5",
    "0110": "6",
    "0111": "7",
    "1000": "8",
    "1001": "9",
    "1010": "A",
    "1011": "B",
    "1100": "C",
    "1101": "D",
    "1110": "E",
    "1111": "F",
  };
  let hex = "";
  for (let i = 0; i < s.length; i += 4) {
    let ch = "";
    ch = ch + s[i];
    ch = ch + s[i + 1];
    ch = ch + s[i + 2];
    ch = ch + s[i + 3];
    hex = hex + mp[ch];
  }
  return hex;
}

function dec2bin(s) {
  let bin = parseInt(s, 10).toString(2);
  while (bin.length % 4) {
    bin = "0" + bin;
  }
  return bin;
}

function bin2dec(s) {
  return parseInt(s, 2).toString(10);
}

function permute(k, arr, n) {
  permutation = "";
  for (let index = 0; index < n; index++) {
    permutation += k[arr[index] - 1];
  }
  return permutation;
}

function shift_left(k, nth_shifts) {
  s = "";
  for (let i = 0; i < nth_shifts; i++) {
    for (let j = 1; j < k.length; j++) {
      s += k[j];
    }
    s += k[0];
    k = s;
    s = "";
  }
  return k;
}

function xor(a, b) {
  ans = "";
  for (let index = 0; index < a.length; index++) {
    ans += a[index] === b[index] ? "0" : "1";
  }
  return ans;
}

const initial_perm = [
  58, 50, 42, 34, 26, 18, 10, 2, 60, 52, 44, 36, 28, 20, 12, 4, 62, 54, 46, 38,
  30, 22, 14, 6, 64, 56, 48, 40, 32, 24, 16, 8, 57, 49, 41, 33, 25, 17, 9, 1,
  59, 51, 43, 35, 27, 19, 11, 3, 61, 53, 45, 37, 29, 21, 13, 5, 63, 55, 47, 39,
  31, 23, 15, 7,
];

const exp_d = [
  32, 1, 2, 3, 4, 5, 4, 5, 6, 7, 8, 9, 8, 9, 10, 11, 12, 13, 12, 13, 14, 15, 16,
  17, 16, 17, 18, 19, 20, 21, 20, 21, 22, 23, 24, 25, 24, 25, 26, 27, 28, 29,
  28, 29, 30, 31, 32, 1,
];

const per = [
  16, 7, 20, 21, 29, 12, 28, 17, 1, 15, 23, 26, 5, 18, 31, 10, 2, 8, 24, 14, 32,
  27, 3, 9, 19, 13, 30, 6, 22, 11, 4, 25,
];

const sbox = [
  [
    [14, 4, 13, 1, 2, 15, 11, 8, 3, 10, 6, 12, 5, 9, 0, 7],
    [0, 15, 7, 4, 14, 2, 13, 1, 10, 6, 12, 11, 9, 5, 3, 8],
    [4, 1, 14, 8, 13, 6, 2, 11, 15, 12, 9, 7, 3, 10, 5, 0],
    [15, 12, 8, 2, 4, 9, 1, 7, 5, 11, 3, 14, 10, 0, 6, 13],
  ],

  [
    [15, 1, 8, 14, 6, 11, 3, 4, 9, 7, 2, 13, 12, 0, 5, 10],
    [3, 13, 4, 7, 15, 2, 8, 14, 12, 0, 1, 10, 6, 9, 11, 5],
    [0, 14, 7, 11, 10, 4, 13, 1, 5, 8, 12, 6, 9, 3, 2, 15],
    [13, 8, 10, 1, 3, 15, 4, 2, 11, 6, 7, 12, 0, 5, 14, 9],
  ],

  [
    [10, 0, 9, 14, 6, 3, 15, 5, 1, 13, 12, 7, 11, 4, 2, 8],
    [13, 7, 0, 9, 3, 4, 6, 10, 2, 8, 5, 14, 12, 11, 15, 1],
    [13, 6, 4, 9, 8, 15, 3, 0, 11, 1, 2, 12, 5, 10, 14, 7],
    [1, 10, 13, 0, 6, 9, 8, 7, 4, 15, 14, 3, 11, 5, 2, 12],
  ],

  [
    [7, 13, 14, 3, 0, 6, 9, 10, 1, 2, 8, 5, 11, 12, 4, 15],
    [13, 8, 11, 5, 6, 15, 0, 3, 4, 7, 2, 12, 1, 10, 14, 9],
    [10, 6, 9, 0, 12, 11, 7, 13, 15, 1, 3, 14, 5, 2, 8, 4],
    [3, 15, 0, 6, 10, 1, 13, 8, 9, 4, 5, 11, 12, 7, 2, 14],
  ],

  [
    [2, 12, 4, 1, 7, 10, 11, 6, 8, 5, 3, 15, 13, 0, 14, 9],
    [14, 11, 2, 12, 4, 7, 13, 1, 5, 0, 15, 10, 3, 9, 8, 6],
    [4, 2, 1, 11, 10, 13, 7, 8, 15, 9, 12, 5, 6, 3, 0, 14],
    [11, 8, 12, 7, 1, 14, 2, 13, 6, 15, 0, 9, 10, 4, 5, 3],
  ],

  [
    [12, 1, 10, 15, 9, 2, 6, 8, 0, 13, 3, 4, 14, 7, 5, 11],
    [10, 15, 4, 2, 7, 12, 9, 5, 6, 1, 13, 14, 0, 11, 3, 8],
    [9, 14, 15, 5, 2, 8, 12, 3, 7, 0, 4, 10, 1, 13, 11, 6],
    [4, 3, 2, 12, 9, 5, 15, 10, 11, 14, 1, 7, 6, 0, 8, 13],
  ],

  [
    [4, 11, 2, 14, 15, 0, 8, 13, 3, 12, 9, 7, 5, 10, 6, 1],
    [13, 0, 11, 7, 4, 9, 1, 10, 14, 3, 5, 12, 2, 15, 8, 6],
    [1, 4, 11, 13, 12, 3, 7, 14, 10, 15, 6, 8, 0, 5, 9, 2],
    [6, 11, 13, 8, 1, 4, 10, 7, 9, 5, 0, 15, 14, 2, 3, 12],
  ],

  [
    [13, 2, 8, 4, 6, 15, 11, 1, 10, 9, 3, 14, 5, 0, 12, 7],
    [1, 15, 13, 8, 10, 3, 7, 4, 12, 5, 6, 11, 0, 14, 9, 2],
    [7, 11, 4, 1, 9, 12, 14, 2, 0, 6, 10, 13, 15, 3, 5, 8],
    [2, 1, 14, 7, 4, 10, 8, 13, 15, 12, 9, 0, 3, 5, 6, 11],
  ],
];

const final_perm = [
  40, 8, 48, 16, 56, 24, 64, 32, 39, 7, 47, 15, 55, 23, 63, 31, 38, 6, 46, 14,
  54, 22, 62, 30, 37, 5, 45, 13, 53, 21, 61, 29, 36, 4, 44, 12, 52, 20, 60, 28,
  35, 3, 43, 11, 51, 19, 59, 27, 34, 2, 42, 10, 50, 18, 58, 26, 33, 1, 41, 9,
  49, 17, 57, 25,
];

const keyp = [
  57, 49, 41, 33, 25, 17, 9, 1, 58, 50, 42, 34, 26, 18, 10, 2, 59, 51, 43, 35,
  27, 19, 11, 3, 60, 52, 44, 36, 63, 55, 47, 39, 31, 23, 15, 7, 62, 54, 46, 38,
  30, 22, 14, 6, 61, 53, 45, 37, 29, 21, 13, 5, 28, 20, 12, 4,
];

const shift_table = [1, 1, 2, 2, 2, 2, 2, 2, 1, 2, 2, 2, 2, 2, 2, 1];

const key_comp = [
  14, 17, 11, 24, 1, 5, 3, 28, 15, 6, 21, 10, 23, 19, 12, 4, 26, 8, 16, 7, 27,
  20, 13, 2, 41, 52, 31, 37, 47, 55, 30, 40, 51, 45, 33, 48, 44, 49, 39, 56, 34,
  53, 46, 42, 50, 36, 29, 32,
];

function encryptString(pt, rkb, rk) {
  // console.log(rkb);
  pt = permute(pt, initial_perm, 64);

  let left = pt.slice(0, 32);
  let right = pt.slice(-32);

  for (let i = 0; i < 16; i++) {
    let left_old = left;
    let right_old = right;
    let right_expanded = permute(right, exp_d, 48);

    let xor_x = xor(right_expanded, rkb[i]);

    console.log(`Loop ${i + 1}:`);
    console.log(`K${i + 1} = ${rkb[i]}`);
    console.log(`L${i + 1} = R${i} = ${right_old}`);
    console.log(`E(R${i}) = ${right_expanded}`);
    console.log(`K${i + 1} XOR E(R${i}) = ${xor_x}`);

    let sbox_str = "";
    for (let j = 0; j < 8; j++) {
      let row = bin2dec(parseInt(xor_x[j * 6] + xor_x[j * 6 + 5]));
      let col = bin2dec(
        parseInt(
          xor_x[j * 6 + 1] +
            xor_x[j * 6 + 2] +
            xor_x[j * 6 + 3] +
            xor_x[j * 6 + 4]
        )
      );
      let val = sbox[j][row][col];
      sbox_str += dec2bin(val);
      console.log(`S${j + 1}[${row}][${col}] = ${val} = ${dec2bin(val)}}`);
    }

    console.log(`S-box: ${sbox_str}`);
    sbox_str = permute(sbox_str, per, 32);

    console.log(`Hoan vi P S-box = ${sbox_str}`);
    let result = xor(left, sbox_str);
    left = result;

    console.log(`R${i + 1} = L${i} XOR f(R${i},K${i + 1}) = ${result}`);

    if (i !== 15) {
      let tmp = left;
      left = right;
      right = tmp;
    }
  }

  let combine = left + right;
  console.log(`R${16}L${16} = ${combine}`);
  let cipher_text = permute(combine, final_perm, 64);
  console.log(`Hoan vi IP-1 = ${cipher_text}`);
  return cipher_text;
}

function encryptBlock(block, key) {
  key = permute(key, keyp, 56);

  console.log(`Hoan vi 56b PC-1: ${key}`);

  let left = key.slice(0, 28);
  let right = key.slice(-28);
  console.log(`C0: ${left}`);
  console.log(`D0: ${right}`);

  let rkb = [];
  let rk = [];

  for (let i = 0; i < 16; i++) {
    left = shift_left(left, shift_table[i]);
    right = shift_left(right, shift_table[i]);

    combine_str = left + right;

    round_key = permute(combine_str, key_comp, 48);

    rkb.push(round_key);
    rk.push(bin2hex(round_key));

    console.log(`C${i + 1}: ${left}`);
    console.log(`D${i + 1}: ${right}`);
  }
  console.log("Khoa K1->16:");
  for (let i = 0; i < 16; i++) {
    console.log(`K${i + 1} = ${rkb[i]}`);
  }

  return encryptString(block, rkb, rk);
}

function decryptBlock(block, key) {
  key = permute(key, keyp, 56);

  console.log(`Hoan vi 56b PC-1: ${key}`);

  let left = key.slice(0, 28);
  let right = key.slice(-28);
  console.log(`C0: ${left}`);
  console.log(`D0: ${right}`);

  let rkb = [];
  let rk = [];

  for (let i = 0; i < 16; i++) {
    left = shift_left(left, shift_table[i]);
    right = shift_left(right, shift_table[i]);

    combine_str = left + right;

    round_key = permute(combine_str, key_comp, 48);

    rkb.push(round_key);
    rk.push(bin2hex(round_key));

    console.log(`C${i + 1}: ${left}`);
    console.log(`D${i + 1}: ${right}`);
  }
  console.log("Khoa K1->16:");
  for (let i = 0; i < 16; i++) {
    console.log(`K${i + 1} = ${rkb[i]}`);
  }

  // let rkb_rev = [...rkb.reverse()];
  return encryptString(block, rkb.reverse(), rk.reverse());
}

function splitBlock(str, blockSize) {
  let list = [];
  for (let i = 0; i < str.length; i += blockSize) {
    list.push(str.substr(i, blockSize));
  }
  return list;
}

function checkValidKeyword(key) {
  let invalidChars = ["0","1","2","3","4","5","6","7","8","9","A","B","C","D","E","F"];
  for (const item of key) {
    if(!invalidChars.includes(item))
      return false;
  }
  return true;
}

function checkValidInputEncrypt(plain_text) {
  if(inputPlainTextMode === 2){
    if(plain_text.length%64!=0) return false;
    let invalidChars = ["0","1"];
    for (const item of plain_text) {
      if(!invalidChars.includes(item))
        return false;
    }
  }
  if(inputPlainTextMode === 3){
    let invalidChars = ["0","1","2","3","4","5","6","7","8","9","A","B","C","D","E","F"];
    for (const item of plain_text) {
      if(!invalidChars.includes(item))
        return false;
    }
  }
  return true;
}

function checkValidInputDecrypt(plain_text) {
  if(inputCipherTextMode === 1){
    // if(plain_text.length%11!=0) return false;
    let invalidChars = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z","a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z","0","1","2","3","4","5","6","7","8","9","+","/"];
    for (const item of plain_text) {
      if(!invalidChars.includes(item))
        return false;
    }
  }
  if(inputCipherTextMode === 2){
    // if(plain_text.length%64!=0) return false;
    let invalidChars = ["0","1"];
    for (const item of plain_text) {
      if(!invalidChars.includes(item))
        return false;``
    }
  }
  if(inputCipherTextMode === 3){
    // if(plain_text.length%16!=0) return false;
    let invalidChars = ["0","1","2","3","4","5","6","7","8","9","A","B","C","D","E","F"];
    for (const item of plain_text) {
      if(!invalidChars.includes(item))
        return false;
    }
  }
  return true;
}

function generateKey(flag = true) {
  let key = document.getElementById(flag ? "key_encrypt" : "key_decrypt");
  let char = [
    "0",
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "A",
    "B",
    "C",
    "D",
    "E",
    "F",
  ];
  let str = "";
  while (str.length < 16) {
    str += char[Math.floor(Math.random() * 16)];
  }
  key.value = str;
}

function encryp2Bin(plain_text, key) {
  let result = "";
  let pt = plainText2bin(plain_text);
  key = hex2bin(key);

  for (const item of pt) {
    // result+=bin2hex(encryptBlock(item,key));
    result += encryptBlock(item, key);
  }
  return result;
}

function encryp2Hex(plain_text, key) {
  let result = "";
  let pt = plainText2bin(plain_text);
  key = hex2bin(key);

  for (const item of pt) {
    // result+=bin2hex(encryptBlock(item,key));
    result += bin2hex(encryptBlock(item, key));
  }
  return result;
}

function encryp2Base64(plain_text, key) {
  let result = "";
  let pt = plainText2bin(plain_text);
  key = hex2bin(key);

  for (const item of pt) {
    // result+=bin2hex(encryptBlock(item,key));
    result += encryptBlock(item, key);
  }
  while (result.length % 6 != 0) {
    result += "0";
  }
  return bin2base64(result);
}

function plainText2bin(plain_text){
  switch (inputPlainTextMode) {
    case 1:
      return unicode2bin(plain_text);
  
    case 2:
      let blockSize = 64;
      let list = [];
      for (let i = 0; i < plain_text.length; i+=blockSize) {
        list.push(plain_text.substr(i,blockSize));
      }
      return list;

    case 3:
      return hex2bin(plain_text);
  }
}

function decryptBin(cipher_text, key) {
  const blockSize = 64;
  let result = "";
  let pt = splitBlock(cipher_text, blockSize);
  key = hex2bin(key);
  // console.log(pt);
  // let pt = [];
  // for (let i = 0; i < cipher_text.length; i+=16) {
  //   pt.push(cipher_text.slice(i,16));
  // }
  // let resultBin = "";
  // for (const item of pt) {
  //   resultBin += decryptBlock(item,key);
  // }

  // console.log(resultBin);

  // console.log(`Ban ma qua phep IP(64b): ${permute(pt,initial_perm,64)}`);
  // console.log(`L0: ${permute(pt,initial_perm,64).slice(0,32)}`);
  // console.log(`R0: ${permute(pt,initial_perm,64).slice(-32)}`);

  // console.log(encryptBlock(pt,key));
  for (const item of pt) {
    result += decryptBlock(item, key);
    // result+=(encryptBlock(item,key));
  }

  return bin2(result);
}

function decryptHex(cipher_text, key) {
  const blockSize = 16;
  let result = "";
  let pt = splitBlock(cipher_text, blockSize);
  key = hex2bin(key);
  // console.log(pt);
  // let pt = [];
  // for (let i = 0; i < cipher_text.length; i+=16) {
  //   pt.push(cipher_text.slice(i,16));
  // }
  // let resultBin = "";
  // for (const item of pt) {
  //   resultBin += decryptBlock(item,key);
  // }

  // console.log(resultBin);

  // console.log(`Ban ma qua phep IP(64b): ${permute(pt,initial_perm,64)}`);
  // console.log(`L0: ${permute(pt,initial_perm,64).slice(0,32)}`);
  // console.log(`R0: ${permute(pt,initial_perm,64).slice(-32)}`);

  // console.log(encryptBlock(pt,key));
  for (const item of pt) {
    console.log(hex2bin(item));
    result += decryptBlock(hex2bin(item), key);
    // result+=(encryptBlock(item,key));
  }

  return bin2(result);
}

function decryptBase64(cipher_text, key) {
  let result = "";
  let pt = base64toBin(cipher_text);
  console.log(pt);
  key = hex2bin(key);
  // console.log(pt);
  // let pt = [];
  // for (let i = 0; i < cipher_text.length; i+=16) {
  //   pt.push(cipher_text.slice(i,16));
  // }
  // let resultBin = "";
  // for (const item of pt) {
  //   resultBin += decryptBlock(item,key);
  // }

  // console.log(resultBin);

  // console.log(`Ban ma qua phep IP(64b): ${permute(pt,initial_perm,64)}`);
  // console.log(`L0: ${permute(pt,initial_perm,64).slice(0,32)}`);
  // console.log(`R0: ${permute(pt,initial_perm,64).slice(-32)}`);

  // console.log(encryptBlock(pt,key));
  for (const item of pt) {
    result += decryptBlock(item, key);
    // result+=(encryptBlock(item,key));
  }

  return bin2(result);
}

function bin2(result){
  switch (outputPlainTextMode) {
    case 1:
      return bin2unicode(result);
  
    case 2:
      return result;

    case 3:
      return bin2hex(result);
  }
}

function encrypt() {
  let plain_text = document.getElementById("input_plain_text"+(inputPlainTextMode==2?"_binary":(inputPlainTextMode==3?"_hex":""))).value.trim();
  let key = document.getElementById("key_encrypt").value.trim();
  let cipher_text = document.getElementById("cipher_text"+(outputCipherTextMode==2?"_binary":(outputCipherTextMode==3?"_hex":"")));
  let result = "";

  if (plain_text.length === 0 || key.length === 0) return;
  
  if (!checkValidInputEncrypt(plain_text)) {
    showSnakeBar("Plain Text Invalid!");
    return;
  }

  if (!checkValidKeyword(key)) {
    showSnakeBar("Keyword Invalid!");
    return;
  }
  
  switch (outputCipherTextMode) {
    case 1:
      result = encryp2Base64(plain_text, key);
      break;
    case 2:
      result = encryp2Bin(plain_text, key);
      break;
    case 3:
      result = encryp2Hex(plain_text, key);
      break;
  }

  // console.log(`Ban ro qua phep IP(64b): ${permute(pt,initial_perm,64)}`);
  // console.log(`L0: ${permute(pt,initial_perm,64).slice(0,32)}`);
  // console.log(`R0: ${permute(pt,initial_perm,64).slice(-32)}`);

  // console.log(encryptBlock(pt,key));
  // result = bin2hex(encryptBlock(pt,key));
  // result = bin2unicode(result);
  cipher_text.innerHTML = result;
  //   console.log(key_array, array);
  // createMatrixDisplay("matrixEncrypt");
}

const pressEnterEncrypt = (e, flag) => {
  // inputValidHex(e);
  if (e.key === "Enter") {
    flag ? encrypt() : decrypt();
  }
};

const saveFileEncrypt = () => {
  result = document.getElementById("cipher_text").innerHTML;
  handleSaveFile(result, "ciphertext.txt");
};

function decrypt() {
  let cipher_text = document.getElementById("input_cipher_text"+(inputCipherTextMode==2?"_binary":(inputCipherTextMode==3?"_hex":""))).value.trim();
  let key = document.getElementById("key_decrypt").value.trim();
  let plain_text = document.getElementById("plain_text"+(outputPlainTextMode==2?"_binary":(outputPlainTextMode==3?"_hex":""))+"-pl");
  let result = "";

  if (cipher_text.length === 0 || key.length === 0) return;

  if (!checkValidInputDecrypt(cipher_text)) {
    showSnakeBar("Cipher Text Invalid!");
    return;
  }

  if (!checkValidKeyword(key)) {
    showSnakeBar("Keyword Invalid!");
    return;
  }
  
  switch (inputCipherTextMode) {
    case 1:
      result = decryptBase64(cipher_text, key);
      break;
    case 2:
      result = decryptBin(cipher_text, key);
      break;
    case 3:
      result = decryptHex(cipher_text, key);
      break;
  }

  while(result.includes("  ")){
    result = result.replace("  ","&nbsp; ");
  }
  
  while(result.includes("<")){
    result = result.replace("<","&lt;");
  }
  
  while(result.includes("\n")){
    result = result.replace("\n","<br>");
  }
  
  // result=bin2unicode(dec)

  plain_text.innerHTML = result;
  // createMatrixDisplay("matrixDecrypt");
}

function showSnakeBar(message) {
  var x = document.getElementById("snackbar");
  x.className = "show";
  x.innerHTML = message;
  setTimeout(function () {
    x.className = x.className.replace("show", "");
  }, 3000);
}

const saveFileDecrypt = () => {
  result = document.getElementById("plain_text").innerHTML;
  // if(result!=="")
  handleSaveFile(result, "plaintext.txt");
};

async function handleSaveFile(result, fileName) {
  if (result === "") return;
  if (window.showSaveFilePicker) {
    const handle = await showSaveFilePicker({
      suggestedName: fileName,
      types: [
        {
          description: "txt",
          accept: {
            "text/markdown": [".txt"],
          },
        },
      ],
    });
    const writable = await handle.createWritable();
    await writable.write(result);
    writable.close();
  } else {
    const SaveFile = document.createElement("a");
    SaveFile.href = URL.createObjectURL(result);
    SaveFile.download = fileName;
    SaveFile.click();
    setTimeout(() => URL.revokeObjectURL(SaveFile.href), 60000);
  }
}

function createMatrixDisplay(id) {
  let key = document.getElementById("key_encrypt").value;
  let key_array = key.split("").map(Number);
  let plain_text = document.getElementById("input_plain_text").value;
  const matrix = document.getElementById(id);
  //   console.log(matrix, key, plain_text.length);
  while (matrix.firstChild) {
    matrix.removeChild(matrix.lastChild);
  }

  const table1 = document.createElement("table");
  table1.className = "table-encrypt";

  if (id === "matrixEncrypt") {
    for (let i = 0; i < key_array.length; i++) {
      const thELe = document.createElement("th");
      thELe.innerHTML = key_array[i];
      table1.appendChild(thELe);
      matrix.appendChild(table1);
    }
  }

  for (let i = 0; i < key_array.length; i++) {
    const trEle = document.createElement("tr");
    if (id === "matrixDecrypt") {
      const thELe = document.createElement("td");
      thELe.classList.add("th");
      thELe.innerHTML = key_array[i];
      trEle.appendChild(thELe);
    }
    for (let j = 0; j < array[0].length; j++) {
      const tdEle = document.createElement("td");
      //   tdEle.id = 'cell-'+i+'-'+j;
      tdEle.innerHTML = array[i][j] === " " ? "&nbsp;" : array[i][j];
      trEle.appendChild(tdEle);
    }
    table1.appendChild(trEle);
    matrix.appendChild(table1);
  }
}
