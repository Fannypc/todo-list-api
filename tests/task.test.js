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
      first_name: 'Tom', 
      last_name: 'Doe', 
      email: 'tom@gmail.com', 
      password: '1234'
    })
    .end((err,response)=>{
        token = response.body.token;
        userId = response.body.user.id;
        done();
    });
});

describe('Task Endpoints', () => {
      it('Get all tasks', async () => {
        const res = await request
          .get('/api/v1/tasks')
          .set('Authorization', `Bearer ${token}`)
          expect(res.statusCode).toEqual(200);
      })
})

afterAll(done => {
    sequelize.close();
    done();
});
