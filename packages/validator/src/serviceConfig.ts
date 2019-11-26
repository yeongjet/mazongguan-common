import * as Joi from '@hapi/joi'

export const serviceConfig = {
    redis: Joi.object({
        host: Joi.string().min(1).required(),
        port: Joi.number().integer().min(1025).max(65534).required(),
    }),
    wechat: Joi.object({
        component: Joi.object({
            appid: Joi.string().min(1).required(),
            app_secret: Joi.string().min(1).required(),
            token: Joi.string().min(1).required(),
            encoding_aes_key: Joi.string().min(1).required()
        })
    })
}
