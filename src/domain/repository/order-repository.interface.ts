import Order from "../entity/order";
import RepositoryInterface from "./repositroy-interface";

export default interface OrderRepositoryInterface
  extends RepositoryInterface<Order> {}
