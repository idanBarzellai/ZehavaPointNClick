const scenes = [
  {
    id: "forest",
    background: "assets/backgrounds/forest-house.png",
    nextSceneId: "living-room",
    bounds: {
  minX: 8,
  maxX: 92,
  minY: 45,
  maxY: 85
},
    objects: [
      {
        id: "door",
        image: "assets/objects/door.png",
        x: 76,
        y: 52,
        width: 14,
        correct: true,
        dialogue: "The little house is quiet. Zehava wonders who lives inside..."
      },
      {
        id: "berries",
        image: "assets/objects/berries.png",
        x: 25,
        y: 72,
        width: 10,
        correct: false,
        dialogue: "Sweet berries! But Zehava is curious about the house, not the forest snacks."
      }
    ]
  },

  {
    id: "living-room",
    background: "assets/backgrounds/living-room.png",
    nextSceneId: "kitchen",
    bounds: {
  minX: 8,
  maxX: 92,
  minY: 45,
  maxY: 85
},
    objects: [
      {
        id: "big-chair",
        image: "assets/objects/big-chair.png",
        x: 28,
        y: 62,
        width: 16,
        correct: false,
        dialogue: "This chair is much too big!"
      },
      {
        id: "small-chair",
        image: "assets/objects/small-chair.png",
        x: 50,
        y: 66,
        width: 13,
        correct: false,
        dialogue: "This chair is much too small!"
      },
      {
        id: "just-right-chair",
        image: "assets/objects/just-right-chair.png",
        x: 70,
        y: 64,
        width: 14,
        correct: true,
        dialogue: "This chair feels just right. Zehava wants to explore further."
      },
      {
        id: "carpet",
        image: "assets/objects/carpet.png",
        x: 50,
        y: 82,
        width: 22,
        correct: false,
        dialogue: "A cozy carpet, but it does not help Zehava continue."
      },
      {
        id: "window",
        image: "assets/objects/window.png",
        x: 82,
        y: 35,
        width: 12,
        correct: false,
        dialogue: "Through the window, the forest looks calm."
      },
      {
        id: "book",
        image: "assets/objects/book.png",
        x: 37,
        y: 48,
        width: 8,
        correct: false,
        dialogue: "A storybook about three bears. That feels important..."
      }
    ]
  },

  {
    id: "kitchen",
    background: "assets/backgrounds/kitchen.png",
    nextSceneId: "bedroom",
    bounds: {
  minX: 8,
  maxX: 92,
  minY: 45,
  maxY: 85
},
    objects: [
      {
        id: "hot-porridge",
        image: "assets/objects/hot-porridge.png",
        x: 30,
        y: 60,
        width: 10,
        correct: false,
        dialogue: "Ouch! This porridge is too hot."
      },
      {
        id: "cold-porridge",
        image: "assets/objects/cold-porridge.png",
        x: 50,
        y: 60,
        width: 10,
        correct: false,
        dialogue: "This porridge is too cold."
      },
      {
        id: "just-right-porridge",
        image: "assets/objects/just-right-porridge.png",
        x: 70,
        y: 60,
        width: 10,
        correct: true,
        dialogue: "This porridge is just right. Zehava feels sleepy now..."
      },
      {
        id: "pot",
        image: "assets/objects/pot.png",
        x: 22,
        y: 42,
        width: 10,
        correct: false,
        dialogue: "A big cooking pot. Someone has been making porridge."
      },
      {
        id: "oven",
        image: "assets/objects/oven.png",
        x: 84,
        y: 55,
        width: 14,
        correct: false,
        dialogue: "The oven is warm, but there is nothing useful inside."
      },
      {
        id: "sink",
        image: "assets/objects/sink.png",
        x: 13,
        y: 55,
        width: 12,
        correct: false,
        dialogue: "A tiny sink with a few drops of water."
      }
    ]
  },

  {
    id: "bedroom",
    background: "assets/backgrounds/bedroom.png",
    nextSceneId: "end",
    bounds: {
  minX: 8,
  maxX: 92,
  minY: 45,
  maxY: 85
},
    objects: [
      {
        id: "hard-bed",
        image: "assets/objects/hard-bed.png",
        x: 25,
        y: 62,
        width: 18,
        correct: false,
        dialogue: "This bed is too hard!"
      },
      {
        id: "soft-bed",
        image: "assets/objects/soft-bed.png",
        x: 50,
        y: 62,
        width: 18,
        correct: false,
        dialogue: "This bed is too soft!"
      },
      {
        id: "just-right-bed",
        image: "assets/objects/just-right-bed.png",
        x: 75,
        y: 62,
        width: 18,
        correct: true,
        dialogue: "This bed is just right. Zehava curls up and falls asleep..."
      }
    ]
  },

  {
    id: "end",
    background: "assets/backgrounds/end-scene.png",
    nextSceneId: null,
    bounds: {
  minX: 8,
  maxX: 92,
  minY: 45,
  maxY: 85
},
    objects: [
      {
        id: "sleeping-zehava",
        image: "assets/objects/sleeping-zehava.png",
        x: 50,
        y: 62,
        width: 24,
        correct: false,
        dialogue: "The bears return home and find Zehava sleeping. Startled, she wakes up and runs safely back into the forest. The end."
      }
    ]
  }
];
const sceneElement = document.getElementById("scene");
const objectLayer = document.getElementById("objectLayer");

