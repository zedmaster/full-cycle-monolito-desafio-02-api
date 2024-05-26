import { response } from 'express';
import { app, sequelize } from '../express'
import request from 'supertest'


describe('E2E test invoice', () => {
    beforeAll(async () => {
        await sequelize.sync({ force: true });
        sequelize.connectionManager.initPools();
    });


    afterAll(async () => {
        await sequelize.close();
    });


    it('should find invoice', async () => {
        const client = await request(app)
            .post('/clients')
            .send({
                "id": "1",
                "name": "John",
                "email": "john@email",
                "document": "123",
                "address": {
                    "street": "Street1",
                    "number": "1",
                    "city": "City1",
                    "zipCode": "123",
                    "state": "State1",
                    "complement": "Complement1"
                }
            });
        const product = await request(app)
            .post('/products')
            .send({
                "id": "1",
                "name": "Product1",
                "description": "Description1",
                "purchasePrice": 100,
                "stock": 10
            });
            
        const checkout = await request(app)
            .post('/checkout')
            .send({
                "clientId": "1",
                "products": [
                    {
                        "productId": "1"
                    }
                ]
            });
        const response = await request(app)
            .get(`/invoice/${checkout.body.invoiceId}`)
            .send();
        expect(response.body.id).toBeDefined();
        expect(response.body.name).toBe('John')
        expect(response.body.items.length).toBe(1)
        expect(response.body.total).toBe(100)
    }, 50000);

});