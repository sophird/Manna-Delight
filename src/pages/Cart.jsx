import { Link } from 'react-router-dom';
import useCart from '../hooks/useCart';
import Media from '../components/Media';
import { ADDONS, formatPeso } from '../services/products';
import { AddIcon, CheckIcon, MinusIcon, PlusIcon, TrashIcon } from '../components/icons';
export default function Cart() {
  const {
    items,
    updateQty,
    removeItem,
    toggleAddon,
    subtotal,
    shipping,
    total
  } = useCart();
  if (items.length === 0) {
    return <section className="container page-empty">
        <h2>Your cart is empty</h2>
        <p className="muted">Looks like you haven't added anything yet.</p>
        <Link className="btn btn-primary" to="/menu">Continue Shopping</Link>
      </section>;
  }
  const summary = <aside className="cart-summary">
      <div className="summary-line"><span>Price:</span><span>{formatPeso(subtotal)}</span></div>
      <div className="summary-line"><span>Shipping:</span><span>{formatPeso(shipping)}</span></div>
      <div className="summary-line total"><span>Total:</span><span>{formatPeso(total)}</span></div>
      <div className="summary-actions">
        <Link to="/menu" className="btn btn-sky">Continue Shopping</Link>
        <Link to="/checkout" className="btn btn-muted">Proceed to Checkout</Link>
      </div>
    </aside>;
  return <div className="page container">
      <h1 className="page-title">Cart</h1>

      <div className="cart-main">
        <div className="cart-head" aria-hidden="true">
          <span>Product</span><span>Price</span><span>Quantity</span><span>Subtotal</span>
        </div>

        {items.map((item, index) => <div key={item.key} className="cart-item">
            <div className="cart-row">
              <div className="cart-product">
                <Media src={item.product.image} tone={item.product.tone} label={item.product.name} className="cart-thumb" />
                <div>
                  <strong>{item.product.name}</strong>
                  {item.size && <small className="cart-size">{item.size}</small>}
                </div>
                <button className="remove-btn" onClick={() => removeItem(item.key)} aria-label={`Remove ${item.product.name}`}>
                  <TrashIcon />
                </button>
              </div>
              <span className="cart-price">{formatPeso(item.unitPrice)}</span>
              <div className="qty-control">
                <button aria-label="Decrease quantity" onClick={() => updateQty(item.key, -1)}><MinusIcon /></button>
                <span>{item.qty}</span>
                <button aria-label="Increase quantity" onClick={() => updateQty(item.key, 1)}><PlusIcon /></button>
              </div>
              <span className="cart-subtotal">{formatPeso(item.lineTotal)}</span>
            </div>

            <div className="addons">
              <div className="addons-head">Add ons</div>
              <ul>
                {ADDONS.map(a => {
              const on = item.addons.includes(a.id);
              return <li key={a.id}>
                      <span className="addon-name">{a.name}</span>
                      <span className="addon-price">{formatPeso(a.price)}</span>
                      <button className={`addon-btn ${on ? 'on' : ''}`} aria-pressed={on} aria-label={`${on ? 'Remove' : 'Add'} ${a.name}`} onClick={() => toggleAddon(item.key, a.id)}>
                        {on ? <CheckIcon /> : <AddIcon />}
                      </button>
                    </li>;
            })}
              </ul>
            </div>

            {index === items.length - 1 && summary}
          </div>)}
      </div>
    </div>;
}
