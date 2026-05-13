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
        dialogue:
          "The door is locked tight. Zehava needs to find a key first.",
      },

      {
        id: "berries-1",
        image: "assets/objects/berries.png",
        x: 68,
        y: 34,
        width: 10,
        type: "neutral",
        portrait: "happy",
        dialogue: "There are a lot of berries here!",
      },

      {
        id: "berries-key",
        image: "assets/objects/berries.png",
        x: 32,
        y: 30,
        width: 12,
        type: "keyItem",
        portrait: "happy",
        dialogue:
          "The berries whisper softly... and reveal a tiny wooden key hidden under the leaves!",
      },

      {
        id: "berries-2",
        image: "assets/objects/berries.png",
        x: 61,
        y: 73,
        width: 8,
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

    bounds: {
      minX: 8,
      maxX: 92,
      minY: 33,
      maxY: 85,
    },

    objects: [
      {
        id: "front-door",
        x: 48,
        y: 95,
        width: 14,
        type: "goToScene",
        targetSceneId: "forest",
        portrait: "thinking",
        dialogue: "Zehava steps back outside into the forest.",
      },

      {
        id: "kitchen-door",
        x: 93,
        y: 48,
        width: 14,
        type: "lockedKitchen",
        portrait: "thinking",
        dialogue:
          "The kitchen door is locked. Maybe Zehava should try resting from all the walking.",
      },

      {
        id: "bedroom-door",
        x: 2,
        y: 50,
        width: 14,
        type: "lockedBedroom",
        portrait: "thinking",
        dialogue:
          "The bedroom door is locked. Zehava feels like something is missing...",
      },
    {
        id: "carpet",
        image: "assets/objects/carpet.png",
        x: 47,
        y: 65,
        width: 35,
        type: "neutral",
        portrait: "thinking",
        dialogue:
          "A cozy carpet, but it does not help Zehava continue.",
      },
      {
        id: "big-chair",
        image: "assets/objects/big-chair.png",
        x: 34,
        y: 51,
        width: 20,
        type: "wrong",
        portrait: "annoyed",
        dialogue: "This chair is much too big!",
      },

      {
        id: "small-chair",
        image: "assets/objects/small-chair.png",
        x: 50,
        y: 33,
        width: 7,
        type: "wrong",
        portrait: "annoyed",
        dialogue: "This chair is much too small!",
      },

      {
        id: "just-right-chair",
        image: "assets/objects/just-right-chair.png",
        x: 80,
        y: 72,
        width: 15,
        type: "unlockKitchen",
        portrait: "happy",
        dialogue:
          "This chair feels just right. Zehava suddenly feels a little hungry, maybe she should check the kitchen.",
      },

  

      {
        id: "window",
        x: 68,
        y: 12,
        width: 12,
        type: "neutral",
        portrait: "thinking",
        dialogue:
          "Through the window, the forest looks calm.",
      },

      {
        id: "book",
        image: "assets/objects/book.png",
        x: 43,
        y: 13,
        width: 5,
        type: "neutral",
        portrait: "thinking",
        dialogue:
          "A storybook about three bears. That feels important...",
      },
    ],
  },

  {
    id: "kitchen",
    background: "assets/backgrounds/kitchen.png",

    bounds: {
      minX: 13,
      maxX: 92,
      minY: 30,
      maxY: 88,
    },
blockedAreas: [
  {
    x: 49,
    y: 64,
    width: 40,
    height: 40,
  },
],
    objects: [
        {
  id: "kitchen-back-door",
  x: 4,
  y: 68,
  width: 14,
  type: "goToScene",
  targetSceneId: "living-room",
  portrait: "thinking",
  dialogue: "Zehava goes back to the living room.",
},
     {
        id: "dining-table",
        x: 44,
        y: 60,
        width: 30,
        type: "neutral",
        portrait: "thinking",
        dialogue:
          "A big dining table. They must have been having a meal.",
      },
      {
        id: "hot-porridge",
        image: "assets/objects/hot-porridge.png",
        x: 32,
        y: 55,
        width: 10,
          walkToX: 32,
  walkToY: 87,
        type: "wrong",
        portrait: "annoyed",
        dialogue: "Ouch! This porridge is too hot.",
      },

      {
        id: "cold-porridge",
        image: "assets/objects/cold-porridge.png",
        x: 49,
        y: 63,
        walkToX: 49,
walkToY: 87,
        width: 10,
        type: "wrong",
        portrait: "annoyed",
        dialogue: "This porridge is too cold.",
      },

      {
        id: "just-right-porridge",
        image: "assets/objects/just-right-porridge.png",
        x: 68,
        y: 57,
        walkToX: 68,
walkToY: 87,
        width: 10,
        type: "unlockBedroom",
        portrait: "happy",
        dialogue:
          "This porridge is just right. Zehava feels sleepy, maybe she should check the bedroom.",
      },

 

      {
        id: "oven",
        x: 47,
        y: 31,
        width: 14,
        type: "neutral",
        portrait: "thinking",
        dialogue:
          "The oven is warm, but there is nothing useful inside.",
      },

      {
        id: "sink",
        x: 29,
        y: 23,
        width: 12,
        type: "neutral",
        portrait: "thinking",
        dialogue:
          "A tiny sink with a few drops of water.",
      },
    ],
  },

  {
    id: "bedroom",
    background: "assets/backgrounds/bedroom.png",

    bounds: {
      minX: 8,
      maxX: 92,
      minY: 27,
      maxY: 83,
    },

    objects: [
      {
        id: "hard-bed",
        image: "assets/objects/hard-bed.png",
        x: 25,
        y: 35,
        width: 25,
        type: "wrong",
        portrait: "annoyed",
        dialogue: "This bed is too hard!",
      },

      {
        id: "soft-bed",
        image: "assets/objects/soft-bed.png",
        x: 45,
        y: 35,
        width: 23,
        type: "wrong",
        portrait: "annoyed",
        dialogue: "This bed is too soft!",
      },

      {
        id: "just-right-bed",
        image: "assets/objects/just-right-bed.png",
        x: 80,
        y: 75,
        width: 18,
        type: "correct",
        portrait: "happy",
        dialogue:
          "This bed is just right. Zehava curls up and falls asleep...",
      },
      {
        id: "lamp",
        image: "assets/objects/lamp.png",
        x: 83,
        y: 28,
        width: 15,
        type: "neutral",
        portrait: "thinking",
        dialogue:
          "This is just a regular lamp",
      },
      {
        id: "closet",
        x: 70,
        y: 22,
        width: 15,
        type: "neutral",
        portrait: "thinking",
        dialogue:
          "This is just a bear's closet, nothing special",
      },
    ],
  },

  {
    id: "end",
    background: "assets/backgrounds/end-scene.png",

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