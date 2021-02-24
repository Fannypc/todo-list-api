const app = require('../server')
const supertest = require('supertest')
const { sequelize } = require('../models')
const request = supertest(app)


let token;

beforeAll((done)=>{
    request
    .post('/api/v1/register')
    .send({
      first_name: 'Mark', 
      last_name: 'Doe', 
      email: 'mark@gmail.com', 
      password: '1234'
    })
    .end((err,response)=>{
        token = response.body.token;
        done();
    });
});

describe('Status Endpoints', () => {
    it('Get all status', async () => {
      const res = await request
        .get('/api/v1/status')
        .set('Authorization', `Bearer ${token}`)
        expect(res.statusCode).toEqual(200);
    })
  })

afterAll(done => {
    sequelize.close();
    done();
});
