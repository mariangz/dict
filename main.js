const $input = document.getElementById('input');
const $btn = document.querySelector('button');
const $choosenWord = document.querySelector('.choosen-word');
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
    span.textContent += ` ${word} `;
  });

  const allWords = document.querySelectorAll('.word');
  selectWord(allWords);
}

function selectWord(array) {
  array.forEach((word) => {
    word.addEventListener('click', (e) => {
      const $selectedWord = e.target;
      if ($selectedWord.textContent != $choosenWord) {
        synonyms($selectedWord.textContent);
        // $selectedWord.classList.add('selected');
        highlightChoosenWord($selectedWord.textContent);
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
    let synonyms = data[0].meanings[0].definitions[0].synonyms;
    if (synonyms) {
      synonyms = data[0].meanings[0].definitions[1].synonyms;
    }
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
    li.textContent = "sorry, we didn't find that word";
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

function highlightChoosenWord(word) {
  $choosenWord.textContent = word;
}
