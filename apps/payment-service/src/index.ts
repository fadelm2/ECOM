import {Hono} from 'hono'
import * as process from "node:process";
import {shouldBeUser} from "./middleware/authMiddleware.js";
import {serve} from "@hono/node-server";
import {clerkMiddleware} from "@hono/clerk-auth";
import { cors } from "hono/cors";
import sessionRoute from "./routes/session.routes";

const app = new Hono();
app.use("*", clerkMiddleware());
app.use("*", cors({ origin: ["http://localhost:3002"] }));

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

app.route("/sessions", sessionRoute);

// app.post("/create-stripe-product", shoulBeUser, async (c) => {
//     const res = await stripe.products.create({
//         id:"123",
//         name: "Test Product",
//         default_price_data: {
//             currency: "usd",
//             unit_amount: 10 *100,
//         },
//     });
//     return c.json(res);
// })
//
//  app.get("/stripe-product-price", async (c) => {
//   const res = await stripe.prices.list({
//     product: "123",
//   });
//
//   return c.json(res);
// });

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