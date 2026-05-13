const scenes = [
  {
    id: "forest",
    background: "assets/backgrounds/forest-house.png",
    nextSceneId: "living-room",
    bounds: {
      minX: 16,
      maxX: 92,
      minY: 20,
      maxY: 64,
    },
    objects: [
      {
        id: "door",
        x: 95,
        y: 45,
        width: 20,
        type: "lockedDoor",
        portrait: "thinking",
        dialogue: "The door is locked tight. Zehava needs to find a key first.",
      },
      {
        id: "berries",
        image: "assets/objects/berries.png",
        x: 68,
        y: 34,
        width: 20,
        type: "neutral",
        portrait: "happy",
        dialogue:"There are a lot of berries here!",
         
      },{
        id: "berries",
        image: "assets/objects/berries.png",
        x: 32,
        y: 30,
        width: 15,
        type: "keyItem",
        portrait: "happy",
        dialogue:
           "The berries whisper softly... and reveal a tiny wooden key hidden under the leaves!",
      },{
        id: "berries",
        image: "assets/objects/berries.png",
        x: 50   ,
        y: 73,
        width: 18,
        type: "neutral",
        portrait: "happy",
        dialogue:
          "Those are some good-looking berries, but Zehava is not hungry right now.",
      },
    ],
  },

  {
    id: "living-room",
    background: "assets/backgrounds/living-room.png",
    nextSceneId: "kitchen",
    bounds: {
      minX: 8,
      maxX: 92,
      minY: 45,
      maxY: 85,
    },
    objects: [
      {
        id: "big-chair",
        image: "assets/objects/big-chair.png",
        x: 28,
        y: 62,
        width: 16,
        type: "wrong",
        portrait: "annoyed",
        dialogue: "This chair is much too big!",
      },
      {
        id: "small-chair",
        image: "assets/objects/small-chair.png",
        x: 50,
        y: 66,
        width: 13,
        type: "wrong",
        portrait: "annoyed",
        dialogue: "This chair is much too small!",
      },
      {
        id: "just-right-chair",
        image: "assets/objects/just-right-chair.png",
        x: 70,
        y: 64,
        width: 14,
        type: "correct",
        portrait: "happy",
        dialogue: "This chair feels just right. Zehava wants to explore further.",
      },
      {
        id: "carpet",
        image: "assets/objects/carpet.png",
        x: 50,
        y: 82,
        width: 22,
        type: "neutral",
        portrait: "thinking",
        dialogue: "A cozy carpet, but it does not help Zehava continue.",
      },
      {
        id: "window",
        image: "assets/objects/window.png",
        x: 82,
        y: 35,
        width: 12,
        type: "neutral",
        portrait: "thinking",
        dialogue: "Through the window, the forest looks calm.",
      },
      {
        id: "book",
        image: "assets/objects/book.png",
        x: 37,
        y: 48,
        width: 8,
        type: "neutral",
        portrait: "thinking",
        dialogue: "A storybook about three bears. That feels important...",
      },
    ],
  },

  {
    id: "kitchen",
    background: "assets/backgrounds/kitchen.png",
    nextSceneId: "bedroom",
    bounds: {
      minX: 8,
      maxX: 92,
      minY: 45,
      maxY: 85,
    },
    objects: [
      {
        id: "hot-porridge",
        image: "assets/objects/hot-porridge.png",
        x: 30,
        y: 60,
        width: 10,
        type: "wrong",
        portrait: "annoyed",
        dialogue: "Ouch! This porridge is too hot.",
      },
      {
        id: "cold-porridge",
        image: "assets/objects/cold-porridge.png",
        x: 50,
        y: 60,
        width: 10,
        type: "wrong",
        portrait: "annoyed",
        dialogue: "This porridge is too cold.",
      },
      {
        id: "just-right-porridge",
        image: "assets/objects/just-right-porridge.png",
        x: 70,
        y: 60,
        width: 10,
        type: "correct",
        portrait: "happy",
        dialogue: "This porridge is just right. Zehava feels sleepy now...",
      },
      {
        id: "pot",
        image: "assets/objects/pot.png",
        x: 22,
        y: 42,
        width: 10,
        type: "neutral",
        portrait: "thinking",
        dialogue: "A big cooking pot. Someone has been making porridge.",
      },
      {
        id: "oven",
        image: "assets/objects/oven.png",
        x: 84,
        y: 55,
        width: 14,
        type: "neutral",
        portrait: "thinking",
        dialogue: "The oven is warm, but there is nothing useful inside.",
      },
      {
        id: "sink",
        image: "assets/objects/sink.png",
        x: 13,
        y: 55,
        width: 12,
        type: "neutral",
        portrait: "thinking",
        dialogue: "A tiny sink with a few drops of water.",
      },
    ],
  },

  {
    id: "bedroom",
    background: "assets/backgrounds/bedroom.png",
    nextSceneId: "end",
    bounds: {
      minX: 8,
      maxX: 92,
      minY: 45,
      maxY: 85,
    },
    objects: [
      {
        id: "hard-bed",
        image: "assets/objects/hard-bed.png",
        x: 25,
        y: 62,
        width: 18,
        type: "wrong",
        portrait: "annoyed",
        dialogue: "This bed is too hard!",
      },
      {
        id: "soft-bed",
        image: "assets/objects/soft-bed.png",
        x: 50,
        y: 62,
        width: 18,
        type: "wrong",
        portrait: "annoyed",
        dialogue: "This bed is too soft!",
      },
      {
        id: "just-right-bed",
        image: "assets/objects/just-right-bed.png",
        x: 75,
        y: 62,
        width: 18,
        type: "correct",
        portrait: "happy",
        dialogue: "This bed is just right. Zehava curls up and falls asleep...",
      },
    ],
  },

  {
    id: "end",
    background: "assets/backgrounds/end-scene.png",
    nextSceneId: null,
    bounds: {
      minX: 8,
      maxX: 92,
      minY: 45,
      maxY: 85,
    },
    objects: [
      {
        id: "sleeping-zehava",
        image: "assets/objects/sleeping-zehava.png",
        x: 50,
        y: 62,
        width: 24,
        type: "neutral",
        portrait: "thinking",
        dialogue:
          "The bears return home and find Zehava sleeping. Startled, she wakes up and runs safely back into the forest. The end.",
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
const dialoguePortrait = document.getElementById("dialoguePortrait");

const inventoryUI = document.getElementById("inventoryUI");

const dialoguePortraits = {
  happy: "assets/characters/emotes/happy.png",
  thinking: "assets/characters/emotes/thinking.png",
  annoyed: "assets/characters/emotes/annoyed.png",
};

let currentSceneIndex = 0;
let lives = 3;
let isMoving = false;
let pendingNextScene = null;
let gameOver = false;
let debugPositionEnabled = true;
let hasKey = false;

const startZehavaPosition = {
  x: 10,
  y: 70,
};

const gameOverText = "Zehava wasted too much time. Try again tomorrow morning.";

const zehavaAnimations = [
  "assets/characters/1.png",
  "assets/characters/2.png",
  "assets/characters/3.png",
  "assets/characters/4.png",
  "assets/characters/5.png",
  "assets/characters/6.png",
  "assets/characters/7.png",
  "assets/characters/8.png",
  "assets/characters/9.png",
  "assets/characters/10.png",
];

let walkAnimationInterval = null;
let currentAnimationFrame = 0;

let zehavaPosition = {
  x: startZehavaPosition.x,
  y: startZehavaPosition.y,
};

zehava.src = zehavaAnimations[0];

function showDebugPosition(x, y) {
  if (!debugPositionEnabled) {
    return;
  }

  console.log(`Clicked position: x: ${x.toFixed(1)}, y: ${y.toFixed(1)}`);
}

function startWalkAnimation(direction) {
  stopWalkAnimation();

  if (direction === "left") {
    zehava.style.transform = "translate(-50%, -50%) scaleX(-1)";
  } else {
    zehava.style.transform = "translate(-50%, -50%) scaleX(1)";
  }

  walkAnimationInterval = setInterval(() => {
    zehava.src = zehavaAnimations[currentAnimationFrame];

    currentAnimationFrame++;

    if (currentAnimationFrame >= zehavaAnimations.length) {
      currentAnimationFrame = 0;
    }
  }, 180);
}

function stopWalkAnimation() {
  clearInterval(walkAnimationInterval);

  currentAnimationFrame = 0;
  zehava.src = zehavaAnimations[0];
}

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

    if (object.image) {
      const image = document.createElement("img");

      image.src = object.image;
      image.alt = object.id;

      button.appendChild(image);
    }

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

  const targetDirection =
    clampedPosition.x >= zehavaPosition.x ? "right" : "left";

  const dx = clampedPosition.x - zehavaPosition.x;
  const dy = clampedPosition.y - zehavaPosition.y;
  const distance = Math.sqrt(dx * dx + dy * dy);

  const speed = 35; // percent-of-screen per second
  const duration = Math.max(distance / speed, 0.25);

  zehava.style.transition = `left ${duration}s linear, top ${duration}s linear`;

  startWalkAnimation(targetDirection);

  isMoving = true;

  zehava.style.left = `${clampedPosition.x}%`;
  zehava.style.top = `${clampedPosition.y}%`;

  setTimeout(() => {
    isMoving = false;

    zehavaPosition.x = clampedPosition.x;
    zehavaPosition.y = clampedPosition.y;

    stopWalkAnimation();

    if (callback) {
      callback();
    }
  }, duration * 1000);
}

function handleObjectClick(object) {
  if (gameOver) {
    return;
  }

  if (object.type === "keyItem") {
    hasKey = true;

    if (inventoryUI) {
      inventoryUI.classList.add("has-item");
    }

    showDialogue(object.dialogue, {
      isGameOver: false,
      portrait: object.portrait || "happy",
    });

    return;
  }

  if (object.type === "lockedDoor") {
    if (!hasKey) {
      showDialogue("The door is locked tight. Zehava needs to find a key first.", {
        isGameOver: false,
        portrait: "thinking",
      });

      return;
    }

    showDialogue("Zehava uses the wooden key and opens the bears' house.", {
      isGameOver: false,
      portrait: "happy",
    });

    const currentScene = scenes[currentSceneIndex];

    pendingNextScene =
      scenes.find((scene) => scene.id === currentScene.nextSceneId) || null;

    return;
  }

  showDialogue(object.dialogue, {
    isGameOver: false,
    portrait: object.portrait || "thinking",
  });

  if (object.type === "correct") {
    const currentScene = scenes[currentSceneIndex];

    pendingNextScene =
      scenes.find((scene) => scene.id === currentScene.nextSceneId) || null;
  }

  if (object.type === "wrong") {
    loseLife();
  }
}

function showDialogue(text, options = {}) {
  dialogueText.textContent = text;

  dialogueButton.textContent = options.isGameOver ? "Try Again" : "Continue";

  const portraitType = options.portrait || "thinking";
  dialoguePortrait.src = dialoguePortraits[portraitType];

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

  const nextSceneIndex = scenes.findIndex(
    (scene) => scene.id === pendingNextScene.id
  );

  if (nextSceneIndex >= 0) {
    currentSceneIndex = nextSceneIndex;
    renderScene(scenes[currentSceneIndex]);
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
    showDialogue(gameOverText, {
      isGameOver: true,
      portrait: "annoyed",
    });
  }
}

function resetSceneState() {
  pendingNextScene = null;
  gameOver = false;
  currentSceneIndex = 0;
  lives = 3;
  hasKey = false;

  if (inventoryUI) {
    inventoryUI.classList.remove("has-item");
  }

  const lifeIcons = document.querySelectorAll(".life-icon");

  lifeIcons.forEach((lifeIcon) => {
    lifeIcon.classList.remove("lost");
  });

  zehava.style.left = `${startZehavaPosition.x}%`;
  zehava.style.top = `${startZehavaPosition.y}%`;

  zehavaPosition.x = startZehavaPosition.x;
  zehavaPosition.y = startZehavaPosition.y;

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
  if (dialogueOverlay.contains(event.target)) {
    return;
  }

  if (event.target.closest(".object")) {
    return;
  }

  const rect = sceneElement.getBoundingClientRect();

  const x = ((event.clientX - rect.left) / rect.width) * 100;
  const y = ((event.clientY - rect.top) / rect.height) * 100;

  showDebugPosition(x, y);
  moveZehavaTo(x, y);
});

dialogueButton.addEventListener("click", () => {
  if (gameOver) {
    restartGame();
    return;
  }

  goToNextScene();
});

resetSceneState();