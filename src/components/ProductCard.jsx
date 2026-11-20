import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import useCart from '../hooks/useCart';
import { useFavorites } from '../context/FavoritesContext';
import Media from './Media';
import Stars from './Stars';
import { HeartIcon } from './icons';
import { priceLabel } from '../services/products';
export default function ProductCard({
  product,
  layout = 'grid'
}) {
  const {
    addItem
  } = useCart();
  const {
    isFavorite,
    toggleFavorite
  } = useFavorites();
  const liked = isFavorite(product.id);
  const [added, setAdded] = useState(false);
  useEffect(() => {
    if (!added) return undefined;
    const t = setTimeout(() => setAdded(false), 1200);
    return () => clearTimeout(t);
  }, [added]);
  if (layout === 'featured') {
    return <article className="product-card featured-card">
        <Link to={`/product/${product.id}`} tabIndex={-1} aria-hidden="true">
          <Media src={product.image} tone={product.tone} label={product.name} className="featured-img" />
        </Link>
        <div className="featured-info">
          <Link to={`/product/${product.id}`}><h3>{product.name}</h3></Link>
          <Stars value={product.rating} />
          <div className="featured-bottom">
            <span className="price">{priceLabel(product)}</span>
            <button className="add-chip" onClick={() => {
            addItem(product.id);
            setAdded(true);
          }}>
              {added ? 'Added' : '+ ADD'}
            </button>
          </div>
        </div>
      </article>;
  }
  return <article className={`product-card ${layout}`}>
      <div className="product-media">
        <Link to={`/product/${product.id}`} tabIndex={-1} aria-hidden="true">
          <Media src={product.image} tone={product.tone} label={product.name} className="product-img" />
        </Link>
        <button className={`like-btn ${liked ? 'liked' : ''}`} aria-label={liked ? `Remove ${product.name} from wishlist` : `Add ${product.name} to wishlist`} aria-pressed={liked} onClick={() => toggleFavorite(product.id)}>
          <HeartIcon />
        </button>
      </div>
      <div className="product-info">
        <div className="product-title-row">
          <Link to={`/product/${product.id}`}><h3>{product.name}</h3></Link>
          <span className="price">{priceLabel(product)}</span>
        </div>
        {layout === 'list' && <p className="product-desc">{product.description}</p>}
        <div className="product-actions">
          <button className="btn btn-primary btn-sm" onClick={() => {
          addItem(product.id);
          setAdded(true);
        }}>
            {added ? 'Added ✓' : 'Add to cart'}
          </button>
          <Stars value={product.rating} />
        </div>
      </div>
    </article>;
}
