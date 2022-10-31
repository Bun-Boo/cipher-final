let p, q, e;
let m;
let c;
let kua;
let kra;
let n;
let fi;
let d;

function inputValidNumber(e) {
  let invalidChars = ["0","1","2","3","4","5","6","7","8","9"];
  if (!invalidChars.includes(e.key)) {
    e.preventDefault();
  }
}

function isPrimeNumber(n) {
  if (n < 2) return false;
  for (let i = 2; i * i <= n; i++) if (n % i == 0) return false;
  return true;
}

function gcd(a, b) {
  return b === 0 ? a : gcd(b, a % b);
}

function checkValid() {
  p = document.getElementById("input_p").valueAsNumber;
  q = document.getElementById("input_q").valueAsNumber;
  e = document.getElementById("input_e").valueAsNumber;
  if (!p || !q || !e) return false;
  kua = document.getElementById("input_kua");
  kra = document.getElementById("input_kra");
  n = p * q;
  fi = (p - 1) * (q - 1);
  if (!isPrimeNumber(p)) {showSnakeBar(`${p} is not Prime Number!`,'input_p'); return false;}
  if (!isPrimeNumber(q)) {showSnakeBar(`${q} is not Prime Number!`,'input_q'); return false;}
  if (e <= 1 || e >= fi) {showSnakeBar(`${e} is not valid!`,'input_e'); return false;}
  if (gcd(e, fi) !== 1) {showSnakeBar(`gcd(${e},${fi}) = ${gcd(e, fi)} is not valid!`,'input_e'); return false;}
  return true;
}

function onChange() {
  if (!checkValid()) {
    if(kua && kra){
      kua.value = "";
      kra.value = "";
    }
    return;
  }
  kua.value = `{${e}:${n}}`;
  for (let i = 0; i < fi; i++) {
    if ((e * i) % fi == 1) {
      d = i;
      break;
    }
  }
  kra.value = `{${d}:${n}}`;
  document.getElementById("input_m").max = n;
  document.getElementById("input_m").min = 1;
  document.getElementById("input_m").title = `Max value is ${n}`;
  document.getElementById("input_c").max = n;
  document.getElementById("input_c").min = 1;
  document.getElementById("input_c").title = `Max value is ${n}`;
}

function getPrimeNumber(){
  x = Math.floor(Math.random()*10000);
  return isPrimeNumber(x)?x:getPrimeNumber();
}

function generate() {
  p = document.getElementById("input_p");
  q = document.getElementById("input_q");
  e = document.getElementById("input_e");

  p.value = getPrimeNumber();
  do{
    q.value = getPrimeNumber();
  } while(q === p);
  fi = (p.value-1)*(q.value-1);
  do{
    e.value = Math.floor(Math.random()*(fi-2))+2;
  } while(gcd(e.value,fi)!==1);

  onChange();
}

function encrypt() {
  m = document.getElementById("input_m").valueAsNumber;
  if (m) {
    if(m>n){
      showSnakeBar(`Max value of M is ${n}!`,"input_m");
      return;
    }
    document.getElementById("output-encrypt").innerHTML = findModOfExponential(m, e, n);
  }
}

function decrypt() {
  c = document.getElementById("input_c").valueAsNumber;
  if (c) {
    if(c>n){
      showSnakeBar(`Max value of C is ${n}!`,"input_c");
      return;
    }
    document.getElementById("output-decrypt").innerHTML = findModOfExponential(c, d, n);
  }
}

function findModOfExponential(x, e, n) {
  let i = Math.floor(Math.log2(e));
  let arr = [];
  while (e > 0) {
    arr.push(2 ** i);
    e -= 2 ** i;
    while (e - 2 ** i < 0) i--;
  }
  arr = arr.reverse();
  console.log(arr);
  let arrMod = new Map();
  for (let i = 0; i <= Math.log2(arr[arr.length - 1]); i++) {
    if (i === 0) arrMod.set(2**i,x ** arr[i] % n);
    else {
      arrMod.set(2**i,arrMod.get(2**(i-1)) ** 2 % n);
    }
  }
  console.log(arrMod);
  let Mul = 1;
  let str = "";
  for (const item of arr) {
    Mul = mulBig(Mul,arrMod.get(item));
    str += arrMod.get(item) + "*";
    console.log(BigInt(Mul));
  }
  console.log(str);
  return Mul%BigInt(n);
}


function mulBig(a,b){
    a = a.toString();
    b = b.toString();
    while (a.length !== b.length) {
        if(a.length>b.length) b="0"+b;
        else a="0"+a;
    }
    a = a.split('').map(Number);
    b = b.split('').map(Number);
    let len = a.length;
    let btg = Array(len*2).fill(0);
    let ctg = Array(len*2).fill(0);
    let lenMax = len*2;
    let c = Array(len*2).fill(0);
    for (let i = len-1; i >= 0; i--) {
        lenMax--;
        let k = lenMax;
        btg = Array(len*2).fill(0);
        for(let j=len-1;j>=0;j--){
            let x = btg[k]+b[i]*a[j];
            btg[k]=x%10;
            btg[k-1]=Math.floor(x/10);
            k--;
        }
        c = sumBig(ctg,btg);
        ctg = c;
        
    }
    // console.log(a);
    // console.log(b);
    // console.log(c);
    // console.log(Number(c.join('')),BigInt(c.join('')));
    return BigInt(c.join(''));
}

function sumBig(A,B){
    let C=Array(A.length);
    for (let i = A.length-1; i >= 0; i--) {
        if(i){
            let x = A[i]+B[i];
            C[i]=x%10;
            B[i-1]+=Math.floor(x/10);
        }
        else C[i]=A[i]+B[i];
    }
    return C;
}

function showSnakeBar(mess,idInputFocus) {
    var x = document.getElementById("snackbar");
    x.innerHTML = mess;
    x.className = "show";
    setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
    document.getElementById(idInputFocus).focus();
  }