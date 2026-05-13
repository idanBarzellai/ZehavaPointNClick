const scenes = [
  {
    id: "forest",
    background: "assets/backgrounds/forest-house.png",

    objects: [
      {
        id: "door",
        image: "assets/objects/door.png",

        x: 70,
        y: 45,
        width: 18,

        correct: true,

        dialogue:
          "The bears' house looks quiet. Maybe Zehava should go inside...",
      },

      {
        id: "berries",
        image: "assets/objects/berries.png",

        x: 25,
        y: 70,
        width: 10,

        correct: false,

        dialogue:
          "These berries look tasty, but Zehava did not come here for snacks.",
      },
    ],
  },
];

const sceneElement = document.getElementById("scene");
const objectLayer = document.getElementById("objectLayer");

const zehava = document.getElementById("zehava");

const dialogueOverlay = document.getElementById("dialogueOverlay");
const dialogueText = document.getElementById("dialogueText");
const dialogueButton = document.getElementById("dialogueButton");

let currentSceneIndex = 0;

let lives = 3;

let isMoving = false;

function renderScene(scene) {
  sceneElement.style.backgroundImage = `url('${scene.background}')`;

  objectLayer.innerHTML = "";

  scene.objects.forEach((object) => {
    const button = document.createElement("button");

    button.type = "button";
    button.className = "object";

    button.style.left = `${object.x}%`;
    button.style.top = `${object.y}%`;

    button.style.width = `${object.width}%`;
    button.style.height = `${object.width}%`;

    button.setAttribute("aria-label", object.id);

    const image = document.createElement("img");

    image.src = object.image;
    image.alt = object.id;

    button.appendChild(image);

    button.addEventListener("click", (event) => {
      event.stopPropagation();

      moveZehavaTo(object.x, object.y + 10, () => {
        handleObjectClick(object);
      });
    });

    objectLayer.appendChild(button);
  });
}

function moveZehavaTo(x, y, callback) {
  if (isMoving) {
    return;
  }

  isMoving = true;

  zehava.style.left = `${x}%`;
  zehava.style.top = `${y}%`;

  setTimeout(() => {
    isMoving = false;

    if (callback) {
      callback();
    }
  }, 1200);
}

function handleObjectClick(object) {
  showDialogue(object.dialogue);

  if (object.correct) {
    console.log("Correct item clicked");
  } else {
    loseLife();
  }
}

function showDialogue(text) {
  dialogueText.textContent = text;

  dialogueOverlay.classList.remove("hidden");
}

function hideDialogue() {
  dialogueOverlay.classList.add("hidden");
}

function loseLife() {
  lives--;

  const lifeIcons = document.querySelectorAll(".life-icon");

  if (lifeIcons[lives]) {
    lifeIcons[lives].classList.add("lost");
  }

  if (lives <= 0) {
    showDialogue(
      "Zehava made too many wrong choices. The bears will find her!"
    );
  }
}

sceneElement.addEventListener("click", (event) => {
  if (event.target.closest(".object")) {
    return;
  }

  const rect = sceneElement.getBoundingClientRect();

  const x = ((event.clientX - rect.left) / rect.width) * 100;

  const y = ((event.clientY - rect.top) / rect.height) * 100;

  moveZehavaTo(x, y);
});

dialogueButton.addEventListener("click", () => {
  hideDialogue();
});

renderScene(scenes[currentSceneIndex]);