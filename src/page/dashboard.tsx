import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import TextField from "@mui/material/TextField";
import { useState } from "react";
import "./dashboard.css";
import Banner from "../components/banner/banner.tsx";

const Dashboard = () => {
  const [searchValue, setSearchValue] = useState<string>("");

  const searchValueChanged = (e: any) => {
    setSearchValue(e.target.value);
  };

  return (
    <div>
      <header
        className="position-fixed top-0 start-0 w-100 bg-light shadow-lg"
        style={{ zIndex: 999 }}
      >
        <nav className="container d-flex justify-content-between align-items-center py-3">
          <div className="d-flex align-items-center gap-1">
            <span className="header-icons">🛍️</span>
            <h3 className="m-0 fw-bold">Ecommerce Search</h3>
          </div>

          <div className="d-flex align-items-center gap-4">
            <div>
              <TextField
                variant="outlined"
                placeholder="Search Here"
                sx={{
                  width: "26em",
                  "& .MuiInputBase-root": {
                    height: 38,
                  },
                }}
                value={searchValue}
                onChange={searchValueChanged}
              />
            </div>
            <a className="text-dark fw-semibold text-decoration-none" href="#">
              Cart
            </a>
            <div className="position-relative" style={{ cursor: "pointer" }}>
              <ShoppingCartIcon className="header-icons" />
              <span
                className="badge bg-primary rounded-circle position-absolute"
                style={{
                  top: "-6px",
                  right: "-10px",
                  fontSize: "10px",
                }}
              >
                0
              </span>
            </div>
            <AccountCircleIcon style={{ fontSize: 26, cursor: "pointer" }} />
          </div>
        </nav>
      </header>
      <Banner />
      <div>Items</div>
    </div>
  );
};
export default Dashboard;
