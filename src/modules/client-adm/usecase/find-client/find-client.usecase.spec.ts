import Id from "../../../@shared/domain/value-object/id.value-object";
import Client from "../../domain/client.entity";
import AddressClientDto from "../../domain/value-object/address-client.dto";
import FindClientUseCase from "./find-client.usecase";


const client = new Client({
  id: new Id("1"),
  name: "John",
  email: "john@email",
  document: "123",
  address: new AddressClientDto('Street1', '1', 'City1', '123', 'State1', 'Complement1'),
});


const MockRepository = () => {
  return {
    add: jest.fn(),
    find: jest.fn().mockReturnValue(Promise.resolve(client)),
  };
};


describe("Find Client Usecase unit test", () => {

  it("should find client", async () => {
    const repository = MockRepository();
    const usecase = new FindClientUseCase(repository);

    const input = {
      id: "1",
    };

    const result = await usecase.execute(input);

    expect(repository.find).toHaveBeenCalled();
    expect(result.id).toEqual(input.id);
    expect(result.name).toEqual(client.name);
    expect(result.email).toEqual(client.email);
    expect(result.address.city).toEqual(client.address.city);
    expect(result.createdAt).toEqual(client.createdAt);
    expect(result.updatedAt).toEqual(client.updatedAt);
  });
});