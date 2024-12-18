export default class DaPayment {
    constructor(pool) {
        this.pool = pool;
        this.insertPaymentStr = 'INSERT INTO public.payment( amount, date ) VALUES ($1, now())';
    }

    async insertPayment(req, res, paymentObj) {
        try {
            const result = await this.pool
                .query(
                    this.insertPaymentStr,
                    [paymentObj.amount]
                );
            if (result.rowCount != 1) {
                res.status(500).send(`Хадгалж чадсангүй.`);
                return;
            }

            res.status(201).send('Амжилттай хадгаллаа');
        }
        catch (error) {
            res.status(500).send(`Хадгалж чадсангүй. Error is: \n"${error}"`)
        }
    }
}