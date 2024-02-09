import express from 'express'
import { router } from './routes'

const server = express()

server.use(express.json())

server.use(router)

server.engine('html', require('ejs').renderFile)

server.listen(process.env.PORT || 4444, () =>
{
    console.log(`Rodando na porta ${process.env.PORT || 4444}`)
})

export {server}