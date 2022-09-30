import Order from "../entity/order";
import RepositoryInterface from "../../@shared/repository/repositroy-interface";

export default interface OrderRepositoryInterface
  extends RepositoryInterface<Order> {}
