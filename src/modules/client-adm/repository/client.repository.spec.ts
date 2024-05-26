import { Sequelize } from "sequelize-typescript";
import Id from "../../@shared/domain/value-object/id.value-object";
import Client from "../domain/client.entity";
import AddressClientDto from "../domain/value-object/address-client.dto";
import ClientModel from "./client.model";
import ClientRepository from "./client.repository";


describe("ClientRepository test", () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true },
    });


    await sequelize.addModels([ClientModel]);
    await sequelize.sync();
  });


  afterEach(async () => {
    await sequelize.close();
  });


  it("should create client", async () => {
    const client = new Client({
      id: new Id("1"),
      name: "John",
      email: "john@email",
      document:"123",
      address: new AddressClientDto('Street1', '1', 'City1', '123', 'State1', 'Complement1'),
    });

    const repository = new ClientRepository();
    await repository.add(client);

    const clientDb = await ClientModel.findOne({ where: { id: "1" } });

    expect(clientDb).toBeDefined();
    expect(clientDb.id).toBe(client.id.id);
    expect(clientDb.name).toBe(client.name);
    expect(clientDb.email).toBe(client.email);
    expect(clientDb.document).toBe(client.document);
    expect(clientDb.createdAt).toStrictEqual(client.createdAt);
    expect(clientDb.updatedAt).toStrictEqual(client.updatedAt);
  });


  it("should find client", async () => {
    const client = await ClientModel.create({
      id: "1",
      name: "John",
      email: "john@email",
      document:"123",
      street: 'Street1',
      state: 'State1',
      complement: 'Complement1',
      zipCode: '123',
      number: '1',
      city: 'City1',
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    const repository = new ClientRepository();
    const result = await repository.find(client.id);

    expect(result.id.id).toEqual(client.id);
    expect(result.name).toEqual(client.name);
    expect(result.email).toEqual(client.email);
    expect(result.document).toEqual(client.document);
    expect(result.createdAt).toStrictEqual(client.createdAt);
    expect(result.updatedAt).toStrictEqual(client.updatedAt);
  });
});