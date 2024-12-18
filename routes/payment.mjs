import { daPayment } from "../db/da.mjs";

export default class Payment {
    constructor(parameters) {
        
    }

    /** POST Methods */
    /**
     * @openapi
     * '/api/payment':
     *  post:
     *     tags:
     *     - Payment Controller
     *     summary: Create a payment
     *     requestBody:
     *      required: true
     *      content:
     *        application/json:
     *           schema:
     *            type: object
     *            required:
     *              - amount
     *            properties:
     *              amount:
     *                type: number
     *                default: 0 
     *     responses:
     *      201:
     *        description: Created
     *      409:
     *        description: Conflict
     *      404:
     *        description: Not Found
     *      500:
     *        description: Server Error
     */
    async post(req, res) {
        const {amount} = req.body;

        await daPayment.insertPayment(req, res,
            {
            amount: amount,
            });
    }
}

const payment = new Payment();
export { payment }