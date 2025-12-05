import { useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { useEffect } from "react";
import axios from "axios";
import "./productList.css";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

const ProductList = (props: any) => {
  const { searchValue } = props;
  const [productList, setProductList] = useState<any>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    setPage(1);
    getList();
  }, [searchValue]);

  useEffect(() => {
    getList();
  }, [page]);

  const getList = async () => {
    try {
      const resp: any = await axios.get(
        `https://api.searchspring.net/api/search/search.json?siteId=scmq7n&q=${searchValue}&resultsFormat=native&page=${page}`
      );
      resp.data.results.forEach((item: any) => {
        item.isSale = false;
        item.badges.forEach((subItem: any) => {
          if (subItem["tag"] === "sale") {
            item.isSale = true;
          }
        });
      });
      setTotalPages(resp.data.pagination.totalPages);
      setProductList(resp?.data?.results);
    } catch (err) {
      alert(err);
    }
  };

  const trimDescription = (des: string) => {
    return Array.from(des).splice(0, 100).join("") + "...";
  };

  const discount = (item: any) => {
    return Math.round(((item.msrp - item.price) / item.msrp) * 100);
  };

  const handlePageChange = (event: any, value: number) => {
    setPage(value);
    window.scrollTo({ top: 500, behavior: "smooth" });
  };

  return (
    <div className="text-center mt-3">
      <h3>Explore Our Awesome Products</h3>
      <div className="pagination">
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
          productList.map((item: any) => {
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
                      <button className="add-to-cart-btn">Add to Cart</button>
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
  );
};
export default ProductList;
