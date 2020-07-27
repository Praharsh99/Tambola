const synth = window.speechSynthesis;

const speakThis = (individualNumber) => {
  const utterThis = new SpeechSynthesisUtterance(individualNumber);

  utterThis.voice = synth.getVoices()[4];
  utterThis.pitch = 1;
  utterThis.rate = 0.7;
  utterThis.volume = 1;

  synth.speak(utterThis);
};

async function speak() {
  const number = document.querySelector(".number-highlight").textContent;
  const individualNumber =
    number > 9
      ? `${Math.floor(number / 10)} ${
          number % 10 ? number % 10 : "zero"
        }. ${number}`
      : `Single digit ${number}`;

  speakThis(individualNumber);
}

export default speak;
