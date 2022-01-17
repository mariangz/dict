const input = document.getElementById('input');
const output = document.getElementById('output');
const btn = document.querySelector('button');

//input.addEventListener('input', convert);
btn.addEventListener('click', convert);
//btn.addEventListener('click', hover);

function copy() {
  output.textContent = input.value;
  //console.log(output.textContent)
}

function convert() {
  const array = input.value.slice().split(' ');
  array.forEach((word) => {
    //console.log(word)
    const span = document.createElement('span');
    span.classList.add('w');
    output.appendChild(span);
    span.textContent += ` ${word}`;
    console.log(document.querySelector('span'));
  });
  const allWords = document.querySelectorAll('w');
}

function hover(array) {
  //console.log("halo")
  array.forEach((word) => console.log(word));
}
