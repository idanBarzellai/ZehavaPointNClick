const zehava = document.getElementById("zehava");

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

function startWalkAnimation(direction) {
  stopWalkAnimation();

  if (direction === "left") {
    zehava.style.transform =
      "translate(-50%, -50%) scaleX(-1)";
  } else {
    zehava.style.transform =
      "translate(-50%, -50%) scaleX(1)";
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

function clampToSceneBounds(x, y) {
  const currentScene =
    scenes[gameState.currentSceneIndex];

  const bounds = currentScene.bounds;

  if (!bounds) {
    return { x, y };
  }

  return {
    x: Math.min(
      Math.max(x, bounds.minX),
      bounds.maxX
    ),

    y: Math.min(
      Math.max(y, bounds.minY),
      bounds.maxY
    ),
  };
}

function moveZehavaTo(x, y, callback) {
  if (gameState.isMoving || gameState.gameOver) {
    return;
  }

  const clampedPosition =
    clampToSceneBounds(x, y);

  const targetDirection =
    clampedPosition.x >= zehavaPosition.x
      ? "right"
      : "left";

  const dx =
    clampedPosition.x - zehavaPosition.x;

  const dy =
    clampedPosition.y - zehavaPosition.y;

  const distance = Math.sqrt(dx * dx + dy * dy);

  const speed = 35;

  const duration = Math.max(
    distance / speed,
    0.25
  );

  zehava.style.transition =
    `left ${duration}s linear, top ${duration}s linear`;

  startWalkAnimation(targetDirection);

  gameState.isMoving = true;

  zehava.style.left =
    `${clampedPosition.x}%`;

  zehava.style.top =
    `${clampedPosition.y}%`;

  setTimeout(() => {
    gameState.isMoving = false;

    zehavaPosition.x = clampedPosition.x;
    zehavaPosition.y = clampedPosition.y;

    stopWalkAnimation();

    if (callback) {
      callback();
    }
  }, duration * 1000);
}

function setZehavaPosition(x, y) {
  zehavaPosition.x = x;
  zehavaPosition.y = y;

  zehava.style.left = `${x}%`;
  zehava.style.top = `${y}%`;
}