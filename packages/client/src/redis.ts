import Redis from 'ioredis'

interface Config {
  port?: number, host?: string, options?: Redis.RedisOptions
}

export class RedisClient extends Redis{

  private static instance: RedisClient

  constructor(config: Config){
    super(config)
  }

  static connect(config: Config) {
    this.instance = new RedisClient(config)
  }
  
  static getInstance() {
    return this.instance
  }
}

