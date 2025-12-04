import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import Replay10Icon from "@mui/icons-material/Replay10";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import "./banner.css";

const Banner = () => {
  return (
    <div>
      <div>
        <img src="src\assets\shopping-banner4.jpg" className="banner-img" />
        <div className="d-flex justify-content-center align-items-center gap-4">
          <div className="perks perk1">
            <div>
              <LocalShippingIcon className="perk-icon" />
            </div>
            <div>Free Shipping</div>
          </div>
          <div className="perks perk2">
            <div>
              <CreditCardIcon className="perk-icon" />
            </div>
            <div>Secure Payment</div>
          </div>
          <div className="perks perk3">
            <div>
              <Replay10Icon className="perk-icon" />
            </div>
            <div>10 Days Return</div>
          </div>
          <div className="perks perk4">
            <div>
              <AutoAwesomeIcon className="perk-icon" />
            </div>
            <div>Quality Products</div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Banner;
