const chai = require('chai')
const chaiHttp = require('chai-http')
const server = require('../server');
const assert = require('assert')

chai.use(chaiHttp);
chai.should();

describe('Signup', function () {
    it('/api/signup /POST Can Signup for and create new account', function (done) {
        chai.request(server)
            .post('/api/signup')
            .set('content-type', 'application/x-www-form-urlencoded')
            .send({
                email: 'me@gmail.com',
                password: '123'
            })
            .end((err, res) => {
                res.should.have.status(200);
                //res.text.should.be('/members');
                done()
            })
    });
    it('/api/login /POST Should login and return status', function (done) {
        chai.request(server)
            .post('/api/login')
            .set('content-type', 'application/x-www-form-urlencoded')
            .send({
                email: 'me@gmail.com',
                password: '123'
            })
            .end((err, res) => {
                res.should.have.status(200);
                done()
            })
    });
    it('/api/login /POST Should not be able to login and return unauthorized status', function (done) {
        chai.request(server)
            .post('/api/login')
            .set('content-type', 'application/x-www-form-urlencoded')
            .send({
                email: 'me@gmail.com',
                password: 'dddddddd'
            })
            .end((err, res) => {
                res.should.have.status(401);
                done()
            })
    });
    it('/api/login /POST Should not be able to login and return unauthorized status', function (done) {
        var agent = chai.request.agent(server)
        agent.post('/api/login')
            .set('content-type', 'application/x-www-form-urlencoded')
            .send({
                email: 'me@gmail.com',
                password: '123'
            })
            .then(function (res) {
                res.should.have.status(200);
                agent.get('/api/user_data').then(function (res) {
                    res.should.have.status(200);
                    //assert(res.body.email).to.be('me@gmail.com')
                    done()
                })

            });
    });
});