var picked=1;
var gs=3;//gamesize
var setin=true;
var again=false;
var trials=0;
var x,y;
var id=[];   
onload = function() {
	const mother = document.getElementById("mother");	
}    
function initgame() {
  proof=compare(9);
  field=[],sfield=[],fieldsqrt=[],possible=[],changed=[]; 
  for (let i=0;i<Math.pow(gs,2);i++) {
    field[i]=[];
    changed[i]=[];
    possible[i]=[];
    for (let j=0;j<Math.pow(gs,2);j++) {
      changed[i][j]=false;
      possible[i][j]=[];
      for (let k=1;k<=Math.pow(gs,2);k++) {
        possible[i][j].push(k); 
      }
    }
  }
  for (let i=0;i<gs;i++) {
    sfield[i]=[];
    for (let j=0;j<gs;j++) {
      sfield[i][j]=[];
    }
  }       
  child=[];
  keyboard=[];
  for(var i=0;i<Math.pow(gs,2);i++) {
    let k=0;
    child[i]=[];
    for(var j=0;j<Math.pow(gs,2);j++) {
      child[i][j]=new HTMLelement(6+(i*38+(Math.floor(i/gs))*2),j*38+35+(Math.floor(j/gs))*2,36,36,"","f"+i+j,"div",mother);
      child[i][j].create();
      child[i][j].thiselement().className="field";
      child[i][j].thiselement().readOnly=true;
      child[i][j].thiselement().style.border="0px";
      child[i][j].thiselement().onclick=function() {
        fillin(this);
      };
    }
  }
  for(var i=0;i<Math.pow(gs,2);i++) {
    keyboard[i]=new HTMLelement(i*39+5,400,34,34,"","b"+i,"div",mother);
    keyboard[i].create();
    keyboard[i].thiselement().className="keyboard";
    keyboard[i].thiselement().style.fontSize="30px";
    keyboard[i].thiselement().innerHTML=i+1;
    keyboard[i].thiselement().onclick=function() { 
      assign(this)
    };
  }
}
function fillin(event) {
  let arr=event.id.split("");
  fillfield(picked,arr[1],arr[2]);
}
function assign(event) {
  keyboard[picked-1].thiselement().style.background="rgb(120,120,0)";
  picked=parseInt(event.id.split("")[1])+1;
  event.style.background="rgb(160,80,0)";
}
function start() {
  mother.style.display="block";
}
function go() {
  for (let i=0;i<Math.pow(gs,2);i++) {
    possible[i]=[];
    for (let j=0;j<Math.pow(gs,2);j++) {
      possible[i][j]=[];
      for (let k=1;k<=Math.pow(gs,2);k++) {
        possible[i][j].push(k); 
      }
    }
  }
  trials++;
  for (let i=0;i<Math.pow(gs,2);i++) {
    field[i]=[];
  }
  for (let i=0;i<gs;i++) {
    sfield[i]=[];
    for (let j=0;j<gs;j++) {
      sfield[i][j]=[];
    }
  }
  let arr=[]; 
  do { 
    fillfield(Math.floor(Math.random()*Math.pow(gs,2))+1,Math.floor(Math.random()*Math.pow(gs,2)),Math.floor(Math.random()*Math.pow(gs,2)));
    arr=[];
    for(let i in field){    
      for(let j in field[i]) {
        arr.push(field[i][j]);       
      }
    }  
  }
  while (arr.length<Math.pow(gs,4));
}
function fillfield(input,x,y) {
  if(possible[x][y].includes(input)) {
    field[x][y]=input;
    sfield[Math.floor(x/gs)][Math.floor(y/gs)].push(input);
    child[x][y].thiselement().style.fontSize="28px";
    child[x][y].thiselement().innerHTML=input;
    loadbar();
    possiblenumbers(input,x,y);
  }
}
function possiblenumbers(input,x,y) {
  let fieldy=[];
  for (let i=0;i<Math.pow(gs,2);i++) {
    fieldy[i]=[];
    for (let j=0;j<Math.pow(gs,2);j++) {
      fieldy[i][j]=field[j][i];
    }
  }
  for (let i=0;i<Math.pow(gs,2);i++) {
    for (let j=0;j<Math.pow(gs,2);j++) {
      if(field[i][j]===undefined) {
        child[i][j].thiselement().innerHTML="";
        for (var k=1;k<=Math.pow(gs,2);k++) {
          if(field[i].includes(k)||fieldy[j].includes(k)||sfield[Math.floor(i/gs)][Math.floor(j/gs)].includes(k)) {
            possible[i][j]=possible[i][j].filter(filter => filter!=k);
            changed[i][j]=true;
          }  
        }
        if(possible[i][j].length===0) {
          reset(); 
        }  
      }
    }
  } 
  //xpossible(possible);
  //ypossible(possible);
 // spossible(possible);
  o1possible(possible);
  possible=calculatepossible(possible);
  possible=calculatepossible(possible);
  showpossible(possible);
}
function ypossible(possible) {
  let arr=[];
  for(let i=0;i<Math.pow(gs,2);i++) {
    arr[i]=[];
    for(let j=0;j<Math.pow(gs,2);j++) {
      arr[i]=arr[i].concat(possible[i][j]);  
      arr[i].push("#");
    }
    for(let j=1;j<=Math.pow(gs,2);j++) {     
      if(arr[i].indexOf(j)==arr[i].lastIndexOf(j)) {
        if(arr[i].indexOf(j)!=-1) {
          let newarr=[];
          newarr[i]=arr[i].slice(0,arr[i].indexOf(j));
          let a=newarr[i].join("").split("#").length-1;
          fillfield(j,i,a);        
        }
      }
    }
  }
}
function xpossible(possible) {
  let arr=[];
  for(let i=0;i<Math.pow(gs,2);i++) {
    arr[i]=[];
    for(let j=0;j<Math.pow(gs,2);j++) {
      arr[i]=arr[i].concat(possible[j][i]);  
      arr[i].push("#");
    }
  }
  for(let i=0;i<Math.pow(gs,2);i++) {
    for(let j=1;j<=Math.pow(gs,2);j++) {
      if(arr[i].indexOf(j)==arr[i].lastIndexOf(j)) {
        if(arr[i].indexOf(j)!=-1) {
          let newarr=[];
          newarr[i]=arr[i].slice(0,arr[i].indexOf(j));
          let a=newarr[i].join("").split("#").length-1;
          fillfield(j,a,i);
        }
      }
    }
  }
}
function spossible(possible) {
  let arr=[];
  for(let i=0;i<Math.pow(gs,2);i++) {
    arr[i]=[];
    for(let j=0;j<gs;j++) {
      for(let k=0;k<gs;k++) {
        arr[i]=arr[i].concat(possible[k+gs*(i%gs)][j+gs*Math.floor(i/gs)]);
        arr[i].push("#");
      }
    }
  }
  for(let i=0;i<Math.pow(gs,2);i++) {
    for(let j=1;j<=Math.pow(gs,2);j++) {
      if(arr[i].indexOf(j)==arr[i].lastIndexOf(j)) {
        if(arr[i].indexOf(j)!=-1) {
          let newarr=[];
          newarr[i]=arr[i].slice(0,arr[i].indexOf(j));
          let a=newarr[i].join("").split("#").length-1;
          fillfield(j,(a%gs)+gs*(i%gs),Math.floor(a/gs)+Math.floor(i/gs)*gs);
        }
      }
    }
  }
}
function o1possible(possible) {
  for(let i=0;i<Math.pow(gs,2);i++) {
    for(let j=0;j<Math.pow(gs,2);j++) {  
      if(field[i][j]===undefined) {
        if(possible[i][j].length==1) {
          fillfield(possible[i][j][0],i,j);    
        }
      }
    }
  } 
}
function reset() {
    
}
function loadbar() {
  let arr=[];
  for(i in field)
  {    
    for(j in field[i]) {
      arr.push(field[i][j]);      
    } 
  }
  var load=arr.length/Math.pow(gs,4)*100;
  document.getElementsByClassName("loadbar")[0].style.width=load+"%";
  document.getElementsByClassName("loadbar")[0].innerHTML=load+"%";
}
function showpossible(possible) {
  for(var i=0;i<Math.pow(gs,2);i++) {        
    for(var j=0;j<Math.pow(gs,2);j++) {
      if(field[i][j]!==undefined) {
        continue;
      }
      child[i][j].thiselement().innerHTML="";
    }
  }
  for(var i=0;i<Math.pow(gs,2);i++) {        
    for(var j=0;j<Math.pow(gs,2);j++) {
      if(field[i][j]===undefined) {
        for(var k=0;k<Math.pow(gs,2);k++) {
		  if(k == 3 || k == 6) {
			child[i][j].thiselement().innerHTML += "\n";
		  }
          if(possible[i][j][k]!==undefined) {
            child[i][j].thiselement().innerHTML += "&nbsp;" + possible[i][j][k] + "&nbsp;";
          }
          else {
            child[i][j].thiselement().innerHTML+="&ensp;";  
          }
        }
      }
    }
  }
}
function calculatepossible(possible) {
  for(let i=0;i<Math.pow(gs,2);i++) {  
    loop2:
    for(let j of proof) {
      if(j.length>Math.pow(gs,2)-1) {
        continue;
      }
      arry=[];
      arrx=[];
      arrs=[];
      for(let k in j) {
        if(field[i][j[k]]!==undefined) {
          arry=false;
        }
        if(field[j[k]][i]!==undefined){
          arrx=false;
        }  
        if(field[Math.floor(i/gs)*gs+Math.floor(j[k]/gs)][i%gs*gs+j[k]%gs]!==undefined) {
          arrs=false;  
        }
        arry!==false?arry=or(arry,possible[i][j[k]]):void(0);
        arrx!==false?arrx=or(arrx,possible[j[k]][i]):void(0);
        arrs!==false?arrs=or(arrs,possible[Math.floor(i/gs)*gs+Math.floor(j[k]/gs)][i%gs*gs+j[k]%gs]):void(0);    
      } 
      if(arry.length==j.length) {
        for(let k=0;k<Math.pow(gs,2);k++) {
          if(j.includes(k)||field[i][k]!==undefined) {
            continue;
          }
          possible[i][k]=filter(possible[i][k],arry);
        }    
      }
      if(arrx.length==j.length) {
        for(let k=0;k<Math.pow(gs,2);k++) {
          if(j.includes(k)||field[k][i]!==undefined) {
            continue;
          }
          possible[k][i]=filter(possible[k][i],arrx);
        }    
      }
      if(arrs.length==j.length) {
        for(let k=0;k<Math.pow(gs,2);k++) {
          if(j.includes(k)||field[Math.floor(i/gs)*gs+Math.floor(k/gs)][i%gs*gs+k%gs]!==undefined) {
            continue;
          }
          possible[Math.floor(i/gs)*gs+Math.floor(k/gs)][i%gs*gs+k%gs]=filter(possible[Math.floor(i/gs)*gs+Math.floor(k/gs)][i%gs*gs+k%gs],arrs);
        }    
      }
    }
  }
  return possible;
}
//input: unspecific amount of arrays >=2  
//output: all different values once 
function or() {
  output=[];
  for(arr of arguments)
  { 
    for(i in output) {
      arr=arr.filter(filter => filter!=output[i])
    }
    output=output.concat(arr);
  }
  return output.sort(function(a,b){
    return a-b;
  });
}
//input: unspecific amount of arrays >=2  
//output: first array filtered by the other arrays
function filter() {
  for(let i=1;i<arguments.length;i++)
  { 
    for(j in arguments[i]) {
      arguments[0]=arguments[0].filter(filter => filter!=arguments[i][j]);
    }
  }
  return arguments[0];
}
//output an array with all possible combination
function compare(num) {
  let value=0;
  let index=0;
  arr=[0];
  output=[];
  output[0]=[0];
  let i=0;
  do {       
    if(arr[index]<num-1) {
      value++;
      arr.push(value);
      index=arr.length-1;       
    } else if(arr[index]==num-1) {
      index--;
      arr.pop();
      arr[index]++;
      value=arr[index];
    }   
    output[++i]=[];
    for(let j of arr) {
      output[i].push(j);
    }
  }
  while (arr[0]!=num-1);
  return output;
}
class HTMLelement
{
  constructor(left,top,width,height,color,id,type,parent)
  {
    this.width = width;
    this.height = height;
    this.left = left;
    this.top = top;
    this.color = color;
    this.id = id;
    this.xposition=0;
    this.yposition=0;
    this.type=type;
    this.parent = parent;
  }
  create()
  {
    var xposition,yposition;
    this.element = document.createElement(this.type);
    this.element.style.position="absolute";
    this.element.style.zIndex=1;
    this.element.id=this.id;
    xposition=this.left+this.xposition;
    yposition=this.top+this.yposition;
    this.element.style.left=xposition+"px";
    this.element.style.top=yposition+"px";
    this.size(this.width,this.height);
    this.element.style.backgroundColor=this.color;
    this.parent.appendChild(this.element);
  }
  translate(left,top)
  {
    var xposition,yposition;
    this.left+=left;
    this.top+=top;
    xposition=this.left+this.xposition;
    yposition=this.top+this.yposition;
    this.element.style.left = xposition+"px";
    this.element.style.top = yposition+"px";         
  }
  setposition(left,top)
  {
    var xposition,yposition;
    this.left=left;
    this.top=top;
    xposition=this.left+this.xposition;
    yposition=this.top+this.yposition;
    this.element.style.left = xposition+"px";
    this.element.style.top = yposition+"px";    
  }
  size(width=0,height=0)
  {
    this.width=width;
    this.element.style.width=this.width+"px";
    this.element.style.left=this.left+"px";
    this.height=height;
    this.element.style.height=this.height+"px";
    this.element.style.top=this.top+"px";
  }
  delete()
  {
    this.parent.removeChild(this.element);
  }
  thiselement()
  {
    return this.element
  }
}