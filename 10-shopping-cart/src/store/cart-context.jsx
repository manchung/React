import { createContext, useState, useReducer } from "react";
import { DUMMY_PRODUCTS } from "../dummy-products";

export const CartContext = createContext({
  items: [],
  dispatch: () => {},
});

function handleDispatch(currentCart, action) {
  if (action.type === "add") {
    return handleAddItemToCart(currentCart, ...action.payload);
  } else if (action.type === "update") {
    return handleUpdateCartItemQuantity(currentCart, ...action.payload);
  }
}

function handleAddItemToCart(currentCart, id) {
  const updatedItems = [...currentCart.items];
  const existingCartItemIndex = updatedItems.findIndex(
    (cartItem) => cartItem.id === id
  );
  const existingCartItem = updatedItems[existingCartItemIndex];

  if (existingCartItem) {
    const updatedItem = {
      ...existingCartItem,
      quantity: existingCartItem.quantity + 1,
    };
    updatedItems[existingCartItemIndex] = updatedItem;
  } else {
    const product = DUMMY_PRODUCTS.find((product) => product.id === id);
    updatedItems.push({
      id: id,
      name: product.title,
      price: product.price,
      quantity: 1,
    });
  }

  return {
    items: updatedItems,
  };
}

function handleUpdateCartItemQuantity(currentCart, productId, amount) {
  const updatedItems = [...currentCart.items];
  const updatedItemIndex = updatedItems.findIndex(
    (item) => item.id === productId
  );

  const updatedItem = {
    ...updatedItems[updatedItemIndex],
  };

  updatedItem.quantity += amount;

  if (updatedItem.quantity <= 0) {
    updatedItems.splice(updatedItemIndex, 1);
  } else {
    updatedItems[updatedItemIndex] = updatedItem;
  }

  return {
    items: updatedItems,
  };
}

export function CartContextProvider({ children }) {
  const [shoppingCart, shoppingCartDispatch] = useReducer(handleDispatch, {
    items: [],
  });

  const ctxValue = {
    items: shoppingCart.items,
    dispatch: shoppingCartDispatch,
  };

  return <CartContext value={ctxValue}>{children}</CartContext>;
}
