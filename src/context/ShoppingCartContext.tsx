
import { createContext, ReactNode, useContext, useState } from "react";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { toast } from "@/components/ui/use-toast";

type ShoppingCartProviderProps = {
  children: ReactNode;
};

type CartItem = {
  id: number;
  quantity: number;
};

type ShoppingCartContext = {
  getItemQuantity: (id: number) => number;
  increaseCartQuantity: (id: number) => void;
  decreaseCartQuantity: (id: number) => void;
  removeFromCart: (id: number) => void;
  cartQuantity: number;
  cartItems: CartItem[];
  clearCart: () => void;
};

const ShoppingCartContext = createContext({} as ShoppingCartContext);

export function useShoppingCart() {
  return useContext(ShoppingCartContext);
}

export function ShoppingCartProvider({ children }: ShoppingCartProviderProps) {
  const [cartItems, setCartItems] = useLocalStorage<CartItem[]>(
    "shopping-cart",
    []
  );

  const cartQuantity = cartItems.reduce(
    (quantity, item) => item.quantity + quantity,
    0
  );

  function getItemQuantity(id: number) {
    return cartItems.find(item => item.id === id)?.quantity || 0;
  }

  function increaseCartQuantity(id: number) {
    setCartItems(currItems => {
      if (currItems.find(item => item.id === id) == null) {
        toast({
          title: "Item added to cart",
          description: "Your item has been added to your cart",
        });
        return [...currItems, { id, quantity: 1 }];
      } else {
        toast({
          title: "Cart updated",
          description: "Item quantity has been increased",
        });
        return currItems.map(item => {
          if (item.id === id) {
            return { ...item, quantity: item.quantity + 1 };
          } else {
            return item;
          }
        });
      }
    });
  }

  function decreaseCartQuantity(id: number) {
    setCartItems(currItems => {
      if (currItems.find(item => item.id === id)?.quantity === 1) {
        toast({
          title: "Item removed",
          description: "Item has been removed from your cart",
        });
        return currItems.filter(item => item.id !== id);
      } else {
        toast({
          title: "Cart updated",
          description: "Item quantity has been decreased",
        });
        return currItems.map(item => {
          if (item.id === id) {
            return { ...item, quantity: item.quantity - 1 };
          } else {
            return item;
          }
        });
      }
    });
  }

  function removeFromCart(id: number) {
    setCartItems(currItems => {
      toast({
        title: "Item removed",
        description: "Item has been removed from your cart",
      });
      return currItems.filter(item => item.id !== id);
    });
  }

  function clearCart() {
    setCartItems([]);
    toast({
      title: "Cart cleared",
      description: "All items have been removed from your cart",
    });
  }

  return (
    <ShoppingCartContext.Provider
      value={{
        getItemQuantity,
        increaseCartQuantity,
        decreaseCartQuantity,
        removeFromCart,
        cartItems,
        cartQuantity,
        clearCart
      }}
    >
      {children}
    </ShoppingCartContext.Provider>
  );
}
