import { useState } from 'react';
import { Link } from 'react-router-dom';
import useCart from '../hooks/useCart';
import PaymentStep from '../components/PaymentStep';
import { formatPeso } from '../services/products';
const EMPTY_FORM = {
  firstName: '',
  lastName: '',
  email: '',
  newsletter: false,
  city: '',
  country: 'Philippines',
  street: '',
  apartment: '',
  postcode: '',
  notes: '',
  payment: 'cod',
  createAccount: false
};
const PAYMENTS = [{
  id: 'cod',
  label: 'Cash on Delivery'
}, {
  id: 'gcash',
  label: 'Gcash',
  logo: '/images/payments/gcash.webp'
}, {
  id: 'maya',
  label: 'Maya',
  logo: '/images/payments/maya.webp'
}, {
  id: 'card',
  label: 'Credit / Debit Card'
}];
const REQUIRED = ['firstName', 'lastName', 'email', 'street', 'postcode'];
export default function Checkout() {
  const {
    items,
    subtotal,
    shipping,
    total,
    clear
  } = useCart();
  const [form, setForm] = useState(EMPTY_FORM);
  const [errors, setErrors] = useState({});
  const [step, setStep] = useState('form');
  const [order, setOrder] = useState(null);
  const update = field => e => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setForm(f => ({
      ...f,
      [field]: value
    }));
    if (errors[field]) setErrors(err => ({
      ...err,
      [field]: undefined
    }));
  };
  const validate = () => {
    const next = {};
    REQUIRED.forEach(k => {
      if (!String(form[k]).trim()) next[k] = 'Required';
    });
    if (form.email && !/^\S+@\S+\.\S+$/.test(form.email)) next.email = 'Enter a valid email';
    setErrors(next);
    return Object.keys(next).length === 0;
  };
  const isOnline = form.payment !== 'cod';
  const handleContinue = e => {
    e.preventDefault();
    if (!validate()) return;
    if (isOnline) {
      setStep('pay');
      window.scrollTo(0, 0);
    } else {
      placeOrder();
    }
  };
  const placeOrder = () => {
    const number = `MD-${Date.now().toString(36).toUpperCase().slice(-6)}`;
    setOrder({
      number,
      total,
      method: form.payment,
      name: form.firstName,
      itemCount: items.reduce((n, i) => n + i.qty, 0)
    });
    clear();
    setStep('done');
    window.scrollTo(0, 0);
  };
  if (step === 'done' && order) {
    const methodLabel = PAYMENTS.find(p => p.id === order.method)?.label;
    return <section className="container page-empty">
        <h2>Thank you, {order.name}!</h2>
        <p className="muted">Your order <strong>{order.number}</strong> has been placed.</p>
        <div className="order-summary-done">
          <div className="order-line"><span>Items</span><span>{order.itemCount}</span></div>
          <div className="order-line"><span>Payment</span><span>{order.method === 'cod' ? methodLabel : `${methodLabel} (paid)`}</span></div>
          <div className="order-line total"><span>Total</span><span>{formatPeso(order.total)}</span></div>
        </div>
        <Link className="btn btn-primary" to="/menu">Back to menu</Link>
      </section>;
  }
  if (step === 'pay' && items.length > 0) {
    return <div className="page container">
        <h1 className="page-title">Payment</h1>
        <PaymentStep method={form.payment} total={total} onBack={() => setStep('form')} onPaid={placeOrder} />
      </div>;
  }
  if (items.length === 0) {
    return <section className="container page-empty">
        <h2>Your cart is empty</h2>
        <Link className="btn btn-primary" to="/menu">Continue Shopping</Link>
      </section>;
  }
  const field = (name, label, props = {}) => <div className={`field ${errors[name] ? 'has-error' : ''}`}>
      <label htmlFor={name}>{label}{REQUIRED.includes(name) && ' *'}</label>
      <input id={name} name={name} value={form[name]} onChange={update(name)} {...props} />
      {errors[name] && <span className="error">{errors[name]}</span>}
    </div>;
  return <div className="page container">
      <h1 className="page-title">Checkout</h1>

      <form className="checkout-layout" onSubmit={handleContinue} noValidate>
        <section className="billing card">
          <h2>Billing Details</h2>

          <div className="field-row">
            {field('firstName', 'First Name', {
            placeholder: 'Juan'
          })}
            {field('lastName', 'Last Name', {
            placeholder: 'Dela Cruz'
          })}
          </div>
          {field('email', 'Email Address', {
          type: 'email',
          placeholder: 'example@gmail.com'
        })}
          <label className="checkbox">
            <input type="checkbox" checked={form.newsletter} onChange={update('newsletter')} />
            Sign me up to receive email updates and news!
          </label>

          {field('city', 'City/Municipality', {
          placeholder: 'e.g., Olongapo City'
        })}

          <div className="field">
            <label htmlFor="country">Country / Region *</label>
            <select id="country" value={form.country} onChange={update('country')}>
              <option>Philippines</option>
            </select>
          </div>

          {field('street', 'Street address', {
          placeholder: 'House Number & street road'
        })}
          {field('apartment', 'Apartment, suite, unit, etc (optional)', {
          placeholder: 'Apartment, suite, unit, etc (optional)'
        })}
          {field('postcode', 'Postcode / ZIP', {
          placeholder: '12345'
        })}

          <label className="checkbox create-account">
            <input type="checkbox" checked={form.createAccount} onChange={update('createAccount')} />
            Create an account?
          </label>
        </section>

        <section className="order card">
          <h2>Your Order</h2>
          <ul className="order-items">
            {items.map(item => <li key={item.key}>
                <span>{item.product.name}{item.size ? ` (${item.size})` : ''} × {item.qty}{item.addons.length > 0 && <small> (+{item.addons.length} add-on{item.addons.length > 1 ? 's' : ''})</small>}</span>
                <span>{formatPeso(item.lineTotal)}</span>
              </li>)}
          </ul>
          <div className="order-line"><span>Subtotal</span><span>{formatPeso(subtotal)}</span></div>
          <div className="order-line"><span>Shipping fee</span><span>{formatPeso(shipping)}</span></div>
          <div className="order-line total"><span>Total</span><span>{formatPeso(total)}</span></div>

          <div className="field">
            <label htmlFor="notes">Order Notes (optional)</label>
            <textarea id="notes" rows="4" placeholder="Notes about your order, e.g. special notes for delivery." value={form.notes} onChange={update('notes')} />
          </div>

          <fieldset className="payments">
            <legend className="sr-only">Payment method</legend>
            {PAYMENTS.map(p => <label key={p.id} className={`payment-option ${form.payment === p.id ? 'selected' : ''}`}>
                <input type="radio" name="payment" value={p.id} checked={form.payment === p.id} onChange={update('payment')} />
                <span>{p.label}</span>
                {p.logo && <img className="pay-logo" src={`${process.env.PUBLIC_URL}${p.logo}`} alt={`${p.label} logo`} />}
              </label>)}
          </fieldset>

          <p className="privacy">
            Your personal data will be used to process your order, support your experience throughout this website, and for other purposes described in our <a href="#privacy">Privacy policy</a>.
          </p>

          <button type="submit" className="btn btn-navy btn-block">
            {isOnline ? 'Continue to Payment' : 'Place Order'}
          </button>
        </section>
      </form>
    </div>;
}
