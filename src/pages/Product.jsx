import { useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import useCart from '../hooks/useCart';
import Media from '../components/Media';
import Stars from '../components/Stars';
import ProductCard from '../components/ProductCard';
import { ArrowLeftIcon, MinusIcon, PlusIcon } from '../components/icons';
import { getProduct, getRelated, formatPeso, getSizePrice } from '../services/products';
export default function Product() {
  const {
    productId
  } = useParams();
  const product = getProduct(productId);
  const {
    addItem
  } = useCart();
  const navigate = useNavigate();
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);
  const hasSizes = product?.sizes && product.sizes.length > 1;
  const [size, setSize] = useState(product?.sizes?.[0]?.label ?? null);
  if (!productId) {
    return <section className="container page-empty">
        <h2>No product selected</h2>
        <p className="muted">Choose a product from the menu to see its details.</p>
        <Link className="btn btn-primary" to="/menu">Continue Shopping</Link>
      </section>;
  }
  if (!product) {
    return <section className="container page-empty">
        <h2>Product not found</h2>
        <Link className="btn btn-primary" to="/menu">Back to menu</Link>
      </section>;
  }
  const selectedSize = hasSizes ? size : null;
  const unitPrice = getSizePrice(product, selectedSize);
  const related = getRelated(product);
  const features = product.features || [['Category', product.category.replace('-', ' ')], ['Texture', 'Smooth and creamy']];
  const relatedTitle = product.group === 'drinks' ? 'Related Drinks' : 'Related Treats';
  const handleAdd = () => {
    addItem(product.id, qty, selectedSize);
    setAdded(true);
    setTimeout(() => setAdded(false), 1200);
  };
  const handleBuyNow = () => {
    addItem(product.id, qty, selectedSize);
    navigate('/checkout');
  };
  return <div className="page container">
      <Link to="/menu" className="back-link"><ArrowLeftIcon /> Back to menu</Link>

      <div className="product-detail">
        <div className="gallery-main">
          <Media src={product.image} tone={product.tone} label={product.name} className="detail-img" />
          {product.gallery && <div className="thumbs">
              {product.gallery.map((src, i) => <Media key={src} src={src} tone={product.tone} label={`${product.name} view ${i + 1}`} className="thumb" />)}
            </div>}
        </div>

        <div className="detail-info">
          <h1>{product.name}</h1>
          <p className="detail-price"><span>Price:</span> {formatPeso(unitPrice)}</p>
          <Stars value={product.rating} />

          {hasSizes && <div className="size-options" role="radiogroup" aria-label="Size">
              {product.sizes.map(s => <button key={s.label} role="radio" aria-checked={size === s.label} className={`size-btn ${size === s.label ? 'active' : ''}`} onClick={() => setSize(s.label)}>
                  <span>{s.label}</span>
                  <strong>{formatPeso(s.price)}</strong>
                </button>)}
            </div>}

          <h4>Description:</h4>
          <p className="detail-desc">{product.description}</p>

          <div className="purchase-row">
          <div className="qty-row">
            <div className="qty-control">
              <button aria-label="Decrease quantity" onClick={() => setQty(q => Math.max(1, q - 1))}><MinusIcon /></button>
              <span>{qty}</span>
              <button aria-label="Increase quantity" onClick={() => setQty(q => q + 1)}><PlusIcon /></button>
            </div>
          </div>

          <div className="detail-actions">
            <button className="btn btn-outline" onClick={handleAdd}>{added ? 'Added ✓' : 'Add to Cart'}</button>
            <button className="btn btn-green-outline" onClick={handleBuyNow}>Buy Now</button>
          </div>
          </div>

          <details className="accordion" open>
            <summary>Key Features:</summary>
            <dl>
              {features.map(([label, value]) => <div key={label} className="feature-row">
                  <dt>{label}:</dt>
                  <dd>{value}</dd>
                </div>)}
            </dl>
          </details>
          <details className="accordion">
            <summary>Shipping &amp; Delivery</summary>
            <p className="muted">Flat shipping fee of ₱50 applies to all orders.</p>
          </details>
        </div>
      </div>

      {related.length > 0 && <section className="related">
          <h2 className="section-heading center">{relatedTitle}</h2>
          <div className="related-row">
            {related.map(p => <ProductCard key={p.id} product={p} />)}
          </div>
        </section>}
    </div>;
}
