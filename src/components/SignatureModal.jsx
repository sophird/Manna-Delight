import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import useCart from '../hooks/useCart';
import Media from './Media';
import { CloseIcon } from './icons';
import { priceLabel, getProduct, getComments } from '../services/products';
export default function SignatureModal({
  signature,
  focusComments,
  onClose
}) {
  const {
    addItem
  } = useCart();
  const navigate = useNavigate();
  const commentsRef = useRef(null);
  const scrollRef = useRef(null);
  const product = getProduct(signature.productId);
  useEffect(() => {
    const onKey = e => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [onClose]);
  useEffect(() => {
    if (!focusComments || !commentsRef.current || !scrollRef.current) return;
    scrollRef.current.scrollTo({
      top: commentsRef.current.offsetTop - 16,
      behavior: 'smooth'
    });
  }, [focusComments]);
  const handleAddToCart = () => {
    addItem(product.id, 1);
    onClose();
    navigate('/cart');
  };
  return <div className="modal-overlay" onClick={onClose} role="presentation">
      <div className="modal" role="dialog" aria-modal="true" aria-label={signature.title} onClick={e => e.stopPropagation()}>
        <button className="modal-close" aria-label="Close" onClick={onClose}><CloseIcon /></button>
        <div className="modal-scroll" ref={scrollRef}>
          <Media src={signature.image} tone={signature.tone} label={signature.title} className="modal-img" />
          <div className="modal-body">
            <div className="signature-meta">
              <span>{signature.date}</span>

            </div>
            <h2>{signature.title}</h2>
            {signature.body.map(para => <p key={para.slice(0, 24)}>{para}</p>)}

            {product && <div className="modal-product">
                <div>
                  <span className="modal-label">Featured product</span>
                  <strong>{product.name}</strong>
                </div>
                <div className="modal-price">{priceLabel(product)}</div>
                <button className="btn btn-primary" onClick={handleAddToCart}>Add to Cart</button>
              </div>}

            <section className="comments" ref={commentsRef}>
              <h3>Comments ({signature.comments})</h3>
              <ul>
                {getComments(signature).map((c, i) => <li key={i}>
                    <div className="comment-head">
                      <strong>{c.name}</strong>
                      <span>{c.date}</span>
                    </div>
                    <p>{c.text}</p>
                  </li>)}
              </ul>
            </section>
          </div>
        </div>
      </div>
    </div>;
}
