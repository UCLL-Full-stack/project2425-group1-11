import * as dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import * as bodyParser from 'body-parser';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import PinController from './controller/pin';
import CategoryController from './controller/category';
import UserController from './controller/user';
import BoardController from './controller/board';

const app = express();
dotenv.config();
const port = process.env.APP_PORT || 3000;

app.use(cors());
app.use(bodyParser.json());

app.get('/status', (req, res) => {
    res.json({ message: 'Back-end is running...' });
});

app.use('/pins', PinController);
app.use('/categories', CategoryController);
app.use('/users', UserController);
app.use('/boards', BoardController);

const swaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Full Stack Development API',
            version: '1.0.0',
            description: 'API documentation for the back-end',
        },
        servers: [
            {
                url: `http://localhost:${port}`,
            },
        ],
    },
    apis: ['./controller/*.ts'],
};

const swaggerDocs = swaggerJSDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.listen(port, () => {
    console.log(`Back-end is running on port ${port}.`);
    console.log(`Swagger Docs available at http://localhost:${port}/api-docs`);
});
