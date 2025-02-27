import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot, faMagnifyingGlass, faCartShopping } from "@fortawesome/free-solid-svg-icons";
import "../styles/header.css";

const Header = () => {
    return (
      <header className="navbar">
        <div className="nav-logo border">
          <div className="logo"></div>
        </div>
        <div className="nav-address border">
          <p className="add-first">Deliver to</p>
          <div className="add-icon">
          <FontAwesomeIcon icon={faLocationDot} />
            <p className="add-second">India</p>
          </div>
        </div>
        <div className="nav-search">
          <select className="search-select">
            <option>All</option>
          </select>
          <input placeholder="Search Amazon" className="search-input" />
          <div className="search-icon">
            <FontAwesomeIcon icon={faMagnifyingGlass}/>
          </div>
        </div>
        <div className="nav-signin border">
          <p><span>Hello, sign in</span></p>
          <p className="nav-second">Account & Lists</p>
        </div>
        <div className="nav-return border">
          <p><span>Returns</span></p>
          <p className="nav-second">& Orders</p>
        </div>
        <div className="nav-cart border">
        <FontAwesomeIcon icon={faCartShopping} />
          Cart
        </div>
      </header>
    );
  };
export default Header;