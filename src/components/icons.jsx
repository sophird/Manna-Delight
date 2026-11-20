const Svg = ({
  children,
  ...props
}) => <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>
    {children}
  </svg>;
export const SearchIcon = p => <Svg {...p}><circle cx="11" cy="11" r="7" /><path d="m20 20-3.5-3.5" /></Svg>;
export const HeartIcon = p => <Svg {...p}><path d="M12 21s-7-4.5-9.5-9A5.5 5.5 0 0 1 12 6a5.5 5.5 0 0 1 9.5 6c-2.5 4.5-9.5 9-9.5 9z" /></Svg>;
export const CartIcon = p => <Svg {...p}><circle cx="9" cy="20" r="1" /><circle cx="18" cy="20" r="1" /><path d="M3 4h2l2.4 10.2a1 1 0 0 0 1 .8h8.8a1 1 0 0 0 1-.8L20 8H6" /></Svg>;
export const UserIcon = p => <Svg {...p}><circle cx="12" cy="8" r="4" /><path d="M4 21c1.5-4 4.5-6 8-6s6.5 2 8 6" /></Svg>;
export const MenuIcon = p => <Svg {...p}><path d="M4 7h16M4 12h16M4 17h16" /></Svg>;
export const CloseIcon = p => <Svg {...p}><path d="M6 6l12 12M18 6L6 18" /></Svg>;
export const PlusIcon = p => <Svg {...p}><circle cx="12" cy="12" r="9" /><path d="M12 8v8M8 12h8" /></Svg>;
export const MinusIcon = p => <Svg {...p}><path d="M6 12h12" /></Svg>;
export const TrashIcon = p => <Svg {...p}><path d="M4 7h16M9 7V4h6v3M6 7l1 13h10l1-13" /></Svg>;
export const CheckIcon = p => <Svg {...p}><path d="M5 12l4 4 9-9" /></Svg>;
export const ArrowLeftIcon = p => <Svg {...p}><path d="M19 12H5M11 6l-6 6 6 6" /></Svg>;
export const GridIcon = p => <Svg {...p}><rect x="4" y="4" width="6" height="6" /><rect x="14" y="4" width="6" height="6" /><rect x="4" y="14" width="6" height="6" /><rect x="14" y="14" width="6" height="6" /></Svg>;
export const ListIcon = p => <Svg {...p}><path d="M9 6h11M9 12h11M9 18h11" /><circle cx="4.5" cy="6" r="1" /><circle cx="4.5" cy="12" r="1" /><circle cx="4.5" cy="18" r="1" /></Svg>;
export const BeanIcon = p => <Svg {...p} width="40" height="40" strokeWidth="1.5">
    <ellipse cx="12" cy="12" rx="6.5" ry="9" transform="rotate(30 12 12)" />
    <path d="M12 4.2c2.6 3.6 2.6 12 0 15.6" transform="rotate(30 12 12)" />
  </Svg>;
export const CookieIcon = p => <Svg {...p} width="40" height="40" strokeWidth="1.5">
    <path d="M12 3a9 9 0 1 0 9 9 2.6 2.6 0 0 1-2.6-2.6 2.6 2.6 0 0 1-2.6-2.6 2.6 2.6 0 0 1-2.6-2.6A2.6 2.6 0 0 1 12 3z" />
    <circle cx="8" cy="9" r="1.1" fill="currentColor" stroke="none" />
    <circle cx="12" cy="14.5" r="1.1" fill="currentColor" stroke="none" />
    <circle cx="15.5" cy="11" r="1.1" fill="currentColor" stroke="none" />
    <circle cx="8.8" cy="16" r="0.9" fill="currentColor" stroke="none" />
  </Svg>;
export const HouseIcon = p => <Svg {...p} width="40" height="40" strokeWidth="1.5">
    <path d="M2.5 11 12 3.2 21.5 11" />
    <path d="M5 9.4V20.5h14V9.4" />
    <path d="M10 20.5v-5.2h4v5.2" />
    <path d="M16.5 6.4V3.8h2.4v4.4" />
  </Svg>;
export const QuoteIcon = p => <Svg {...p} width="44" height="44" fill="currentColor" stroke="none">
    <path d="M3 18V11.5C3 7 5.5 4.5 10 4l.7 2.1C8.2 7 7 8.6 7 11h4v7H3zm11 0V11.5C14 7 16.5 4.5 21 4l.7 2.1C19.2 7 18 8.6 18 11h3v7h-7z" />
  </Svg>;
export const AddIcon = p => <Svg {...p} width="18" height="18" strokeWidth="2.2">
    <path d="M12 5v14M5 12h14" />
  </Svg>;
