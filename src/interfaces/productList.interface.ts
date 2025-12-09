export interface IProductData {
  addToCartUrl: string;
  badges: IBadges[];
  brand: string;
  color: string[];
  color_family: string[];
  condition: string[];
  description: string;
  gross_margin: string[];
  id: string;
  imageUrl: string;
  intellisuggestData: string;
  intellisuggestSignature: string;
  keywords: string[];
  material: string[];
  msrp: string;
  multi_colors: string[];
  name: string;
  on_sale: string[];
  popularity: string;
  price: string;
  product_type: string[];
  product_type_unigram: string;
  quantity_available: string[];
  rating: string;
  ratingCount: string;
  sale_price: string[];
  sales_rank: string[];
  size: string[];
  size_dress: string[];
  sku: string;
  ss_category_hierarchy: string[];
  ss_clicks: string[];
  ss_insights_quadrant: string[];
  ss_product_type: string[];
  ss_sale_price: string;
  thumbnailImageUrl: string;
  title: string[];
  uid: string;
  url: string;
  isSale?: boolean;
}

export interface IBadges {
  tag: string;
  value: string;
}

export interface ISortOptions {
  field: string;
  direction: string;
  label?: string;
}
