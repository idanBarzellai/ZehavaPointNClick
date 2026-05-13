const dialogueOverlay = document.getElementById("dialogueOverlay");
const dialogueText = document.getElementById("dialogueText");
const dialogueButton = document.getElementById("dialogueButton");
const dialoguePortrait = document.getElementById("dialoguePortrait");

const dialoguePortraits = {
  happy: "assets/characters/emotes/happy.png",
  thinking: "assets/characters/emotes/thinking.png",
  annoyed: "assets/characters/emotes/annoyed.png",
};

function showDialogue(text, options = {}) {
  dialogueText.textContent = text;

  dialogueButton.textContent =
    options.isGameOver ? "Try Again" : "Continue";

  const portraitType = options.portrait || "thinking";

  dialoguePortrait.src = dialoguePortraits[portraitType];

  dialogueOverlay.classList.remove("hidden");
}

function hideDialogue() {
  dialogueOverlay.classList.add("hidden");
}

function isDialogueClick(target) {
  return dialogueOverlay.contains(target);
}