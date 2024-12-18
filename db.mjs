import express from 'express';
import cors from "cors";
import {car} from './routes/car.mjs';
import { payment } from './routes/payment.mjs';

import swaggerDocs from './swagger.mjs';

const app = express();
app.use(express.json());
app.use(cors());
const port = 3000

app.get('/', (req, res) => res.send('Hello World!'))

app.get('/api/car', await car.filter);
app.post('/api/payment', await payment.post);

app.listen(port, () => {
    swaggerDocs(app, port);
    console.log(`Listening on http://localhost:${port}`);
    console.log(`Documentation is on http://localhost:${port}/docs`);
})