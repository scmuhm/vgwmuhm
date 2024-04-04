export default function ShareholdersFooter() {
  return (
    <footer className="footer-container">
      <div className="footer-top">
        <div className="footer-nav">
          <a className="footer-nav-link" href="https://vgw.co">
            Home
          </a>
          <a className="footer-nav-link" href="https://vgw.co/chumba-casino/">
            Chumba Casino
          </a>
          <a className="footer-nav-link" href="https://vgw.co/luckyland-slots/">
            Luckyland Slots
          </a>
          <a className="footer-nav-link" href="https://vgw.co/global-poker/">
            Global Poker
          </a>
          <a className="footer-nav-link" href="https://vgw.co/careers/">
            Careers
          </a>
          <a className="footer-nav-link" href="https://vgw.co/about/">
            About VGW
          </a>
          <a className="footer-nav-link" href="https://vgw.co/partnerships/">
            Partnerships
          </a>
          <a className="footer-nav-link" href="https://vgw.co/contact-us/">
            Contact Us
          </a>
        </div>
        <img
          className="vgw-logo"
          src="/shareholders/images/CROWN_Black.webp"
          id="vgw-crown-black"
          aria-labelledby="vgw crown logo"
          width="54"
        />
      </div>
      <div className="footer-bottom">
        <span className="social-media-links">
          <p>Follow us on</p>
          <a href="https://twitter.com/vgwco" className="social-media">
            <img
              src="/shareholders/images/twitter-logo.svg"
              id="twitter-logo"
              aria-labelledby="linkedin logo link to social media"
              width="22"
              height="24px"
            />
          </a>
          <a href="https://www.facebook.com/virtualgamingworlds" className="social-media">
            <img
              src="/shareholders/images/facebook-logo.svg"
              id="facebook-logo"
              aria-labelledby="instagram logo link to social media"
              width="22"
              height="24px"
            />
          </a>
          <a
            href="https://www.linkedin.com/company/virtual-gaming-worlds/"
            className="social-media"
          >
            <img
              src="/shareholders/images/linkedin-logo.svg"
              id="instagram-logo"
              aria-labelledby="instagram logo link to social media"
              width="22"
              height="24px"
            />
          </a>
        </span>
        <div className="copyright-and-links">
          <p>
            Copyright &copy; 2023 VGW Holdings Limited. All rights reserved. VGW website is owned
            and operated by VGW Holdings Limited.
          </p>
          <span>
            <a
              className="footer-link"
              href="https://www.vgw.co/wp-content/uploads/2023/03/PrivacyPolicy_Final-1.pdf"
            >
              Privacy Policy
            </a>
            |
            <a
              className="footer-link"
              href="https://www.vgw.co/wp-content/uploads/2023/03/Terms_Final-2.pdf"
            >
              Terms and Conditions
            </a>
            |
            <a className="footer-link" href="https://www.vgw.co/legal/">
              Legal
            </a>
          </span>
        </div>
      </div>
    </footer>
  );
}
