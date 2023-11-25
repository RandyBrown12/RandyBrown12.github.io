import { Link, useLocation } from "react-router-dom";
import moneyIcon from "./img/money-icon.png";

const Navbar = () => {
    const location = useLocation();
    return ( 
        <nav>
            <header className="header">
                {location.pathname === "/" &&
                    <ul className="header__ul">
                        <li><h1>My Website</h1></li>
                        <li><Link className="header__link" to="/InvestmentCalculator">Investment Calculator</Link></li>
                        <li><Link className="header__link" to="/OtherProjects">Other Projects</Link></li>
                    </ul>
                }
                {location.pathname === "/InvestmentCalculator" &&
                    <ul className="header__ul">
                        <li><img className="header__icon" src={moneyIcon} alt="Money Icon" width="100" height="100"/></li>
                        <li><Link className="header__link" to="/">About Me</Link></li>
                        <li><Link className="header__link" to="/OtherProjects">Other Projects</Link></li>
                    </ul>
                }
                {location.pathname === "/OtherProjects" &&
                    <ul className="header__ul">
                        <li><h1>Other Projects!</h1></li>
                        <li><Link className="header__link" to="/">About Me</Link></li>
                        <li><Link className="header__link" to="/InvestmentCalculator">Investment Calculator</Link></li>
                    </ul>
                }
            </header>
        </nav>
    );
}
 
export default Navbar;