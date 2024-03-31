const array1 = document.getElementById('array');
const bubble1 = document.getElementById('bubble');
const selection1 = document.getElementById('selection');
const insertion1 = document.getElementById('insertion');
const quick1 = document.getElementById('quick');
const merge1 = document.getElementById('merge');
const skip1 = document.getElementById('skip');

async function delay(delayTime){
  return new Promise(resolve=> setTimeout(resolve,delayTime));
}

async function findMin(a,b,delayTime){
  const el1 = document.querySelector(`.cell${a}`);
  const style1 = window.getComputedStyle(el1)
  const transform1 = style1.getPropertyValue("height");
  el1.style.backgroundColor = "rgb(241, 135, 226)";

  await  delay(delayTime);

  const el2 = document.querySelector(`.cell${b}`);
  const style2 = window.getComputedStyle(el2);
  const transform2 = style2.getPropertyValue("height");
  el2.style.backgroundColor = "rgb(241, 135, 226)";

  await  delay(delayTime);

  if(parseInt(transform1) < parseInt(transform2)){
    el2.style.backgroundColor = "rgb(192, 192, 255)";
    return a;
  }else{
    el1.style.backgroundColor = "rgb(192, 192, 255)";
    return b;
  }
}

async function swap(a,b,delayTime){
  const el1 = document.querySelector(`.cell${a}`);
  const style1 = window.getComputedStyle(el1)
  const transform1 = style1.getPropertyValue("height");

  await delay(delayTime);

  const el2 = document.querySelector(`.cell${b}`);
  const style2 = window.getComputedStyle(el2)
  const transform2 = style2.getPropertyValue("height");

  const lebel1 = document.querySelector(`.lebel${a}`);
  const lebel2 = document.querySelector(`.lebel${b}`);

  el1.style.height = transform2;
  el2.style.height = transform1;
  const labelTemp = lebel1.innerHTML;
  lebel1.innerHTML = lebel2.innerHTML;
  lebel2.innerHTML = labelTemp;
}


async function selectionSort(){
  array1.disabled = true;
  bubble1.disabled = true;
  selection1.disabled = true;
  insertion1.disabled = true;
  quick1.disabled = true;
  merge1.disabled = true;
  skip1.disabled = true;

  for(let i=1; i<50; i++){
    let min = i;

    for(let j=i+1; j<=50; j++){
      min = await findMin(min,j,10);

      const allCells = document.querySelectorAll(".cell");
      allCells.forEach(cell => {
        cell.style.backgroundColor = "rgb(192, 192, 255)";
      });
    }

    if(min !== i){
      await swap(i,min,10);
    }
  }

  array1.disabled = false;
  bubble1.disabled = false;
  selection1.disabled = false;
  insertion1.disabled = false;
  quick1.disabled = false;
  merge1.disabled = false;
  skip1.disabled = false;
}
