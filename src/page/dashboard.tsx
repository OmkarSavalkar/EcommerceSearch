import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import TextField from "@mui/material/TextField";
import { useEffect, useState, useCallback } from "react";
import "./dashboard.css";
import Banner from "../components/banner/banner.tsx";
import ProductList from "../components/productList/productList.tsx";
import SearchIcon from "@mui/icons-material/Search";
import axios from "axios";

const Dashboard = () => {
  const [searchValue, setSearchValue] = useState<string>("");
  const [productData, setProductData] = useState<any>();
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [sortOptions, setSortOptions] = useState<any>([]);
  const [sortValue, setSortValue] = useState<any>({
    field: "",
    direction: "",
  });

  const searchValueChanged = (e: any) => {
    setSearchValue(e.target.value);
  };

  useEffect(() => {
    if (searchValue === "") {
      getList(1);
    }
  }, [searchValue]);

  useEffect(() => {
    if (sortValue.label) {
      getList(1);
    }
  }, [sortValue]);

  const getList = useCallback(
    async (page: number) => {
      window.scrollTo({ top: 500, behavior: "smooth" });
      try {
        const resp: any = await axios.get(
          `https://api.searchspring.net/api/search/search.json?siteId=scmq7n&q=${searchValue}&sort.${sortValue.field}=${sortValue.direction}&resultsFormat=native&page=${page}`
        );
        resp?.data?.results?.forEach((item: any) => {
          item.isSale = false;
          item.badges.forEach((subItem: any) => {
            if (subItem["tag"] === "sale") {
              item.isSale = true;
            }
          });
        });
        setTotalPages(resp.data.pagination.totalPages);
        setProductData(resp?.data?.results);
        setSortOptions(resp?.data?.sorting?.options);
        setPage(page);
      } catch (err) {
        alert(err);
      }
    },
    [searchValue, sortValue]
  );

  const handleKeyDown = (e: any) => {
    if (e.key === "Enter") getList(1);
  };

  const sortUpdated = (selectedOption: any) => {
    setSortValue(selectedOption);
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
                onKeyDown={handleKeyDown}
                slotProps={{
                  input: {
                    endAdornment: (
                      <div
                        onClick={() => getList(1)}
                        style={{
                          background: "#1976d2",
                          padding: "6px 8px",
                          borderRadius: "6px",
                          cursor: "pointer",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          marginRight: "-14px",
                        }}
                      >
                        <SearchIcon style={{ color: "white" }} />
                      </div>
                    ),
                  },
                }}
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
      <ProductList
        productList={productData}
        sortOptions={sortOptions}
        page={page}
        totalPages={totalPages}
        getList={getList}
        setPage={setPage}
        sortUpdated={sortUpdated}
      />
    </div>
  );
};
export default Dashboard;
