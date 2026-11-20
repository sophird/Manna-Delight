import { useEffect, useState } from 'react';
const PUBLIC = process.env.PUBLIC_URL;
const BANNERS = [{
  src: '/images/menu/menu-banner-1.webp',
  alt: 'Manna Delight table display with cookie baskets',
  objectPosition: '50% 50%'
}, {
  src: '/images/menu/menu-banner-2.webp',
  alt: 'Manna Delight booth with cookies and shelves',
  objectPosition: '50% 50%'
}, {
  src: '/images/menu/menu-banner-3.webp',
  alt: 'Manna Delight store front',
  objectPosition: '50% 50%'
}, {
  src: '/images/menu/menu-banner-4.webp',
  alt: 'Christmas cookie spread with Manna Delight cookies',
  objectPosition: '50% 50%'
}];
const AUTO_SLIDE_MS = 3000;
export default function MenuBannerSlider() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const count = BANNERS.length;
  useEffect(() => {
    if (paused) return undefined;
    const timer = setInterval(() => setIndex(i => (i + 1) % count), AUTO_SLIDE_MS);
    return () => clearInterval(timer);
  }, [count, paused]);
  return <div className="banner-slider" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
      <div className="banner-track" style={{
      transform: `translateX(-${index * 100}%)`
    }}>
        {BANNERS.map(b => <img key={b.src} className="banner-slide" src={`${PUBLIC}${b.src}`} alt={b.alt} style={{
        objectPosition: b.objectPosition
      }} />)}
      </div>


      <div className="banner-dots">
        {BANNERS.map((b, i) => <button key={b.src} className={`banner-dot ${i === index ? 'on' : ''}`} aria-label={`Show banner ${i + 1}`} onClick={() => setIndex(i)} />)}
      </div>
    </div>;
}
