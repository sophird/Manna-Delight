import { useCallback, useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import Media from './Media';
import { CATEGORIES, PRODUCTS, priceLabel } from '../services/products';
const FADE_OUT_MS = 230;
export default function SearchPanel({
  onClose
}) {
  const [query, setQuery] = useState('');
  const [closing, setClosing] = useState(false);
  const inputRef = useRef(null);
  const requestClose = useCallback(() => {
    if (closing) return;
    setClosing(true);
    setTimeout(onClose, FADE_OUT_MS);
  }, [closing, onClose]);
  useEffect(() => {
    inputRef.current?.focus();
    const onKey = e => {
      if (e.key === 'Escape') requestClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [requestClose]);
  const term = query.trim().toLowerCase();
  const results = term ? PRODUCTS.filter(p => p.name.toLowerCase().includes(term)).slice(0, 8) : [];
  const categoryName = id => CATEGORIES.find(c => c.id === id)?.name || 'Signature';
  const cls = base => closing ? `${base} is-closing` : base;
  return <>
      <div className="fav-backdrop" onClick={requestClose} role="presentation" />
      <input ref={inputRef} type="search" className={cls('search-inline')} placeholder="Search products..." value={query} onChange={e => setQuery(e.target.value)} aria-label="Search products" />

      {term && results.length === 0 && <p className={cls('search-empty-drop')}>No products found for "{query.trim()}".</p>}

      {results.length > 0 && <ul className={cls('search-drop')}>
          {results.map(p => <li key={p.id} className="search-row">
              <Link to={`/product/${p.id}`} onClick={requestClose} className="search-thumb">
                <Media src={p.image} tone={p.tone} label={p.name} />
              </Link>
              <div className="search-info">
                <Link to={`/product/${p.id}`} onClick={requestClose}>{p.name}</Link>
                <span>{categoryName(p.category)}</span>
              </div>
              <span className="search-price">{priceLabel(p)}</span>
            </li>)}
        </ul>}
    </>;
}
