import "../styles/Footer.css";

const Footer = () => {
    return (
      <footer>
        <div className="foot-panel-1">Back to top</div>
        <div className="footer-panel-2">
          {[...Array(4)].map((_, index) => (
            <ul key={index}>
              <p>Get to Know Us</p>
              {["Careers", "Blog", "About Amazon", "Investor Relations", "Amazon Devices", "Amazon Science"].map((text, idx) => (
                <li key={idx}><a href="#">{text}</a></li>
              ))}
            </ul>
          ))}
        </div>
        <div className="footer-panel-3">
          <div className="logo"></div>
        </div>
        <div className="footer-panel-4">
          <div className="pages">
            <a href="#">Conditions of Use</a>
            <a href="#">Privacy Notice</a>
            <a href="#">Your Ads Privacy Choices</a>
          </div>
          <div className="copyright">© 1996-2023, Amazon.com, Inc. or its affiliates</div>
        </div>
      </footer>
    );
  };

  export default Footer;