const gameState = {
  currentSceneIndex: 0,

  lives: 3,

  isMoving: false,

  pendingNextScene: null,

  gameOver: false,

  debugPositionEnabled: true,

  hasKey: false,

  satOnRightChair: false,

  ateRightPorridge: false,
};

const startZehavaPosition = {
  x: 10,
  y: 70,
};

const gameOverText =
  "Zehava wasted too much time. Try again tomorrow morning.";