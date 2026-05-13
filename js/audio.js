const audio = {
  music: new Audio("assets/audio/background-music.mp3"),
  interact: new Audio("assets/audio/click.wav"),
  correct: new Audio("assets/audio/correct.mp3"),
  wrong: new Audio("assets/audio/wrong.wav"),
};

audio.music.loop = true;
audio.music.volume = 0.35;

audio.interact.volume = 0.6;
audio.correct.volume = 0.7;
audio.wrong.volume = 0.7;

let musicStarted = false;

function playSound(sound) {
  sound.currentTime = 0;
  sound.play().catch(() => {});
}

function startBackgroundMusic() {
  if (musicStarted) return;

  musicStarted = true;
  audio.music.play().catch(() => {
    musicStarted = false;
  });
}

function playInteractSound() {
  playSound(audio.interact);
}

function playCorrectSound() {
  playSound(audio.correct);
}

function playWrongSound() {
  playSound(audio.wrong);
}