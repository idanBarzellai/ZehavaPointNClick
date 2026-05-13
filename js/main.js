const sceneElement = document.getElementById("scene");
const objectLayer = document.getElementById("objectLayer");

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

    button.addEventListener("click", (event) => {
      event.stopPropagation();

      moveZehavaTo(object.x, object.y + 10, () => {
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

    showDialogue(object.dialogue, {
      isGameOver: false,
      portrait: object.portrait || "happy",
    });

    return;
  }

  if (object.type === "unlockBedroom") {
    gameState.ateRightPorridge = true;
    showPorridgeInInventory();

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

    showDialogue("The kitchen door opens.", {
      isGameOver: false,
      portrait: "happy",
    });

    setPendingScene("kitchen", {
      x: 88,
      y: 55,
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

    showDialogue("The bedroom door opens.", {
      isGameOver: false,
      portrait: "happy",
    });

    setPendingScene("bedroom", {
      x: 10,
      y: 55,
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

  if (object.type === "correct") {
    const currentScene = getCurrentScene();

    setPendingScene(
      currentScene.nextSceneId,
      startZehavaPosition
    );
  }

  if (object.type === "wrong") {
    loseLife();
  }
}

function goToNextScene() {
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
  resetSceneState();
  hideDialogue();
  dialogueButton.textContent = "Continue";
}

sceneElement.addEventListener("click", (event) => {
  if (isDialogueClick(event.target)) {
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
  if (gameState.gameOver) {
    restartGame();
    return;
  }

  goToNextScene();
});

resetSceneState();