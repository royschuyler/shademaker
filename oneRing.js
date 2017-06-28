//separartes a,b,c,d into an object of EACH of their front and backs

var bigHyp = .99;
var smallHyp = .88;

function getBack (x,y,n){
  var frontCount;
  for (i=0;i<x.length;i++){
      if(i+2){
        var hyp1 = Math.hypot(x[i], y[i]);
        var hyp2 = Math.hypot(x[i+1], y[i+1]);
        var hyp3 = Math.hypot(x[i+2], y[i+2]);
        if(hyp1 < hyp2 && hyp2 > hyp3 && hyp2 > n){
          frontCount = i;
          break
        }
    }
  }
  return (frontCount)
}

var backA = getBack(ax,ay,bigHyp);
var backC = getBack(cx,cy,bigHyp);
var backB = getBack(bx,by,smallHyp);
var backD = getBack(dx,dy,smallHyp);

console.log('backA = ' + backA);
console.log('backC = ' + backC);
console.log('backB = ' + backB)
console.log('backD = ' + backD)

function separate (x,y,n){

  var obj = {
    frontArrx: [],
    frontArry: [],
    backArrx: [],
    backArry: []
  }


    for(i=0;i<x.length;i++){
      if(i <= n){
        obj.backArrx.push(x[i]);
        obj.backArry.push(y[i]);
      }else{
        obj.frontArrx.push(x[i]);
        obj.frontArry.push(y[i]);
      }
    }
    return obj
  }

var mainObj = {
  objA: separate (ax,ay,backA),
  objB: separate (bx,by,backB),
  objC: separate (cx,cy,backC),
  objD: separate (dx,dy,backD)
}
console.log(mainObj)

//at this point, mainObj contains A,B,C,D.
//Each contains 4 arrays - frontx,fronty,backx,backy
