const $input = document.getElementById('input');
const $btn = document.querySelector('button');
const $chosenWord = document.querySelector('.choosen-word');
const $result = document.getElementById('result');

$btn.addEventListener('click', convert);

function convert() {
  const regex = /\b([a-z]+)\b/gi;
  const text = $input.textContent.slice().split(regex);
  const onlyWords = text.filter((item) => regex.test(item));

  $input.textContent = '';
  onlyWords.forEach((word) => {
    const span = document.createElement('span');
    span.classList.add('word');

    $input.appendChild(span);
    span.textContent += ` ${word} `;
  });

  const allWords = document.querySelectorAll('.word');
  selectWord(allWords);
}

function selectWord(array) {
  array.forEach((word) => {
    word.addEventListener('click', (e) => {
      const $selectedWord = e.target;
      if ($selectedWord.textContent != $chosenWord) {
        synonyms($selectedWord.textContent);
        // $selectedWord.classList.add('selected');
        highlightChosenWord($selectedWord.textContent);
      }
    });
  });
}

async function synonyms(word) {
  try {
    const promesa = await fetch(
      `https://api.dictionaryapi.dev/api/v2/entries/en/${word.trim()}`
    );

    const data = await promesa.json();
    const synonyms = data.reduce((arr, obj) => {
      obj.meanings[0].definitions.forEach((obj) => arr.push(...obj.synonyms));
      return arr;
    }, []);

    remove();
    synonyms.forEach((def, index) => {
      if (index < 5) {
        const li = document.createElement('li');
        li.textContent = def;
        $result.appendChild(li);
      }
    });
  } catch (error) {
    remove();
    const li = document.createElement('li');
    li.textContent = 'not found';
    $result.appendChild(li);
  }
}

function remove() {
  if ($result.firstChild) {
    while ($result.firstChild) {
      $result.removeChild($result.lastChild);
    }
  }
}

function highlightChosenWord(word) {
  $chosenWord.textContent = word;
}
