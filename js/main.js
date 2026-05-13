const sceneElement = document.getElementById("scene");
const objectLayer = document.getElementById("objectLayer");
const endingOverlay = document.getElementById("endingOverlay");
const creditsImage = document.getElementById("creditsImage");
const prologueOverlay = document.getElementById("prologueOverlay");
const creditsRestartButton = document.getElementById("creditsRestartButton");

function showDebugPosition(x, y) {
  if (!gameState.debugPositionEnabled) {
    return;
  }

  console.log(`Clicked position: x: ${x.toFixed(1)}, y: ${y.toFixed(1)}`);
}

function getCurrentScene() {
  return scenes[gameState.currentSceneIndex];
}

function setPendingScene(sceneId, spawn = startZehavaPosition) {
  gameState.pendingNextScene = {
    scene: scenes.find((scene) => scene.id === sceneId),
    spawn: spawn,
  };
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
  startBackgroundMusic();
  playInteractSound();

    button.addEventListener("click", (event) => {
    playInteractSound();

      event.stopPropagation();

     const walkToX = object.walkToX ?? object.x;
const walkToY = object.walkToY ?? object.y + 10;

moveZehavaTo(walkToX, walkToY, () => {
  handleObjectClick(object);
});
    });

    objectLayer.appendChild(button);
  });
}

function handleObjectClick(object) {
  if (gameState.gameOver) {
    return;
  }

  if (object.type === "keyItem") {
    gameState.hasKey = true;
    showKeyInInventory();
      playCorrectSound();


    showDialogue(object.dialogue, {
      isGameOver: false,
      portrait: object.portrait || "happy",
    });

    return;
  }

  if (object.type === "lockedDoor") {
    if (!gameState.hasKey) {
      showDialogue("The door is locked tight. Zehava needs to find a key first.", {
        isGameOver: false,
        portrait: "thinking",
      });

      return;
    }
gameState.hasKey = false;
hideProgressInventory();
    showDialogue("Zehava uses the wooden key and opens the bears' house.", {
      isGameOver: false,
      portrait: "happy",
    });
    

    setPendingScene("living-room", {
      x: 48,
      y: 82,
    });

    return;
  }

  if (object.type === "unlockKitchen") {
    gameState.satOnRightChair = true;
    showChairInInventory();
  playCorrectSound();

    showDialogue(object.dialogue, {
      isGameOver: false,
      portrait: object.portrait || "happy",
    });

    return;
  }

  if (object.type === "unlockBedroom") {
    gameState.ateRightPorridge = true;
    showPorridgeInInventory();
  playCorrectSound();

    showDialogue(object.dialogue, {
      isGameOver: false,
      portrait: object.portrait || "happy",
    });

    return;
  }

  if (object.type === "lockedKitchen") {
    if (!gameState.satOnRightChair) {
      showDialogue(object.dialogue, {
        isGameOver: false,
        portrait: "thinking",
      });

      return;
    }
playCorrectSound();

    showDialogue("The kitchen door opens.", {
      isGameOver: false,
      portrait: "happy",
    });

    setPendingScene("kitchen", {
      x: 11,
      y: 70,
    });

    return;
  }

  if (object.type === "lockedBedroom") {
    if (!gameState.ateRightPorridge) {
      showDialogue(object.dialogue, {
        isGameOver: false,
        portrait: "thinking",
      });

      return;
    }
playCorrectSound();

    showDialogue("The bedroom door opens.", {
      isGameOver: false,
      portrait: "happy",
    });

    setPendingScene("bedroom", {
      x: 89,
      y: 50,
    });

    return;
  }

  if (object.type === "goToScene") {
    showDialogue(object.dialogue, {
      isGameOver: false,
      portrait: object.portrait || "thinking",
    });

    setPendingScene(object.targetSceneId, {
      x: 84,
      y: 55,
    });

    return;
  }

  showDialogue(object.dialogue, {
    isGameOver: false,
    portrait: object.portrait || "thinking",
  });

  if (object.id === "just-right-bed") {
  playCorrectSound();
  showBedInInventory();

  showDialogue("Then she fell into a deep sleep...", {
    isGameOver: false,
    portrait: "happy",
  });

  gameState.pendingNextScene = {
    scene: null,
    isEnding: true,
  };

  return;
}

  if (object.type === "correct") {
      playCorrectSound();

    const currentScene = getCurrentScene();

    setPendingScene(
      currentScene.nextSceneId,
      startZehavaPosition
    );
  }

  if (object.type === "wrong") {
      playWrongSound();

    loseLife();
  }

  
}

