import { Sequelize } from "sequelize-typescript";
import Id from "../../@shared/domain/value-object/id.value-object";
import AddressClientDto from "../domain/value-object/address-client.dto";
import ClientAdmFacadeFactory from "../factory/client-adm.facade.factory";
import ClientModel from "../repository/client.model";


describe("ClientAdmFacade test", () => {
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
    const facade =  ClientAdmFacadeFactory.create();

    const input = {
      id: new Id('1'),
      name: 'John',
      document: '123',
      email: 'john@email',
      address: new AddressClientDto(
        'Street1', 
        '1', 
        'City1', 
        '123', 
        'State1', 
        'Complement1')
    };

    await facade.add(input);
    const client = await ClientModel.findOne({ where: { id: '1' }});

    expect(client).toBeDefined();
    expect(client.id).toEqual('1');
    expect(client.name).toBe('John');
    expect(client.email).toBe('john@email');
    expect(client.city).toStrictEqual(input.address.city);
  });


  it('should find client',async () => {
    await ClientModel.create({
        id: '1',
        name: 'John',
        email: 'john@email',
        document: '123',
        street: 'Street1',
        state: 'State1',
        complement: 'Complement1',
        zipCode: '123',
        number: '1',
        city: 'City1',
        createdAt: new Date(),
        updatedAt: new Date(),
    });

    const clientFacade = ClientAdmFacadeFactory.create();
    const result = await clientFacade.find({id: '1'});
    expect(result).toBeDefined();
    expect(result.id).toBe('1');
    expect(result.name).toBe('John');
    expect(result.email).toBe('john@email');
    expect(result.address.city).toBe('City1');
})
});
