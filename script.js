// let voices = [];
// speechSynthesis.addEventListener('voiceschanged', function () {
//   voices = speechSynthesis.getVoices();
//   for (let i = 0; i < voices.length; i++) {
//     const element = voices[i];
//     console.log(element.name);
//   }
// })

// Raccolgo dalla pagina gli elementi che mi servono
const textArea = document.querySelector('textarea');
const playButton = document.querySelector('button');
const pitchBar = document.querySelector('input');
const duckFigure = document.querySelector('figure');

let interactionEvent;
if('ontouch' in document.documentElement) {
    interactionEvent = 'touch'; 
} else {
    interactionEvent = 'click';
}

// Se qualcuno clicca il bottone, fa' quello che ti dico.
playButton.addEventListener(interactionEvent, function () {
  const textLength = textArea.value.trim().length;
  if (textLength > 0) {
    // allora fa' parlare la paperella!
    talk();
  }
});

// Preparo una funzione per far parlare la paperella
function talk() {
  // 1 - Recuperiamo tono di voce e testo
  const text = textArea.value;
  const pitch = pitchBar.value;

  // 2 - Preparo una frase per il Sintetizzatore vocale
  const utterance = new SpeechSynthesisUtterance(text);

  // 3 - specifichiamo altri dettagli della frase
  utterance.volume = 1;
  utterance.rate = 1;
  utterance.pitch = pitch;

  // const femaleVoice = voices.find(function (voice) {
  //   if (voice.name.includes('Elsa') || voice.name.includes('Federica')) {
  //     return true;
  //   } else {window.alert("NOME MANCANTE");}
  // });

  // utterance.voice = femaleVoice;

  // facciamo parlare la paperella
  speechSynthesis.speak(utterance);

  // Quando la paperella inizia a parlare..
  utterance.addEventListener('start', function () {
    // Blocco tutti i controlli
    textArea.disabled = true;
    pitchBar.disabled = true;
    playButton.disabled = true;

    // animiamo la paperella
    duckFigure.classList.add('talking');
  });

  // Quando la paperella finisce di parlare..
  utterance.addEventListener('end', function () {
    // Blocco tutti i controlli
    textArea.disabled = false;
    pitchBar.disabled = false;
    playButton.disabled = false;

    // Riportiamo la paperella statica
    duckFigure.classList.remove('talking');
  })

}