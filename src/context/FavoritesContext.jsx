import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
const FavoritesContext = createContext(null);
const STORAGE_KEY = 'manna-delight-favorites';
function loadFavorites() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
  } catch {
    return [];
  }
}
export function FavoritesProvider({
  children
}) {
  const [favorites, setFavorites] = useState(loadFavorites);
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));
    } catch {}
  }, [favorites]);
  const toggleFavorite = useCallback(productId => {
    setFavorites(prev => prev.includes(productId) ? prev.filter(id => id !== productId) : [...prev, productId]);
  }, []);
  const value = useMemo(() => ({
    favorites,
    count: favorites.length,
    isFavorite: productId => favorites.includes(productId),
    toggleFavorite
  }), [favorites, toggleFavorite]);
  return <FavoritesContext.Provider value={value}>{children}</FavoritesContext.Provider>;
}
export function useFavorites() {
  const ctx = useContext(FavoritesContext);
  if (!ctx) throw new Error('useFavorites must be used inside FavoritesProvider');
  return ctx;
}
