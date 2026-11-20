import { useEffect, useRef, useState } from 'react';
import ProductCard from './ProductCard';
import { ArrowLeftIcon } from './icons';
export default function CategoryCarousel({
  products
}) {
  const trackRef = useRef(null);
  const [overflows, setOverflows] = useState(false);
  const [edges, setEdges] = useState({
    left: false,
    right: false
  });
  useEffect(() => {
    const el = trackRef.current;
    if (!el) return undefined;
    const check = () => {
      const scrollable = el.scrollWidth > el.clientWidth + 2;
      setOverflows(scrollable);
      const maxScroll = el.scrollWidth - el.clientWidth;
      setEdges({
        left: scrollable && el.scrollLeft > 4,
        right: scrollable && el.scrollLeft < maxScroll - 4
      });
    };
    check();
    const observer = new ResizeObserver(check);
    observer.observe(el);
    window.addEventListener('resize', check);
    return () => {
      observer.disconnect();
      window.removeEventListener('resize', check);
    };
  }, [products]);
  const onScroll = () => {
    const el = trackRef.current;
    if (!el) return;
    const maxScroll = el.scrollWidth - el.clientWidth;
    setEdges({
      left: el.scrollLeft > 4,
      right: el.scrollLeft < maxScroll - 4
    });
  };
  const scroll = direction => {
    const el = trackRef.current;
    if (!el) return;
    el.scrollBy({
      left: direction * el.clientWidth * 0.8,
      behavior: 'smooth'
    });
  };
  const classes = ['carousel', overflows ? 'is-scrollable' : '', edges.left ? 'fade-left' : '', edges.right ? 'fade-right' : ''].filter(Boolean).join(' ');
  return <div className={classes}>
      {overflows && <button className="carousel-arrow prev" aria-label="Scroll left" onClick={() => scroll(-1)}>
          <ArrowLeftIcon />
        </button>}
      <div className="carousel-track" ref={trackRef} onScroll={onScroll}>
        {products.map(p => <div key={p.id} className="carousel-item">
            <ProductCard product={p} />
          </div>)}
      </div>
      {overflows && <button className="carousel-arrow next" aria-label="Scroll right" onClick={() => scroll(1)}>
          <ArrowLeftIcon />
        </button>}
    </div>;
}
