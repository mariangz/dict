const $input = document.getElementById('input');
const $btn = document.querySelector('button');
const $result = document.getElementById('result');

$btn.addEventListener('click', convert);

function convert() {
  const array = $input.textContent.slice().split(/\b([a-z]+)\b/gi);
  const regex = /\b([a-z]+)\b/gi;
  const onlyWords = array.filter((item) => regex.test(item));

  $input.textContent = '';
  onlyWords.forEach((word) => {
    const span = document.createElement('span');
    span.classList.add('word');

    $input.appendChild(span);
    span.textContent += ` ${word}`;
  });

  const allWords = document.querySelectorAll('.word');
  chooseWord(allWords);
}

function chooseWord(array) {
  array.forEach((word) => {
    word.addEventListener('click', (e) => {
      synonyms(e.target.textContent);
    });
  });
}

async function synonyms(word) {
  const promesa = await fetch(
    `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`
  );

  const data = await promesa.json();
  const synonyms = data[0].meanings[0].definitions[0].synonyms;
  remove();
  synonyms.forEach((def) => {
    const li = document.createElement('li');
    li.textContent = def;
    $result.appendChild(li);
  });
}

function remove() {
  if ($result.firstChild) {
    while ($result.firstChild) {
      $result.removeChild($result.lastChild);
    }
  }
}
