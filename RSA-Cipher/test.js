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
    let c = Array(len*2);
    for (let i = len-1; i >= 0; i--) {
        lenMax--;
        let k = lenMax;
        btg = Array(len*2).fill(0);
        for(let j=len-1;j>=0;j--){
            let x = btg[k]+b[i]*a[j];
            // console.log(i,j,k,btg[k],b[i],a[j],x);
            btg[k]=x%10;
            btg[k-1]=Math.floor(x/10);
            k--;
        }
        c = sumBig(ctg,btg);
        ctg = c;
        
    }
    return Number(c.join(''));
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