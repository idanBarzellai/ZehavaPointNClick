const inventoryUI = document.getElementById("inventoryUI");

const progressInventoryIcon =
  document.getElementById("progressInventoryIcon");

const porridgeInventoryIcon =
  document.getElementById("porridgeInventoryIcon");

const bedInventoryIcon =
  document.getElementById("bedInventoryIcon");

function showKeyInInventory() {
  progressInventoryIcon.src =
    "assets/objects/wooden-key.png";

  progressInventoryIcon.classList.add("active");
}

function showChairInInventory() {
  progressInventoryIcon.src =
    "assets/objects/just-right-chair.png";

  progressInventoryIcon.classList.add("active");
}

function hideProgressInventory() {
  progressInventoryIcon.classList.remove("active");
}

function showPorridgeInInventory() {
  porridgeInventoryIcon.classList.add("active");
}

function showBedInInventory() {
  bedInventoryIcon.classList.add("active");
}

function resetInventory() {
  progressInventoryIcon.classList.remove("active");
  porridgeInventoryIcon.classList.remove("active");
  bedInventoryIcon.classList.remove("active");

  progressInventoryIcon.src =
    "assets/objects/wooden-key.png";

  if (inventoryUI) {
    inventoryUI.classList.remove("has-item");
  }
}