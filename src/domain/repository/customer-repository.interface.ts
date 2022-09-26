import Customer from "../entity/customer";
import RepositoryInterface from "./repositroy-interface";

export default interface CustomerRepositoryInterface
  extends RepositoryInterface<Customer> {}
