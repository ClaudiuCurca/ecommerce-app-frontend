export const loadCart = () => {
  try {
    const serializedCart = localStorage.getItem("cart");
    if (serializedCart === null) {
      return [];
    }
    return JSON.parse(serializedCart);
  } catch (err) {
    console.log("Error loading cart from local storage");
    return [];
  }
};

export const saveCart = (cart) => {
  try {
    const serializedCart = JSON.stringify(cart);
    localStorage.setItem("cart", serializedCart);
  } catch {
    console.log("Error saving cart to local storage");
  }
};
