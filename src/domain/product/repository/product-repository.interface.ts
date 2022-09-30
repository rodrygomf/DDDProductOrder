import Product from "../entity/product";
import RepositoryInterface from "../../@shared/repository/repositroy-interface";

export default interface ProductRepositoryInterface
  extends RepositoryInterface<Product> {}
