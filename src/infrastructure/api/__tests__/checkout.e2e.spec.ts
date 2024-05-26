import { app, sequelize } from '../express'
import request from 'supertest'


describe('E2E test for checkout', () => {
    beforeAll(async () => {
        await sequelize.sync({ force: true });
        sequelize.connectionManager.initPools();
    });


    afterAll(async () => {
        await sequelize.close();
    });


    it('should create checkout', async () => {
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
            
        const response = await request(app)
            .post('/checkout')
            .send({
                "clientId": "1",
                "products": [
                    {
                        "productId": "1"
                    }
                ]
            });
      
        expect(response.status).toBe(200);
        expect(response.body.id).toBeDefined
        expect(response.body.invoiceId).toBeDefined
        expect(response.body.status).toBe('approved')
    }, 50000)

});