function goToNextScene() {
  if (
    gameState.pendingNextScene &&
    gameState.pendingNextScene.isEnding
  ) {
    hideDialogue();
    gameState.pendingNextScene = null;
    startEndingSequence();
    return;
  }

  if (!gameState.pendingNextScene) {
    hideDialogue();
    return;
  }

  const nextScene = gameState.pendingNextScene.scene;

  if (!nextScene) {
    hideDialogue();
    gameState.pendingNextScene = null;
    return;
  }

  const nextSceneIndex = scenes.findIndex(
    (scene) => scene.id === nextScene.id
  );

  if (nextSceneIndex >= 0) {
    gameState.currentSceneIndex = nextSceneIndex;

    renderScene(scenes[gameState.currentSceneIndex]);

    const spawn =
      gameState.pendingNextScene.spawn || startZehavaPosition;

    setZehavaPosition(spawn.x, spawn.y);
  }

  gameState.pendingNextScene = null;
  hideDialogue();
}

function loseLife() {
  gameState.lives--;

  const lifeIcons = document.querySelectorAll(".life-icon");

  if (lifeIcons[gameState.lives]) {
    lifeIcons[gameState.lives].classList.add("lost");
  }

  if (gameState.lives <= 0) {
    gameState.gameOver = true;
    gameState.pendingNextScene = null;

    showDialogue(gameOverText, {
      isGameOver: true,
      portrait: "annoyed",
    });
  }
}

function resetSceneState() {
  gameState.pendingNextScene = null;
  gameState.gameOver = false;
  gameState.currentSceneIndex = 0;
  gameState.lives = 3;

  gameState.hasKey = false;
  gameState.satOnRightChair = false;
  gameState.ateRightPorridge = false;

  resetInventory();

  const lifeIcons = document.querySelectorAll(".life-icon");

  lifeIcons.forEach((lifeIcon) => {
    lifeIcon.classList.remove("lost");
  });

  setZehavaPosition(
    startZehavaPosition.x,
    startZehavaPosition.y
  );

  renderScene(scenes[gameState.currentSceneIndex]);
}

function restartGame() {
  endingOverlay.classList.add("hidden");
  endingOverlay.classList.remove("visible");

  creditsImage.classList.remove("visible");
  creditsRestartButton.classList.remove("visible");

  resetSceneState();
  hideDialogue();
  dialogueButton.textContent = "Continue";
}

function startEndingSequence() {
  gameState.gameOver = true;

  endingOverlay.classList.remove("hidden");

  setTimeout(() => {
    endingOverlay.classList.add("visible");
  }, 50);

  setTimeout(() => {
    creditsImage.classList.add("visible");
  }, 2500);

  setTimeout(() => {
    creditsRestartButton.classList.add("visible");
  }, 2500);
}

sceneElement.addEventListener("click", (event) => {

  if (isDialogueClick(event.target)) {
    return;
  }
    playInteractSound();

  if (event.target.closest(".object")) {
    return;
  }

  const rect = sceneElement.getBoundingClientRect();

  const x = ((event.clientX - rect.left) / rect.width) * 100;
  const y = ((event.clientY - rect.top) / rect.height) * 100;

  showDebugPosition(x, y);
  startBackgroundMusic();
  moveZehavaTo(x, y);
});

dialogueButton.addEventListener("click", () => {
  if (gameState.gameOver) {
    restartGame();
    return;
  }

  goToNextScene();
});

resetSceneState();
creditsRestartButton.addEventListener("click", () => {
  restartGame();
});

setTimeout(() => {
  prologueOverlay.classList.add("hidden");
}, 2000);

setTimeout(() => {
  prologueOverlay.remove();
}, 4200);
