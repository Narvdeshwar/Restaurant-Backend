import { createClient } from "redis";

const client = createClient({
    username: process.env.REDIS_USERNAME,
    password: process.env.REDIS_PASSWORD,
    socket: {
        host: process.env.REDIS_HOST || "127.0.0.1",
        port: process.env.REDIS_PORT ? Number(process.env.REDIS_PORT) : 6379
    }
})

client.on('error', err => console.error("Redis client error", err))

export const getRedisClient = async () => {
    if (!client.isOpen) await client.connect()
    console.log("client connected")
    return client;
}

export default client;

// redis default port is 6379