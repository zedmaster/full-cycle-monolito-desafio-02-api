import { Sequelize } from "sequelize-typescript";
import StoreCatalogFacadeFactory from "../factory/facade.factory";
import ProductModel from "../repository/product.model";


describe("StoreCatalogFacade test", () => {
  let sequelize: Sequelize;


  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true },
    });

    await sequelize.addModels([ProductModel]);
    await sequelize.sync();
  });


  afterEach(async () => {
    await sequelize.close();
  });


  it("should find product", async () => {
    const facade = StoreCatalogFacadeFactory.create();
    await ProductModel.create({
      id: "1",
      name: "Product1",
      description: "Description1",
      purchasePrice: 100,
    });

    const result = await facade.find({ id: "1" });

    expect(result.id).toBe("1");
    expect(result.name).toBe("Product1");
    expect(result.description).toBe("Description1");
    expect(result.salesPrice).toBe(100);
  });


  it("should find all products", async () => {
    const facade = StoreCatalogFacadeFactory.create();
    await ProductModel.create({
      id: "1",
      name: "Product1",
      description: "Description1",
      purchasePrice: 100,
    });
    await ProductModel.create({
      id: "2",
      name: "Product2",
      description: "Description2",
      purchasePrice: 200,
    });

    const result = await facade.findAll();

    expect(result.products.length).toBe(2);
    expect(result.products[0].id).toBe("1");
    expect(result.products[0].name).toBe("Product1");
    expect(result.products[0].description).toBe("Description1");
    expect(result.products[0].salesPrice).toBe(100);
    expect(result.products[1].id).toBe("2");
    expect(result.products[1].name).toBe("Product2");
    expect(result.products[1].description).toBe("Description2");
    expect(result.products[1].salesPrice).toBe(200);
  });
});