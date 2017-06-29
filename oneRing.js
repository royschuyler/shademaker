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

// console.log('backA = ' + backA);
// console.log('backC = ' + backC);
// console.log('backB = ' + backB);
// console.log('backD = ' + backD);

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
//console.log(mainObj)
mainObj.objA.backArrx.reverse();
mainObj.objA.backArry.reverse();
mainObj.objB.backArrx.reverse();
mainObj.objB.backArry.reverse();
mainObj.objC.backArrx.reverse();
mainObj.objC.backArry.reverse();
mainObj.objD.backArrx.reverse();
mainObj.objD.backArry.reverse();
// console.log(mainObj);


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

equalOut(mainObj.objA.backArrx,mainObj.objA.backArry,mainObj.objC.backArrx,mainObj.objC.backArry,mainObj.objA.frontArrx,mainObj.objA.frontArry,mainObj.objC.frontArrx,mainObj.objC.frontArry);
//console.log(mainObj);
console.log(mainObj.objA);
console.log(mainObj.objC)


var text = '';
var buffer = '';

function plot(x1,y1,x2,y2){

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
      text += 'addvalue ' + k + ' ' + x1[i] + ' ' + y1[i] + '\n';
      text += 'addvalue ' + k + ' ' + x2[i] + ' ' + y2[i] + '\n';
      text += 'bcolor ' + put + ' ' + put + ' ' + put + ' ' + k + '\n'
      k++
   }
}

plot(mainObj.objA.backArrx,mainObj.objA.backArry,mainObj.objC.backArrx,mainObj.objC.backArry);

var extra = 'blinewidth 1 all' + '\n' + 'drawframe no' + '\n' + 'asetticks x no' + '\n' + 'asetticks y no' + '\n' + 'asetminticks x no' + '\n' + 'asetminticks y no' + '\n' +'framewidth 0' + '\n' + 'bstyle yes no no no no no no yes no no 0' + '\n' + 'margins 0 0 0 0' + '\n' + 'range x -1.2 1.2' + '\n' + 'range y -1.2 1.2';

var end = buffer + text + extra;
console.log(end);

//as of here 'plot function will generate macro for shading ONE back or front'
