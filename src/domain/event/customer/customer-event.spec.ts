import Address from "../../entity/address";
import Customer from "../../entity/customer";
import EventDispatcher from "../@shared/event-dispatcher";
import CustomerCreatedEvent from "./customer-created.event";
import CustomerAddressChangedEvent from "./customer-address-changed.event";
import EnviaConsoleLogHandler from "./handler/handler/envia-console-log.handler";
import EnviaConsoleLog1Handler from "./handler/handler/envia-console-log1.handler";
import EnviaConsoleLog2Handler from "./handler/handler/envia-console-log2.handler";

describe("Customer Domain events tests", () => {
  it("should register an customer created event handler", () => {
    const eventDispatcher = new EventDispatcher();
    const eventHandler = new EnviaConsoleLog1Handler();
    const eventHandler2 = new EnviaConsoleLog2Handler();
    const spyEventHandler = jest.spyOn(eventHandler, "handle");
    const spyEventHandler2 = jest.spyOn(eventHandler2, "handle");

    eventDispatcher.register("CustomerCreatedEvent", eventHandler);
    eventDispatcher.register("CustomerCreatedEvent", eventHandler2);

    expect(
      eventDispatcher.getEventHandlers["CustomerCreatedEvent"]
    ).toBeDefined();
    expect(
      eventDispatcher.getEventHandlers["CustomerCreatedEvent"].length
    ).toBe(2);
    expect(
      eventDispatcher.getEventHandlers["CustomerCreatedEvent"][0]
    ).toMatchObject(eventHandler);
    expect(
      eventDispatcher.getEventHandlers["CustomerCreatedEvent"][1]
    ).toMatchObject(eventHandler2);

    const customerCreatedEvent = new CustomerCreatedEvent({});

    eventDispatcher.notify(customerCreatedEvent);

    expect(spyEventHandler).toHaveBeenCalled();
    expect(spyEventHandler2).toHaveBeenCalled();
  });

  it("should unregister an customer created event handler", () => {
    const eventDispatcher = new EventDispatcher();
    const eventHandler = new EnviaConsoleLog1Handler();
    const eventHandler2 = new EnviaConsoleLog2Handler();

    eventDispatcher.register("CustomerCreatedEvent", eventHandler);
    eventDispatcher.register("CustomerCreatedEvent", eventHandler2);

    expect(
      eventDispatcher.getEventHandlers["CustomerCreatedEvent"][0]
    ).toMatchObject(eventHandler);
    expect(
      eventDispatcher.getEventHandlers["CustomerCreatedEvent"][1]
    ).toMatchObject(eventHandler2);

    eventDispatcher.unregister("CustomerCreatedEvent", eventHandler);

    expect(
      eventDispatcher.getEventHandlers["CustomerCreatedEvent"]
    ).toBeDefined();
    expect(
      eventDispatcher.getEventHandlers["CustomerCreatedEvent"].length
    ).toBe(1);
    expect(
      eventDispatcher.getEventHandlers["CustomerCreatedEvent"][0]
    ).toMatchObject(eventHandler2);

    eventDispatcher.unregister("CustomerCreatedEvent", eventHandler);

    expect(
      eventDispatcher.getEventHandlers["CustomerCreatedEvent"].length
    ).toBe(1);
    expect(
      eventDispatcher.getEventHandlers["CustomerCreatedEvent"][0]
    ).toMatchObject(eventHandler2);
  });

  it("should notify an customer changed event", () => {
    const eventDispatcher = new EventDispatcher();
    const eventHandler = new EnviaConsoleLogHandler();
    const spyEventHandler = jest.spyOn(eventHandler, "handle");

    const customer = new Customer("123", "Rodrigo");
    const address = new Address("Rua 1-1", 123, "80020280", "Curitiba");
    customer.changeAddress(address);

    eventDispatcher.register("CustomerAddressChangedEvent", eventHandler);

    const customerAddressChangedEvent = new CustomerAddressChangedEvent({
      id: customer.id,
      name: customer.name,
      address: customer.address,
    });

    eventDispatcher.notify(customerAddressChangedEvent);

    expect(spyEventHandler).toHaveBeenCalled();
  });
});
