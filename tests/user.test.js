const app = require('../server')
const supertest = require('supertest')
const { sequelize } = require('../models')
const request = supertest(app)

let token;
let userId; 

beforeAll((done)=>{
    request
    .post('/api/v1/register')
    .send({
      first_name: 'Edna', 
      last_name: 'Doe', 
      email: 'edna@gmail.com', 
      password: '1234'
    })
    .end((err,response)=>{
        token = response.body.token;
        userId = response.body.user.id;
        done();
    });
});

describe('User Endpoints', () => {
    it('Get all users', async () => {
      const res = await request
        .get('/api/v1/users')
        .set('Authorization', `Bearer ${token}`)
        expect(res.statusCode).toEqual(200)
    })
    it('Get user by id', async () => {
      const res = await request
        .get('/api/v1/users/'+userId)
        .set('Authorization', `Bearer ${token}`)
        expect(res.statusCode).toEqual(200);
    })
    it('Get user with tasks', async () => {
        const res = await request
          .get('/api/v1/users/'+userId+'/tasks')
          .set('Authorization', `Bearer ${token}`)
          expect(res.statusCode).toEqual(200)
          expect(res.body).toHaveProperty('user.tasks')
    })
    it('Update user', async () => {
        const res = await request
          .put('/api/v1/users/'+userId)
          .set('Authorization', `Bearer ${token}`)
          .send({
            first_name: 'Jane'
          })
          expect(res.statusCode).toEqual(200)
          expect(res.body.first_name).toEqual('Jane')
    })
    it('Delete user', async () => {
        const res = await request
          .delete('/api/v1/users/'+userId)
          .set('Authorization', `Bearer ${token}`)
          expect(res.statusCode).toEqual(400)
          expect(res.body.message).toEqual('No se ha podido desactivar la cuenta')
    })
})

afterAll(done => {
    sequelize.close();
    done();
});
