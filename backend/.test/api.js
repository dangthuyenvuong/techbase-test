

process.env.ENVIRONMENT = 'test';


import chai from 'chai'
import chaiHttp from 'chai-http'
import mongoose from 'mongoose'
import config from '../src/config/database'
import app from '../src/app'


const tokenForever = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7InVzZXJUeXBlIjoiZ3Vlc3QiLCJfaWQiOiI2MDM4Yjg5YTBjOWY1NTUwNTg3ZDJkMzAiLCJ1c2VybmFtZSI6ImFkbWluIiwicGFzc3dvcmQiOiIzMjFmMzlkNmE2OWFkNjg1MzQ0MTdkNDIwNWI3ZjUyYyIsImNyZWF0ZWRBdCI6IjIwMjEtMDItMjZUMDk6MDA6MTAuNjEzWiIsInVwZGF0ZWRBdCI6IjIwMjEtMDItMjZUMDk6MDA6MTAuNjEzWiIsIl9fdiI6MCwiaWQiOiI2MDM4Yjg5YTBjOWY1NTUwNTg3ZDJkMzAifSwiaWF0IjoxNjE0MzMwMjY1LCJleHAiOjE2MTQzMzM4NjV9.gQaJDs01R2Lh2QxOlofPoB9NkdkgB1XuoOEBpXCAOKc";

// Assertion Style
chai.should()

chai.use(chaiHttp)

function connect() {
    return new Promise((resolve, reject) => {

        mongoose.connect(config.mongo.url, { useNewUrlParser: true, useCreateIndex: true })
            .then((_res, err) => {
                if (err) return reject(err);
                resolve();
            })

    })
}

function close() {
    return mongoose.disconnect();
}

describe('Tasks API', () => {
    before((done) => {
        connect()
            .then(() => done())
            .catch((err) => done(err));
    })

    after((done) => {
        close()
            .then(() => done())
            .catch((err) => done(err));
    })


    // GET ALL

    describe('GET /user', () => {
        it('GET all the users', (done) => {
            chai.request(app)
                .get('/user')
                .end((err, res) => {
                    res.should.have.status(200)
                    res.body.should.have.property('data')
                    res.body.should.have.property('paginate')
                    done()
                })

        })
    });

    // GET 1

    describe('GET /user/:id', () => {
        it('GET 1 users /user/:id', (done) => {
            chai.request(app)
                .get('/user/603878fed3580e08542a6f97')
                .end((err, res) => {
                    res.should.have.status(200)
                    res.body.should.have.property('data')
                    done()
                })

        })
    });


    // UPDATE

    describe('PUT /user/:id', () => {
        it('Update 1 users /user/:id', (done) => {
            const user = {
                firstName: 'Đặng Thuyền',
                lastName: 'Vương'
            }
            chai.request(app)
                .put('/user/60387915e97ecb57680181e7')
                .set('Authorization', `Bearer ${tokenForever}`)
                .send(user)
                .end((err, res) => {
                    res.should.have.status(200)
                    res.body.should.have.nested.property('data.nModified', 0)
                    done()
                })

        })
    });

    // CREATE

    describe('POST /user', () => {
        it('Create 1 users /user', (done) => {
            const user = {
                "lastName": "Vuong",
                "firstName": "Đặng Thuyền",
                "team": "6038b95200826737e840f063",
                "userType": "staff",
                "department": "6038b8e500826737e840f05f"
            }
            chai.request(app)
                .post('/user')
                .set('Authorization', `Bearer ${tokenForever}`)
                .send(user)
                .end((err, res) => {
                    res.should.have.status(201)
                    res.body.should.have.nested.property('data.firstName', 'Đặng Thuyền')
                    done()
                })

        })
    });

    // DELETE

    describe('DELETE /user/:id', () => {
        it('Delete 1 users /user/:id', (done) => {

            chai.request(app)
                .delete('/user/603878fed3580e08542a6f97')
                .set('Authorization', `Bearer ${tokenForever}`)
                .end((err, res) => {
                    res.should.have.status(200)
                    done()
                })

        })
    });
})