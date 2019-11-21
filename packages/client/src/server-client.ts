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

    static listen({ port, middlewares, effects }: ServerConfig): Promise<void> {
        return new Promise((resolve, reject) => {
            if (this.instance) {
                this.instance.close()
            }
            this.instance = new ServerClient(middlewares, effects)
            this.instance
                .listen(port, () => {
                    console.info(
                        chalk.green('[server] running'),
                        `port:${port}`
                    )
                    resolve()
                })
                .on('close', () => {
                    console.info(chalk.green('[server] stopped'))
                })
                .on('error', (error: Error) => {
                    console.error(chalk.red('[server] errored'), error.message)
                    reject()
                })
        })
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
}
