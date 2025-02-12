import "../styles/layouts/footer.css";

const Footer = () => {
  return (
    <footer className="flex-column-center pd-sm">
      <p className="mg-bottom-xsm">Made by Kedar Kulkarni</p>

      <div className="footer-links mg-bottom-xsm">
        <FooterLink url="https://github.com/kedark152" iconClass="fab fa-github" />
        <FooterLink url="https://www.linkedin.com/in/kedark152" iconClass="fab fa-linkedin-in" />
        <FooterLink url="https://twitter.com/Kulkarni12Kedar" iconClass="fab fa-twitter" />
      </div>

      <p className="copyright mg-bottom-xsm">© {new Date().getFullYear()} AgroStores</p>
    </footer>
  );
};

// **Reusable Footer Link Component**
const FooterLink = ({ url, iconClass }) => (
  <a className="mg-xsm fs-sm-plus" href={url} target="_blank" rel="noreferrer">
    <i className={iconClass}></i>
  </a>
);

export default Footer;
