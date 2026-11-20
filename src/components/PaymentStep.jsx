import { useState } from 'react';
import { formatPeso } from '../services/products';
const METHOD_LABEL = {
  gcash: 'GCash',
  maya: 'Maya',
  card: 'Credit / Debit Card'
};
const METHOD_LOGO = {
  gcash: '/images/payments/gcash.webp',
  maya: '/images/payments/maya.webp'
};
function luhnValid(digits) {
  let sum = 0;
  let double = false;
  for (let i = digits.length - 1; i >= 0; i--) {
    let d = Number(digits[i]);
    if (double) {
      d *= 2;
      if (d > 9) d -= 9;
    }
    sum += d;
    double = !double;
  }
  return sum % 10 === 0;
}
export default function PaymentStep({
  method,
  total,
  onBack,
  onPaid
}) {
  const [card, setCard] = useState({
    number: '',
    name: '',
    expiry: '',
    cvc: ''
  });
  const [errors, setErrors] = useState({});
  const [processing, setProcessing] = useState(false);
  const isCard = method === 'card';
  const formatNumber = v => v.replace(/\D/g, '').slice(0, 16).replace(/(.{4})/g, '$1 ').trim();
  const formatExpiry = v => {
    const d = v.replace(/\D/g, '').slice(0, 4);
    return d.length > 2 ? `${d.slice(0, 2)}/${d.slice(2)}` : d;
  };
  const update = field => e => {
    let value = e.target.value;
    if (field === 'number') value = formatNumber(value);
    if (field === 'expiry') value = formatExpiry(value);
    if (field === 'cvc') value = value.replace(/\D/g, '').slice(0, 4);
    setCard(c => ({
      ...c,
      [field]: value
    }));
    if (errors[field]) setErrors(err => ({
      ...err,
      [field]: ''
    }));
  };
  const validateCard = () => {
    const e = {};
    const digits = card.number.replace(/\s/g, '');
    if (digits.length !== 16 || !luhnValid(digits)) e.number = 'Enter a valid 16-digit card number.';
    if (card.name.trim().length < 2) e.name = 'Enter the name on the card.';
    const m = card.expiry.match(/^(\d{2})\/(\d{2})$/);
    if (!m) {
      e.expiry = 'Use MM/YY.';
    } else {
      const month = Number(m[1]);
      const year = 2000 + Number(m[2]);
      const now = new Date();
      const expired = year < now.getFullYear() || year === now.getFullYear() && month < now.getMonth() + 1;
      if (month < 1 || month > 12) e.expiry = 'Enter a valid month.';else if (expired) e.expiry = 'This card has expired.';
    }
    if (card.cvc.length < 3) e.cvc = 'Enter the 3 or 4 digit security code.';
    setErrors(e);
    return Object.keys(e).length === 0;
  };
  const handlePay = () => {
    if (processing) return;
    if (isCard && !validateCard()) return;
    setProcessing(true);
    setTimeout(() => onPaid(), 1800);
  };
  return <div className="pay-step">
      <button className="pay-back" onClick={onBack} disabled={processing}>← Back to details</button>

      <div className="card pay-card">
        <div className="pay-head">
          <span className="pay-label">Amount to pay</span>
          <strong className="pay-amount">{formatPeso(total)}</strong>
          <span className="pay-method-line">
            Paying with {METHOD_LABEL[method]}
            {METHOD_LOGO[method] && <img className="pay-logo-inline" src={`${process.env.PUBLIC_URL}${METHOD_LOGO[method]}`} alt="" />}
          </span>
        </div>

        {isCard ? <div className="pay-form">
            <label className={`auth-field ${errors.number ? 'has-error' : ''}`}>
              <span>Card number</span>
              <input inputMode="numeric" value={card.number} onChange={update('number')} placeholder="1234 5678 9012 3456" autoComplete="cc-number" />
              {errors.number && <small>{errors.number}</small>}
            </label>
            <label className={`auth-field ${errors.name ? 'has-error' : ''}`}>
              <span>Name on card</span>
              <input value={card.name} onChange={update('name')} placeholder="Juan Dela Cruz" autoComplete="cc-name" />
              {errors.name && <small>{errors.name}</small>}
            </label>
            <div className="pay-row">
              <label className={`auth-field ${errors.expiry ? 'has-error' : ''}`}>
                <span>Expiry</span>
                <input inputMode="numeric" value={card.expiry} onChange={update('expiry')} placeholder="MM/YY" autoComplete="cc-exp" />
                {errors.expiry && <small>{errors.expiry}</small>}
              </label>
              <label className={`auth-field ${errors.cvc ? 'has-error' : ''}`}>
                <span>CVC</span>
                <input inputMode="numeric" value={card.cvc} onChange={update('cvc')} placeholder="123" autoComplete="cc-csc" />
                {errors.cvc && <small>{errors.cvc}</small>}
              </label>
            </div>
          </div> : <div className="pay-wallet">
            <p>You will confirm this payment in your {METHOD_LABEL[method]} app.</p>
            <div className="pay-steps">
              <span>1. Tap <strong>Pay now</strong></span>
              <span>2. Open the {METHOD_LABEL[method]} app</span>
              <span>3. Confirm the amount of {formatPeso(total)}</span>
            </div>
          </div>}

        <button className="btn btn-primary auth-full pay-button" onClick={handlePay} disabled={processing}>
          {processing ? <><span className="pay-spinner" aria-hidden="true" /> Processing payment...</> : `Pay ${formatPeso(total)}`}
        </button>

        <p className="pay-secure">Demo checkout: no real payment is charged.</p>
      </div>
    </div>;
}
