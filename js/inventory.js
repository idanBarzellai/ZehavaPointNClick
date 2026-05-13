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
  bedInventoryIcon.classList.remove("active");

  if (inventoryUI) {
    inventoryUI.classList.remove("has-item");
  }
}

const bedInventoryIcon =
  document.getElementById("bedInventoryIcon");

function hideKeyInInventory() {
  keyInventoryIcon.classList.remove("active");
}

function showBedInInventory() {
  bedInventoryIcon.classList.add("active");
}