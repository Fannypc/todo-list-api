const app = require('../server') // Link to your server file
const supertest = require('supertest')
const { sequelize } = require('../models')
const request = supertest(app)


let token;

beforeAll(async(done)=>{
    await sequelize.sync({force:true, logging: console.log});
    request
    .post('/api/v1/register')
    .send({
      first_name: 'Jhon', 
      last_name: 'Doe', 
      email: 'jhon@gmail.com', 
      password: '1234'
    })
    .end((err,response)=>{
        token = response.body.token;
        done();
    });
});

describe('User Endpoints', () => {
    it('Should do login', async () => {
      const res = await request
        .post('/api/v1/login')
        .send({
            email: 'jhon@gmail.com',
            password: '1234'
        })
      expect(res.statusCode).toEqual(200);
    })
    it('Create new user', async () => {
      const res = await request
        .post('/api/v1/register')
        .send({
            first_name: 'Mary', 
            last_name: 'Doe', 
            email: 'mary@gmail.com', 
            password: '1234'
        })
      expect(res.statusCode).toEqual(200);
    })
    it('Should do logout', async()=>{
      const res = await request
      .post('/api/v1/logout')
      .set('Authorization', `Bearer ${token}`)
      expect(res.body.message).toEqual('Cerrando sesión...')
    })
  })

afterAll(done => {
    sequelize.close();
    done();
});
