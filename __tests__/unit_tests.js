const User = require('../api/users/users-model');
const db = require('../data/db-config');

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

describe('______ GET ALL ______', ()=>{
    test('[1] gets all users', async ()=> {
        const users = await User.getAll();
        expect(users).toHaveLength(2);
        expect(users[0]).toHaveProperty('username','Emre');
        expect(users[1]).toHaveProperty('username','Erdem');
        expect(users[0]).toHaveProperty('role_name','Admin');
        expect(users[0]).toMatchObject({id:1,username:'Emre',role_name: 'Admin'});
    })
})

describe('______ GET BY ID ______', ()=>{
    test('[2] gets the user id:1', async ()=> {
        const user = await User.getById(1);
        expect(user).toMatchObject({id:1,username:'Emre',role_name: 'Admin'});
    })
})

describe('______ GET BY FILTER ______', ()=>{
    test('[3] gets filtered users by username', async ()=> {
        const users = await User.getByFilter({username: 'Emre'});
        expect(users[0]).toMatchObject({id:1,username:'Emre',role_name: 'Admin'});
    })
    test('[4] gets filtered users by rolename', async ()=> {
        const users = await User.getByFilter({role_name: 'Admin'});
        expect(users[0]).toMatchObject({id:1,username:'Emre',role_name: 'Admin'});
        expect(users).toHaveLength(1);
    })
})

describe('______ CREATE ______', ()=>{
    test('[5] creates a new user successfully', async ()=> {
        const newUser = {username: 'Halil', password: "1234", role: 'Admin'};
        await User.create(newUser);
        const recordedUser = await db('Users')
                                .where('username', 'Halil')
                                .first();
        expect(recordedUser).toHaveProperty('username', 'Halil');
        expect(recordedUser).toHaveProperty('id', 3);
    })
})


describe('______ DELETE ______', ()=>{
    test('[6] deletes a user by id', async ()=> {
        await User.remove(2);
        const users = await db('Users');
        expect(users).toHaveLength(1);
    })
})