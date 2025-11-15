import {Order} from "@repo/order-db";
import {producer} from "./kafka";
import {OrderType} from "@repo/types";


export const createOrder = async (order: OrderType) => {
    const newOrder = new Order(order);


    try {
        const order = await newOrder.save();
        producer.send("order.created", {
            value: {
                email: order.email,
                amount: order.amount,
                status: order.status,
            }
        });
    } catch (err)  {
        console.log(err);
        throw err;
    }
}