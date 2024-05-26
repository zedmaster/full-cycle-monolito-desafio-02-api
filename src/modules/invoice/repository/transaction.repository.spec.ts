import Id from "../../@shared/domain/value-object/id.value-object";
import Address from "../domain/address.entity";
import Invoice from "../domain/invoice";
import Product from "../domain/product.entity";
import InvoiceItemModel from "./transaction.item.model";
import InvoiceModel from "./transaction.model";
import InvoiceRepository from "./transaction.repository";
import { Sequelize } from "sequelize-typescript";


describe("InvoiceRepository test", () => {
    let sequelize: Sequelize;

    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: "sqlite",
            storage: ":memory:",
            logging: false,
            sync: { force: true }
        });
        await sequelize.addModels([InvoiceModel, InvoiceItemModel]);
        await sequelize.sync();
    });


    afterEach(async () => {
        await sequelize.close();
    });


    it("should create invoice", async () => {
        const invoice = new Invoice({
            id: new Id("1"),
            name: "John",
            document: "123",
            address: new Address({
                street: "Street1",
                number: "1",
                complement: "Complement1",
                city: "City1",
                state: "State1",
                zipCode: "123"
            }),
            items: [
                new Product({
                id: new Id("1"),
                name: "Item1",
                price: 100,
            }),
                new Product({
                id: new Id("2"),
                name: "Item2",
                price: 200,
            })
            ]   
        });
        const repository = new InvoiceRepository();
        await repository.create(invoice);

        const resultFind = await InvoiceModel.findOne({
            where: { id: "1" },
            include: [InvoiceItemModel],
        });
        expect(resultFind).toBeDefined();
        expect(resultFind.id).toBe(invoice.id.id);
        expect(resultFind.name).toBe(invoice.name);
        expect(resultFind.document).toBe(invoice.document);
        expect(resultFind.street).toBe(invoice.address.street);
        expect(resultFind.number).toBe(invoice.address.number);
        expect(resultFind.complement).toBe(invoice.address.complement);
        expect(resultFind.city).toBe(invoice.address.city);
        expect(resultFind.state).toBe(invoice.address.state);
        expect(resultFind.zipCode).toBe(invoice.address.zipCode);

        expect(resultFind.items).toHaveLength(2);
        expect(resultFind.items[0].id).toBe(invoice.items[0].id.id);
        expect(resultFind.items[0].name).toBe(invoice.items[0].name);
        expect(resultFind.items[0].price).toBe(invoice.items[0].price);
        expect(resultFind.items[1].id).toBe(invoice.items[1].id.id);
        expect(resultFind.items[1].name).toBe(invoice.items[1].name);
        expect(resultFind.items[1].price).toBe(invoice.items[1].price);
        expect(resultFind.total).toBe(300);
    });


    it("should find invoice", async () => {
        const invoice = new Invoice({
            id: new Id("1"),
            name: "John",
            document: "123",
            address: new Address({
                street: "Street1",
                number: "1",
                complement: "Complement1",
                city: "City1",
                state: "State1",
                zipCode: "123"
            }),
            items: [
                new Product({
                id: new Id("1"),
                name: "Item1",
                price: 100,
            }),
                new Product({
                id: new Id("2"),
                name: "Item2",
                price: 200,
            })
            ]   
        });
        const repository = new InvoiceRepository();
        await repository.create(invoice);

        const resultFind = await repository.find(invoice.id.id);

        expect(resultFind).toBeDefined();
        expect(resultFind.id.id).toBe(invoice.id.id);
        expect(resultFind.name).toBe(invoice.name);
        expect(resultFind.document).toBe(invoice.document);
        expect(resultFind.address.street).toBe(invoice.address.street);
        expect(resultFind.address.number).toBe(invoice.address.number);
        expect(resultFind.address.complement).toBe(invoice.address.complement);
        expect(resultFind.address.city).toBe(invoice.address.city);
        expect(resultFind.address.state).toBe(invoice.address.state);
        expect(resultFind.address.zipCode).toBe(invoice.address.zipCode);
        
        expect(resultFind.items).toHaveLength(2);
        expect(resultFind.items[0].id.id).toBe(invoice.items[0].id.id);
        expect(resultFind.items[0].name).toBe(invoice.items[0].name);
        expect(resultFind.items[0].price).toBe(invoice.items[0].price);
        expect(resultFind.items[1].id.id).toBe(invoice.items[1].id.id);
        expect(resultFind.items[1].name).toBe(invoice.items[1].name);
        expect(resultFind.items[1].price).toBe(invoice.items[1].price);
        expect(resultFind.total).toBe(300);
    });
});