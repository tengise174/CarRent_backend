export default class DaCar {
    constructor(poolObj) {
        this.pool = poolObj;
        this.selectStr = "SELECT * FROM public.car";
    }

    async selectCar(filters) {
        let queryStr = this.selectStr;
        let queryParams = [];
        let whereClauses = [];

        if (filters.make) {
            whereClauses.push(`make = $${whereClauses.length + 1}`);
            queryParams.push(filters.make);
        }
        if (filters.price) {
            whereClauses.push(`price = $${whereClauses.length + 1}`);
            queryParams.push(filters.price);
        }
        if (filters.type) {
            whereClauses.push(`type = $${whereClauses.length + 1}`);
            queryParams.push(filters.type);
        }
        if (filters.transmission) {
            whereClauses.push(`transmission = $${whereClauses.length + 1}`);
            queryParams.push(filters.transmission);
        }
        if (filters.seats) {
            whereClauses.push(`seats = $${whereClauses.length + 1}`);
            queryParams.push(filters.seats);
        }
        if (filters.location) {
            whereClauses.push(`location = $${whereClauses.length + 1}`);
            queryParams.push(filters.location);
        }
        if (filters.startDate) {
            whereClauses.push(`start_date < $${whereClauses.length + 1}`);
            queryParams.push(filters.startDate);
        }
        if (filters.endDate) {
            whereClauses.push(`end_date > $${whereClauses.length + 1}`);
            queryParams.push(filters.endDate);
        }
        
        if (whereClauses.length > 0) {
            queryStr += " WHERE " + whereClauses.join(" AND ");
        }

        return await this.pool.query(queryStr, queryParams);
    }
}
