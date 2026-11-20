import Logo from './Logo';
export default function Footer() {
  return <footer className="site-footer">
      <div className="container footer-grid">
        <div className="footer-brand">
          <Logo className="footer-logo" src="/images/brand/logo-tagline.webp" />
        </div>
        <div className="footer-details">
          <div>
            <h4>Our Store</h4>
            <ul>
                <li><a href="/menu">Contact</a></li>
            </ul>
          </div>
          <div>
            <h4>Opening</h4>
            <ul>
              <li>10:00AM - 11:00PM</li>
              <li>Mon - Sat</li>
            </ul>
          </div>
          <div>
            <h4>Get In Touch</h4>
            <ul>
              <li>Contact: 0976 - 494 - 7441</li>
              <li>Facebook: Manna Delight</li>
              <li><a href="mailto:mannadelight2018@gmail.com">Email: mannadelight2018@gmail.com</a></li>
            </ul>
          </div>
        </div>
      </div>
    </footer>;
}
