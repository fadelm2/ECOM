import  Fastify from 'fastify'
import {clerkPlugin, getAuth} from "@clerk/fastify";
import {shouldBeUser} from "./middleware/authMiddleware.js";
import {connectOrderDB} from "@repo/order-db";
import {orderRouter} from "./routes/order";
import cors from "@fastify/cors";
import {consumer, producer} from "./utils/kafka";

const fastify = Fastify({ logger: true })

fastify.register(clerkPlugin)

fastify.get("/", (request, reply)=> {
    return reply.send("Order endpoint works!")
})

fastify.get("/health", (request, reply) => {
    return reply.status(200).send({
        status: "ok",
        uptime: process.uptime(),
        timestamp: Date.now(),
    });
});
fastify.register(orderRouter);

fastify.get("/test", { preHandler: shouldBeUser }, (request, reply) => {
    return reply.send({
        message: "Order service is authenticated!",
        userId: request.userId,
    });
});


const start = async () => {
    try {
        await connectOrderDB();
        await producer.connect();
        await consumer.connect();
        await fastify.listen({port: 8001});
        console.log('Order service is running on port 8001');
    } catch (error) {
        console.log(error)
        fastify.log.error(error);
        process.exit(1);
    }
};

start();