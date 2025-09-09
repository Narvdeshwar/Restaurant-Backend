import { createClient } from "redis";

const client = createClient({
    username: "ashrith",
    password: process.env.REDIS_PASSWORD,
    socket: {
        host: process.env.REDIS_HOST,
        port: Number(process.env.REDIS_PORT)
    }
})

client.on('error', err => console.error("Redis client error", err))

const getCreateClient = async () => {
    if (!client.isOpen) await client.connect()
    return client;
}

getCreateClient();

export default client;