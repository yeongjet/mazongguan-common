import { ServerClient } from '../src';

const config = {
    port: 6379,
    middlewares: [],
    effects: []
};

test('should listen and close success', async () => {
    await expect(ServerClient.listen(config)).resolves.toBeUndefined()
    await expect(ServerClient.close()).resolves.toBeUndefined()
});
