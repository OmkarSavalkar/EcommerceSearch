import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import "./productList.css";
import React, { useState } from "react";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import type { SelectChangeEvent } from "@mui/material/Select";
import type {
  ISortOptions,
  IProductData,
} from "../../interfaces/productList.interface.ts";

interface IProps {
  productList: IProductData[];
  sortOptions: ISortOptions[];
  page: number;
  totalPages: number;
  getList: (page: number) => void;
  setPage: (page: number) => void;
  sortUpdated: (selectedOption: ISortOptions) => void;
}

const ProductList = (props: IProps) => {
  const {
    productList,
    sortOptions,
    page,
    totalPages,
    getList,
    setPage,
    sortUpdated,
  } = props;
  const [selectedSortValue, setSelectedSortValue] = useState<string>("");

  const trimDescription = (des: string) => {
    return Array.from(des).splice(0, 100).join("") + "...";
  };

  const discount = (item: IProductData) => {
    return Math.round(
      ((Number(item.msrp) - Number(item.price)) / Number(item.msrp)) * 100
    );
  };

  const handlePageChange = (
    _event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setPage(value);
    getList(value);
  };

  const handleSortChanged = (e: SelectChangeEvent) => {
    setSelectedSortValue(e.target.value);
    let selectedOption: ISortOptions = sortOptions.find(
      (item: ISortOptions) => item.label === e.target.value
    )!;
    sortUpdated(selectedOption);
  };

  return (
    <div className="text-center mt-3">
      <h3>Explore Our Awesome Products</h3>
      {productList && productList.length === 0 ? (
        <div className="my-3 fw-bold">No results found !</div>
      ) : (
        <div>
          <div className="pagination">
            <FormControl sx={{ width: 250 }}>
              <InputLabel
                sx={{
                  "&.MuiInputLabel-root": {
                    top: "50%",
                    left: 15,
                    transform: "translateY(-50%)",
                  },
                  "&.MuiInputLabel-shrink": {
                    top: 0,
                    left: 15,
                    transform: "translateY(-50%) scale(0.75)",
                  },
                }}
              >
                Sort By
              </InputLabel>
              <Select
                value={selectedSortValue}
                label="Sort By"
                onChange={handleSortChanged}
                sx={{
                  "& .MuiSelect-select": {
                    padding: "8px !important",
                  },
                }}
              >
                {" "}
                {sortOptions &&
                  sortOptions.map((option: ISortOptions) => {
                    return (
                      <MenuItem value={option.label}>{option.label}</MenuItem>
                    );
                  })}
              </Select>
            </FormControl>
            <Stack spacing={2}>
              <Pagination
                count={totalPages}
                page={page}
                onChange={handlePageChange}
                variant="outlined"
                shape="rounded"
              />
            </Stack>
          </div>
          <div className="d-flex flex-wrap justify-content-center align-items-center gap-3 ">
            {productList &&
              productList.map((item: IProductData) => {
                return (
                  <Card
                    sx={{ width: 300, height: 500 }}
                    key={item.uid}
                    className="item-card"
                  >
                    {item && item.isSale ? (
                      <div className="onSale-badge">On Sale</div>
                    ) : (
                      <div className="bestseller-badge">Bestseller</div>
                    )}

                    <CardMedia
                      component="img"
                      alt="green iguana"
                      height="250"
                      image={item.thumbnailImageUrl}
                    />
                    <CardContent>
                      <Typography className="item-name">{item.name}</Typography>
                      <Typography
                        sx={{ color: "text.secondary" }}
                        className="item-description"
                      >
                        {trimDescription(item.description)}
                      </Typography>
                      <section>
                        <div className="d-flex justify-content-between align-items-center mt-5">
                          <div className="discount-badge">
                            {discount(item)}% OFF
                          </div>
                          <div className="text-muted mr-2">
                            ⭐ ({item.ratingCount} reviews)
                          </div>
                        </div>

                        <div className="d-flex justify-content-between align-items-center mt-1 mb-2">
                          <div>
                            <span className="text-success item-price">
                              ${item.price}
                            </span>
                            <span className="text-muted text-decoration-line-through">
                              ${item.msrp}
                            </span>
                          </div>
                          <button className="add-to-cart-btn">
                            Add to Cart
                          </button>
                        </div>
                      </section>
                    </CardContent>
                  </Card>
                );
              })}
          </div>
          <div className="pagination mb-3">
            <Stack spacing={2}>
              <Pagination
                count={totalPages}
                page={page}
                onChange={handlePageChange}
                variant="outlined"
                shape="rounded"
              />
            </Stack>
          </div>
        </div>
      )}
    </div>
  );
};
export default React.memo(ProductList);
