import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import useCart from '../hooks/useCart';
import { useFavorites } from '../context/FavoritesContext';
import { useAccount } from '../context/AccountContext';
import { CloseIcon } from './icons';
import GoogleSignInButton from './GoogleSignInButton';
import { PASSWORD_RULES, validateName, validateEmailField, validateSignIn, validateSignUp } from '../services/validation';
export default function AuthModal({
  onClose
}) {
  const {
    user,
    register,
    login,
    loginWithGoogle,
    signOut
  } = useAccount();
  const {
    count: cartCount
  } = useCart();
  const {
    count: favCount
  } = useFavorites();
  const [mode, setMode] = useState('signin');
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    confirm: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [formError, setFormError] = useState('');
  const [busy, setBusy] = useState(false);
  const [closing, setClosing] = useState(false);
  const requestClose = () => {
    if (closing) return;
    setClosing(true);
    setTimeout(onClose, 320);
  };
  useEffect(() => {
    const onKey = e => {
      if (e.key === 'Escape') requestClose();
    };
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [closing]);
  const update = field => e => {
    setForm(f => ({
      ...f,
      [field]: e.target.value
    }));
    if (errors[field]) setErrors(err => ({
      ...err,
      [field]: ''
    }));
    setFormError('');
  };
  const checkOnBlur = field => () => {
    let message = '';
    if (field === 'name' && mode === 'signup') message = validateName(form.name);
    if (field === 'email') message = validateEmailField(form.email);
    setErrors(err => ({
      ...err,
      [field]: message
    }));
  };
  const switchMode = next => {
    setMode(next);
    setErrors({});
    setFormError('');
  };
  const handleSubmit = async e => {
    e.preventDefault();
    if (busy) return;
    const found = mode === 'signup' ? validateSignUp(form) : validateSignIn(form);
    setErrors(found);
    if (Object.keys(found).length > 0) return;
    setBusy(true);
    setFormError('');
    const result = mode === 'signup' ? await register(form.name, form.email, form.password) : await login(form.email, form.password);
    setBusy(false);
    if (!result.ok) {
      setFormError(result.error);
      return;
    }
    requestClose();
  };
  const handleGoogle = async profile => {
    setFormError('');
    const result = await loginWithGoogle(profile);
    if (result.ok) requestClose();else setFormError(result.error);
  };
  const initials = name => name.split(' ').filter(Boolean).slice(0, 2).map(w => w[0].toUpperCase()).join('');
  return <div className={`auth-overlay ${closing ? 'is-closing' : ''}`} onClick={requestClose} role="presentation">
      <div className={`auth-modal ${closing ? 'is-closing' : ''}`} role="dialog" aria-modal="true" aria-label="Account" onClick={e => e.stopPropagation()}>
        <button className="auth-close" aria-label="Close" onClick={requestClose}><CloseIcon /></button>

        {user ? <div className="acct">
            <div className="acct-band" />
            <div className="acct-avatar">{initials(user.name)}</div>
            <h2 className="acct-name">{user.name}</h2>
            <p className="acct-email">{user.email}</p>
            <span className="acct-badge">
              <span className="acct-check">✓</span>
              {user.provider === 'google' ? 'Signed in with Google' : 'Signed in with email'}
            </span>

            <div className="acct-stats">
              <div><strong>{cartCount}</strong><span>In cart</span></div>
              <div><strong>{favCount}</strong><span>Favorites</span></div>
            </div>

            <div className="acct-links">
              <Link to="/cart" onClick={requestClose} className="acct-link">
                <span>My orders</span><span className="acct-chev">›</span>
              </Link>
              <Link to="/menu" onClick={requestClose} className="acct-link">
                <span>Browse the menu</span><span className="acct-chev">›</span>
              </Link>
            </div>

            <button className="acct-signout" onClick={() => {
          signOut();
          requestClose();
        }}>Sign out</button>
          </div> : <>
            <h2 className="auth-title">{mode === 'signin' ? 'Welcome back' : 'Create your account'}</h2>
            <p className="auth-muted">
              {mode === 'signin' ? 'Sign in to save your favorites and checkout faster.' : 'It only takes a minute.'}
            </p>

            <div className="auth-tabs" role="tablist">
              <button role="tab" aria-selected={mode === 'signin'} className={mode === 'signin' ? 'on' : ''} onClick={() => switchMode('signin')}>Sign in</button>
              <button role="tab" aria-selected={mode === 'signup'} className={mode === 'signup' ? 'on' : ''} onClick={() => switchMode('signup')}>Create account</button>
            </div>

            <form onSubmit={handleSubmit} noValidate className="auth-form">
              {mode === 'signup' && <Field label="Full name" error={errors.name}>
                  <input value={form.name} onChange={update('name')} onBlur={checkOnBlur('name')} placeholder="Juan Dela Cruz" autoComplete="name" maxLength={60} />
                </Field>}

              <Field label="Email" error={errors.email}>
                <input type="email" value={form.email} onChange={update('email')} onBlur={checkOnBlur('email')} placeholder="example@gmail.com" autoComplete="email" maxLength={254} />
              </Field>

              <Field label="Password" error={errors.password}>
                <div className="auth-password">
                  <input type={showPassword ? 'text' : 'password'} value={form.password} onChange={update('password')} placeholder={mode === 'signup' ? 'At least 8 characters' : 'Your password'} autoComplete={mode === 'signup' ? 'new-password' : 'current-password'} maxLength={128} />
                  <button type="button" className="auth-toggle" onClick={() => setShowPassword(s => !s)}>
                    {showPassword ? 'Hide' : 'Show'}
                  </button>
                </div>
              </Field>

              {mode === 'signup' && form.password && <ul className="auth-checks">
                  {PASSWORD_RULES.map(rule => {
              const ok = rule.test(form.password);
              return <li key={rule.key} className={ok ? 'ok' : ''}>{ok ? '✓' : '○'} {rule.label}</li>;
            })}
                </ul>}

              {mode === 'signup' && <Field label="Confirm password" error={errors.confirm}>
                  <input type={showPassword ? 'text' : 'password'} value={form.confirm} onChange={update('confirm')} placeholder="Re-enter your password" autoComplete="new-password" maxLength={128} />
                </Field>}

              {formError && <p className="auth-form-error" role="alert">{formError}</p>}

              <button type="submit" className="btn btn-primary auth-full" disabled={busy}>
                {busy ? 'Please wait...' : mode === 'signin' ? 'Sign in' : 'Create account'}
              </button>
            </form>

            <div className="auth-divider"><span>or</span></div>
            <GoogleSignInButton onSuccess={handleGoogle} onError={setFormError} />

            <div className={`auth-deco ${mode === 'signup' ? 'single' : ''}`} aria-hidden="true">
              <span className="auth-blob" />
              <img className="auth-deco-img a" src={`${process.env.PUBLIC_URL}/images/products/cafe-latte.webp`} alt="" />
              {mode === 'signin' && <>
                  <img className="auth-deco-img b" src={`${process.env.PUBLIC_URL}/images/products/chocolate-chip.webp`} alt="" />
                  <img className="auth-deco-img c" src={`${process.env.PUBLIC_URL}/images/products/matcha-milk.webp`} alt="" />
                </>}
            </div>
          </>}
      </div>
    </div>;
}
function Field({
  label,
  error,
  children
}) {
  return <label className={`auth-field ${error ? 'has-error' : ''}`}>
      <span>{label}</span>
      {children}
      {error && <small>{error}</small>}
    </label>;
}
