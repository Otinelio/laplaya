import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { MenuItem } from "./data";

export type CartItem = { item: MenuItem; qty: number };

type CartState = {
  items: CartItem[];
  add: (item: MenuItem) => void;
  remove: (id: string) => void;
  inc: (id: string) => void;
  dec: (id: string) => void;
  clear: () => void;
  total: () => number;
};

export const useCart = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      add: (item) =>
        set((s) => {
          const existing = s.items.find((i) => i.item.id === item.id);
          if (existing) {
            return { items: s.items.map((i) => (i.item.id === item.id ? { ...i, qty: i.qty + 1 } : i)) };
          }
          return { items: [...s.items, { item, qty: 1 }] };
        }),
      remove: (id) => set((s) => ({ items: s.items.filter((i) => i.item.id !== id) })),
      inc: (id) => set((s) => ({ items: s.items.map((i) => (i.item.id === id ? { ...i, qty: i.qty + 1 } : i)) })),
      dec: (id) =>
        set((s) => ({
          items: s.items
            .map((i) => (i.item.id === id ? { ...i, qty: i.qty - 1 } : i))
            .filter((i) => i.qty > 0),
        })),
      clear: () => set({ items: [] }),
      total: () => get().items.reduce((sum, i) => sum + i.item.price * i.qty, 0),
    }),
    { name: "laPlaya_cart" },
  ),
);

export type OrderStatus = "En attente" | "En préparation" | "Livré";

export type Order = {
  id: string;
  spotId: string;
  items: { name: string; price: number; qty: number }[];
  total: number;
  name: string;
  time: number;
  status: OrderStatus;
};

const ORDERS_KEY = "laPlaya_orders";

export function loadOrders(): Order[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(ORDERS_KEY);
    return raw ? (JSON.parse(raw) as Order[]) : [];
  } catch {
    return [];
  }
}

export function saveOrders(orders: Order[]) {
  if (typeof window === "undefined") return;
  localStorage.setItem(ORDERS_KEY, JSON.stringify(orders));
}

export function addOrder(order: Order) {
  const orders = loadOrders();
  orders.unshift(order);
  saveOrders(orders);
}

export function updateOrderStatus(id: string, status: OrderStatus) {
  const orders = loadOrders().map((o) => (o.id === id ? { ...o, status } : o));
  saveOrders(orders);
}

export function removeOrder(id: string) {
  saveOrders(loadOrders().filter((o) => o.id !== id));
}

type AdminConfig = {
  receptionPin: string;
  adminPin: string;
  whatsappNumber: string;
  open: boolean;
};

type AdminState = AdminConfig & {
  setConfig: (c: Partial<AdminConfig>) => void;
};

export const useAdmin = create<AdminState>()(
  persist(
    (set) => ({
      receptionPin: "1234",
      adminPin: "9999",
      whatsappNumber: "22893910000",
      open: true,
      setConfig: (c) => set((s) => ({ ...s, ...c })),
    }),
    { name: "laPlaya_admin" },
  ),
);