export type ProductId = string | number;
export interface Product {
  id: ProductId;
  product_name: string;
  product_company: number;
  logo: string;
  created_by: string;
  modified_by: string;
  modified_on: string;
  languages: string;
  description: string;
}
