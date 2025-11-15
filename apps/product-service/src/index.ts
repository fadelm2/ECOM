import express, { NextFunction, Request, Response } from "express";
import cors from "cors";
import {clerkMiddleware} from "@clerk/express";
import {shouldBeUser} from "./middleware/authMiddleware.js";
import categoryRouter from "./routes/category.route";
import productRouter from "./routes/product.route";
import {consumer, producer} from "./utils/kafka";

const app = express();
app.use(express.json());

app.use(
    cors({
        origin: ["http://localhost:3002", "http://localhost:3003"],
        credentials: true,
    })
);

app.use(clerkMiddleware());


app.get("/", (req:Request, res:Response) => {
    res.json("Product endpoint works!")
})
app.get("/health", (req: Request, res: Response) => {
    return res.status(200).json({
        status: "ok",
        uptime: process.uptime(),
        timestamp: Date.now(),
    });
});

app.get("/test", shouldBeUser, (req, res) => {
    res.json({message : " Product service authenticated", userId: req.userId});
})
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
    console.log(err);
    return res
        .status(err.status || 500)
        .json({ message: err.message || "Inter Server Error!" });
});

app.use("/categories", categoryRouter);
app.use("/products", productRouter);

const start = async () => {
    try {
        Promise.all([await producer.connect(), await consumer.connect()]);
        app.listen(8000, () => {
            console.log("Product service is running on 8000");
        });
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
};

start()

