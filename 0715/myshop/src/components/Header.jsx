import { Link } from "react-router-dom";

export default function Header({ cart }) {
  const cartCount = cart.total;

  return (
    <header className="site-header">
      <div className="site-header__inner">
        <Link to="/" className="site-header__logo">
          Myshop
        </Link>
        <nav className="site-header__nav">
          <Link to="/">home</Link>
          <Link to="/about">about</Link>
          <Link to="/favorites">favorites</Link>
        </nav>
        <Link to="/cart" className="site-header__cart" aria-label="カート">
          <span className="site-header__cart-icon" aria-hidden="true">🛒</span>
          <span className="site-header__cart-badge">{cartCount}</span>
        </Link>
      </div>
    </header>
  );
}
