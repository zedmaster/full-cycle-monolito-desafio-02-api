import {app, sequelize} from '../express'
import request from 'supertest'


describe('E2E test product', () => {
    beforeEach(async () => {
        await sequelize.sync({force: true});
    });


    afterAll(async () => {
        await sequelize.close();
    });


    it('should create product',async () => {
        const response = await request(app)
            .post('/products')
            .send({
                "id": "1",
                "name": "Product1",
                "description": "Description1",
                "purchasePrice": 100,
                "stock": 10
            });
        expect(response.status).toBe(200);
        expect(response.body.id).toBe('1');
        expect(response.body.name).toBe('Product1');
        expect(response.body.description).toBe('Description1');
        expect(response.body.purchasePrice).toBe(100);
        expect(response.body.createdAt).toBeDefined();
    })
})