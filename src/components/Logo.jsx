import { Link } from 'react-router-dom';
export default function Logo({
  className = '',
  src = '/images/brand/logo.webp'
}) {
  return <Link to="/" className={`logo ${className}`}>
      <img className="logo-img" src={`${process.env.PUBLIC_URL}${src}`} alt="Manna Delight logo" />
    </Link>;
}
