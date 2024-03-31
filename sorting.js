let arr = [];

const barContainer = document.getElementById("bar-container");

async function createDiv(mlp){
  for(let i=0; i<50; i++){

    let container = document.createElement('div');
    // container.classList.add(`cell${i+1}-container` );
    container.classList.add('container');
    barContainer.appendChild(container);

    let block = document.createElement("div");
    block.style.height = `${arr[i] * mlp}px`;
    block.classList.add(`cell${i+1}`);
    block.classList.add('cell');
    block.classList.add('blocks');
    container.appendChild(block);

    let lebel = document.createElement('label');
    lebel.innerText = `${parseInt(block.style.height) / mlp}`;
    lebel.classList.add('block-lebel');
    lebel.classList.add(`lebel${i+1}`);
    container.appendChild(lebel);
    
    // let block = document.createElement("div");
    // block.style.height = `${arr[i] * 3}px`;
    // block.classList.add(`cell${i + 1}`);
    // block.classList.add("blocks");
    // barContainer.appendChild(block);
    
    // let label = document.createElement('label');
    // label.innerText = `${parseInt(block.style.height) / 3}`;
    // label.classList.add('block-level');
    // block.appendChild(label);
  }
}

async function removeDiv(){
  barContainer.innerHTML = " ";
}

async function getRandomNumbers(mlp){
  await removeDiv();
  arr = []; 
  for(let i=1; i<=50; i++){
    let randon = Math.floor(Math.random() * 100 +1);
    if(randon != 100) arr.push(randon);
    else i--;
  }
  await createDiv(mlp);
}

getRandomNumbers(3);



async function skipBack(mlp){
  await removeDiv();
  await createDiv(mlp);
}