import { useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import useCart from '../hooks/useCart';
import { useFavorites } from '../context/FavoritesContext';
import Logo from './Logo';
import { SearchIcon, HeartIcon, CartIcon, UserIcon, MenuIcon, CloseIcon } from './icons';
import FavoritesPanel from './FavoritesPanel';
import SearchPanel from './SearchPanel';
import AuthModal from './AuthModal';
const LINKS = [{
  to: '/',
  label: 'Home',
  end: true
}, {
  to: '/menu',
  label: 'Menu'
}, {
  to: '/product',
  label: 'Product'
}, {
  to: '/cart',
  label: 'Orders'
}];
export default function Header() {
  const [open, setOpen] = useState(false);
  const {
    count
  } = useCart();
  const {
    count: favCount
  } = useFavorites();
  const [favOpen, setFavOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const {
    pathname
  } = useLocation();
  const onHome = pathname === '/';
  const onMenu = pathname === '/menu';
  return <header className={`site-header ${onHome ? 'site-header--home' : ''}`}>
      <div className="container header-inner">
        <Logo />
        <nav className={`site-nav ${open ? 'open' : ''}`} onClick={() => setOpen(false)}>
          {LINKS.map(l => <NavLink key={l.to} to={l.to} end={l.end} className={({
          isActive
        }) => isActive && !l.to.includes('#') ? 'active' : undefined}>
              {l.label}
            </NavLink>)}
        </nav>
        <div className="header-actions">
          {onMenu && <div className="search-wrap">
            <button className="icon-btn" aria-label="Search" aria-expanded={searchOpen} onClick={() => setSearchOpen(o => !o)}>
              <SearchIcon />
            </button>
            {searchOpen && <SearchPanel onClose={() => setSearchOpen(false)} />}
          </div>}
          {!onHome && <div className="fav-wrap">
            <button className="icon-btn" aria-label={`Favorites, ${favCount} items`} aria-expanded={favOpen} onClick={() => setFavOpen(o => !o)}>
              <HeartIcon />
              {favCount > 0 && <span className="badge">{favCount}</span>}
            </button>
            {favOpen && <FavoritesPanel onClose={() => setFavOpen(false)} />}
          </div>}
          <Link to="/cart" className="icon-btn" aria-label={`Cart, ${count} items`}>
            <CartIcon />
            {count > 0 && <span className="badge">{count}</span>}
          </Link>
          <div className="profile-wrap">
            <button className="icon-btn" aria-label="Account" aria-expanded={profileOpen} onClick={() => setProfileOpen(o => !o)}>
              <UserIcon />
            </button>
            {profileOpen && <AuthModal onClose={() => setProfileOpen(false)} />}
          </div>
          <button className="icon-btn menu-toggle" aria-label="Toggle menu" aria-expanded={open} onClick={() => setOpen(o => !o)}>
            {open ? <CloseIcon /> : <MenuIcon />}
          </button>
        </div>
      </div>
    </header>;
}
