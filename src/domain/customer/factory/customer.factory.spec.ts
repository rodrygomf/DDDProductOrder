import Address from "../value-object/address";
import CustomerFactory from "./customer.factory";

describe("Customer factory unit test", () => {
  it("should create a customer", () => {
    const customer = CustomerFactory.create("Rodrigo");

    expect(customer.id).toBeDefined();
    expect(customer.name).toBe("Rodrigo");
    expect(customer.address).toBeUndefined();
  });

  it("should create a customer with address", () => {
    const address = new Address("Street", 1, "13330-250", "São Paulo");
    const customer = CustomerFactory.createWithAddress("Rodrigo", address);

    expect(customer.id).toBeDefined();
    expect(customer.name).toBe("Rodrigo");
    expect(customer.address).toBe(address);
  });
});
