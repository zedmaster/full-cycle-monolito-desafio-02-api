import { Sequelize } from "sequelize-typescript";
import ProductModel from "./product.model";
import ProductRepository from "./product.repository";
import Id from "../../@shared/domain/value-object/id.value-object";
import Product from "../domain/product.entity";


describe("ProductRepository test", () => {
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


  it("should find all products", async () => {
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


    const productRepository = new ProductRepository();
    const products = await productRepository.findAll();

    expect(products.length).toBe(2);
    expect(products[0].id.id).toBe("1");
    expect(products[0].name).toBe("Product1");
    expect(products[0].description).toBe("Description1");
    expect(products[0].salesPrice).toBe(100);

    expect(products[1].id.id).toBe("2");
    expect(products[1].name).toBe("Product2");
    expect(products[1].description).toBe("Description2");
    expect(products[1].salesPrice).toBe(200);
  });


  it("should find product", async () => {
    await ProductModel.create({
      id: "1",
      name: "Product1",
      description: "Description1",
      purchasePrice: 100,
    });


    const productRepository = new ProductRepository();
    const product = await productRepository.find("1");

    expect(product.id.id).toBe("1");
    expect(product.name).toBe("Product1");
    expect(product.description).toBe("Description1");
    expect(product.salesPrice).toBe(100);
  });
});