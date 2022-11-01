let q, a, xa, xb;
let ya, yaValue;
let yb, ybValue;
let k;
let d;

function inputValidNumber(e) {
  let invalidChars = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
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

function checkNguyenCan(x, n) {
  for (let i = 1; i < n; i++) {
    if (findModOfExponential(x, i, n) == 0) return false;
  }
  return true;
}

function checkValid() {
  q = document.getElementById("input_q").valueAsNumber;
  a = document.getElementById("input_alpha").valueAsNumber;
  xa = document.getElementById("input_xa").valueAsNumber;
  xb = document.getElementById("input_xb").valueAsNumber;
  if (!q || !a || !xa || !xb) return false;
  ya = document.getElementById("input_ya");
  yb = document.getElementById("input_yb");
  if (!isPrimeNumber(q)) {
    showSnakeBar(`${q} is not Prime Number!`, "input_q");
    return false;
  }
  if (xa > q) {
    showSnakeBar(`${xa} is not valid!`, "input_xa");
    return false;
  }
  if (xb > q) {
    showSnakeBar(`${xb} is not valid!`, "input_xb");
    return false;
  }
  return true;
}

function onChange() {
  if (!checkValid()) {
    if (ya && yb) {
      ya.innerHTML = "";
      yb.innerHTML = "";
    }
    return;
  }
  ya.innerHTML = `${a}<sup>${xa}</sup> mod ${q} = ${findModOfExponential(
    a,
    xa,
    q
  )}`;
  yaValue = Number.parseInt(findModOfExponential(a, xa, q));
  yb.innerHTML = `${a}<sup>${xb}</sup> mod ${q} = ${findModOfExponential(
    a,
    xb,
    q
  )}`;
  ybValue = Number.parseInt(findModOfExponential(a, xb, q));
}

function getPrimeNumber() {
  x = Math.floor(Math.random() * 10000);
  return isPrimeNumber(x) ? x : getPrimeNumber();
}

function generate() {
  q = document.getElementById("input_q");
  a = document.getElementById("input_alpha");
  xa = document.getElementById("input_xa");
  xb = document.getElementById("input_xb");

  q.value = getPrimeNumber();
  console.log("a");
  do {
    a.value = Math.floor(Math.random() * (q.value - 2) + 2);
  } while (!checkNguyenCan(a.value, q.value));
  xa.value = Math.floor(Math.random() * (q.value - 2) + 2);
  xb.value = Math.floor(Math.random() * (q.value - 2) + 2);
  console.log("b");
  onChange();
}

function encrypt() {
  xa = document.getElementById("input_xa").valueAsNumber;
  yb = document.getElementById("input_yb").innerHTML;
  if (xa && yb) {
    document.getElementById(
      "output-encrypt"
    ).innerHTML = `${ybValue}<sup>${xa}</sup> mod ${q} = ${findModOfExponential(
      ybValue,
      xa,
      q
    )}`;
  }
}

function decrypt() {
  xb = document.getElementById("input_xb").valueAsNumber;
  ya = document.getElementById("input_ya").innerHTML;
  if (xb && ya) {
    document.getElementById(
      "output-decrypt"
    ).innerHTML = `${yaValue}<sup>${xb}</sup> mod ${q} = ${findModOfExponential(
      yaValue,
      xb,
      q
    )}`;
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
    console.log(x, i, arr[i], n);
    if (i === 0) arrMod.set(2 ** i, x ** 1 % n);
    else {
      arrMod.set(2 ** i, arrMod.get(2 ** (i - 1)) ** 2 % n);
    }
  }
  console.log(arrMod);
  let Mul = 1;
  let str = "";
  for (const item of arr) {
    Mul = mulBig(Mul, arrMod.get(item));
    str += arrMod.get(item) + "*";
    console.log(BigInt(Mul));
  }
  console.log(str);
  return Mul % BigInt(n);
}

function mulBig(a, b) {
  a = a.toString();
  b = b.toString();
  while (a.length !== b.length) {
    if (a.length > b.length) b = "0" + b;
    else a = "0" + a;
  }
  a = a.split("").map(Number);
  b = b.split("").map(Number);
  let len = a.length;
  let btg = Array(len * 2).fill(0);
  let ctg = Array(len * 2).fill(0);
  let lenMax = len * 2;
  let c = Array(len * 2).fill(0);
  for (let i = len - 1; i >= 0; i--) {
    lenMax--;
    let k = lenMax;
    btg = Array(len * 2).fill(0);
    for (let j = len - 1; j >= 0; j--) {
      let x = btg[k] + b[i] * a[j];
      btg[k] = x % 10;
      btg[k - 1] = Math.floor(x / 10);
      k--;
    }
    c = sumBig(ctg, btg);
    ctg = c;
  }
  // console.log(a);
  // console.log(b);
  // console.log(c);
  // console.log(Number(c.join('')),BigInt(c.join('')));
  return BigInt(c.join(""));
}

function sumBig(A, B) {
  let C = Array(A.length);
  for (let i = A.length - 1; i >= 0; i--) {
    if (i) {
      let x = A[i] + B[i];
      C[i] = x % 10;
      B[i - 1] += Math.floor(x / 10);
    } else C[i] = A[i] + B[i];
  }
  return C;
}

function showSnakeBar(mess, idInputFocus) {
  var x = document.getElementById("snackbar");
  x.innerHTML = mess;
  x.className = "show";
  setTimeout(function () {
    x.className = x.className.replace("show", "");
  }, 3000);
  document.getElementById(idInputFocus).focus();
}
