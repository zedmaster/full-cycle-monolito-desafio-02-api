import { app, sequelize } from '../express'
import request from 'supertest'


describe('E2E test for client', () => {
    beforeEach(async () => {
        await sequelize.sync({ force: true });
    });


    afterAll(async () => {
        await sequelize.close();
    });


    it('should create a client', async () => {
        const response = await request(app)
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
        expect(response.status).toBe(200);
        expect(response.body.id).toBe('1');
        expect(response.body.name).toBe('John');
        expect(response.body.email).toBe('john@email');
        expect(response.body.address._street).toBe('Street1');
        expect(response.body.address._number).toBe('1');
        expect(response.body.address._city).toBe('City1');
    });
});