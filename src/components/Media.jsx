export default function Media({
  tone = '#eee',
  label = '',
  src,
  className = ''
}) {
  if (src) {
    return <img className={`media media-img ${className}`} src={`${process.env.PUBLIC_URL}${src}`} alt={label} loading="lazy" />;
  }
  return <div className={`media ${className}`} style={{
    background: tone
  }} role="img" aria-label={label}>
      <span>{label}</span>
    </div>;
}
