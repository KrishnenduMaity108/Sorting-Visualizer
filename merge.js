const main = document.getElementById("main");
const barContainer2 = document.getElementById("temp-bar-container");

async function delay(ms){
  return new Promise(resolve => setTimeout(resolve,ms));
}

async function removeMargin(){
  main.classList.add('remove-margin');
}

async function addTempDiv(){
  for(let i=0; i<50; i++){
    let container = document.createElement('div');
    container.classList.add('container');
    barContainer2.appendChild(container);

    let block = document.createElement("div");
    block.style.height = `198px`;
    block.classList.add(`cell${i+51}`);
    block.classList.add('cell');
    block.classList.add('temp-blocks');
    container.appendChild(block);

    let lebel = document.createElement('label');
    lebel.innerText = `${parseInt(block.style.height) / 2}`;
    lebel.classList.add('temp-block-lebel');
    lebel.classList.add(`lebel${i+51}`);
    container.appendChild(lebel); 
  }
}

async function getOriginalheight(){
  for(let i=1; i<=50; i++){
    const el = document.querySelector(`.cell${i}`);
    const style = window.getComputedStyle(el);
    const height = parseFloat(style.getPropertyValue("height"));
    el.style.height = `${(height / 2) * 3}px`;
  }
}

async function compare(i,j,delayTime){
  console.log("compare");
  const el1 = document.querySelector(`.cell${i}`);
  const style1 = window.getComputedStyle(el1);
  const transform1 = style1.getPropertyValue("height");
  el1.style.backgroundColor = "rgb(241, 135, 226)";
  await delay(delayTime);

  const el2 = document.querySelector(`.cell${j}`);
  const style2 = window.getComputedStyle(el2);
  const transform2 = style2.getPropertyValue("height");
  el2.style.backgroundColor = "rgb(241, 135, 226)";
  await delay(delayTime);

  if(parseInt(transform1) <= parseInt(transform2)){
    el1.style.backgroundColor = "rgb(192, 192, 255)";
    el2.style.backgroundColor = "rgb(192, 192, 255)";
    return 1;
  }
  el1.style.backgroundColor = "rgb(192, 192, 255)";
  el2.style.backgroundColor = "rgb(192, 192, 255)"; 
  return 0;
}

async function mergeUpdate(a,k,delayTime){
  console.log("uodate");
  const el1 = document.querySelector(`.cell${a}`);
  const style1 = window.getComputedStyle(el1);
  const transform1 = style1.getPropertyValue("height");
  el1.style.backgroundColor = "rgb(241, 135, 226)";
  await delay(delayTime);

  const lebel1 = document.querySelector(`.lebel${a}`);
  const lebel2 = document.querySelector(`.lebel${k}`);

  const el2 = document.querySelector(`.cell${k}`);
  el2.style.height = transform1;
  lebel2.innerHTML = lebel1.innerHTML;
  el2.style.backgroundColor = "rgb(192, 192, 255)";
}

async function mergeDiv(l,mid,h,delayTime){
  for(let i=l; i<=mid; i++){
    console.log("merge");
    const el1 = document.querySelector(`.cell${i}`);
    const style1 = window.getComputedStyle(el1)
    const transform1 = style1.getPropertyValue("height");
    el1.style.backgroundColor = "red"; 

    await  delay(delayTime);

    const el2 = document.querySelector(`.cell${i+50}`);

    const lebel1 = document.querySelector(`.lebel${i}`);
    const lebel2 = document.querySelector(`.lebel${i+50}`);

    el2.style.height = transform1;
    lebel2.innerHTML = lebel1.innerHTML;

    el1.style.backgroundColor = "transparent"; 
    el2.style.backgroundColor = "rgb(192, 192, 255)";
    //lebel2.style.backgroundColor = "rgb(0, 0, 207)";

    await  delay(delayTime);
  }
  
  for(let j=mid+1; j<=h; j++){
    console.log("me");
    const el1 = document.querySelector(`.cell${j}`);
    const style1 = window.getComputedStyle(el1)
    const transform1 = style1.getPropertyValue("height");
    el1.style.backgroundColor = "red"; 

    await  delay(delayTime);

    const el2 = document.querySelector(`.cell${j+50}`);

    const lebel1 = document.querySelector(`.lebel${j}`);
    const lebel2 = document.querySelector(`.lebel${j+50}`);

    el2.style.height = transform1;
    lebel2.innerHTML = lebel1.innerHTML;
    el1.style.backgroundColor = "transparent"; 
    el2.style.backgroundColor = "rgb(192, 192, 255)";
    // lebel2.classList.add('block-lebel');

    await  delay(delayTime);
  }

  let m = mid - l + 1;
  let n = h - mid;
  let i = l, j = mid + 1, k = l;

  while (i <= mid && j <= h){
    console.log("hello");
    if(await compare(i+50,j+50,delayTime)){
      console.log("true");
      await mergeUpdate(i+50,k,delayTime);
      i++;k++;
    }
    else{
      console.log("false");
      await mergeUpdate(j+50,k,delayTime);
      j++;k++;
    }
  }

  while(i <= mid){
    console.log("no1");
    await mergeUpdate(i+50,k,delayTime);
    i++;k++;
  }

  while(j <= h){
    console.log("no2");
    await mergeUpdate(j+50,k,delayTime);
    j++;k++;
  }
}

async function mergeSort(l,h,delayTime){
  const el1 = document.querySelector(`.cell${l}`);
  el1.style.backgroundColor = "rgb(241, 135, 226)";
  await delay(delayTime);

  const el2 = document.querySelector(`.cell${h}`);
  el2.style.backgroundColor = " rgb(241, 185, 80)";
  await delay(delayTime);

  el1.style.backgroundColor = "rgb(192, 192, 255)";
  el2.style.backgroundColor = " rgb(192, 192, 255)";

  if(l<h){
    let mid = Math.floor((l+h) / 2);
    await mergeSort(l,mid,delayTime);
    await mergeSort(mid+1,h,delayTime);
    await mergeDiv(l,mid,h,delayTime);
  }
}


async function doMergeSort(l,h,delayTime){

  array.disabled = true;
  bubble.disabled = true;
  selection.disabled = true;
  insertion.disabled = true;
  quick.disabled = true;
  merge.disabled = true;
  skip.disabled = true;

  await addTempDiv();
  await mergeSort(l,h,delayTime);
  barContainer2.innerHTML = " ";
  
  await delay(delayTime);

  main.classList.remove('remove-margin');
  await getOriginalheight();

  array.disabled = false;
  bubble.disabled = false;
  selection.disabled = false;
  insertion.disabled = false;
  quick.disabled = false;
  merge.disabled = false;
  skip.disabled = false;
}