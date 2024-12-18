import { daCar } from "../db/da.mjs";

class Car {
    constructor() {
        
    }
    /** GET Methods */
    /**
     * @openapi
     * '/api/car':
     *  get:
     *     tags:
     *     - Car Controller
     *     summary: Get a list of cars filtered based on provided query parameters
     *     description: |
     *       Олон төрлийн ангиллаар машиныг шүүж харуулж болно.
     *       Зайлгшгүй байх ангилал гэж байхгүй. Аль ч ангиллыг сонгож болно. 
     *     parameters:
     *       - in: query
     *         name: id
     *         required: false
     *         description: Машины id
     *         schema:
     *           type: integer
     *       - in: query
     *         name: make
     *         required: false
     *         description: Машин үйлдвэрлэгчийн нэр
     *         schema:
     *           type: string
     *       - in: query
     *         name: price
     *         required: false
     *         description: Машины үнийн ангилал [Low, Medium, High]
     *         schema:
     *           type: number
     *           format: float
     *       - in: query
     *         name: type
     *         required: false
     *         description: Машины төрөл [SUV, Sedan etc]
     *         schema:
     *           type: string
     *       - in: query
     *         name: transmission
     *         required: false
     *         description: Машины хурдны хайрцаг [automatic, manual]
     *         schema:
     *           type: string
     *       - in: query
     *         name: seats
     *         required: false
     *         description: Суудлын тоо
     *         schema:
     *           type: integer
     *       - in: query
     *         name: location
     *         required: false
     *         description: Байрлал
     *         schema:
     *           type: string
     *       - in: query
     *         name: startDate
     *         required: false
     *         description: Эхлэх хугацаа [`YYYY-MM-DD`]
     *         schema:
     *           type: string
     *           format: date
     *       - in: query
     *         name: endDate
     *         required: false
     *         description: Дуусах хугацаа [`YYYY-MM-DD`]
     *         schema:
     *           type: string
     *           format: date
     *     responses:
     *       200:
     *         description: Successfully fetched the filtered cars
     *         content:
     *           application/json:
     *             schema:
     *               type: array
     *               items:
     *                 type: object
     *                 properties:
     *                   id:
     *                     type: integer
     *                     description: Машин ID
     *                   make:
     *                     type: string
     *                     description: Үйлдвэрлэгч
     *                   model:
     *                     type: string
     *                     description: Нэр
     *                   price:
     *                     type: number
     *                     format: float
     *                     description: Үнэ
     *                   type:
     *                     type: string
     *                     description: Төрөл
     *                   transmission:
     *                     type: string
     *                     description: Хурдны хайрцаг (e.g., Automatic, Manual)
     *                   seats:
     *                     type: integer
     *                     description: Суудлын тоо
     *                   location:
     *                     type: string
     *                     description: Байрлал
     *       400:
     *         description: Bad request, typically caused by invalid query parameters
     *       404:
     *         description: No cars found matching the filter criteria
     *       500:
     *         description: Server error while processing the request
     */
    async filter(rq, rs) {
        const filters = {};

        const sanitizeInput = (input) => {
            if (typeof input === 'string') {
                const sqlReg = /select|insert|update|delete|--|;/ig;
                return input.replace(sqlReg, '').trim();
            }
            return input; 
        };

        // ID
        if(rq.query.id) {
            const id = rq.query.id;
            if (Number.isInteger(id) && id > 0) {
                return rs.status(400).json({ error: 'Invalid id. It must be an integer.' });
            }
            filters.id = id;
        }

        // Mashinii uildverle
        if (rq.query.make) {
            filters.make = sanitizeInput(rq.query.make);
        }
        if (rq.query.price) {
            filters.price = sanitizeInput(rq.query.price);
        }
        if (rq.query.type) {
            filters.type = sanitizeInput(rq.query.type);
        }
        if (rq.query.transmission) {
            filters.transmission = sanitizeInput(rq.query.transmission);
        }
        if (rq.query.seats) {
            filters.seats = sanitizeInput(rq.query.seats);
        }
        if (rq.query.location) {
            filters.location = sanitizeInput(rq.query.location);
        }
        if (rq.query.startDate) {
            filters.startDate = sanitizeInput(rq.query.startDate);
        }
        if (rq.query.endDate) {
            filters.endDate = sanitizeInput(rq.query.endDate);
        }
        
        const result = await daCar.selectCar(filters);

        rs.status(200).send(result.rows);
    }
}
const car = new Car();
export { car }