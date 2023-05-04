const request = require('supertest');
const server = require('../api/server');
const db = require('../data/db-config');
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config/config');

beforeAll(async ()=> {
    await db.migrate.rollback();
    await db.migrate.latest();
})

beforeEach(async ()=> {
    await db.seed.run();
})

test('sanity check', ()=>{
    expect(process.env.NODE_ENV).toBe("testing");
})

describe('______ SERVER RUNNING   ______', ()=> {
    test('[1] gets server running message', async ()=> {
        const res = await request(server).get('/');
        expect(res.body.message).toMatch(/up/);
        expect(res.body.message).toHaveLength(25);
    })
})


describe('______ AUTH   ______', ()=> {
    describe('/register', ()=>{
        test('[2] registers new user', async ()=> {
            const newUser = {username: 'Halil', password: '1234', role:'User'}
            const res = await request(server).post('/api/auth/register').send(newUser);
            expect(res.body).toHaveProperty('message', `Welcome to here ${newUser.username}...`);
            expect(res.status).toBe(201);
        })
    })
    
    describe('/login', ()=>{
        let res;
        const emreUser = {username: 'Emre', password: '1234'}

        beforeEach(async ()=> {
            res = await request(server).post('/api/auth/login').send(emreUser);
        })

        test('[3] user can login', async ()=> {
            expect(res.status).toBe(200);
        });
        test('[4] login returns token', async ()=> {
            expect(res.body).toHaveProperty('token');
        });
        test('[5] login returns valid token', async ()=> {
            let decoded;
            jwt.verify(res.body.token, JWT_SECRET, (err,decodedJWT)=> {
                decoded = decodedJWT;
            })
            expect(decoded.userId).toBeDefined();
            expect(decoded.userId).toBe(1);
        });

    })
    
})

describe('_________ USERS ________', ()=> {
    let res;
    let token;
    const erdemUser = {username: 'Erdem', password: '1234'};
    const emreUser = {username: 'Emre', password: '1234'}

    describe('ROLE: USER', ()=> {
        beforeEach(async ()=> {
            res = await request(server).post('/api/auth/login').send(erdemUser);
            token = res.body.token;
        })

        test('[6] can not get users', async ()=> {
            const res = await request(server).get('/api/user/').set('Authorization', token);
            expect(res.status).toBe(403);
            expect(res.body.message).toMatch(/izniniz yok/);
        })
    })
    describe('ROLE: ADMIN', ()=> {

        beforeEach(async ()=> {
            res = await request(server).post('/api/auth/login').send(emreUser);
            token = res.body.token;
        })

        test('[6] can get users', async ()=> {
            const res = await request(server).get('/api/user/').set('Authorization', token);
            expect(res.status).toBe(200);
            expect(res.body).toHaveLength(2);
        })
    })
})


describe('_________ SESSION VERSION ________', ()=> {
    let res;
    let cookie;
    const erdemUser = {username: 'Erdem', password: '1234'};
    const emreUser = {username: 'Emre', password: '1234'}
    beforeEach(async ()=> {
        res = await request(server).post('/api/auth/login').send(emreUser);
        cookieRaw = res.header["Set-Cookie"]
    })

    test('[6] can get users', async ()=> {
        const res = await request(server).get('/api/user/').set('Authorization', token);
        expect(res.status).toBe(200);
        expect(res.body).toHaveLength(2);
    })
})