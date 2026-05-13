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

  const target = clampToSceneBounds(x, y);

  const path = findWalkPath(
    zehavaPosition.x,
    zehavaPosition.y,
    target.x,
    target.y
  );

  walkPath(path, callback);
}

function setZehavaPosition(x, y) {
  stopWalkAnimation();

  gameState.isMoving = false;

  zehavaPosition.x = x;
  zehavaPosition.y = y;

  zehava.style.transition = "none";

  zehava.style.left = `${x}%`;
  zehava.style.top = `${y}%`;

  zehava.offsetHeight;

  zehava.style.transition = "";
}
function isInsideBlockedArea(x, y) {
  const currentScene = scenes[gameState.currentSceneIndex];

  if (!currentScene.blockedAreas) {
    return false;
  }

  return currentScene.blockedAreas.some((area) => {
    const left = area.x - area.width / 2;
    const right = area.x + area.width / 2;
    const top = area.y - area.height / 2;
    const bottom = area.y + area.height / 2;

    return x >= left && x <= right && y >= top && y <= bottom;
  });
}

function clampOutsideBlockedArea(x, y) {
  const currentScene = scenes[gameState.currentSceneIndex];

  if (!currentScene.blockedAreas) {
    return { x, y };
  }

  let result = { x, y };

  currentScene.blockedAreas.forEach((area) => {
    const left = area.x - area.width / 2;
    const right = area.x + area.width / 2;
    const top = area.y - area.height / 2;
    const bottom = area.y + area.height / 2;

    const isInside =
      result.x >= left &&
      result.x <= right &&
      result.y >= top &&
      result.y <= bottom;

    if (!isInside) return;

    const distanceToLeft = Math.abs(result.x - left);
    const distanceToRight = Math.abs(result.x - right);
    const distanceToTop = Math.abs(result.y - top);
    const distanceToBottom = Math.abs(result.y - bottom);

    const minDistance = Math.min(
      distanceToLeft,
      distanceToRight,
      distanceToTop,
      distanceToBottom
    );

    if (minDistance === distanceToLeft) {
      result.x = left;
    } else if (minDistance === distanceToRight) {
      result.x = right;
    } else if (minDistance === distanceToTop) {
      result.y = top;
    } else {
      result.y = bottom;
    }
  });

  return result;
}

function clampMovementPathAroundBlockedArea(startX, startY, targetX, targetY) {
  const currentScene = scenes[gameState.currentSceneIndex];

  if (!currentScene.blockedAreas) {
    return { x: targetX, y: targetY };
  }

  let result = { x: targetX, y: targetY };

  currentScene.blockedAreas.forEach((area) => {
    const padding = area.padding || 2;

    const left = area.x - area.width / 2 - padding;
    const right = area.x + area.width / 2 + padding;
    const top = area.y - area.height / 2 - padding;
    const bottom = area.y + area.height / 2 + padding;

    const steps = 100;

    for (let i = 1; i <= steps; i++) {
      const t = i / steps;

      const checkX = startX + (targetX - startX) * t;
      const checkY = startY + (targetY - startY) * t;

      const isInside =
        checkX >= left &&
        checkX <= right &&
        checkY >= top &&
        checkY <= bottom;

      if (isInside) {
        const previousT = (i - 1) / steps;

        result = {
          x: startX + (targetX - startX) * previousT,
          y: startY + (targetY - startY) * previousT,
        };

        return;
      }
    }
  });

  return result;
}

function walkPath(path, callback) {
  if (!path || path.length === 0) {
    return;
  }

  gameState.isMoving = true;

  let index = 0;

  function walkNextPoint() {
    const target = path[index];

    const targetDirection =
      target.x >= zehavaPosition.x ? "right" : "left";

    const dx = target.x - zehavaPosition.x;
    const dy = target.y - zehavaPosition.y;

    const distance = Math.sqrt(dx * dx + dy * dy);
    const speed = 35;
    const duration = Math.max(distance / speed, 0.25);

    zehava.style.transition =
      `left ${duration}s linear, top ${duration}s linear`;

    startWalkAnimation(targetDirection);

    zehava.style.left = `${target.x}%`;
    zehava.style.top = `${target.y}%`;

    setTimeout(() => {
      zehavaPosition.x = target.x;
      zehavaPosition.y = target.y;

      index++;

      if (index < path.length) {
        walkNextPoint();
        return;
      }

      gameState.isMoving = false;
      stopWalkAnimation();

      if (callback) {
        callback();
      }
    }, duration * 1000);
  }

  walkNextPoint();
}

function findWalkPath(startX, startY, targetX, targetY) {
  const currentScene = scenes[gameState.currentSceneIndex];

  if (!currentScene.blockedAreas) {
    return [{ x: targetX, y: targetY }];
  }

  const directPathBlocked = doesLineTouchBlockedArea(
    startX,
    startY,
    targetX,
    targetY
  );

  if (!directPathBlocked) {
    return [{ x: targetX, y: targetY }];
  }

  for (const area of currentScene.blockedAreas) {
    const padding = area.padding || 4;

    const left = area.x - area.width / 2 - padding;
    const right = area.x + area.width / 2 + padding;
    const top = area.y - area.height / 2 - padding;
    const bottom = area.y + area.height / 2 + padding;

    const possiblePaths = [
      [
        { x: startX, y: top },
        { x: targetX, y: top },
        { x: targetX, y: targetY },
      ],
      [
        { x: startX, y: bottom },
        { x: targetX, y: bottom },
        { x: targetX, y: targetY },
      ],
      [
        { x: left, y: startY },
        { x: left, y: targetY },
        { x: targetX, y: targetY },
      ],
      [
        { x: right, y: startY },
        { x: right, y: targetY },
        { x: targetX, y: targetY },
      ],
    ];

    const validPath = possiblePaths.find((path) =>
      isPathClear(path)
    );

    if (validPath) {
      return validPath.map((point) =>
        clampToSceneBounds(point.x, point.y)
      );
    }
  }

  return [];
}
function isPathClear(path) {
  let currentX = zehavaPosition.x;
  let currentY = zehavaPosition.y;

  for (const point of path) {
    if (
      doesLineTouchBlockedArea(
        currentX,
        currentY,
        point.x,
        point.y
      )
    ) {
      return false;
    }

    currentX = point.x;
    currentY = point.y;
  }

  return true;
}
function doesLineTouchBlockedArea(startX, startY, endX, endY) {
  const currentScene = scenes[gameState.currentSceneIndex];

  if (!currentScene.blockedAreas) {
    return false;
  }

  const steps = 100;

  for (let i = 0; i < steps; i++) {
    const t = i / steps;

    const x = startX + (endX - startX) * t;
    const y = startY + (endY - startY) * t;

    if (isInsideBlockedArea(x, y)) {
      return true;
    }
  }

  return false;
}