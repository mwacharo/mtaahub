import { createContext, useContext, useEffect, useState } from "react";

// ✅ create context
const CartContext = createContext();

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [cartToken, setCartToken] = useState(null);
  const [vendorToken] = useState(import.meta.env.VITE_VENDOR_TOKEN || null);

  // ✅ Initialize cart and token from localStorage on mount
  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem("cartItems")) || [];
    const savedToken =
      localStorage.getItem("cart_token") ||
      crypto.randomUUID(); // create new if not existing

    setCartItems(savedCart);
    setCartToken(savedToken);

    // Save token if new
    localStorage.setItem("cart_token", savedToken);
  }, []);

  // ✅ Persist cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  // ✅ Add item to cart
  const addToCart = (product) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === product.id);

      if (existingItem) {
        return prevItems.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      return [...prevItems, { ...product, quantity: 1 }];
    });
  };

  // ✅ Remove item
  const removeFromCart = (productId) => {
    setCartItems((prevItems) =>
      prevItems.filter((item) => item.id !== productId)
    );
  };

  // ✅ Update quantity
  const updateQuantity = (productId, quantity) => {
    if (quantity < 1) {
      removeFromCart(productId);
      return;
    }

    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === productId ? { ...item, quantity } : item
      )
    );
  };

  // ✅ Clear cart
  const clearCart = () => {
    setCartItems([]);
    localStorage.removeItem("cartItems");
  };

  // ✅ Compute totals
  const getCartTotal = () => {
    return cartItems.reduce((total, item) => {
      const price =
        typeof item.price === "string"
          ? parseFloat(item.price.replace(/[^\d.]/g, ""))
          : item.price || 0;
      return total + price * item.quantity;
    }, 0);
  };

  const getCartCount = () => {
    return cartItems.reduce((count, item) => count + item.quantity, 0);
  };

  // ✅ Expose vendor_id + cart_token for backend API
  const getCartMetadata = () => ({
    cart_token: cartToken,
    vendor_token: vendorToken,
  });

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        getCartTotal,
        getCartCount,
        getCartMetadata, // exposes tokens
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
