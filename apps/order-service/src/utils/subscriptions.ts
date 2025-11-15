import {createOrder} from "./order";
import {consumer} from "./kafka";


export const runKafkaSubscription =  async () => {
    consumer.subscribe([
        {
            topicName: "payment.successfull",
            topicHandler: async (message) => {
                const order = message.value;
                await createOrder;
            }
        }
    ])
}