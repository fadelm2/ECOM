import {Hono} from 'hono'
import * as process from "node:process";
import {shouldBeUser} from "./middleware/authMiddleware.js";
import {serve} from "@hono/node-server";
import {clerkMiddleware} from "@hono/clerk-auth";

const app = new Hono();

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
app.use("*", clerkMiddleware());
//
app.get('/test',shouldBeUser, (c) => {

    return c.json({
        message: " Payment service is Authentication!", userId: c.get("userId")
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