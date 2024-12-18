import { daCar } from "../db/da.mjs";

class Car {
    constructor() {
        
    }
    async list(rq, rs) {
        const filters = {};

        if (rq.query.make) {
            filters.make = rq.query.make;
        }
        if (rq.query.price) {
            filters.price = rq.query.price;
        }
        if (rq.query.type) {
            filters.type = rq.query.type;
        }
        if (rq.query.transmission) {
            filters.transmission = rq.query.transmission;
        }
        if (rq.query.seats) {
            filters.seats = rq.query.seats;
        }
        if (rq.query.location) {
            filters.location = rq.query.location;
        }
        if (rq.query.startDate) {
            filters.startDate = rq.query.startDate;
        }
        if (rq.query.endDate) {
            filters.endDate = rq.query.endDate;
        }
        
        const result = await daCar.selectCar(filters);

        rs.status(200).send(result.rows);
    }
}
const car = new Car();
export { car }