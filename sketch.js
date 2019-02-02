let y=[];//y values for path to replicate
let yft;

let x=[];//x values for path to replicate
let xft;

let ys=[];//keep track of produced drawing
let xs=[];
let time=0;

let drawing=-1;//0=user drawing, 1=draw what they drew

function setup() {
  createCanvas(innerWidth,innerHeight);
}
function mousePressed(){
  drawing=0;
  y=[];
  x=[];
}
function mouseReleased(){
  drawing=1;
  xft=simpdft(x);
  xft.sort((a,b)=>b.amp-a.amp);
  yft=simpdft(y);
  yft.sort((a,b)=>b.amp-a.amp);
  ys=[];
  xs=[];
  time=0;
}


function drawEpicycles(x,y,offset,fourier){//offset is an angle to start at
  for(let i=0;i<fourier.length;i++){
    let preX=x;
    let preY=y;

    let use=fourier[i].freq;
    let radius=fourier[i].amp;
    let co=Math.cos(use*time+fourier[i].phase+offset);
    let si=Math.sin(use*time+fourier[i].phase+offset);
    //draw circle
    stroke(co*127+128,si*127+128,co*127+128);
    noFill();
    ellipse(x,y,radius*2);
    //draw line from circle center to point
    fill(co*127+128,si*127+128,co*127+128);
    //travel along points from circle to circle to get final point
    x+=radius*co;
    y+=radius*si;
    line(preX,preY,x,y);
    ellipse(x,y,8);
  }
  return {x,y};
}

function draw() {
  background(0);
  if(drawing==0){
    x.push(mouseX-width/2);
    y.push(mouseY-height/2);
    stroke(255,0,0);
    noFill();
    beginShape();
    for(let i=0;i<y.length;i++){
      vertex(x[i]+width/2,y[i]+height/2);
    }
    endShape();
  }
  else if(drawing==1){
    xs.unshift(drawEpicycles(width/2,50,0,xft));
    ys.unshift(drawEpicycles(50,height/2,Math.PI/2,yft));

    stroke(255);
    ellipse(xs[0].x,ys[0].y,8);
    line(xs[0].x,xs[0].y,xs[0].x,ys[0].y);
    line(ys[0].x,ys[0].y,xs[0].x,ys[0].y);

    stroke(255,0,0);
    noFill();
    beginShape();
    for(let i=0;i<ys.length;i++){
      vertex(xs[i].x,ys[i].y);
    }
    endShape();
    time+=2*Math.PI/yft.length;

    if(time>2*Math.PI){
      ys=[];
      xs=[];
      time=0;
    }
  }
}
