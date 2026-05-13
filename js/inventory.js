const inventoryUI = document.getElementById("inventoryUI");

const keyInventoryIcon =
  document.getElementById("keyInventoryIcon");

const chairInventoryIcon =
  document.getElementById("chairInventoryIcon");

const porridgeInventoryIcon =
  document.getElementById("porridgeInventoryIcon");

function showKeyInInventory() {
  keyInventoryIcon.classList.add("active");
}

function showChairInInventory() {
  chairInventoryIcon.classList.add("active");
}

function showPorridgeInInventory() {
  porridgeInventoryIcon.classList.add("active");
}

function resetInventory() {
  keyInventoryIcon.classList.remove("active");
  chairInventoryIcon.classList.remove("active");
  porridgeInventoryIcon.classList.remove("active");

  if (inventoryUI) {
    inventoryUI.classList.remove("has-item");
  }
}