const zehava = document.getElementById("zehava");

const dialogueOverlay = document.getElementById("dialogueOverlay");
const dialogueText = document.getElementById("dialogueText");
const dialogueButton = document.getElementById("dialogueButton");
const dialoguePortrait = document.getElementById("dialoguePortrait");
const livesUI = document.getElementById("livesUI");

let currentSceneIndex = 0;

let lives = 3;

let isMoving = false;

let pendingNextScene = null;

let gameOver = false;

const startZehavaPosition = {
  x: 10,
  y: 70,
};

const gameOverText = "Zehava lost all her lives. Press Try Again to restart the story.";

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
  if (isMoving || gameOver) {
    return;
  }

  const clampedPosition = clampToSceneBounds(x, y);

  isMoving = true;

  zehava.style.left = `${clampedPosition.x}%`;
  zehava.style.top = `${clampedPosition.y}%`;

  setTimeout(() => {
    isMoving = false;

    if (callback) {
      callback();
    }
  }, 1200);
}

function handleObjectClick(object) {
  if (gameOver) {
    return;
  }

  showDialogue(object.dialogue, {
    isGameOver: false,
  });

  if (object.correct) {
    const currentScene = scenes[currentSceneIndex];
    pendingNextScene = scenes.find((scene) => scene.id === currentScene.nextSceneId) || null;
  } else {
    loseLife();
  }
}

function showDialogue(text, options = {}) {
  dialogueText.textContent = text;

  dialogueButton.textContent = options.isGameOver ? "Try Again" : "Continue";

  dialogueOverlay.classList.remove("hidden");
}

function hideDialogue() {
  dialogueOverlay.classList.add("hidden");
}

function goToNextScene() {
  if (!pendingNextScene) {
    hideDialogue();
    return;
  }

  const nextSceneIndex = scenes.findIndex((scene) => scene.id === pendingNextScene.id);

  if (nextSceneIndex >= 0) {
    currentSceneIndex = nextSceneIndex;
    renderScene(scenes[currentSceneIndex]);
    zehava.style.left = `${startZehavaPosition.x}%`;
    zehava.style.top = `${startZehavaPosition.y}%`;
  }

  pendingNextScene = null;
  hideDialogue();
}

function loseLife() {
  lives--;

  const lifeIcons = document.querySelectorAll(".life-icon");

  if (lifeIcons[lives]) {
    lifeIcons[lives].classList.add("lost");
  }

  if (lives <= 0) {
    gameOver = true;
    pendingNextScene = null;
    showDialogue(gameOverText, { isGameOver: true });
  }
}

function resetSceneState() {
  pendingNextScene = null;
  gameOver = false;
  currentSceneIndex = 0;
  lives = 3;

  const lifeIcons = document.querySelectorAll(".life-icon");

  lifeIcons.forEach((lifeIcon) => {
    lifeIcon.classList.remove("lost");
  });

  zehava.style.left = `${startZehavaPosition.x}%`;
  zehava.style.top = `${startZehavaPosition.y}%`;

  renderScene(scenes[currentSceneIndex]);
}

function restartGame() {
  resetSceneState();
  hideDialogue();
  dialogueButton.textContent = "Continue";
}
function clampToSceneBounds(x, y) {
  const currentScene = scenes[currentSceneIndex];
  const bounds = currentScene.bounds;

  if (!bounds) {
    return { x, y };
  }

  return {
    x: Math.min(Math.max(x, bounds.minX), bounds.maxX),
    y: Math.min(Math.max(y, bounds.minY), bounds.maxY),
  };
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
  if (gameOver) {
    restartGame();
    return;
  }

  goToNextScene();
  hideDialogue();
});

resetSceneState();