import { persistentAtom } from "@nanostores/persistent";

export interface CartItem {
  id: string;
  name: string;
  slug: string;
  image: string;
  price: number;
  quantity: number;
  option?: string;
}

export const cartStore = persistentAtom<CartItem[]>("cart", [], {
  encode: JSON.stringify,
  decode: JSON.parse,
});

export function addToCart(item: CartItem) {
  const current = cartStore.get();
  const existing = current.find(
    (p) => p.id === item.id && p.option === item.option,
  );

  if (existing) {
    cartStore.set(
      current.map((p) =>
        p.id === item.id && p.option === item.option
          ? { ...p, quantity: p.quantity + item.quantity } // ← suma la quantity recibida
          : p,
      ),
    );
  } else {
    cartStore.set([...current, item]); // ← usa el item tal cual, ya trae quantity
  }
}

export function removeFromCart(id: string) {
  cartStore.set(cartStore.get().filter((p) => p.id !== id));
}

export function clearCart() {
  cartStore.set([]);
}
