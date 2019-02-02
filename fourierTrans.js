function simpdft(input){//discrete fourier transform(doesn't take 'complex' inputs)
  let ft=[]
  for(let i=0;i<input.length;i++){
    let a=0;
    let b=0;
    for(let j=0;j<input.length;j++){
      let t=(2*Math.PI*i*j)/input.length;
      a+=input[j]*Math.cos(t);
      b-=input[j]*Math.sin(t);
    }
    a/=input.length;
    b/=input.length;
    ft[i]={a,b,freq:i,amp:Math.sqrt(a*a+b*b),phase:Math.atan2(b,a)};
  }
  return ft;
}
function dft(input){//discrete fourier transform
  let ft=[]
  for(let i=0;i<input.length;i++){
    let a=0;
    let b=0;
    for(let j=0;j<input.length;j++){
      let t=(2*Math.PI*i*j)/input.length;
      let c=Math.cos(t);
      let d=-Math.sin(t);
      a+=input[i].a*c-input[i].b*d;
      b+=input[i].a*d+input[i].b*c;
    }
    a/=input.length;
    b/=input.length;
    ft[i]={a,b,freq:i,amp:Math.sqrt(a*a+b*b),phase:Math.atan2(b,a)};
  }
  return ft;
}
