import { RedisClient } from '../src';

const config = {
    host: '192.168.1.161',
    port: 6379,
    password: null,
    db: 0,
    ttl: 5,
};

beforeEach((done) => {
    RedisClient.connect(config)
    done()
});

afterAll(async () => {
    RedisClient.getInstance().disconnect();
});


test('should set success', async (done) => {
    let result = await RedisClient.getInstance().set('foo', 'bar')
    let pos = await RedisClient.getInstance().del('foo')
    expect(result).toEqual('OK');
    done()
});
