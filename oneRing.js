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

function separate (x,y,n){
  var obj = {
    frontArrx: [],
    frontArry: [],
    backArrx: [],
    backArry: []
  }

    for(i=0;i<x.length;i++){
      if(i <= n){
        obj.backArrx.push(Number(x[i].toFixed(3)));
        obj.backArry.push(Number(y[i].toFixed(3)));
      }else{
        obj.frontArrx.push(Number(x[i].toFixed(3)));
        obj.frontArry.push(Number(y[i].toFixed(3)));
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

var mainObj2 = {
  objA: separate (ax,ay,backA),
  objB: separate (bx,by,backB),
  objC: separate (cx,cy,backC),
  objD: separate (dx,dy,backD)
}
//console.log(mainObj)
mainObj.objA.backArrx.reverse();
mainObj.objA.backArry.reverse();
mainObj.objB.backArrx.reverse();
mainObj.objB.backArry.reverse();
mainObj.objC.backArrx.reverse();
mainObj.objC.backArry.reverse();
mainObj.objD.backArrx.reverse();
mainObj.objD.backArry.reverse();

mainObj2.objA.backArrx.reverse();
mainObj2.objA.backArry.reverse();
mainObj2.objB.backArrx.reverse();
mainObj2.objB.backArry.reverse();
mainObj2.objC.backArrx.reverse();
mainObj2.objC.backArry.reverse();
mainObj2.objD.backArrx.reverse();
mainObj2.objD.backArry.reverse();

function equalOut (bx1,by1,bx2,by2,fx1,fy1,fx2,fy2){
  var dif = Math.abs(bx1.length - bx2.length);
  if(bx1.length>bx2.length){
    for(i=bx2.length;i<bx1.length;i++){
      bx2.push(bx2[bx2.length-1]);
      by2.push(by2[by2.length-1]);
      fx1.push(fx1[fx1.length-1]);
      fy1.push(fy1[fy1.length-1]);
    }
  }else{
    for(i=bx1.length;i<bx2.length;i++){
      bx1.push(bx1[bx1.length-1]);
      by1.push(by1[by1.length-1]);
      fx2.push(fx2[fx2.length-1]);
      fy2.push(fy2[fy2.length-1]);
    }
  }
}

equalOut(mainObj.objB.backArrx,mainObj.objB.backArry,mainObj.objD.backArrx,mainObj.objD.backArry,mainObj.objB.frontArrx,mainObj.objB.frontArry,mainObj.objD.frontArrx,mainObj.objD.frontArry);

equalOut(mainObj2.objC.backArrx,mainObj2.objC.backArry,mainObj2.objD.backArrx,mainObj2.objD.backArry,mainObj2.objC.frontArrx,mainObj2.objC.frontArry,mainObj2.objD.frontArrx,mainObj2.objD.frontArry);

equalOut(mainObj.objA.backArrx,mainObj.objA.backArry,mainObj.objC.backArrx,mainObj.objC.backArry,mainObj.objA.frontArrx,mainObj.objA.frontArry,mainObj.objC.frontArrx,mainObj.objC.frontArry);

equalOut(mainObj2.objC.backArrx,mainObj2.objC.backArry,mainObj2.objD.backArrx,mainObj2.objD.backArry,mainObj2.objC.frontArrx,mainObj2.objC.frontArry,mainObj2.objD.frontArrx,mainObj2.objD.frontArry);


console.log(mainObj.objA);
console.log(mainObj.objC);


var text = '';
var buffer = '';
var finalCount = 0;

function plot(x1,y1,x2,y2,s){

   //1 = white
   //0 = black
  var scale = 1;
  var use = 1/(x1.length/2);
  var k = 0;
  var m = 0;

   for(i=0;i<x1.length;i++){
      if(k<x1.length/2){
        var put = use * m;
        m++
        //end should be 1
      }
      if(k>=x1.length/2){
        var put = use * m;
        m--
        //end should be 0
      }
      buffer += 'newbuffer' + '\n';
      text += 'addvalue ' + finalCount + ' ' + x1[i] + ' ' + y1[i] + '\n';
      text += 'addvalue ' + finalCount + ' ' + x2[i] + ' ' + y2[i] + '\n';

      if(s == 's'){
        text += 'bcolor ' + .9 + ' ' + put + ' ' + put + ' ' + finalCount + '\n'
      } else{
        text += 'bcolor ' + put + ' ' + put + ' ' + put + ' ' + finalCount + '\n'
      }
      k++
      finalCount++
   }
}

plot(mainObj.objB.backArrx,mainObj.objB.backArry,mainObj.objD.backArrx,mainObj.objD.backArry,'b');
plot(mainObj2.objC.backArrx,mainObj2.objC.backArry,mainObj2.objD.backArrx,mainObj2.objD.backArry,'s');
plot(mainObj.objA.frontArrx,mainObj.objA.frontArry,mainObj.objC.frontArrx,mainObj.objC.frontArry,'b');
plot(mainObj2.objC.frontArrx,mainObj2.objC.frontArry,mainObj2.objD.frontArrx,mainObj2.objD.frontArry,'s');

var extra = 'blinewidth 1 all' + '\n' + 'drawframe no' + '\n' + 'asetticks x no' + '\n' + 'asetticks y no' + '\n' + 'asetminticks x no' + '\n' + 'asetminticks y no' + '\n' +'framewidth 0' + '\n' + 'bstyle yes no no no no no no yes no no 0' + '\n' + 'margins 0 0 0 0' + '\n' + 'range x -1.2 1.2' + '\n' + 'range y -1.2 1.2';

var end = buffer + text + extra;
console.log(end);

