export default function Stars({
  value = 4
}) {
  return <div className="stars" aria-label={`${value} out of 5 stars`}>
      {[1, 2, 3, 4, 5].map(i => <span key={i} className={i <= Math.round(value) ? 'star on' : 'star'}>★</span>)}
    </div>;
}
