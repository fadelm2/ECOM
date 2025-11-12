import {serve} from '@hono/node-server'
import {Hono} from 'hono'
import * as process from "node:process";

const app = new Hono()

app.get('/', (c) => {
    return c.text('Payment End Point works!')
})

app.get("/health", (c) => {
    return c.json({
        status: "ok",
        uptime: process.uptime(),
        timestamp: Date.now(),
    });
});

const start = async () => {
    try {
        serve({
                fetch: app.fetch,
                port: 8002
            }, (info) => {
                console.log(`Server is running on http://localhost:${info.port}`)
            }
        );

    } catch (error) {
        console.error(error);
        process.exit(1);
    }
}

start();