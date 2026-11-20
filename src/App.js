import { useEffect } from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Landing from './pages/Landing';
import Menu from './pages/Menu';
import Product from './pages/Product';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
function ScrollManager() {
  const {
    pathname,
    hash
  } = useLocation();
  useEffect(() => {
    if (hash) {
      const el = document.getElementById(hash.slice(1));
      if (el) {
        el.scrollIntoView({
          behavior: 'smooth',
          block: hash === '#about' ? 'center' : 'start'
        });
        return;
      }
    }
    window.scrollTo(0, 0);
  }, [pathname, hash]);
  return null;
}
function NotFound() {
  return <section className="container page-empty">
      <h2>Page not found</h2>
      <Link className="btn btn-primary" to="/">Back to home</Link>
    </section>;
}
const PAGES_WITHOUT_FOOTER = ['/menu', '/product', '/cart', '/checkout'];
export default function App() {
  const {
    pathname
  } = useLocation();
  const showFooter = !PAGES_WITHOUT_FOOTER.some(p => pathname === p || pathname.startsWith(`${p}/`));
  return <div className="app">
      <ScrollManager />
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/product" element={<Product />} />
          <Route path="/product/:productId" element={<Product />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      {showFooter && <Footer />}
    </div>;
}
