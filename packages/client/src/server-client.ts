import { createServer, Server } from 'http'
import { createContext, httpListener, HttpListenerConfig } from '@marblejs/core'

export interface ServerConfig {
    wechat: {
        component: WechatComponentConfig
    }
}

interface WechatComponentConfig {
    appid: string,
    appSecret: string,
    token: string,
    encodingAESKey: string
}

export class ServerClient {
    private static instance: Server
    public static config: ServerConfig
    private constructor() {}

    static async create(listenerConfig: HttpListenerConfig, serverConfig?: ServerConfig) {
        if (this.instance?.listening) {
            await ServerClient.close()
        }
        this.instance = createServer(
            httpListener(listenerConfig).run(createContext())
        )
        this.config = serverConfig
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
