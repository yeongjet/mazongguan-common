import Redis from 'ioredis'

interface Config {
    port?: number
    host?: string
    options?: Redis.RedisOptions
}

export class RedisClient extends Redis {
    private static instance: RedisClient

    constructor(config: Config) {
        super(config)
    }

    static create(config: Config) {
        if (this.instance) {
            this.instance.disconnect()
        }
        this.instance = new RedisClient(config)
    }

    static getInstance(): RedisClient {
        return this.instance
    }
}
