import { useState } from 'react';
import { Link } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import Media from '../components/Media';
import SignatureModal from '../components/SignatureModal';
import { BeanIcon, CookieIcon, HouseIcon, QuoteIcon } from '../components/icons';
import { getFeatured, SIGNATURES, CATEGORIES } from '../services/products';
const PUBLIC = process.env.PUBLIC_URL;
const FEATURES = [{
  Icon: BeanIcon,
  title: 'Handcrafted Brews',
  text: 'Enjoy expertly crafted coffee made to bring comfort and delight in every cup.'
}, {
  Icon: CookieIcon,
  title: 'Freshly Baked Delights',
  text: 'Savor freshly baked pastries prepared to perfectly complement your favorite drink.'
}, {
  Icon: HouseIcon,
  title: 'Cozy Café Experience',
  text: 'Relax in a warm and welcoming space where every visit feels comforting and memorable.'
}];
const OWNERS = [{
  quote: 'Manna Delight is our little space where we share our love for coffee, pastries, and good food. We hope every visit gives you something delicious to enjoy and a moment to remember.',
  name: 'Peniel Andrea Lomboy',
  initials: 'PL',
  photo: '/images/people/peniel-andrea-lomboy.webp'
}, {
  quote: 'Our goal is to bring the sweetness of Manna Delight to more people through our baked goods and beverages. We are grateful for the support of our customers and remain committed to serving products made with love.',
  name: 'Nathaniel Lomboy',
  initials: 'NL',
  photo: '/images/people/nathaniel-lomboy.webp'
}];
const GALLERY = [1, 2, 3, 4, 5, 6, 7, 8].map(n => ({
  src: `/images/gallery/gallery-${n}.webp`,
  label: `Manna Delight shop photo ${n}`
}));
const OUR_MENU_IDS = ['coffee', 'non-coffee', 'cookies', 'bars'];
const OUR_MENU = CATEGORIES.filter(c => OUR_MENU_IDS.includes(c.id));
function SectionBar({
  width = '44%',
  thin = false
}) {
  return <div className={`section-bar ${thin ? 'thin' : ''}`} style={{
    width
  }} aria-hidden="true" />;
}
export default function Landing() {
  const featured = getFeatured();
  const [active, setActive] = useState(null);
  const [focusComments, setFocusComments] = useState(false);
  const openSignature = (signature, toComments) => {
    setFocusComments(toComments);
    setActive(signature);
  };
  const [feedback, setFeedback] = useState('');
  const [sent, setSent] = useState(false);
  const handleFeedback = e => {
    e.preventDefault();
    if (!feedback.trim()) return;
    setSent(true);
    setFeedback('');
  };
  return <>
      <section className="hero">
        <div className="container hero-inner">
          <div className="hero-text">
            <h1>A little taste of <span className="accent">Delight</span></h1>
            <p>From freshly brewed coffee to indulgent pastries and sweet treats, Manna Delight is your cozy spot for good flavors and memorable moments.</p>
            <div className="hero-actions">
              <Link to="/menu" className="btn btn-outline">Explore Menu</Link>
              <button type="button" className="btn btn-green-outline" onClick={() => document.getElementById('about')?.scrollIntoView({
              behavior: 'smooth',
              block: 'center'
            })}>
                Our Story
              </button>
            </div>
          </div>
        </div>
        <img className="hero-photo" src={`${PUBLIC}/images/hero/hero.webp`} alt="Staff member holding a Manna Delight iced drink" />
      </section>

      <section className="feature-band">
        <img className="deco deco-left" src={`${PUBLIC}/images/landing/deco-cookie.webp`} alt="" aria-hidden="true" />
        <img className="deco deco-right" src={`${PUBLIC}/images/landing/deco-brownie.webp`} alt="" aria-hidden="true" />
        <div className="container feature-grid">
          {FEATURES.map(({
          Icon,
          title,
          text
        }) => <div key={title} className="feature">
              <Icon className="feature-icon" />
              <h3>{title}</h3>
              <p>{text}</p>
            </div>)}
        </div>
      </section>

      <section className="section container">
        <h2 className="section-title">Café Signatures</h2>
        <p className="section-sub">Discover our featured favorites, from indulgent treats to refreshing drinks, each crafted to bring a little more delight to your day.</p>
        <div className="signature-grid">
          {SIGNATURES.map(s => <article key={s.id} className="signature-card">
              <Media src={s.image} tone={s.tone} label={s.title} className="signature-img" />
              <div className="signature-body">
                <div className="signature-meta">
                  <span>{s.date}</span>
                  <button className="comment-link" onClick={() => openSignature(s, true)}>Comment {s.comments}</button>
                </div>
                <h3>{s.title}</h3>
                <button className="read-more" onClick={() => openSignature(s, false)}>Read More →</button>
              </div>
            </article>)}
        </div>
      </section>

      <section className="featured-section">
        <div className="featured-row">
          {featured.map(p => <ProductCard key={p.id} product={p} layout="featured" />)}
        </div>
        <div className="center view-all">
          <Link to="/menu" className="btn btn-primary">View All Product</Link>
        </div>
      </section>

      <SectionBar width="44%" thin />

      <section id="about" className="quotes-section container">
        <div className="quotes-grid">
          {OWNERS.map(o => <blockquote key={o.name} className="owner-quote">
              <QuoteIcon className="quote-icon" />
              <p>“{o.quote}”</p>
              <div className="owner">
                <img className="avatar" src={`${PUBLIC}${o.photo}`} alt={`${o.name}, owner`} />
                <strong>{o.name}</strong>
                <span>Owner</span>
              </div>
            </blockquote>)}
        </div>
      </section>

      <SectionBar width="44%" thin />

      <section className="gallery-section">
        <div className="gallery">
          {GALLERY.map(g => <Media key={g.src} src={g.src} label={g.label} className="gallery-img" />)}
        </div>
      </section>


      <section className="info-band">
        <div className="container info-grid">
          <div>
            <h4>Locations</h4>
            <ul><li>SM Olongapo Central</li><li>SM Downtown</li><li>Harbor Point Ayala</li></ul>
          </div>
          <div>
            <h4>Our Menu</h4>
            <ul className="small-list">{OUR_MENU.map(c => <li key={c.id}><Link to="/menu">{c.name}</Link></li>)}</ul>
          </div>
          <div>
            <h4>Quick Links</h4>
            <ul>
              <li><Link to="/menu">Menu</Link></li>
              <li><Link to="/product">Product</Link></li>
              <li><Link to="/cart">Orders</Link></li>
            </ul>
          </div>
          <div>
            <h4>Feedback</h4>
            <form className="feedback-form" onSubmit={handleFeedback}>
              <input type="text" placeholder="Write here!" value={feedback} onChange={e => {
              setFeedback(e.target.value);
              setSent(false);
            }} aria-label="Feedback" />
              <button type="submit" className="btn btn-primary btn-block">Send Feedback</button>
              {sent && <p className="form-note">Thank you for your feedback!</p>}
            </form>
          </div>
        </div>
      </section>
      {active && <SignatureModal signature={active} focusComments={focusComments} onClose={() => setActive(null)} />}
    </>;
}
