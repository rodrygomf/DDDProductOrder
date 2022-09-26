import Product from "../entity/product";
import RepositoryInterface from "./repositroy-interface";

export default interface ProductRepositoryInterface
  extends RepositoryInterface<Product> {}
