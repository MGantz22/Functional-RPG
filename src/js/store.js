export const shopOpen = (isOpen) => {
  if (isOpen) {
    document.getElementById("battleScreen").classList.add("hidden");
    document.getElementById("shopScreen").classList.remove("hidden");
  } else {
    document.getElementById("battleScreen").classList.remove("hidden");
    document.getElementById("shopScreen").classList.add("hidden");
  }
};

export const handleShop = () => {
  shopOpen(true);
};

export const closeShop = () => {
  shopOpen(false);
};