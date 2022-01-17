const input = document.getElementById('input');
const output = document.getElementById('output');
const btn = document.querySelector('button');
const result = document.getElementById('result');

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
    if (!!word) {
      const span = document.createElement('span');
      span.classList.add('word');
      output.appendChild(span);
      span.textContent += ` ${word}`;
      console.log(document.querySelector('span'));
    }
  });
  const allWords = document.querySelectorAll('.word');
  hover(allWords);
}

function hover(array) {
  array.forEach((word) => {
    word.addEventListener('click', (e) => {
      dictionary(e.target.textContent);
    });
  });
}

async function dictionary(word) {
  console.log(word);
  const promesa = await fetch(
    `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`
  );

  const data = await promesa.json();
  const synonyms = data[0].meanings[0].definitions[0].synonyms;
  synonyms.forEach((def) => {
    const li = document.createElement('li');
    li.textContent = def;
    result.appendChild(li);
  });
  // console.log(synonyms);
}
