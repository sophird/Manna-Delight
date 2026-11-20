import { Link } from 'react-router-dom';
import { useFavorites } from '../context/FavoritesContext';
import Media from './Media';
import { HeartIcon } from './icons';
import { getProduct, priceLabel } from '../services/products';
export default function FavoritesPanel({
  onClose
}) {
  const {
    favorites,
    toggleFavorite
  } = useFavorites();
  const products = favorites.map(getProduct).filter(Boolean);
  return <>
      <div className="fav-backdrop" onClick={onClose} role="presentation" />
      <div className="fav-panel" role="dialog" aria-label="Favorites">
        <div className="fav-head">
          <strong>Favorites</strong>
          <span className="muted">{products.length} item{products.length === 1 ? '' : 's'}</span>
        </div>

        {products.length === 0 ? <p className="muted fav-empty">No favorites yet. Tap the heart on any product to save it here.</p> : <ul className="fav-list">
            {products.map(p => <li key={p.id} className="fav-row">
                <Link to={`/product/${p.id}`} onClick={onClose} className="fav-thumb">
                  <Media src={p.image} tone={p.tone} label={p.name} />
                </Link>
                <div className="fav-info">
                  <Link to={`/product/${p.id}`} onClick={onClose}>{p.name}</Link>
                  <span className="price">{priceLabel(p)}</span>
                </div>
                <button className="fav-remove" aria-label={`Remove ${p.name} from favorites`} onClick={() => toggleFavorite(p.id)}>
                  <HeartIcon />
                </button>
              </li>)}
          </ul>}
      </div>
    </>;
}
