import { createContext, useCallback, useEffect, useMemo, useState } from 'react';
import { ADDONS, SHIPPING_FEE, getProduct, getSizePrice } from '../services/products';
export const CartContext = createContext(null);
const STORAGE_KEY = 'manna-delight-cart';
function loadCart() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
  } catch {
    return [];
  }
}
export function CartProvider({
  children
}) {
  const [items, setItems] = useState(loadCart);
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {}
  }, [items]);
  const addItem = useCallback((productId, qty = 1, size = null) => {
    setItems(prev => {
      const existing = prev.find(i => i.productId === productId && i.size === size && i.addons.length === 0);
      if (existing) {
        return prev.map(i => i === existing ? {
          ...i,
          qty: i.qty + qty
        } : i);
      }
      return [...prev, {
        key: `${productId}-${size || 'std'}-${Date.now()}`,
        productId,
        size,
        qty,
        addons: []
      }];
    });
  }, []);
  const updateQty = useCallback((key, delta) => {
    setItems(prev => prev.map(i => i.key === key ? {
      ...i,
      qty: Math.max(1, i.qty + delta)
    } : i));
  }, []);
  const removeItem = useCallback(key => {
    setItems(prev => prev.filter(i => i.key !== key));
  }, []);
  const toggleAddon = useCallback((key, addonId) => {
    setItems(prev => prev.map(i => {
      if (i.key !== key) return i;
      const has = i.addons.includes(addonId);
      return {
        ...i,
        addons: has ? i.addons.filter(a => a !== addonId) : [...i.addons, addonId]
      };
    }));
  }, []);
  const clear = useCallback(() => setItems([]), []);
  const value = useMemo(() => {
    const detailed = items.map(item => {
      const product = getProduct(item.productId);
      if (!product) return null;
      const basePrice = getSizePrice(product, item.size);
      const addonTotal = item.addons.reduce((sum, id) => sum + (ADDONS.find(a => a.id === id)?.price || 0), 0);
      const unitPrice = basePrice + addonTotal;
      return {
        ...item,
        product,
        unitPrice,
        lineTotal: unitPrice * item.qty
      };
    }).filter(Boolean);
    const subtotal = detailed.reduce((sum, i) => sum + i.lineTotal, 0);
    const count = detailed.reduce((sum, i) => sum + i.qty, 0);
    const shipping = detailed.length ? SHIPPING_FEE : 0;
    return {
      items: detailed,
      count,
      subtotal,
      shipping,
      total: subtotal + shipping,
      addItem,
      updateQty,
      removeItem,
      toggleAddon,
      clear
    };
  }, [items, addItem, updateQty, removeItem, toggleAddon, clear]);
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}
