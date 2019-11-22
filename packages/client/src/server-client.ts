import { createServer, Server } from 'http'
import { createContext, httpListener } from '@marblejs/core'
import chalk from 'chalk'

interface ServerConfig {
    port: number
    middlewares: any[]
    effects: any[]
}

export class ServerClient extends Server {
    private static instance: ServerClient

    constructor(middlewares, effects) {
        super()
        return createServer(
            httpListener({ middlewares, effects }).run(createContext())
        )
    }

    static async create({ middlewares, effects }: ServerConfig) {
        if (this.instance) {
            await ServerClient.close()
        }
        this.instance = new ServerClient(middlewares, effects)
    }

    static close(): Promise<void> {
        return new Promise((resolve, reject) => {
            this.instance.close((err?: Error) => {
                if (err) {
                    reject(err)
                }
                resolve()
            })
        })
    }

    static getInstance(): ServerClient {
        return this.instance
    }
}
