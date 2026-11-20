import { useEffect, useState } from 'react';
import ProductCard from '../components/ProductCard';
import CategoryCarousel from '../components/CategoryCarousel';
import MenuBannerSlider from '../components/MenuBannerSlider';
import Media from '../components/Media';
import { GridIcon, ListIcon } from '../components/icons';
import { CATEGORIES, getProductsByCategory } from '../services/products';
export default function Menu() {
  const [view, setView] = useState(() => {
    try {
      return localStorage.getItem('manna-delight-menu-view') || 'grid';
    } catch {
      return 'grid';
    }
  });
  useEffect(() => {
    try {
      localStorage.setItem('manna-delight-menu-view', view);
    } catch {}
  }, [view]);
  const [active, setActive] = useState(CATEGORIES[0].id);
  const jumpTo = id => {
    setActive(id);
    document.getElementById(`cat-${id}`)?.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
  };
  return <div className="page container">
      <MenuBannerSlider />

      <div className="menu-toolbar">
        <div className="pills" role="tablist">
          {CATEGORIES.map(c => <button key={c.id} role="tab" aria-selected={active === c.id} className={`pill ${active === c.id ? 'active' : ''}`} onClick={() => jumpTo(c.id)}>
              {c.name}
            </button>)}
        </div>
        <div className="view-toggle">
          <button aria-label="Grid view" className={view === 'grid' ? 'on' : ''} onClick={() => setView('grid')}><GridIcon /></button>
          <button aria-label="List view" className={view === 'list' ? 'on' : ''} onClick={() => setView('list')}><ListIcon /></button>
        </div>
      </div>

      {CATEGORIES.map(c => {
      const products = getProductsByCategory(c.id);
      return <section key={c.id} id={`cat-${c.id}`} className="menu-section">
            <h2 className="section-heading">{c.name}</h2>
            {products.length === 0 ? <p className="muted">Coming soon.</p> : view === 'grid' ? <CategoryCarousel products={products} /> : <div className="product-list list">
                  {products.map(p => <ProductCard key={p.id} product={p} layout="list" />)}
                </div>}
          </section>;
    })}
    </div>;
}
