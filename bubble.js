const array = document.getElementById('array');
const bubble = document.getElementById('bubble');
const selection = document.getElementById('selection');
const insertion = document.getElementById('insertion');
const quick = document.getElementById('quick');
const merge = document.getElementById('merge');
const skip = document.getElementById('skip');

function delay(ms){
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function boubleSwap(a,b,delayTime){
  const el1 = document.querySelector(`.cell${a}`);
  const style1 = window.getComputedStyle(el1)
  const transform1 = style1.getPropertyValue("height");
  el1.style.backgroundColor = "rgb(241, 135, 226)";

  await  delay(delayTime);

  const el2 = document.querySelector(`.cell${b}`);
  const style2 = window.getComputedStyle(el2)
  const transform2 = style2.getPropertyValue("height");
  el2.style.backgroundColor = "rgb(241, 135, 226)";

  await  delay(delayTime);

  const lebel1 = document.querySelector(`.lebel${a}`);
  const lebel2 = document.querySelector(`.lebel${b}`);

  if(parseInt(transform1) > parseInt(transform2)){
    // el1.style.backgroundColor = "rgb(241, 185, 80)";
    // await delay(delayTime);

    // el2.style.backgroundColor = "rgb(241, 185, 80)";
    // await delay(delayTime);

    el1.style.height = transform2;
    el2.style.height = transform1;
    const labelTemp = lebel1.innerHTML;
    lebel1.innerHTML = lebel2.innerHTML;
    lebel2.innerHTML = labelTemp;
  }
 
  await delay(delayTime);

  el1.style.backgroundColor = "rgb(192, 192, 255)";
  el2.style.backgroundColor = "rgb(192, 192, 255)";
}

async function bubbleSort(){
   
  array.disabled = true;
  bubble.disabled = true;
  selection.disabled = true;
  insertion.disabled = true;
  quick.disabled = true;
  merge.disabled = true;
  skip.disabled = true;

  for(let i=1; i<50; i++){

    for(let j=1; j<50-i+1; j++){ 

      await boubleSwap(j,j+1,0);
    }
  }

  array.disabled = false;
  bubble.disabled = false;
  selection.disabled = false;
  insertion.disabled = false;
  quick.disabled = false;
  merge.disabled = false;
  skip.disabled = false;
}
