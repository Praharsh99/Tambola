var synth = window.speechSynthesis;

function speak() {
  var number = document.querySelector(".number-highlight").textContent;

  var utterThis = new SpeechSynthesisUtterance(number);

  utterThis.voice = synth.getVoices()[4];
  utterThis.pitch = 1;
  utterThis.rate = 0.8;
  utterThis.volume = 1;

  synth.speak(utterThis);
}

export default speak;
