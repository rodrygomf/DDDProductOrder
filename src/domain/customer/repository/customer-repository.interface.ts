import Customer from "../entity/customer";
import RepositoryInterface from "../../@shared/repository/repositroy-interface";

export default interface CustomerRepositoryInterface
  extends RepositoryInterface<Customer> {}
