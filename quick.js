const barContainer1 = document.getElementById("bar-container");

function delay(ms){
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function getPivotColor(el){
  const el1 = document.querySelector(`.cell${el}`);
  el1.style.backgroundColor = "rgb(148, 45, 148)";
}

async function getHeight(el,delayTime){
  const el1 = document.querySelector(`.cell${el}`);
  const style1 = window.getComputedStyle(el1);
  const transform1 = style1.getPropertyValue("height");
  el1.style.backgroundColor = "rgb(241, 135, 226)";
  await delay(delayTime);
  el1.style.backgroundColor = "rgb(192, 192, 255)";
  return parseInt(transform1);
}

async function quickSwap(a,b,delayTime){
  const el1 = document.querySelector(`.cell${a}`);
  const style1 = window.getComputedStyle(el1)
  const transform1 = style1.getPropertyValue("height");

  const el2 = document.querySelector(`.cell${b}`);
  const style2 = window.getComputedStyle(el2)
  const transform2 = style2.getPropertyValue("height");

  const lebel1 = document.querySelector(`.lebel${a}`);
  const lebel2 = document.querySelector(`.lebel${b}`);

  if(parseInt(transform1) > parseInt(transform2)){
    el1.style.backgroundColor = "rgb(241, 185, 80)";
    await delay(delayTime);

    el2.style.backgroundColor = "rgb(241, 185, 80)";
    await delay(delayTime);

    el1.style.height = transform2;
    el2.style.height = transform1;
    const labelTemp = lebel1.innerHTML;
    lebel1.innerHTML = lebel2.innerHTML;
    lebel2.innerHTML = labelTemp;
  }

  el1.style.backgroundColor = "rgb(192, 192, 255)";
  el2.style.backgroundColor = "rgb(192, 192, 255)";
}

async function partition(l,h,delayTime){
  let i = l+1, j=h;

  const pivot = await getHeight(l,delayTime);
  await getPivotColor(l);
  const pivotBar = document.createElement('hr');
  pivotBar.classList.add('pivot-bar');
  barContainer1.appendChild(pivotBar);
  pivotBar.style.bottom = `${pivot+15}px`;
  pivotBar.style.left = `${((l-1) * 15)}px`
  pivotBar.style.width = `${(h-l+1)*15}px`

  
  while(i<j){

    while (await getHeight(i,delayTime) <= pivot && i < h) i++;

    while (await getHeight(j,delayTime) > pivot) j--;

    if(i<j){
      await quickSwap(i, j, delayTime);
    }

  }

  await quickSwap(l, j, delayTime);

  barContainer1.removeChild(pivotBar);

  return j;
}


async function quicksort(l, h, delayTime){
  array.disabled = true;
  bubble.disabled = true;
  selection.disabled = true;
  insertion.disabled = true;
  quick.disabled = true;
  merge.disabled = true;
  skip.disabled = true;

  if(l < h){
    let j = await partition(l,h, delayTime);
    await quicksort(l,j-1, delayTime);
    await quicksort(j+1,h, delayTime);
  }

  array.disabled = false;
  bubble.disabled = false;
  selection.disabled = false;
  insertion.disabled = false;
  quick.disabled = false;
  merge.disabled = false;
  skip.disabled = false;
}

function doQuicksort(){
  quicksort(1, 50, 60).then(() => {
    console.log("Sorting completed.");
  }).catch(err => {
    console.error("Error occurred during sorting:", err);
  });
}

